// Renders a string where **double asterisks** mark bold text (used by dictionary copy)
export function RichText({ text, boldClassName = "font-black text-foreground" }: { text: string; boldClassName?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={boldClassName}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
