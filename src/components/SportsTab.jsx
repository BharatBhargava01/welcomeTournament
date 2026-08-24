import React, { useState, useEffect } from 'react';
import SportCard from './SportCard';

// Static sports fallback if Express server is offline
const FALLBACK_SPORTS = [
  {
    id: "badminton",
    name: "Badminton Blast",
    category: "racquet",
    tagline: "Court is in session, time to shuttle up.",
    mode: "Individual & Doubles",
    isTeam: false,
    icon: "fa-solid fa-shuttlecock",
    bannerBg: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    venue: "Indoor Badminton Court, Arts & Design Building",
    date: "Sep 5-12, 2026",
    format: "Knockout (15 Pts x 3 Sets)",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfz3YzqSolZEbrCJHWYjY5DfxgCMv-pOYHJ7kIH-kRDn5gMZQ/viewform?usp=sf_link",
    rules: [
      "Standard BWF rules apply for singles and doubles matches.",
      "Players must bring their own non-marking court shoes.",
      "Feather shuttles (Yonex AS-20) will be provided by the committee.",
      "Matches will be best of 3 sets of 15 points."
    ]
  },
  {
    id: "basketball",
    name: "Basketball Bash",
    category: "team",
    tagline: "Dribble to Destiny.",
    mode: "5v5 Team",
    isTeam: true,
    icon: "fa-solid fa-basketball",
    bannerBg: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
    venue: "Basketball Court",
    date: "Sep 5-12, 2026",
    format: "Group + Knockout",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfVgHYVUmMTM66snrF78Emm06uYphzdflcUlu-9vMoB81lNLw/viewform?usp=sf_link",
    rules: [
      "Team roster: 5 starting players + 3 substitutes max.",
      "Standard FIBA rules with 10-minute quarters.",
      "Substitutions allowed during ball dead situations.",
      "Inter-department mixed squads permitted."
    ]
  },
  {
    id: "cricket",
    name: "Cricket Craze",
    category: "team",
    tagline: "Boundaries await, will you be the hero?",
    mode: "T10",
    isTeam: true,
    icon: "fa-solid fa-baseball-bat-ball",
    bannerBg: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80",
    venue: "SAU Sports Ground",
    date: "Sep 5-12, 2026",
    format: "T10 Knockout Tournament",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeJRTy8ElcAQovm3qWdL7wKTSySE1m5MbHGvErdVNKkZdpdKA/viewform?usp=sf_link",
    rules: [
      "Each match consists of 10 overs per side.",
      "Maximum 2 overs per bowler.",
      "Tennis ball (Vicky hard tennis ball) will be used.",
      "Team roster limit: 11 players + 3 subs."
    ]
  },
  {
    id: "football",
    name: "Football Frenzy",
    category: "team",
    tagline: "Fuel your fire, It's Football Time!",
    mode: "7-a-side Tournament",
    isTeam: true,
    icon: "fa-solid fa-futbol",
    bannerBg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    venue: "SAU Sports Ground",
    date: "Sep 5-12, 2026",
    format: "Group Stage + Finals",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScThDAFV9tr2qzOyD0CKygawcodTBVzlyH6oIo7lEELQA69Sg/viewform?usp=sf_link",
    rules: [
      "7 players on pitch + up to 5 substitutes.",
      "20 minutes half (40 minutes total match time).",
      "No offside rule in 7v7 format.",
      "Shin guards mandatory for all outfield players."
    ]
  },
  {
    id: "tabletennis",
    name: "Table Tussle",
    category: "racquet",
    tagline: "Turn the tables with the blade in your grasp.",
    mode: "Singles & Doubles",
    isTeam: false,
    icon: "fa-solid fa-table-tennis-paddle-ball",
    bannerBg: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=600&q=80",
    venue: "LS Building, Lower Ground Floor",
    date: "Sep 5-12, 2026",
    format: "Best of 5 Sets (11 Pts)",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfhu3E6mlBA5q2VpReleLaJHxYRylwvpwmOprDC6TFzxkdBBQ/viewform?usp=sf_link",
    rules: [
      "ITTF rules enforced.",
      "Matches are best of 5 games to 11 points.",
      "3-star 40+ plastic balls provided.",
      "Players may bring custom paddles."
    ]
  },
  {
    id: "volleyball",
    name: "Volleyball Valour",
    category: "team",
    tagline: "Spike it High, aim for the sky.",
    mode: "6v6 Team Division",
    isTeam: true,
    icon: "fa-solid fa-volleyball",
    bannerBg: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80",
    venue: "Volleyball Court",
    date: "Sep 5-12, 2026",
    format: "Best of 3 Sets (25 Pts)",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScHbkuJH85EMKFqaG-Np_TwqU7mSN9bjHY5LJNAMyhktBoqrw/viewform?usp=sf_link",
    rules: [
      "Standard 6v6 rotational play.",
      "Rally scoring to 25 points (2-point lead required).",
      "Net height: 2.43m (Men), 2.24m (Women).",
      "Libero player uniform distinction required."
    ]
  }
];

export default function SportsTab() {
  const [sports, setSports] = useState(FALLBACK_SPORTS);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/sports')
      .then((res) => {
        if (!res.ok) throw new Error('API server offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSports(data);
        }
      })
      .catch(() => {
        // Fallback data is already loaded
      });
  }, []);

  const filteredSports = sports.filter((sport) => {
    const matchesCat = category === 'all' || sport.category === category;
    const matchesSearch =
      sport.name.toLowerCase().includes(search.toLowerCase()) ||
      sport.tagline.toLowerCase().includes(search.toLowerCase()) ||
      sport.mode.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div class="tab-pane">
      <div class="filter-header">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sports, e.g. Cricket, Badminton, Football..."
          />
          {search && (
            <button class="clear-search-btn" onClick={() => setSearch('')}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <div class="category-pills">
          <button
            class={`chip ${category === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Sports
          </button>
          <button
            class={`chip ${category === 'racquet' ? 'active' : ''}`}
            onClick={() => setCategory('racquet')}
          >
            <i class="fa-solid fa-table-tennis-paddle-ball"></i> Racquet
          </button>
          <button
            class={`chip ${category === 'team' ? 'active' : ''}`}
            onClick={() => setCategory('team')}
          >
            <i class="fa-solid fa-people-group"></i> Team Sports
          </button>
        </div>
      </div>

      <div class="sports-cards-wrapper">
        {loading ? (
          <div class="text-center p-5">
            <i class="fa-solid fa-spinner fa-spin text-2xl text-primary mb-2"></i>
            <p class="text-muted">Loading sports competitions...</p>
          </div>
        ) : filteredSports.length === 0 ? (
          <div class="text-center p-5 background-card border-radius-lg">
            <i class="fa-solid fa-person-running text-dim text-4xl mb-3"></i>
            <h3>No sports match your search</h3>
            <p class="text-muted">Try clearing your search query or selecting a different category filter.</p>
          </div>
        ) : (
          filteredSports.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))
        )}
      </div>
    </div>
  );
}
