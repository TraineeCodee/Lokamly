const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Path to compiled frontend assets
const distPath = path.join(__dirname, '../frontend/dist');
const hasDist = fs.existsSync(distPath);

if (hasDist) {
  // Serve static assets from frontend build
  app.use(express.static(distPath));
}

/**
 * Curated Quiz Database for Country Trivia Challenge.
 * Contains 40 diverse questions across all continents to prevent repetition.
 */
const QUIZ_QUESTIONS = [
  {
    id: "quiz-1",
    question: "Which Middle Eastern country is home to the ancient rock-cut archaeological city of Petra, one of the New Seven Wonders of the World?",
    targetCountryName: "Jordan",
    targetCountryCode: "JO",
    iso3: "JOR",
    flagUrl: "https://flagcdn.com/w160/jo.png",
    funFact: "Petra's iconic Treasury ('Al-Khazneh') was carved directly into pink sandstone cliffs over 2,000 years ago by the Nabataeans."
  },
  {
    id: "quiz-2",
    question: "Which island nation is famous for Mount Fuji, the Shinkansen bullet train, and the imperial city of Kyoto?",
    targetCountryName: "Japan",
    targetCountryCode: "JP",
    iso3: "JPN",
    flagUrl: "https://flagcdn.com/w160/jp.png",
    funFact: "Japan consists of an archipelago of over 14,000 islands, with Honshu being the largest and most populous."
  },
  {
    id: "quiz-3",
    question: "Which country contains the largest portion of the Amazon Rainforest and celebrates Carnival with samba parades in Rio de Janeiro?",
    targetCountryName: "Brazil",
    targetCountryCode: "BR",
    iso3: "BRA",
    flagUrl: "https://flagcdn.com/w160/br.png",
    funFact: "Brazil is the fifth largest country in the world by area and borders every South American nation except Ecuador and Chile."
  },
  {
    id: "quiz-4",
    question: "Which North African nation is home to the monumental Great Sphinx and the ancient Pyramids of Giza along the Nile River?",
    targetCountryName: "Egypt",
    targetCountryCode: "EG",
    iso3: "EGY",
    flagUrl: "https://flagcdn.com/w160/eg.png",
    funFact: "The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years."
  },
  {
    id: "quiz-5",
    question: "Which country-continent is renowned for the Great Barrier Reef, the Sydney Opera House, and unique wildlife like kangaroos and koalas?",
    targetCountryName: "Australia",
    targetCountryCode: "AU",
    iso3: "AUS",
    flagUrl: "https://flagcdn.com/w160/au.png",
    funFact: "Australia's Great Barrier Reef is the largest living structure on the planet and is visible from outer space."
  },
  {
    id: "quiz-6",
    question: "Which South Asian country is the birthplace of chess, home to the ivory-white Taj Mahal, and bordered by the Himalayas in the north?",
    targetCountryName: "India",
    targetCountryCode: "IN",
    iso3: "IND",
    flagUrl: "https://flagcdn.com/w160/in.png",
    funFact: "India invented the number zero and the decimal numeral system, revolutionizing global mathematics."
  },
  {
    id: "quiz-7",
    question: "Which country possesses the world's longest coastline, contains over half of the planet's natural lakes, and features a maple leaf on its flag?",
    targetCountryName: "Canada",
    targetCountryCode: "CA",
    iso3: "CAN",
    flagUrl: "https://flagcdn.com/w160/ca.png",
    funFact: "Canada's coastline stretches for more than 243,000 kilometers across the Atlantic, Arctic, and Pacific oceans."
  },
  {
    id: "quiz-8",
    question: "Which boot-shaped European nation is home to the ancient Colosseum, Pompeii, the canals of Venice, and the Vatican enclave?",
    targetCountryName: "Italy",
    targetCountryCode: "IT",
    iso3: "ITA",
    flagUrl: "https://flagcdn.com/w160/it.png",
    funFact: "Italy contains 59 UNESCO World Heritage sites, more than any other nation on Earth."
  },
  {
    id: "quiz-9",
    question: "Which large island nation off the southeast coast of Africa is famous for its lemurs, baobab trees, and 90% unique endemic wildlife?",
    targetCountryName: "Madagascar",
    targetCountryCode: "MG",
    iso3: "MDG",
    flagUrl: "https://flagcdn.com/w160/mg.png",
    funFact: "Madagascar isolated from mainland Africa 160 million years ago, creating an ecological treasure trove."
  },
  {
    id: "quiz-10",
    question: "Which South American nation is famous for the 15th-century Inca citadel of Machu Picchu perched high in the Andes mountains?",
    targetCountryName: "Peru",
    targetCountryCode: "PE",
    iso3: "PER",
    flagUrl: "https://flagcdn.com/w160/pe.png",
    funFact: "Peru is home to over 4,000 native varieties of edible potatoes."
  },
  {
    id: "quiz-11",
    question: "Which Nordic island country is known as 'The Land of Fire and Ice' due to its dramatic glaciers, geysers, and active volcanoes?",
    targetCountryName: "Iceland",
    targetCountryCode: "IS",
    iso3: "ISL",
    flagUrl: "https://flagcdn.com/w160/is.png",
    funFact: "Nearly 100% of Iceland's electricity and heating is generated from renewable geothermal and hydroelectric energy."
  },
  {
    id: "quiz-12",
    question: "Which nation at the southern tip of the African continent has three distinct official capitals: Pretoria, Cape Town, and Bloemfontein?",
    targetCountryName: "South Africa",
    targetCountryCode: "ZA",
    iso3: "ZAF",
    flagUrl: "https://flagcdn.com/w160/za.png",
    funFact: "South Africa recognizes 12 official languages and is celebrated as the 'Rainbow Nation'."
  },
  {
    id: "quiz-13",
    question: "Which Mediterranean country is considered the cradle of Western civilization, democracy, and the birthplace of the Olympic Games?",
    targetCountryName: "Greece",
    targetCountryCode: "GR",
    iso3: "GRC",
    flagUrl: "https://flagcdn.com/w160/gr.png",
    funFact: "The first recorded Olympic Games took place in Olympia, Greece, in 776 BC."
  },
  {
    id: "quiz-14",
    question: "Which North American country was home to the ancient Maya and Aztec civilizations, and features the majestic pyramid of Chichen Itza?",
    targetCountryName: "Mexico",
    targetCountryCode: "MX",
    iso3: "MEX",
    flagUrl: "https://flagcdn.com/w160/mx.png",
    funFact: "Mexico introduced chocolate, corn, and chili peppers to the world through indigenous traditions."
  },
  {
    id: "quiz-15",
    question: "Which Scandinavian country is world-famous for its deep majestic fjords, northern lights, and historic Viking heritage?",
    targetCountryName: "Norway",
    targetCountryCode: "NO",
    iso3: "NOR",
    flagUrl: "https://flagcdn.com/w160/no.png",
    funFact: "Norway is home to the Sognefjord, reaching depths of over 1,300 meters."
  },
  {
    id: "quiz-16",
    question: "Which South American nation is famous for the tango dance, the vast Pampas plains, and Mount Aconcagua, the highest peak outside Asia?",
    targetCountryName: "Argentina",
    targetCountryCode: "AR",
    iso3: "ARG",
    flagUrl: "https://flagcdn.com/w160/ar.png",
    funFact: "Argentina is the birthplace of the tango dance, which originated in Buenos Aires in the late 19th century."
  },
  {
    id: "quiz-17",
    question: "Which East African nation is world-renowned for the Great Wildebeest Migration in the Maasai Mara, Mount Kenya, and world champion marathoners?",
    targetCountryName: "Kenya",
    targetCountryCode: "KE",
    iso3: "KEN",
    flagUrl: "https://flagcdn.com/w160/ke.png",
    funFact: "Kenya's Great Rift Valley is often called the 'Cradle of Humankind' due to some of the earliest hominid fossil discoveries."
  },
  {
    id: "quiz-18",
    question: "Which mountainous European nation is famous for the Matterhorn peak, the Alps, precision watchmaking, and four official languages?",
    targetCountryName: "Switzerland",
    targetCountryCode: "CH",
    iso3: "CHE",
    flagUrl: "https://flagcdn.com/w160/ch.png",
    funFact: "Switzerland has had an armed policy of military neutrality since 1815 and has not fought in an international war since."
  },
  {
    id: "quiz-19",
    question: "Which island nation in the southwestern Pacific is known in the Māori language as Aotearoa ('Land of the Long White Cloud') and for the flightless kiwi bird?",
    targetCountryName: "New Zealand",
    targetCountryCode: "NZ",
    iso3: "NZL",
    flagUrl: "https://flagcdn.com/w160/nz.png",
    funFact: "New Zealand was the first self-governing country in the world to grant women the right to vote in 1893."
  },
  {
    id: "quiz-20",
    question: "Which Southeast Asian kingdom, historically known as Siam, is celebrated for ornate Buddhist temples, floating markets, and Pad Thai?",
    targetCountryName: "Thailand",
    targetCountryCode: "TH",
    iso3: "THA",
    flagUrl: "https://flagcdn.com/w160/th.png",
    funFact: "Thailand is the only country in Southeast Asia that was never colonized by a European power."
  },
  {
    id: "quiz-21",
    question: "Which North African kingdom is famous for the blue-washed mountain city of Chefchaouen, the bustling souks of Marrakech, and Sahara desert dunes?",
    targetCountryName: "Morocco",
    targetCountryCode: "MA",
    iso3: "MAR",
    flagUrl: "https://flagcdn.com/w160/ma.png",
    funFact: "The University of al-Qarawiyyin in Fez, Morocco, founded in 859 AD, is recognized by UNESCO as the oldest continuously operating university in the world."
  },
  {
    id: "quiz-22",
    question: "Which East Asian nation on the southern half of the Korean Peninsula is the home of K-pop, Taekwondo, Samsung, and historic palaces in Seoul?",
    targetCountryName: "South Korea",
    targetCountryCode: "KR",
    iso3: "KOR",
    flagUrl: "https://flagcdn.com/w160/kr.png",
    funFact: "South Korea has one of the world's fastest average internet connection speeds and the highest rate of smartphone ownership."
  },
  {
    id: "quiz-23",
    question: "Which transcontinental nation bridges Europe and Asia across the Bosphorus Strait and was the historic capital of both the Byzantine and Ottoman empires?",
    targetCountryName: "Turkey",
    targetCountryCode: "TR",
    iso3: "TUR",
    flagUrl: "https://flagcdn.com/w160/tr.png",
    funFact: "Istanbul, Turkey, is the only major city in the world that spans across two different continents (Europe and Asia)."
  },
  {
    id: "quiz-24",
    question: "Which Iberian nation is home to Antoni Gaudí's Sagrada Família in Barcelona, flamenco dance, and the royal Prado Museum in Madrid?",
    targetCountryName: "Spain",
    targetCountryCode: "ES",
    iso3: "ESP",
    flagUrl: "https://flagcdn.com/w160/es.png",
    funFact: "Spain produces approximately 44% of the entire world's olive oil supply, more than double Italy's production."
  },
  {
    id: "quiz-25",
    question: "Which landlocked Himalayan nation is home to Mount Everest (the highest peak on Earth) and the birthplace of Siddhartha Gautama (the Buddha)?",
    targetCountryName: "Nepal",
    targetCountryCode: "NP",
    iso3: "NPL",
    flagUrl: "https://flagcdn.com/w160/np.png",
    funFact: "Nepal has the only national flag in the world that is not quadrilateral (it consists of two stacked pennants)."
  },
  {
    id: "quiz-26",
    question: "Which exceptionally long, narrow nation stretches over 4,300 kilometers along South America's western coastline between the Andes and the Pacific?",
    targetCountryName: "Chile",
    targetCountryCode: "CL",
    iso3: "CHL",
    flagUrl: "https://flagcdn.com/w160/cl.png",
    funFact: "Chile's Atacama Desert is the driest non-polar desert on Earth, with some weather stations having never recorded any rainfall."
  },
  {
    id: "quiz-27",
    question: "Which Southeast Asian nation is famous for the emerald waters and thousands of towering limestone karst islands in Ha Long Bay?",
    targetCountryName: "Vietnam",
    targetCountryCode: "VN",
    iso3: "VNM",
    flagUrl: "https://flagcdn.com/w160/vn.png",
    funFact: "Vietnam is the world's second-largest exporter of coffee, especially famous for its rich Robusta beans."
  },
  {
    id: "quiz-28",
    question: "Which Atlantic nation on the Iberian Peninsula is renowned for its historic Age of Discovery navigators, Port wine, and colorful tile azulejos?",
    targetCountryName: "Portugal",
    targetCountryCode: "PT",
    iso3: "PRT",
    flagUrl: "https://flagcdn.com/w160/pt.png",
    funFact: "Portugal's Anglo-Portuguese Treaty of 1373 is the oldest continuous diplomatic alliance still in effect in world history."
  },
  {
    id: "quiz-29",
    question: "Which European island nation is nicknamed 'The Emerald Isle' for its lush green rolling countryside, ancient castles, and the dramatic Cliffs of Moher?",
    targetCountryName: "Ireland",
    targetCountryCode: "IE",
    iso3: "IRL",
    flagUrl: "https://flagcdn.com/w160/ie.png",
    funFact: "Halloween traces its ancient origins directly back to the Celtic festival of Samhain celebrated in Ireland over 2,000 years ago."
  },
  {
    id: "quiz-30",
    question: "Which landlocked East Asian nation of boundless grasslands, nomadic ger dwellings, and the Gobi Desert was once the heart of the Mongol Empire?",
    targetCountryName: "Mongolia",
    targetCountryCode: "MN",
    iso3: "MNG",
    flagUrl: "https://flagcdn.com/w160/mn.png",
    funFact: "Mongolia is the most sparsely populated sovereign country on Earth, with fewer than 2 people per square kilometer."
  },
  {
    id: "quiz-31",
    question: "Which South American nation is famous for producing rich Arabica coffee, the legend of El Dorado, and sharing coastlines with both the Pacific and Caribbean?",
    targetCountryName: "Colombia",
    targetCountryCode: "CO",
    iso3: "COL",
    flagUrl: "https://flagcdn.com/w160/co.png",
    funFact: "Colombia is the only country in South America with coastlines on both the Pacific Ocean and the Caribbean Sea."
  },
  {
    id: "quiz-32",
    question: "Which Scandinavian country is the birthplace of the Nobel Prize, IKEA, ABBA, and Stockholm's 14 interconnected islands?",
    targetCountryName: "Sweden",
    targetCountryCode: "SE",
    iso3: "SWE",
    flagUrl: "https://flagcdn.com/w160/se.png",
    funFact: "Sweden has more islands than any other country in the world, with approximately 267,570 islands."
  },
  {
    id: "quiz-33",
    question: "Which Central European country is home to the historic Wawel Castle in Kraków, astronomer Nicolaus Copernicus, and composer Frédéric Chopin?",
    targetCountryName: "Poland",
    targetCountryCode: "PL",
    iso3: "POL",
    flagUrl: "https://flagcdn.com/w160/pl.png",
    funFact: "Poland's Wieliczka Salt Mine contains an entire underground cathedral carved completely out of rock salt."
  },
  {
    id: "quiz-34",
    question: "Which Alpine nation was the birthplace of Wolfgang Amadeus Mozart, famous for Vienna's imperial palaces and the Sound of Music landscape?",
    targetCountryName: "Austria",
    targetCountryCode: "AT",
    iso3: "AUT",
    flagUrl: "https://flagcdn.com/w160/at.png",
    funFact: "Austria is home to Tiergarten Schönbrunn in Vienna, the oldest continuously operating zoo in the world, founded in 1752."
  },
  {
    id: "quiz-35",
    question: "Which Southeast Asian country is divided into two regions by the South China Sea and features the iconic 88-story Petronas Twin Towers in Kuala Lumpur?",
    targetCountryName: "Malaysia",
    targetCountryCode: "MY",
    iso3: "MYS",
    flagUrl: "https://flagcdn.com/w160/my.png",
    funFact: "The Petronas Towers in Kuala Lumpur, Malaysia, were the tallest buildings in the world from 1998 to 2004."
  },
  {
    id: "quiz-36",
    question: "Which archipelago nation of over 7,000 islands in the western Pacific is famous for the Chocolate Hills of Bohol and the world's smallest primate, the tarsier?",
    targetCountryName: "Philippines",
    targetCountryCode: "PH",
    iso3: "PHL",
    flagUrl: "https://flagcdn.com/w160/ph.png",
    funFact: "The Philippines is named after King Philip II of Spain, who ruled when Spanish explorer Ruy López de Villalobos arrived in 1543."
  },
  {
    id: "quiz-37",
    question: "Which West African powerhouse is the most populous nation in Africa, famous for Nollywood cinema and the fertile Niger River delta?",
    targetCountryName: "Nigeria",
    targetCountryCode: "NG",
    iso3: "NGA",
    flagUrl: "https://flagcdn.com/w160/ng.png",
    funFact: "Nigeria is Africa's most populous country, with over 220 million people and more than 500 distinct indigenous languages spoken."
  },
  {
    id: "quiz-38",
    question: "Which Nordic nation is nicknamed the 'Land of a Thousand Lakes' (actually having over 187,000 lakes) and is recognized as the world's happiest country?",
    targetCountryName: "Finland",
    targetCountryCode: "FI",
    iso3: "FIN",
    flagUrl: "https://flagcdn.com/w160/fi.png",
    funFact: "Finland contains more saunas (over 3 million) than passenger cars, deeply ingrained in national culture."
  },
  {
    id: "quiz-39",
    question: "Which Caribbean island nation is renowned for vintage 1950s classic cars, historic Old Havana, and Buena Vista Social Club music?",
    targetCountryName: "Cuba",
    targetCountryCode: "CU",
    iso3: "CUB",
    flagUrl: "https://flagcdn.com/w160/cu.png",
    funFact: "Cuba is the largest island in the Caribbean and is known for its high concentration of preserved 1950s American classic cars."
  },
  {
    id: "quiz-40",
    question: "Which Western European country is the headquarters of the European Union, world-famous for chocolate pralines, waffles, and Bruges canals?",
    targetCountryName: "Belgium",
    targetCountryCode: "BE",
    iso3: "BEL",
    flagUrl: "https://flagcdn.com/w160/be.png",
    funFact: "Belgium produces over 220,000 tons of high-grade chocolate per year and Brussels Airport is one of the world's biggest selling points of chocolate."
  }
];

