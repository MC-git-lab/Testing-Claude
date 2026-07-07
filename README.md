# Bhagavad Gita — Passages & Life Themes

A small static website for reading the Bhagavad Gita verse by verse and exploring the life
lessons within it by theme.

## Features

- **All Passages tab** — every verse of the chapter, numbered (e.g. `1.1`, `1.2`, ...) with
  speaker and a plain-English paraphrase.
- **Life Themes tab** — a dropdown of life lessons for young adults (e.g. Compassion &
  Empathy, Managing Anxiety & Fear, Facing Difficult Decisions). Selecting a theme shows a
  short explanation of the learning plus every verse tagged with that theme.
- Click any theme chip on a verse to jump straight to that theme's detail view.

## Status

Currently covers **Chapter 1: Arjuna Vishada Yoga** (47 verses). More chapters will be added
over time — the data model already supports it (see `data/`).

## Project structure

```
index.html            Page markup, two tabs
style.css             Styling (light/dark aware)
app.js                Tab switching + rendering logic
data/chapter1.json    Verse data for chapter 1
data/themes.json      Life-theme definitions and learnings
```

To add a new chapter, create `data/chapterN.json` following the same shape as
`data/chapter1.json`, and extend `app.js` to load/list multiple chapters.

## Running locally

Because the page loads JSON via `fetch`, open it through a local server rather than
double-clicking the file (browsers block `fetch` on `file://` URLs):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

This is a static site with no build step — it can be served directly via GitHub Pages
(Settings → Pages → deploy from branch) or any static host.

## Content note

Verse text is a concise, plain-English paraphrase intended for study and reflection, not a
literal scholarly translation. For close textual study, please consult a dedicated scholarly
translation alongside this site.
