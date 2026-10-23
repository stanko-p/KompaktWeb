
import { onRequestPost } from "../functions/api/contact.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Kontakt API
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({
            error: "Method Not Allowed"
          }),
          {
            status: 405,
            headers: {
              "Content-Type": "application/json",
              "Allow": "POST"
            }
          }
        );
      }

      return onRequestPost({ request, env });
    }

    // Ostale nepoznate API rute
    if (url.pathname.startsWith("/api/")) {
      return new Response(
        JSON.stringify({ error: "API ruta ne postoji." }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // HTML, CSS, slike i frontend JavaScript
    return env.ASSETS.fetch(request);
  }
};
