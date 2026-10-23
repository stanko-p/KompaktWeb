// KompaktWeb kontakt forma
// Cloudflare Pages -> Notion + Telegram

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const button = form.querySelector('button[type="submit"]');

  if (!status || !button) {
    console.error("Nedostaje formStatus ili submit dugme.");
    return;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fields = new FormData(form);

    const turnstileToken = String(
      fields.get("cf-turnstile-response") || ""
    );

    if (!turnstileToken) {
      status.textContent =
        "Sačekajte da se završi bezbednosna provera.";
      return;
    }

    const data = {
      ime: String(fields.get("ime") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      telefon: String(fields.get("telefon") || "").trim(),
      paket: String(fields.get("paket") || "").trim(),
      poruka: String(fields.get("poruka") || "").trim(),
      turnstileToken: turnstileToken
    };

    button.disabled = true;
    status.textContent = "Slanje upita...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(function () {
        return {};
      });

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.error || "Slanje nije uspelo. Pokušajte ponovo."
        );
      }

      status.textContent =
        "Uspešno! Kontaktiraćemo vas uskoro.";

      form.reset();

    } catch (error) {
      status.textContent =
        error.message || "Došlo je do greške. Pokušajte ponovo.";

    } finally {
      button.disabled = false;

      if (
        window.turnstile &&
        typeof window.turnstile.reset === "function"
      ) {
        window.turnstile.reset();
      }
    }
  });
});