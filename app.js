(function () {
  "use strict";

  let chapterData = null;
  let themesData = null;

  const verseListEl = document.getElementById("verse-list");
  const chapterSummaryEl = document.getElementById("chapter-summary");
  const chapterNoteEl = document.getElementById("chapter-note");
  const themeSelectEl = document.getElementById("theme-select");
  const themeDetailEl = document.getElementById("theme-detail");

  function themeName(themeId) {
    const theme = themesData.themes.find((t) => t.id === themeId);
    return theme ? theme.name : themeId;
  }

  function renderPassages() {
    chapterSummaryEl.textContent = chapterData.summary;
    chapterNoteEl.textContent = chapterData.note;

    verseListEl.innerHTML = chapterData.verses
      .map((verse) => {
        const chips = verse.themes
          .map(
            (themeId) =>
              `<button class="theme-chip" data-theme-id="${themeId}">${themeName(themeId)}</button>`
          )
          .join("");
        return `
          <article class="verse-card" id="verse-${verse.id}">
            <div class="verse-head">
              <span class="verse-number">${verse.id}</span>
              <span class="verse-speaker">${verse.speaker}</span>
            </div>
            <p class="verse-text">${verse.text}</p>
            <div class="verse-themes">${chips}</div>
          </article>
        `;
      })
      .join("");

    verseListEl.querySelectorAll(".theme-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        switchTab("themes");
        themeSelectEl.value = chip.dataset.themeId;
        renderThemeDetail(chip.dataset.themeId);
      });
    });
  }

  function populateThemeSelect() {
    themeSelectEl.innerHTML = themesData.themes
      .map((theme) => `<option value="${theme.id}">${theme.name}</option>`)
      .join("");
    themeSelectEl.addEventListener("change", () => {
      renderThemeDetail(themeSelectEl.value);
    });
  }

  function renderThemeDetail(themeId) {
    const theme = themesData.themes.find((t) => t.id === themeId);
    if (!theme) return;

    const matchingVerses = chapterData.verses.filter((v) =>
      v.themes.includes(themeId)
    );

    const versesHtml = matchingVerses
      .map(
        (verse) => `
          <article class="verse-card">
            <div class="verse-head">
              <span class="verse-number">${verse.id}</span>
              <span class="verse-speaker">${verse.speaker}</span>
            </div>
            <p class="verse-text">${verse.text}</p>
          </article>
        `
      )
      .join("");

    themeDetailEl.innerHTML = `
      <h2>${theme.name}</h2>
      <div class="theme-learning">${theme.learning}</div>
      <p class="panel-intro">${matchingVerses.length} passage(s) in Chapter 1 touch on this theme:</p>
      <div class="verse-list">${versesHtml}</div>
    `;
  }

  function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === tabId);
    });
  }

  function initTabs() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
  }

  async function init() {
    initTabs();
    const [chapterRes, themesRes] = await Promise.all([
      fetch("data/chapter1.json"),
      fetch("data/themes.json"),
    ]);
    chapterData = await chapterRes.json();
    themesData = await themesRes.json();

    renderPassages();
    populateThemeSelect();
    renderThemeDetail(themesData.themes[0].id);
  }

  init();
})();
