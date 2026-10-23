// KompaktWeb - Cloudflare Pages kontakt API
// Povezivanje sa Notion CRM i Telegram botom

export async function onRequestPost({ request, env }) {

  function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status: status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  try {

    // 1. Provera Cloudflare promenljivih

    const requiredVariables = [
      env.NOTION_TOKEN,
      env.NOTION_DATA_SOURCE_ID,
      env.TELEGRAM_BOT_TOKEN,
      env.TELEGRAM_CHAT_ID,
      env.TURNSTILE_SECRET_KEY
    ];

    if (!requiredVariables.every(Boolean)) {
      console.error("Missing environment variables");

      return json({
        error: "Server nije konfigurisan."
      }, 500);
    }

    // 2. Provera formata zahteva

    const contentType =
      request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return json({
        error: "Neispravan format zahteva."
      }, 415);
    }

    const body = await request.text();

    if (body.length > 12000) {
      return json({
        error: "Zahtev je prevelik."
      }, 413);
    }

    let data;

    try {
      data = JSON.parse(body);
    } catch (error) {
      return json({
        error: "Neispravan JSON format."
      }, 400);
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return json({
        error: "Neispravni podaci forme."
      }, 400);
    }

    // 3. Preuzimanje podataka iz kontakt forme

    const ime = String(data.ime || "").trim();
    const email = String(data.email || "").trim();
    const telefon = String(data.telefon || "").trim();
    const paket = String(data.paket || "").trim();
    const poruka = String(data.poruka || "").trim();

    // Turnstile token koji salje contact-form.js
    const token = String(data.turnstileToken || "");

    // 4. Validacija podataka

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      ime.length < 2 ||
      ime.length > 100 ||
      !emailRegex.test(email) ||
      email.length > 254 ||
      telefon.length > 40 ||
      paket.length > 100 ||
      poruka.length < 5 ||
      poruka.length > 2000 ||
      !token
    ) {
      return json({
        error: "Proverite podatke forme."
      }, 400);
    }

    // 5. Cloudflare Turnstile provera

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token
        })
      }
    );

    if (!turnstileResponse.ok) {
      console.error("Turnstile API unavailable");

      return json({
        error: "Bezbednosna provera nije dostupna."
      }, 503);
    }

    const turnstile = await turnstileResponse.json();

    // Dozvoljeni domeni
    const allowedHostnames = [
      "kompaktweb.rs",
      "www.kompaktweb.rs",
      "kompaktweb.pages.dev"
    ];

    if (
      !turnstile.success ||
      !allowedHostnames.includes(turnstile.hostname)
    ) {
      console.error(
        "Turnstile validation failed",
        turnstile.hostname,
        turnstile["error-codes"]
      );

      return json({
        error: "Bezbednosna provera nije uspela."
      }, 403);
    }

    // 6. Kreiranje klijenta u Notion CRM bazi

    const notionData = {
      parent: {
        type: "data_source_id",
        data_source_id: env.NOTION_DATA_SOURCE_ID
      },
      properties: {
        "Ime": {
          title: [
            {
              text: {
                content: ime
              }
            }
          ]
        },
        "Email": {
          email: email
        },
        "Telefon": {
          phone_number: telefon || null
        },
        "Paket": {
          rich_text: [
            {
              text: {
                content: paket || "Nije odabran"
              }
            }
          ]
        },
        "Poruka": {
          rich_text: [
            {
              text: {
                content: poruka
              }
            }
          ]
        },
        "Status": {
          status: {
            name: "Novi upit"
          }
        },
        "Izvor": {
          select: {
            name: "KompaktWeb forma"
          }
        }
      }
    };

    const notionResponse = await fetch(
      "https://api.notion.com/v1/pages",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.NOTION_TOKEN,
          "Notion-Version": "2025-09-03",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notionData)
      }
    );

    if (!notionResponse.ok) {
      console.error(
        "Notion API error:",
        notionResponse.status
      );

      return json({
        error: "Upit nije sacuvan. Pokusajte ponovo."
      }, 502);
    }

    const savedPage = await notionResponse.json();

    // 7. Kreiranje Telegram obavestenja

    const notification = [
      "NOVI KOMPAKTWEB UPIT",
      "",
      "Ime: " + ime,
      "Email: " + email,
      "Telefon: " + (telefon || "Nije unet"),
      "Paket: " + (paket || "Nije odabran"),
      "",
      "Poruka: " + poruka,
      "",
      "Notion: " + (savedPage.url || "Sacuvano")
    ].join("\n");

    // 8. Slanje Telegram poruke

    try {

      const telegramUrl =
        "https://api.telegram.org/bot" +
        env.TELEGRAM_BOT_TOKEN +
        "/sendMessage";

      const telegramResponse = await fetch(
        telegramUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: notification
          })
        }
      );

      if (!telegramResponse.ok) {
        console.error(
          "Telegram notification failed:",
          telegramResponse.status
        );
      }

    } catch (error) {
      console.error("Telegram unavailable:", error);
    }

    // 9. Uspesno slanje forme

    return json({
      success: true,
      message: "Upit je uspesno poslat!"
    });

  } catch (error) {

    console.error("Contact function error:", error);

    return json({
      error: "Doslo je do greske. Pokusajte ponovo."
    }, 500);

  }
}