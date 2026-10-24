import "server-only";

type InlineButton = { text: string; callback_data?: string; url?: string };
type SendOptions = { chatId?: string; buttons?: InlineButton[][] };

// Calls a Telegram Bot API method; logs and returns null on failure so a broken notification
// never takes down the request that triggered it
export async function telegramApi<T = unknown>(method: string, body: object): Promise<T | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => null)) as { ok?: boolean; result?: T } | null;
  if (!res.ok || !json?.ok) {
    console.error(`Telegram ${method} failed: ${res.status} ${JSON.stringify(json)}`);
    return null;
  }
  return json.result ?? null;
}

// Sends a message to the site owner's Telegram chat. Text uses Telegram's HTML parse mode,
// so anything user-supplied must go through escapeHtml first.
export async function sendTelegram(text: string, { chatId = process.env.TELEGRAM_CHAT_ID, buttons }: SendOptions = {}) {
  if (!chatId) return null;
  return telegramApi<{ message_id: number }>("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
  });
}

export function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Telegram messages cap at 4096 characters
const CHUNK = 3800;

// Turns sanitized article HTML into Telegram-HTML chunks for an in-chat preview: headings become
// bold lines, list items bullets, and unsupported tags are dropped. Splits on paragraph breaks only,
// so no chunk ends inside a tag.
export function articleToTelegramChunks(html: string) {
  const text = html
    .replace(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/g, "\n<b>$1</b>\n\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, "• $1\n")
    .replace(/<\/(p|ul|ol|blockquote)>/g, "\n\n")
    .replace(/<strong>/g, "<b>").replace(/<\/strong>/g, "</b>")
    .replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>")
    .replace(/<a [^>]*href="([^"]*)"[^>]*>/g, '<a href="$1">')
    .replace(/<(?!\/?(b|i|a)[\s>])[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks: string[] = [];
  let current = "";
  for (const block of text.split("\n\n")) {
    if (current && current.length + block.length + 2 > CHUNK) {
      chunks.push(current);
      current = "";
    }
    current = current ? `${current}\n\n${block}` : block;
  }
  if (current) chunks.push(current);
  return chunks;
}