// Server-side sliding window to prevent repeats across all clients
let serverRecentHistory = [];

/**
 * GET /api/quiz/random?exclude=quiz-1,quiz-2...
 * Returns a random country quiz question, filtering out already seen questions to guarantee no repeats.
 */
app.get('/api/quiz/random', (req, res) => {
  try {
    const excludeParam = req.query.exclude;
    let excludedIds = [];

    if (excludeParam && typeof excludeParam === 'string') {
      excludedIds = excludeParam.split(',').map((id) => id.trim()).filter(Boolean);
    }

    // Filter by client exclusions first
    let availableQuestions = QUIZ_QUESTIONS.filter((q) => !excludedIds.includes(q.id));

    // If all questions have been shown in this client's cycle, reset client exclusions
    if (availableQuestions.length === 0) {
      const lastId = excludedIds[excludedIds.length - 1];
      availableQuestions = QUIZ_QUESTIONS.filter((q) => q.id !== lastId);
      if (availableQuestions.length === 0) {
        availableQuestions = QUIZ_QUESTIONS;
      }
    }

    // Secondary filter: Avoid the server-wide last 10 served questions if possible
    let refinedPool = availableQuestions.filter((q) => !serverRecentHistory.slice(-10).includes(q.id));
    if (refinedPool.length === 0) {
      refinedPool = availableQuestions;
    }

    const randomIndex = Math.floor(Math.random() * refinedPool.length);
    const selected = refinedPool[randomIndex];

    // Push to server-side recent history
    serverRecentHistory.push(selected.id);
    if (serverRecentHistory.length > 25) {
      serverRecentHistory.shift();
    }

    res.json({
      id: selected.id,
      question: selected.question,
      targetCountryName: selected.targetCountryName,
      targetCountryCode: selected.targetCountryCode,
      iso3: selected.iso3,
      flagUrl: selected.flagUrl,
      funFact: selected.funFact,
      totalAvailable: QUIZ_QUESTIONS.length,
      remainingInCycle: availableQuestions.length
    });
  } catch (err) {
    console.error("Error retrieving quiz question:", err);
    res.status(500).json({ error: "Failed to fetch quiz question." });
  }
});

