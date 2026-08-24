import React, { useState, useEffect } from 'react';
import SportCard from './SportCard';

export default function SportsTab() {
  const [sports, setSports] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sports')
      .then((res) => res.json())
      .then((data) => {
        setSports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching sports:', err);
        setLoading(false);
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
