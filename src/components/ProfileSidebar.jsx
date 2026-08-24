import React from 'react';

export default function ProfileSidebar({ activeTab, setActiveTab, onOpenShareModal }) {
  return (
    <aside class="profile-sidebar">
      <div class="profile-card">
        {/* Avatar Header */}
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar">
            <div class="avatar-ring"></div>
            <div class="avatar-inner">
              <i class="fa-solid fa-trophy avatar-icon"></i>
            </div>
            <span class="status-indicator" title="Registrations Active"></span>
          </div>
        </div>

        {/* Tournament Info */}
        <div class="profile-info">
          <h1 class="profile-title">
            Welcome Tournament 2026{' '}
          </h1>
          <h2 class="profile-subtitle">South Asian University</h2>
          <p class="profile-desc">
            Organized by <strong>SAU Sports Board</strong>. Bringing together athletes across 8 South Asian nations!
          </p>

          {/* Quick Stats Grid */}
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">6</span>
              <span class="stat-label">Sports</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">480+</span>
              <span class="stat-label">Athletes</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">8</span>
              <span class="stat-label">Nations</span>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav class="sidebar-nav">
            <button
              class={`nav-btn ${activeTab === 'sports' ? 'active' : ''}`}
              onClick={() => setActiveTab('sports')}
            >
              <i class="fa-solid fa-list-check"></i> Sports Competitions
            </button>
            <button
              class={`nav-btn ${activeTab === 'fixtures' ? 'active' : ''}`}
              onClick={() => setActiveTab('fixtures')}
            >
              <i class="fa-solid fa-calendar-days"></i> Match Schedule & Fixtures
            </button>
            <button
              class={`nav-btn ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveTab('rules')}
            >
              <i class="fa-solid fa-book-bookmark"></i> Rules & Guidelines
            </button>
          </nav>

          {/* Official Social Links */}
          <div class="social-links-container">
            <span class="social-heading">Connect & Official Channels</span>
            <div class="social-grid">
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" class="social-btn whatsapp" title="Join WhatsApp Athletes Group">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-btn instagram" title="Follow Instagram Updates">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="mailto:sports@sau.int" class="social-btn email" title="Email Sports Officer">
                <i class="fa-solid fa-envelope"></i>
              </a>
              <button class="social-btn share" onClick={onOpenShareModal} title="Share Tournament Link">
                <i class="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>

          {/* University Tag */}
          <div class="university-tag">
            <i class="fa-solid fa-location-dot"></i> South Asian University, New Delhi
          </div>
        </div>

        {/* Footer */}
        <div class="sidebar-footer">
          <span>South Asian University &copy; 2026</span>
        </div>
      </div>
    </aside>
  );
}
