import React, { useState, useEffect } from 'react';

const FALLBACK_RULES = [
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

export default function RulesTab() {
  const [rules, setRules] = useState(FALLBACK_RULES);
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  useEffect(() => {
    fetch('/api/rules')
      .then((res) => {
        if (!res.ok) throw new Error('API server offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRules(data);
        }
      })
      .catch((err) => console.log('Using local rules fallback'));
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
