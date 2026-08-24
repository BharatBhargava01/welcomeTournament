import React, { useState } from 'react';

export default function SportCard({ sport }) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div class="sport-card" id={`card-${sport.id}`}>
      <div class="sport-banner-visual">
        <div class="sport-banner-bg" style={{ backgroundImage: `url('${sport.bannerBg}')` }}></div>
        <div class="sport-overlay"></div>
        <span class="sport-category-tag">{sport.category}</span>
        <i class={`${sport.icon} sport-visual-icon`}></i>
      </div>

      <div class="sport-content">
        <div class="sport-title-row">
          <h3 class="sport-name">{sport.name}</h3>
          <span class={`mode-badge ${sport.isTeam ? 'team' : 'individual'}`}>
            {sport.mode}
          </span>
        </div>
        <p class="sport-tagline">"{sport.tagline}"</p>

        <div class="sport-meta-pills">
          <span class="meta-pill"><i class="fa-solid fa-calendar"></i> {sport.date}</span>
          <span class="meta-pill"><i class="fa-solid fa-location-dot"></i> {sport.venue}</span>
        </div>
      </div>

      <div class="sport-action-col">
        {/* Direct Link to Google Form for the Sport (Zaap.bio style) */}
        <a
          href={sport.googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-register-sport"
        >
          Register <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button
          class="btn-details-toggle"
          onClick={() => setShowRules(!showRules)}
        >
          Rules & Details <i class={`fa-solid fa-chevron-${showRules ? 'up' : 'down'} ml-1`}></i>
        </button>
      </div>

      {showRules && (
        <div class="sport-expand-details">
          <div class="p-2">
            <h5 class="text-gold mb-2">
              <i class="fa-solid fa-circle-info"></i> Tournament Guidelines & Format
            </h5>
            <p class="mb-2">
              <strong>Format:</strong> {sport.format}
            </p>
            <ul class="pl-4">
              {sport.rules.map((rule, idx) => (
                <li key={idx} class="mb-1">{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
