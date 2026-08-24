# Gamification Pitch — Presentation + Interactive Prototype

A dependency-free, CDN-based scaffold for a browser presentation (reveal.js) with an
embedded interactive prototype. No npm install, no build step, and no local server
required — everything runs by simply opening the HTML files in a browser.

## Folder Structure

```
/project-root
  /presentation
    start.html         <- entry point for the deck (opens directly in browser)
    /css
      style.css        <- reveal.js shell + demo iframe styles
      slides.css       <- shared design system for all slides
    /js
      slides.js        <- loads each slide fragment + initializes reveal.js
    /Slides
      S01.html ... S16.html   <- one HTML fragment per main slide
      B01.html ... B05.html   <- backup slides (optional)
  /prototype
    index.html         <- entry point for the prototype (runs standalone)
    /css
      style.css
    /js
      app.js
  README.md
```

## How the slides work

Each slide lives in its own HTML fragment inside `/presentation/Slides/`. The files
are **not** full HTML documents — they contain only the slide content (a
`<div class="slide">…</div>`). `js/slides.js` fetches every fragment, wraps it in a
reveal.js `<section>`, and injects it into the deck.

- **Edit a single slide** by opening its file in `/Slides/` (e.g. `S07.html`) and
  changing the content. No need to touch the other slides.
- **Reorder or hide slides** by editing the `SLIDE_FILES` array at the top of
  `js/slides.js`. Remove optional or backup slides there for a shorter pitch.
- **Shared styling** lives in `css/slides.css`. All slides use the same design
  system (BIT colours, cards, tables, etc.).

## Viewing the Presentation

Open `/presentation/start.html` directly in a browser (double-click the file, or
drag it into a browser window). No server is needed.

- Use the arrow keys (or on-screen controls) to move between slides.
- Slide 7 ("Der Kern: der Skilltree") marks the point for the live demo.

## Testing the Prototype Standalone

Open `/prototype/index.html` directly in a browser. It runs 100% independently and
has no dependency on the presentation. Click the **Toggle** button to verify
interactivity works both standalone and inside the presentation's iframe.

## Exporting the Deck to PDF

1. Open `/presentation/start.html` with `?print-pdf` appended to the URL, e.g.:
   `presentation/start.html?print-pdf`
2. Use the browser's **Print → Save as PDF** function.

> **Note:** Any live demo iframe will freeze as a static snapshot in the PDF.
> Swapping in a screenshot of the prototype for that slide before exporting is
> an expected manual step later.
