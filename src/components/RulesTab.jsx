import React, { useState, useEffect } from 'react';

export default function RulesTab() {
  const [rules, setRules] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('/api/rules')
      .then((res) => res.json())
      .then((data) => setRules(data))
      .catch((err) => console.error('Error fetching rules:', err));
  }, []);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div class="tab-pane">
      <div class="pane-header">
        <h2>
          <i class="fa-solid fa-book-bookmark text-gold"></i> Tournament Rules & Code of Conduct
        </h2>
        <p>Essential guidelines for all participating student athletes</p>
      </div>

      <div class="rules-accordion-container">
        {rules.map((r, idx) => (
          <div key={idx} class="accordion-item">
            <div class="accordion-header" onClick={() => toggleAccordion(idx)}>
              <span>{r.title}</span>
              <i
                class={`fa-solid fa-chevron-${openIndex === idx ? 'up' : 'down'}`}
              ></i>
            </div>
            {openIndex === idx && (
              <div class="accordion-body">
                <p>{r.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
