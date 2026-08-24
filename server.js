import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- SPORTS DATASTORE (Direct Google Form Registration Links) ---
const SPORTS_DATA = [
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

const FIXTURES_DATA = [
  { sport: "Cricket Craze", sportId: "cricket", stage: "Quarter Final 1", time: "Aug 29, 09:30 AM", venue: "Ground 1", teamA: "CS Strikers 🇦фом🇮🇳", teamB: "Law Lions 🇵🇰🇧🇩", flagA: "🏏", flagB: "🦁" },
  { sport: "Football Frenzy", sportId: "football", stage: "Group Stage A", time: "Aug 29, 04:00 PM", venue: "Turf Field", teamA: "IR Diplomat FC 🇳🇵🇱🇰", teamB: "Biotech United 🇧🇹🇲🇻", flagA: "⚽", flagB: "🧬" },
  { sport: "Badminton Blast", sportId: "badminton", stage: "Men's Singles Semi-Final", time: "Aug 30, 10:00 AM", venue: "Indoor Court 1", teamA: "Rohan V. (Econ)", teamB: "Kavish M. (CS)", flagA: "🏸", flagB: "🏸" },
  { sport: "Basketball Bash", sportId: "basketball", stage: "Women's 3v3 Final", time: "Aug 30, 05:00 PM", venue: "Outdoor Court", teamA: "Law Queens 🇦🇫", teamB: "Math Matrix 🇳🇵", flagA: "🏀", flagB: "🏀" },
  { sport: "Table Tussle", sportId: "tabletennis", stage: "Singles Final", time: "Aug 29, 02:00 PM", venue: "Indoor Arena", teamA: "Ananya S. (Biotech)", teamB: "David K. (CS)", flagA: "🏓", flagB: "🏓" },
  { sport: "Volleyball Valour", sportId: "volleyball", stage: "Men's Semi-Final", time: "Sep 01, 11:00 AM", venue: "Court A", teamA: "SAU Hawks", teamB: "Delta Spikers", flagA: "🏐", flagB: "🏐" }
];

const RULES_DATA = [
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

// --- API ENDPOINTS ---
app.get('/api/sports', (req, res) => {
  res.json(SPORTS_DATA);
});

app.get('/api/fixtures', (req, res) => {
  const { sport } = req.query;
  if (sport && sport !== 'all') {
    return res.json(FIXTURES_DATA.filter(f => f.sportId === sport));
  }
  res.json(FIXTURES_DATA);
});

app.get('/api/standings', (req, res) => {
  res.json(STANDINGS_DATA);
});

app.get('/api/rules', (req, res) => {
  res.json(RULES_DATA);
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", app: "Khelo SAU 2026 API Server", timestamp: new Date().toISOString() });
});

// Serve static React build files in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: "Endpoint not found" });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.send("Khelo SAU '26 Express API Server is running!");
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use by server process. Reusing active connection.`);
  } else {
    console.error(err);
  }
});
