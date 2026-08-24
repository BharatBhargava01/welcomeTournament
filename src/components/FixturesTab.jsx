import React, { useState, useEffect } from 'react';

const FALLBACK_FIXTURES = [
  { sport: "Cricket Craze", sportId: "cricket", stage: "Quarter Final 1", time: "Sep 05, 09:30 AM", venue: "SAU Sports Ground", teamA: "CS Strikers 🇦фом🇮🇳", teamB: "Law Lions 🇵🇰🇧🇩", flagA: "🏏", flagB: "🦁" },
  { sport: "Football Frenzy", sportId: "football", stage: "Group Stage A", time: "Sep 06, 04:00 PM", venue: "Turf Field", teamA: "IR Diplomat FC 🇳 Nepal🇱🇰", teamB: "Biotech United 🇧 Bhutan🇲 Maldives", flagA: "⚽", flagB: "🧬" },
  { sport: "Badminton Blast", sportId: "badminton", stage: "Men's Singles Semi-Final", time: "Sep 07, 10:00 AM", venue: "Indoor Badminton Court", teamA: "Rohan V. (Econ)", teamB: "Kavish M. (CS)", flagA: "🏸", flagB: "🏸" },
  { sport: "Basketball Bash", sportId: "basketball", stage: "5v5 Semi-Final", time: "Sep 08, 05:00 PM", venue: "Basketball Court", teamA: "Law Queens 🇦 Afghanistan", teamB: "Math Matrix 🇳 Nepal", flagA: "🏀", flagB: "🏀" },
  { sport: "Table Tussle", sportId: "tabletennis", stage: "Singles Final", time: "Sep 09, 02:00 PM", venue: "LS Building, Lower Ground Floor", teamA: "Ananya S. (Biotech)", teamB: "David K. (CS)", flagA: "🏓", flagB: "🏓" },
  { sport: "Volleyball Valour", sportId: "volleyball", stage: "Men's Semi-Final", time: "Sep 10, 11:00 AM", venue: "Volleyball Court", teamA: "SAU Hawks", teamB: "Delta Spikers", flagA: "🏐", flagB: "🏐" }
];

export default function FixturesTab() {
  const [fixtures, setFixtures] = useState(FALLBACK_FIXTURES);
  const [selectedSport, setSelectedSport] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/fixtures')
      .then((res) => {
        if (!res.ok) throw new Error('API server offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFixtures(data);
        }
      })
      .catch(() => {
        // Fallback data loaded
      });
  }, []);

  const filteredFixtures = fixtures.filter(
    (f) => selectedSport === 'all' || f.sportId === selectedSport
  );

  return (
    <div class="tab-pane">
      <div class="pane-header">
        <h2>
          <i class="fa-solid fa-calendar-days text-cyan"></i> Official Tournament Schedule
        </h2>
        <p>Fixtures, Timings, & Venue Allocations for Welcome Tournament '26</p>
      </div>

      <div class="schedule-filter-bar">
        <select
          class="select-input"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          <option value="all">Filter by Sport: All Competitions</option>
          <option value="badminton">Badminton Blast</option>
          <option value="basketball">Basketball Bash</option>
          <option value="cricket">Cricket Craze</option>
          <option value="football">Football Frenzy</option>
          <option value="tabletennis">Table Tussle</option>
          <option value="volleyball">Volleyball Valour</option>
        </select>
        <span class="badge-venue">
          <i class="fa-solid fa-map-pin"></i> SAU Main Campus Grounds
        </span>
      </div>

      <div class="fixtures-grid">
        {loading ? (
          <div class="text-center p-4">Loading fixtures schedule...</div>
        ) : filteredFixtures.length === 0 ? (
          <div class="text-center p-4">No fixtures scheduled for this selection.</div>
        ) : (
          filteredFixtures.map((fix, idx) => (
            <div class="fixture-card" key={idx}>
              <div class="fixture-header">
                <span class="fixture-sport">{fix.sport}</span>
                <span class="fixture-stage">{fix.stage}</span>
              </div>
              <div class="match-teams">
                <div class="team-box">
                  <span class="team-flag">{fix.flagA}</span>
                  <span class="team-name">{fix.teamA}</span>
                </div>
                <span class="vs-badge">VS</span>
                <div class="team-box">
                  <span class="team-flag">{fix.flagB}</span>
                  <span class="team-name">{fix.teamB}</span>
                </div>
              </div>
              <div class="fixture-footer">
                <span>
                  <i class="fa-regular fa-clock"></i> {fix.time}
                </span>
                <span>
                  <i class="fa-solid fa-location-dot"></i> {fix.venue}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
