/* ==========================================================================
   KHELO SAU '26 - SOUTH ASIAN UNIVERSITY WELCOME TOURNAMENT
   Application Logic & Data Store
   ========================================================================== */


// --- INITIAL FIXTURES DATA ---
const FIXTURES_DATA = [
  { sport: "Cricket Craze", sportId: "cricket", stage: "Quarter Final 1", time: "Aug 29, 09:30 AM", venue: "Ground 1", teamA: "CS Strikers 🇦🇫🇮🇳", teamB: "Law Lions 🇵🇰🇧🇩", flagA: "🏏", flagB: "🦁" },
  { sport: "Football Frenzy", sportId: "football", stage: "Group Stage A", time: "Aug 29, 04:00 PM", venue: "Turf Field", teamA: "IR Diplomat FC 🇳pcl", teamB: "Biotech United 🇧🇹🇲🇻", flagA: "⚽", flagB: "🧬" },
  { sport: "Badminton Blast", sportId: "badminton", stage: "Men's Singles Semi-Final", time: "Aug 30, 10:00 AM", venue: "Indoor Court 1", teamA: "Rohan V. (Econ)", teamB: "Kavish M. (CS)", flagA: "🏸", flagB: "🏸" },
  { sport: "Basketball Bash", sportId: "basketball", stage: "Women's 3v3 Final", time: "Aug 30, 05:00 PM", venue: "Outdoor Court", teamA: "Law Queens 🇦🇫", teamB: "Math Matrix 🇳🇵", flagA: "🏀", flagB: "🏀" },
  { sport: "Table Tussle", sportId: "tabletennis", stage: "Singles Final", time: "Aug 29, 02:00 PM", venue: "Indoor Arena", teamA: "Ananya S. (Biotech)", teamB: "David K. (CS)", flagA: "🏓", flagB: "🏓" },
  { sport: "Volleyball Valour", sportId: "volleyball", stage: "Men's Semi-Final", time: "Sep 01, 11:00 AM", venue: "Court A", teamA: "SAU Hawks", teamB: "Delta Spikers", flagA: "🏐", flagB: "🏐" }
];

// --- DOM RENDER FUNCTIONS ---

