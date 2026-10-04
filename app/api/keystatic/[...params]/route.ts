import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { isCmsEnabled } from "@/keystatic.config";

const disabled = () => new Response("Not found", { status: 404 });

export const { POST, GET } = isCmsEnabled
  ? makeRouteHandler({ config })
  : { POST: disabled, GET: disabled };
