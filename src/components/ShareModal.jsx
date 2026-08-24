import React, { useState } from 'react';

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://sau.int/khelo-sau-2026";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="modal-overlay open">
      <div class="modal-card share-card">
        <button class="modal-close" onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="text-center p-3">
          <div class="modal-badge-icon mx-auto mb-2">
            <i class="fa-solid fa-share-nodes"></i>
          </div>
          <h3>Share Khelo SAU '26</h3>
          <p class="text-muted">Invite fellow students & teammates to register</p>

          <div class="qr-share-box my-3">
            <svg viewBox="0 0 100 100" width="150" height="150">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M10,40 h20 v10 h-20 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M40,70 h10 v20 h-10 z M60,70 h30 v10 h-30 z M80,80 h20 v20 h-20 z" fill="#0056b3"/>
            </svg>
            <span class="qr-caption">Scan to open on Mobile</span>
          </div>

          <div class="copy-url-box">
            <input type="text" class="form-input readonly" readOnly value={shareUrl} />
            <button class="btn-copy" onClick={handleCopy}>
              <i class={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
