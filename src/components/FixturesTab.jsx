import React, { useState, useEffect } from 'react';

export default function FixturesTab() {
  const [fixtures, setFixtures] = useState([]);
  const [filterSport, setFilterSport] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fixtures')
      .then((res) => res.json())
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching fixtures:', err);
        setLoading(false);
      });
  }, []);

  const filtered = fixtures.filter(
    (f) => filterSport === 'all' || f.sportId === filterSport
  );

  return (
    <div class="tab-pane">
      <div class="pane-header">
        <h2>
          <i class="fa-solid fa-calendar-days text-gold"></i> Tournament Schedule & Match Fixtures
        </h2>
        <p>Live timings and ground allocations for SAU Welcome Tournament 2026</p>
      </div>

      <div class="schedule-filter-bar">
        <select
          value={filterSport}
          onChange={(e) => setFilterSport(e.target.value)}
          class="select-input"
        >
          <option value="all">All Sports Fixtures</option>
          <option value="cricket">Cricket Craze (T10)</option>
          <option value="football">Football Frenzy (7v7)</option>
          <option value="badminton">Badminton Blast</option>
          <option value="basketball">Basketball Bash</option>
          <option value="tabletennis">Table Tussle</option>
          <option value="volleyball">Volleyball Valour</option>
        </select>
        <div class="badge-venue">
          <i class="fa-solid fa-location-dot"></i> SAU Main Sports Complex
        </div>
      </div>

      {loading ? (
        <div class="text-center p-4">
          <i class="fa-solid fa-spinner fa-spin text-2xl text-primary mb-2"></i>
          <p class="text-muted">Loading fixtures...</p>
        </div>
      ) : (
        <div class="fixtures-grid">
          {filtered.map((f, idx) => (
            <div key={idx} class="fixture-card">
              <div class="fixture-header">
                <span class="fixture-sport">
                  <i class="fa-solid fa-trophy text-gold"></i> {f.sport}
                </span>
                <span class="fixture-stage">{f.stage}</span>
              </div>

              <div class="match-teams">
                <div class="team-box">
                  <span class="team-flag">{f.flagA}</span>
                  <span class="team-name">{f.teamA}</span>
                </div>
                <span class="vs-badge">VS</span>
                <div class="team-box">
                  <span class="team-flag">{f.flagB}</span>
                  <span class="team-name">{f.teamB}</span>
                </div>
              </div>

              <div class="fixture-footer">
                <span>
                  <i class="fa-regular fa-clock"></i> {f.time}
                </span>
                <span>
                  <i class="fa-solid fa-map-pin"></i> {f.venue}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
