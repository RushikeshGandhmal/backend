import { serve } from "bun";

serve({
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Bun is running!", { status: 200 });
    } else if (url.pathname === "/anime") {
      return new Response("Do watch anime!", { status: 200 });
    } else return new Response("404, page not found", { status: 400 });
  },
  port: 3000,
  hostname: "127.0.0.1",
});