// 1. Render Sports Cards (Zaap.bio style layout with Direct Google Form links)
function renderSportsCards(categoryFilter = "all", searchQuery = "") {
  const container = document.getElementById("sports-cards-container");
  if (!container) return;

  const filtered = SPORTS_DATA.filter(sport => {
    const matchesCat = categoryFilter === "all" || sport.category === categoryFilter;
    const matchesSearch = sport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sport.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sport.mode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center p-5 background-card border-radius-lg">
        <i class="fa-solid fa-person-running text-dim text-4xl mb-3"></i>
        <h3>No sports match your search</h3>
        <p class="text-muted">Try clearing your search query or selecting a different category filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(sport => `
    <div class="sport-card" id="card-${sport.id}">
      <div class="sport-banner-visual">
        <div class="sport-banner-bg" style="background-image: url('${sport.bannerBg}');"></div>
        <div class="sport-overlay"></div>
        <span class="sport-category-tag">${sport.category}</span>
        <i class="${sport.icon} sport-visual-icon"></i>
      </div>

      <div class="sport-content">
        <div class="sport-title-row">
          <h3 class="sport-name">${sport.name}</h3>
          <span class="mode-badge ${sport.isTeam ? 'team' : 'individual'}">${sport.mode}</span>
        </div>
        <p class="sport-tagline">"${sport.tagline}"</p>
        
        <div class="sport-meta-pills">
          <span class="meta-pill"><i class="fa-solid fa-calendar"></i> ${sport.date}</span>
          <span class="meta-pill"><i class="fa-solid fa-location-dot"></i> ${sport.venue}</span>
          <span class="meta-pill"><i class="fa-solid fa-users"></i> ${sport.slotsLeft}</span>
        </div>
      </div>

      <div class="sport-action-col">
        <!-- Direct link to Google Form for the sport (Zaap.bio style) -->
        <a href="${sport.googleFormUrl}" target="_blank" rel="noopener noreferrer" class="btn-register-sport">
          Register <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button class="btn-details-toggle" onclick="toggleSportRules('${sport.id}')">
          Rules & Details <i class="fa-solid fa-chevron-down ml-1"></i>
        </button>
      </div>

      <!-- Expandable details -->
      <div class="sport-expand-details" id="expand-${sport.id}">
        <div class="p-2">
          <h5 class="text-gold mb-2"><i class="fa-solid fa-circle-info"></i> Tournament Guidelines & Format</h5>
          <p class="mb-2"><strong>Format:</strong> ${sport.format} | <strong>Fee:</strong> ${sport.fee}</p>
          <ul class="pl-4">
            ${sport.rules.map(rule => `<li class="mb-1">${rule}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `).join('');
}

// Toggle Sport Rule Details inline
window.toggleSportRules = function(sportId) {
  const el = document.getElementById(`expand-${sportId}`);
  if (el) {
    el.classList.toggle("open");
  }
};

// 2. Render Fixtures
function renderFixtures(sportFilter = "all") {
  const container = document.getElementById("fixtures-container");
  if (!container) return;

  const filtered = FIXTURES_DATA.filter(f => sportFilter === "all" || f.sportId === sportFilter);

  container.innerHTML = filtered.map(f => `
    <div class="fixture-card">
      <div class="fixture-header">
        <span class="fixture-sport"><i class="fa-solid fa-trophy text-gold"></i> ${f.sport}</span>
        <span class="fixture-stage">${f.stage}</span>
      </div>

      <div class="match-teams">
        <div class="team-box">
          <span class="team-flag">${f.flagA}</span>
          <span class="team-name">${f.teamA}</span>
        </div>
        <span class="vs-badge">VS</span>
        <div class="team-box">
          <span class="team-flag">${f.flagB}</span>
          <span class="team-name">${f.teamB}</span>
        </div>
      </div>

      <div class="fixture-footer">
        <span><i class="fa-regular fa-clock"></i> ${f.time}</span>
        <span><i class="fa-solid fa-map-pin"></i> ${f.venue}</span>
      </div>
    </div>
  `).join('');
}

// 4. Render Rules Accordion
function renderRulesAccordion() {
  const container = document.getElementById("rules-accordion");
  if (!container) return;

  const rulesList = [
    {
      title: "1. Eligibility & Student ID Policy",
      content: "All bona fide undergraduate and postgraduate students enrolled at South Asian University for Academic Year 2026 are eligible. Valid SAU Physical Student ID or digital roll confirmation is mandatory at all match check-ins."
    },
    {
      title: "2. SAARC Fair Play & Code of Conduct",
      content: "As a university representing 8 South Asian member nations, utmost sportsmanship, mutual respect, and zero tolerance for verbal aggression, prejudice, or misconduct is enforced. Violations result in immediate team disqualification."
    },
    {
      title: "3. Uniforms & Athletic Gear",
      content: "Players must wear appropriate sports kit (jerseys, shorts, non-marking indoor shoes for badminton/TT, studs/turf shoes for football). Department kit colors will be assigned prior to matchday."
    },
    {
      title: "4. Reporting Time & Forfeits",
      content: "Teams/Players must report to their assigned venue 15 minutes before the scheduled start time. A grace period of 10 minutes maximum will be permitted, after which a walkover will be awarded to the opponent."
    },
    {
      title: "5. Appeals & Disputes",
      content: "Decisions of the official referees and SAU Sports Board jury are final. Written protests may be submitted to the Student Convener within 30 minutes of match completion accompanied by video evidence if available."
    }
  ];

  container.innerHTML = rulesList.map((r, i) => `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(${i})">
        <span>${r.title}</span>
        <i class="fa-solid fa-chevron-down" id="acc-icon-${i}"></i>
      </div>
      <div class="accordion-body" id="acc-body-${i}">
        ${r.content}
      </div>
    </div>
  `).join('');
}

window.toggleAccordion = function(index) {
  const body = document.getElementById(`acc-body-${index}`);
  const icon = document.getElementById(`acc-icon-${index}`);
  if (body) {
    const isOpen = body.classList.contains("open");
    body.classList.toggle("open");
    if (icon) {
      icon.className = isOpen ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up";
    }
  }
};

// QR CODE FOR SHARE MODAL
function renderShareQR() {
  const wrapper = document.getElementById("share-qr-canvas-wrapper");
  if (wrapper) {
    wrapper.innerHTML = `
      <svg viewBox="0 0 100 100" width="160" height="160">
        <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M10,40 h20 v10 h-20 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M40,70 h10 v20 h-10 z M60,70 h30 v10 h-30 z M80,80 h20 v20 h-20 z" fill="#0056b3"/>
      </svg>
    `;
  }
}

// INITIALIZATION & EVENT BINDINGS
document.addEventListener("DOMContentLoaded", () => {
  renderSportsCards();
  renderFixtures();
  renderRulesAccordion();
  startCountdownTimer();
  renderShareQR();

  // Sidebar Tab Navigation
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tabId = btn.dataset.tab;
      document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
      const targetPane = document.getElementById(`tab-${tabId}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Search Input
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("btn-clear-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (clearBtn) {
        if (val) clearBtn.classList.add("visible");
        else clearBtn.classList.remove("visible");
      }
      const activeChip = document.querySelector(".chip.active");
      const category = activeChip ? activeChip.dataset.category : "all";
      renderSportsCards(category, val);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.classList.remove("visible");
      const activeChip = document.querySelector(".chip.active");
      const category = activeChip ? activeChip.dataset.category : "all";
      renderSportsCards(category, "");
    });
  }

  // Category Filter Chips
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const category = chip.dataset.category;
      const searchVal = searchInput ? searchInput.value : "";
      renderSportsCards(category, searchVal);
    });
  });

  // Schedule Sport Filter
  const scheduleSelect = document.getElementById("schedule-sport-filter");
  if (scheduleSelect) {
    scheduleSelect.addEventListener("change", (e) => {
      renderFixtures(e.target.value);
    });
  }

  // Modal Close Buttons
  document.getElementById("btn-close-share-modal")?.addEventListener("click", () => document.getElementById("modal-share").classList.remove("open"));

  // Share Page Button
  document.getElementById("btn-share-page")?.addEventListener("click", () => {
    document.getElementById("modal-share").classList.add("open");
  });

  document.getElementById("btn-copy-url")?.addEventListener("click", () => {
    const copyText = document.getElementById("share-url-input");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    showToast("Tournament link copied to clipboard!", "success");
  });
});
