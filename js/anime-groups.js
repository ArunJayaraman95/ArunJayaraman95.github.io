// ============================================================
//  Groups multiple AniList entries into ONE card on the anime page.
//
//  "Display name": [ entries... ]
//    - Each entry can be the English title, the romaji title, or the
//      AniList media ID (the number in the URL anilist.co/anime/<id>).
//      Titles are matched case-insensitively.
//    - The FIRST entry's cover image is used for the card.
//    - Order here = order the cards fan out in.
//    - Entries not on your list are skipped; typos show a warning in
//      the browser console (F12) so you can fix them.
//    - Anything not listed here shows as its own normal card.
// ============================================================
window.ANIME_GROUPS = {
  "Attack on Titan": [
    "Attack on Titan", "Attack on Titan Season 2", "Attack on Titan Season 3",
    "Attack on Titan Season 3 Part 2", "Attack on Titan Final Season",
    "Attack on Titan Final Season Part 2",
    "Attack on Titan Final Season THE FINAL CHAPTERS Special 1",
    "Attack on Titan Final Season THE FINAL CHAPTERS Special 2",
  ],
  "Assassination Classroom": ["Assassination Classroom", "Assassination Classroom Second Season"],
  "Bleach": [
    "Bleach", "BLEACH: Thousand-Year Blood War",
    "BLEACH: Thousand-Year Blood War - The Separation",
    "BLEACH: Thousand-Year Blood War - The Conflict",
    "BLEACH: Thousand-Year Blood War - The Calamity",
  ],
  "Boruto": ["Boruto: Naruto Next Generations"],
  "Chainsaw Man": ["Chainsaw Man", "Chainsaw Man – The Movie: Reze Arc"],
  "Cyberpunk: Edgerunners": ["Cyberpunk: Edgerunners", "Cyberpunk: Edgerunners 2"],
  "Demon Slayer": [
    "Demon Slayer: Kimetsu no Yaiba",
    "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
    "Demon Slayer: Kimetsu no Yaiba Mugen Train Arc",
    "Demon Slayer: Kimetsu no Yaiba Entertainment District Arc",
    "Demon Slayer: Kimetsu no Yaiba Hashira Training Arc",
    "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
  ],
  "Fire Force": ["Fire Force", "Fire Force Season 2"],
  "Frieren": ["Frieren: Beyond Journey's End", "Frieren: Beyond Journey's End Season 2"],
  "Hell's Paradise": ["Hell's Paradise", "Hell's Paradise Season 2"],
  "JoJo's Bizarre Adventure": [
    "JoJo's Bizarre Adventure (TV)",
    "JoJo's Bizarre Adventure: Stardust Crusaders",
    "JoJo's Bizarre Adventure: Stardust Crusaders - Battle in Egypt",
    "JoJo's Bizarre Adventure: Diamond is Unbreakable",
    "JoJo's Bizarre Adventure: Golden Wind",
    "JoJo's Bizarre Adventure: STONE OCEAN",
    "Thus Spoke Rohan Kishibe",
    "STEEL BALL RUN JoJo's Bizarre Adventure 1st STAGE",
    "STEEL BALL RUN JoJo's Bizarre Adventure 2nd - 3rd STAGE",
  ],
  "Jujutsu Kaisen": [
    "JUJUTSU KAISEN", "JUJUTSU KAISEN 0", "JUJUTSU KAISEN Season 2",
    "JUJUTSU KAISEN Season 3: The Culling Game Part 1",
  ],
  "Kaguya-sama: Love is War": [
    "Kaguya-sama: Love is War?",
    "Kaguya-sama: Love is War -The First Kiss That Never Ends-",
  ],
  "KONOSUBA": [
    "KONOSUBA -God's blessing on this wonderful world!",
    "KONOSUBA -God's blessing on this wonderful world! 2",
  ],
  "MASHLE: Magic and Muscles": ["MASHLE: MAGIC AND MUSCLES", "MASHLE: MAGIC AND MUSCLES Season 2"],
  "Mob Psycho 100": ["Mob Psycho 100", "Mob Psycho 100 II", "Mob Psycho 100 III"],
  "My Hero Academia": [
    "My Hero Academia", "My Hero Academia Season 2", "My Hero Academia Season 3",
    "My Hero Academia Season 4", "My Hero Academia Season 5", "My Hero Academia Season 6",
    "My Hero Academia Season 7", "My Hero Academia FINAL SEASON",
    "My Hero Academia: Two Heroes",
    // "My Hero Academia: Vigilantes",   // spin-off: uncomment to include
  ],
  "Naruto": [
    "Naruto", "Naruto: Shippuden",
  ],
  "Rock Lee & His Ninja Pals": ["Rock Lee & His Ninja Pals"],
  "One Piece": ["ONE PIECE", "One Piece Film: Red"],
  "One-Punch Man": ["One-Punch Man", "One-Punch Man Season 2", "One-Punch Man Season 3"],
  "Record of Ragnarok": ["Record of Ragnarok", "Record of Ragnarok II", "Record of Ragnarok III"],
  "Solo Leveling": ["Solo Leveling", "Solo Leveling Season 2 -Arise from the Shadow-"],
  "SPY x FAMILY": ["SPY x FAMILY", "SPY x FAMILY Cour 2", "SPY x FAMILY Season 2", "SPY x FAMILY Season 3"],
  "Steins;Gate": ["Steins;Gate", "Steins;Gate 0"],
  "Sword Art Online": ["Sword Art Online", "Sword Art Online II"],
  "The Promised Neverland": ["The Promised Neverland", "The Promised Neverland Season 2"],
  "The Seven Deadly Sins": [
    "The Seven Deadly Sins",
    "The Seven Deadly Sins: Revival of the Commandments",
    "The Seven Deadly Sins: Imperial Wrath of the Gods",
    "The Seven Deadly Sins: Dragon's Judgement",
  ],
  "Tokyo Ghoul": ["Tokyo Ghoul", "Tokyo Ghoul:re"],
  "Vinland Saga": ["Vinland Saga", "Vinland Saga Season 2"],
};
