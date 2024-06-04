// components/Headlines.tsx
import React from 'react'

const headlinesData = {
  'Breaking News': [
    'Karen Read Murder Trial Resumes Monday',
    'NYPD officers, suspect shot in Queens',
    'Akron Ohio Mass Shooting: 1 Dead, 24 Injured',
    "Minnesota Trooper's Charges Dismissed in Cobb Shooting"
  ],
  World: [
    "Claudia Sheinbaum, Mexico's First Female President",
    "Israeli Official Disputes Biden's Cease-Fire Description",
    'Georgian Coalition Forms Against Foreign Agent Law',
    "South Korea May End Peace Deal Over North's Trash Balloons",
    'Ramaphosa Reacts to Poor ANC Election'
  ],
  Politics: [
    'Hunter Biden Gun Case Jury Selection',
    "Melania's Response to Trump's Hush Money Verdict",
    "Congresswoman Sheila Jackson's Pancreatic Cancer Diagnosis",
    "Zelensky: China's Russia Support Prolongs Ukraine War"
  ],
  Sports: [
    "Jason Sudeikis' Awkward Taylor Swift Question Stuns Travis Kelce",
    'Justin Jefferson Signs $140M Vikings Deal',
    'Luka Doncic Mavericks Win May Trouble League',
    'UFC 302: Makhachev vs. Poirier Highlights, Results',
    "Connor McDavid's Title Shot, Simone Biles Excellence"
  ],
  Tech: [
    "Inside Ford's $950M Restored Detroit Campus",
    'AMD Unveils New AI Chips, Battles Nvidia, Intel',
    'Computex 2024 — Asus, AMD Next Gen Releases',
    "WWDC 2024: Apple's Keynote Focuses on Software",
    "China's Lunar Probe Lands on Moon",
    'SpaceX Reschedules Fourth Starship Flight Test'
  ],
  Finance: [
    'Roaring Kitty Post Boosts GameStop Shares',
    'Toyota Stops Shipments Amid Japan Safety Scandal',
    'NYSE Error Incorrectly Plummets Berkshire Hathaway',
    "Sheinbaum's Landslide Victory Plummets Peso Value"
  ],
  Health: [
    'Doctors Warn of Ozempic Tongue Symptom',
    'Cucumber Recall Hits Ohio, 13 Other States',
    'US Farm Worker Tests Positive for Bird Flu',
    'Mediterranean Diet Reduces Death Risk: Study',
    'Research: Less Intense Treatment Benefits Cancer Patients',
    'Illegal Medications for International Travel: Pharmacist Advice'
  ],
  Entertainment: [
    'Piers Morgan Mocked for Trump Verdict Reaction',
    "Cyndi Lauper's Final Tour Announced",
    'Eiza González Supports JLo Amid Tour Cancellation Backlash',
    "Tom Hardy's Final 'Venom' Movie Trailer",
    "Jason Sudeiki's Awkward Taylor Swift Question Stuns Travis Kelce"
  ]
}

const Headlines = () => {
  return (
    <div className="mt-8 w-full max-w-6xl text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(headlinesData).map(([category, headlines]) => (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            <ul className="space-y-1">
              {headlines.map(headline => (
                <li
                  key={headline}
                  className="text-sm hover:underline cursor-pointer"
                >
                  {headline}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Headlines
