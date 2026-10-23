# Kompakt Web — expanded edition

## Deploy to Netlify
1. Extract this ZIP. Upload the `kompaktweb` folder (the folder containing `index.html`) to Netlify, or connect it as a repository. No build command or installation is needed. Publish directory: `.`.
2. Enable form detection under Forms in your Netlify site settings and deploy/redeploy. The static form is named `kontakt`, with the same field names in every language and a honeypot for spam protection.
3. Configure submission notifications in Netlify if you want enquiries delivered to kompaktweb@gmail.com. A visible email address alone does not configure notifications.
4. Submit one real enquiry on the deployed site and confirm that it appears in Forms. The success and failure UI was checked locally with mocked responses; actual Netlify delivery requires a deployed Netlify site.

## Content and languages
Serbian is the default at `/`. English is at `/en/`, Russian at `/ru/`. The language flags preserve the current page and section. Each local SVG flag has an accessible language name, so it renders consistently on Windows as well as mobile devices. Each language has complete static HTML, metadata, canonical and alternate language links; no translation API or automatic browser-language redirection is used.

Original four packages, euro prices, exclusions and four-step methodology are retained. New content covers approach, responsive design, a real project preview, process details, service guidance and FAQs. The four benefit statistics now describe local search intent, purchases, mobile abandonment and retail conversion research. The public statistics now show only a short heading and one direct statement; research references are retained below for editing, without visible website citations. They are historical international research, not client results or a forecast for Serbia. Service illustrations are labelled as illustrations; they are not measured scores or guaranteed results.

## Motion and performance
The default hero artwork is a local static SVG sphere with a static CSS laptop. No animation must run for the illustration to appear. After the full page loads and the browser is idle, capable devices may get a lightweight canvas 3D sphere, capped at about 30 fps with a bounded backing-store resolution.

The page stays static when any of these signals apply: four or fewer logical CPU threads, 4 GB or less reported device memory, data-saving mode, a slow-2g/2g connection, or a performance fallback recorded earlier in this tab session. Missing device APIs are not treated as an error; runtime monitoring still applies.

During animation, four consecutive renders costing over 8 ms, or a rolling 1.5-second sample with at least 12 frames and more than 40% of intervals exceeding 55 ms, trigger the static fallback. That decision is retained in sessionStorage when available. The canvas loop stops, observers disconnect, and its backing store is released. Decorative CSS motion is also disabled. Hardware hints are conservative approximations, not exact device speed measurements.

The canvas stops when off screen, when the tab is hidden, when the visitor pauses motion, or when reduced motion is requested. There are no external 3D libraries or model downloads. If JavaScript is unavailable, visitors see the static artwork and can use native language flag links.

## Research behind the four benefit statistics
- 76% / 28%: Google/Purchased Digital Diary, May 2016, US smartphone users; 76% of people searching for something nearby visited a related business within a day, and 28% of nearby smartphone searches led to a purchase. Source: https://blog.google/products-and-platforms/products/ads/the-year-of-supershopper/
- 53%: Google global aggregated mobile-web analytics, March 2016; abandonment for mobile visits taking longer than three seconds to load. Reported in https://blog.google/products-and-platforms/products/ads/speed-scorecard-impact-calculator/
- +8.4%: Google-commissioned Deloitte/55 research, 2020; higher retail conversion rates observed when four speed metrics each improved by 0.1 seconds across the customer journey. This does not mean every 0.1-second change on any website produces that result. Source: https://web.dev/case-studies/milliseconds-make-millions

## SEO: kompaktweb.rs, Novi Sad and Serbia
All 18 indexable pages have unique local titles and descriptions in their own language, self-canonical URLs, reciprocal Serbian/English/Russian/x-default alternate links, and branded PNG social previews. Each service page includes relevant visible copy for Novi Sad and the rest of Serbia. The homepage and footer describe the same service area.

Structured data describes the real organisation, website, current page, breadcrumbs and individual service where applicable. Service coverage names Novi Sad and Serbia. No physical office address, phone number, review or rating has been fabricated. Thank-you pages remain noindexed and are excluded from the multilingual sitemap. Netlify configuration redirects index.html homepage variants to the preferred directory URLs and the www host to the apex domain.

After deploying, confirm https://kompaktweb.rs is the primary Netlify domain, then submit https://kompaktweb.rs/sitemap.xml in the owner's Google Search Console account. No Search Console or Google Business Profile account was accessed or configured by this update.

## Scroll reveals
Sections, individual cards, process steps and FAQ items fade in once as they enter view, with a small stagger between siblings. The effect uses opacity and translation only and works independently of the 3D performance fallback. Reduced-motion and no-JavaScript visitors see content immediately.

## Readability and navigation
Statistics use larger body text and one card per row on phones. The four values count from zero when they first enter view, with a 1.4-second easing animation, localised decimals and a stable final value for screen readers. The brief counter animation remains available when only the 3D performance fallback is active. Reduced-motion preferences or a manual animation pause show the final values immediately.

Navbar section links use native smooth scrolling with spacing for the fixed header. Static 3D mode no longer disables smooth scrolling; reduced-motion preferences still disable it.

## Editing
Shared styling: `enhancements.css`, alongside original brand stylesheets. Shared interactions: `experience.js`. Edit text directly in each language's HTML when updating copy. Package option values intentionally remain stable Serbian identifiers for form processing and preselection.

External resources: Google Fonts only. System font fallbacks remain usable if unavailable. Existing social links, project destination and images were retained. Domain-based metadata assumes https://kompaktweb.rs.

## Verification
Static local links/assets, translation coverage, 18 unique SEO titles/descriptions, reciprocal language URLs, structured data and sitemap coverage were checked. Simulated browser API tests covered device hints, reduced motion, deferred startup, the frame cap, manual/background pause, both runtime performance fallbacks, flag navigation, device controls and multilingual form success/failure handling. Browser visual QA was unavailable in this environment. A real form delivery test must be performed after deployment, with Netlify form detection enabled.

## Limited launch offer
The offer is 160 EUR reduced to 80 EUR for a five-page site, with 9 places
remaining. The launch banner and contact-form option are on all three
homepages. The entry dialog also appears on service and project pages, once
per browser tab session. It supports keyboard dismissal and focus return.
The place count is a manually maintained value, not a live reservation system;
update the banner and dialog copy in the HTML pages when availability changes.
Hosting/domain remain excluded. No enquiry automatically reserves a place.
Scroll fades and count-up effects respect reduced-motion preferences. Without
JavaScript, statistics retain their final values and page content stays visible.
