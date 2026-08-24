import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import ProfileSidebar from './components/ProfileSidebar';
import SportsTab from './components/SportsTab';
import FixturesTab from './components/FixturesTab';
import RulesTab from './components/RulesTab';
import ShareModal from './components/ShareModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('sports');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div class="app-root">
      {/* Top Announcement Header */}
      <AnnouncementBar />

      {/* Main Zaap.bio style Split Layout */}
      <main class="main-layout">
        {/* Left Sidebar Profile Card */}
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />

        {/* Right Main Content Panel */}
        <section class="content-area">
          {activeTab === 'sports' && <SportsTab />}
          {activeTab === 'fixtures' && <FixturesTab />}
          {activeTab === 'rules' && <RulesTab />}
        </section>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