/**
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    totalQuizQuestions: QUIZ_QUESTIONS.length
  });
});

/**
 * GET /api
 * Root API directory & status info
 */
app.get('/api', (req, res) => {
  res.json({
    name: "Lokamly Country Quiz Backend API",
    status: "online",
    version: "1.0.0",
    totalQuestions: QUIZ_QUESTIONS.length,
    endpoints: {
      "GET /api/quiz/random": "Fetches a non-repeating random quiz question (supports ?exclude=id1,id2...)",
      "GET /api/health": "Health check status",
      "GET /": "Serves frontend application or API landing dashboard"
    }
  });
});

/**
 * GET /
 * Root route: Serves the frontend application if compiled in dist,
 * or serves a responsive health check & API status dashboard.
 */
app.get('/', (req, res) => {
  if (hasDist && fs.existsSync(path.join(distPath, 'index.html'))) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }

  if (req.accepts('html')) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lokamly Backend API</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.12); padding: 32px; border-radius: 24px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.6); backdrop-filter: blur(12px); }
            .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 5px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
            .dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }
            h1 { font-size: 24px; margin: 0 0 10px; font-weight: 800; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 20px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #4f46e5, #6366f1); color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35); transition: transform 0.2s; }
            .btn:hover { transform: translateY(-2px); }
            .endpoints { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); text-align: left; }
            .endpoints h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 8px; }
            .link { display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #38bdf8; text-decoration: none; padding: 6px 0; }
            .link:hover { text-decoration: underline; }
            .method { background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge"><span class="dot"></span> Backend Online (Port ${PORT})</div>
            <h1>🌍 Lokamly Country Quiz</h1>
            <p>The backend API is running smoothly. To play the interactive 3D Globe game, open the React frontend:</p>
            <a class="btn" href="http://localhost:5173" target="_blank">Launch 3D Game (http://localhost:5173) 🚀</a>
            <div class="endpoints">
              <h3>Available API Routes</h3>
              <a class="link" href="/api/quiz/random"><span>🎲 /api/quiz/random</span> <span class="method">GET</span></a>
              <a class="link" href="/api/health"><span>🩺 /api/health</span> <span class="method">GET</span></a>
              <a class="link" href="/api"><span>📋 /api</span> <span class="method">GET</span></a>
            </div>
          </div>
        </body>
      </html>
    `);
  }

  return res.json({
    name: "Lokamly Country Quiz Backend API",
    status: "online",
    port: PORT,
    frontendDevUrl: "http://localhost:5173",
    endpoints: {
      quiz: "/api/quiz/random",
      health: "/api/health",
      info: "/api"
    }
  });
});

// Fallback for client-side routing if dist exists
if (hasDist) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌍 Country Quiz Game Backend Server running on http://localhost:${PORT}`);
});
