export const ARTICLES_DATA = [
  // Original articles (1-16) remain unchanged
  // ... (keep all your existing articles)

  // Additional Politics Articles
  {
    id: 17,
    categories: ['politics'],
    title: 'UK Prime Minister Calls Snap Election',
    byline: 'By Thomas Wright | April 19, 2025',
    summary: 'Surprise move comes amid economic recovery and rising poll numbers.',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'UK Prime Minister David Chambers announced a snap general election to be held on June 12, capitalizing on recent economic growth and his party\'s lead in polls. The decision surprised many, as the next election wasn\'t required until 2026. Opposition leaders criticized the move as opportunistic, while financial markets showed little reaction. Analysts predict a tight race, with immigration and healthcare as key issues.',
    trending: true,
    premium: false,
    readTime: '6 min read',
  },
  {
    id: 18,
    categories: ['politics'],
    title: 'EU Unveils Digital Services Act Reforms',
    byline: 'By Sophie Müller | April 18, 2025',
    summary: 'New regulations target social media algorithms and online advertising.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The European Union announced sweeping reforms to its Digital Services Act, requiring platforms to disclose algorithmic processes and limiting targeted advertising. "These changes put people back in control of their digital lives," said EU Commissioner Margrethe Vestager. Tech companies will have six months to comply, with potential fines up to 6% of global revenue for violations. The move could set a global precedent for tech regulation.',
    trending: false,
    premium: true,
    readTime: '7 min read',
  },

  // Additional Sports Articles
  {
    id: 19,
    categories: ['sports'],
    title: 'NBA Playoffs: Underdogs Dominate First Round',
    byline: 'By Marcus Johnson | April 19, 2025',
    summary: 'Three lower-seeded teams advance in surprising postseason start.',
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The NBA playoffs opened with major upsets as the 7th-seeded Charlotte Hornets and 8th-seeded Sacramento Kings won their first-round series. "This shows the league\'s competitive balance," said analyst Charles Barkley. Meanwhile, defending champions Boston Celtics narrowly avoided elimination in a thrilling Game 7. The unexpected results have boosted TV ratings, with the next round starting Friday.',
    trending: true,
    premium: false,
    readTime: '5 min read',
  },
  {
    id: 20,
    categories: ['sports'],
    title: 'Women\'s Soccer League Signs $500M TV Deal',
    byline: 'By Jessica Park | April 17, 2025',
    summary: 'Record-breaking agreement signals growing popularity of women\'s sports.',
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The National Women\'s Soccer League secured a landmark $500 million media rights deal with ESPN and Amazon, tripling previous revenue. "This validates years of investment in women\'s soccer," said commissioner Jessica Berman. The 5-year agreement includes weekly primetime matches and expanded streaming options. Players celebrated the news, which will significantly increase salaries and league resources.',
    trending: true,
    premium: true,
    readTime: '4 min read',
  },

  // Additional Technology Articles
  {
    id: 21,
    categories: ['technology'],
    title: 'Apple Reveals AR Glasses Prototype',
    byline: 'By Raj Patel | April 20, 2025',
    summary: 'Wearable device blends digital content with physical world seamlessly.',
    img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Apple previewed its long-rumored AR glasses at a developer event, showcasing a lightweight design with 8K resolution per eye. The device, codenamed "Sight," overlays information onto real-world views without obstructing vision. Early demos included navigation aids, real-time translation, and immersive gaming. While no release date was announced, analysts predict a 2026 launch at $1,500-$2,000. Competitors Meta and Google are racing to develop similar products.',
    trending: true,
    premium: true,
    readTime: '8 min read',
  },
  {
    id: 22,
    categories: ['technology'],
    title: 'Open-Source AI Models Gain Traction',
    byline: 'By Lin Zhao | April 16, 2025',
    summary: 'Community-developed alternatives challenge big tech\'s dominance.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Open-source AI models like Falcon and LLaMA are being adopted by startups and researchers, offering alternatives to proprietary systems from OpenAI and Google. These community-developed models are nearly as capable but more customizable and transparent. "This democratizes AI innovation," said MIT researcher Dr. Sam Altman. However, concerns remain about potential misuse without corporate safeguards.',
    trending: false,
    premium: false,
    readTime: '6 min read',
  },

  // Additional Business Articles
  {
    id: 23,
    categories: ['business'],
    title: 'Fed Signals Possible Rate Cuts Ahead',
    byline: 'By Michael Chen | April 19, 2025',
    summary: 'Central bank responds to cooling inflation and economic indicators.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Federal Reserve Chair Jerome Powell hinted at potential interest rate reductions later this year, citing progress against inflation. "The economic picture is evolving favorably," Powell said at a Brookings Institution event. Markets rallied on the news, with the S&P 500 gaining 2%. Economists now predict two quarter-point cuts in 2025, likely starting in September if trends continue.',
    trending: true,
    premium: false,
    readTime: '5 min read',
  },
  {
    id: 24,
    categories: ['business'],
    title: 'Amazon Expands Drone Delivery Nationwide',
    byline: 'By Olivia Martinez | April 15, 2025',
    summary: 'Retail giant receives FAA approval for expanded operations.',
    img: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Amazon announced nationwide expansion of its Prime Air drone delivery service after receiving FAA approval. The MK30 drones can deliver packages under 5 pounds in under an hour to most U.S. addresses. "This is the future of retail logistics," said Amazon CEO Andy Jassy. The service will roll out in 15 new cities this year, though some communities have raised privacy and safety concerns.',
    trending: false,
    premium: true,
    readTime: '4 min read',
  },

  // Additional Arts & Culture Articles
  {
    id: 25,
    categories: ['arts'],
    title: 'Van Gogh Exhibition Uses AI to Recreate Lost Works',
    byline: 'By Claire Dubois | April 18, 2025',
    summary: 'Neural networks reconstruct paintings destroyed in WWII.',
    img: 'https://images.unsplash.com/photo-1578926375602-3b1d1394a4f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The Van Gogh Museum in Amsterdam unveiled a groundbreaking exhibition featuring AI-reconstructed versions of paintings lost during World War II. Using neural networks trained on the artist\'s style and historical descriptions, researchers recreated five missing works. "This gives us glimpses of treasures we thought were gone forever," said curator Dr. Ingrid van Houten. The exhibition runs through September and has already sold out its first two months.',
    trending: true,
    premium: true,
    readTime: '7 min read',
  },
  {
    id: 26,
    categories: ['arts'],
    title: 'Streaming Services Invest in Live Theater',
    byline: 'By Ethan Cole | April 14, 2025',
    summary: 'Netflix and Disney+ fund original productions for both stage and screen.',
    img: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Streaming giants are investing in live theater, with Netflix backing a Broadway musical adaptation of "The Queen\'s Gambit" and Disney+ developing stage versions of "Encanto" and "Loki." The moves represent a new synergy between streaming and live performance. "We\'re creating content that works across mediums," said Netflix co-CEO Ted Sarandos. The productions will stream after their stage runs, potentially introducing theater to new global audiences.',
    trending: false,
    premium: false,
    readTime: '5 min read',
  },

  // Additional Opinion Pieces
  {
    id: 27,
    categories: ['opinion'],
    title: 'The Education Revolution We Need',
    byline: 'By Dr. Angela Wu | April 20, 2025',
    summary: 'Why AI tutors won\'t replace human teachers—but will transform education.',
    img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'As AI tutoring tools proliferate, we must remember education\'s human core. Technology should enhance—not replace—the teacher-student relationship. The real revolution isn\'t in flashy algorithms but in using these tools to personalize learning while maintaining human mentorship. Schools investing in teacher-AI collaboration, like Singapore\'s "Co-Teach" program, show the way forward. The future belongs to blended learning models that combine the best of both worlds.',
    trending: true,
    premium: false,
    readTime: '4 min read',
  },
  {
    id: 28,
    categories: ['opinion'],
    title: 'The Myth of Work-Life Balance',
    byline: 'By Carlos Mendez | April 17, 2025',
    summary: 'Why striving for perfect equilibrium sets us up for failure.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The pursuit of perfect work-life balance is a fool\'s errand. Life isn\'t a scale to balance but a mosaic to compose. Some seasons demand more work, others more family. The key is intentionality—being fully present in whatever you\'re doing. Companies offering true flexibility (not just remote work) and employees setting clear boundaries are finding more sustainable approaches than rigid balance ever provided.',
    trending: false,
    premium: true,
    readTime: '3 min read',
  },

  // Additional Science Articles
  {
    id: 29,
    categories: ['science'],
    title: 'Deep-Sea Expedition Discovers New Species',
    byline: 'By Dr. Robert Ballard | April 19, 2025',
    summary: 'Marine biologists find thriving ecosystem near hydrothermal vents.',
    img: 'https://images.unsplash.com/photo-1581093196271-cb1a87b7e9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'A NOAA-led expedition to the Pacific Ocean\'s Clarion-Clipperton Zone discovered six new species, including a bioluminescent octopus and a "living fossil" crustacean. The creatures thrive near hydrothermal vents in complete darkness, using chemosynthesis instead of photosynthesis. "This reshapes our understanding of extremophile ecosystems," said chief scientist Dr. Sylvia Earle. The findings could inform the search for life on icy moons like Europa.',
    trending: true,
    premium: true,
    readTime: '6 min read',
  },
  {
    id: 30,
    categories: ['science'],
    title: 'Lab-Grown Meat Approved for US Restaurants',
    byline: 'By Dr. Priya Nair | April 16, 2025',
    summary: 'FDA clears cultivated chicken for commercial sale after safety review.',
    img: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'The FDA approved lab-grown chicken from startups Upside Foods and Good Meat for restaurant sales, following Singapore\'s 2020 lead. Grown from animal cells without slaughter, the product reduces environmental impact by 90% compared to conventional meat. Initial offerings will debut at select high-end restaurants in San Francisco and Washington D.C. this summer, priced at $25-$50 per portion. "This is a watershed moment for sustainable protein," said Upside CEO Uma Valeti.',
    trending: false,
    premium: false,
    readTime: '5 min read',
  },

  // Additional Health Articles
  {
    id: 31,
    categories: ['health'],
    title: 'Breakthrough in Alzheimer\'s Treatment',
    byline: 'By Dr. Karen Lin | April 20, 2025',
    summary: 'New drug shows promise in slowing cognitive decline.',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Biotech firm Cognitx announced positive Phase 3 trial results for its Alzheimer\'s drug CTX-101, which reduced cognitive decline by 35% over 18 months. The treatment targets amyloid plaques and tau tangles simultaneously. "This could be the first drug to meaningfully alter the disease\'s course," said lead researcher Dr. Michael Chen. If approved by the FDA later this year, it would be available to patients in early 2026.',
    trending: true,
    premium: true,
    readTime: '7 min read',
  },
  {
    id: 32,
    categories: ['health'],
    title: 'Sleep Tracking Goes Mainstream',
    byline: 'By Sarah Johnson | April 15, 2025',
    summary: 'Wearables and smart beds offer new insights into rest quality.',
    img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    content: 'Advanced sleep tracking technology is moving beyond basic wearables to smart mattresses and ambient room sensors. Products like the SleepNumber 360 bed and Withings Sleep Analyzer provide detailed reports on sleep stages, breathing patterns, and room conditions. "This data helps people understand and improve their sleep hygiene," said Stanford sleep researcher Dr. Jamie Zeitzer. However, experts warn against over-reliance on metrics that may increase sleep anxiety.',
    trending: false,
    premium: false,
    readTime: '4 min read',
  }
];

// Breaking news ticker content
export const BREAKING_NEWS = [
  "BREAKING: Global Trade Talks Falter Over Tariffs",
  "Senate Passes Climate Bill",
  "Tech Stocks Drop Amid Regulation Fears",
  "UK Prime Minister Calls Snap Election",
  "Fed Signals Possible Rate Cuts",
  "NBA Playoffs: Underdogs Dominate First Round"
];

// Multimedia content for gallery/video section
export const MULTIMEDIA_CONTENT = [
  {
    title: 'Video: Climate Summit Highlights',
    img: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
    type: 'video',
    duration: '2:45'
  },
  {
    title: 'Photos: Olympic Record Moment',
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    type: 'gallery',
    count: 24
  },
  {
    title: 'Video: Tech Innovation Summit',
    img: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    type: 'video',
    duration: '4:12'
  },
  {
    title: 'Photos: Art Exhibit Opening',
    img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1166&q=80',
    type: 'gallery',
    count: 18
  },
  {
    title: 'Video: Deep Sea Exploration',
    img: 'https://images.unsplash.com/photo-1581093196271-cb1a87b7e9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    type: 'video',
    duration: '3:28'
  },
  {
    title: 'Photos: Van Gogh AI Reconstruction',
    img: 'https://images.unsplash.com/photo-1578926375602-3b1d1394a4f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    type: 'gallery',
    count: 12
  }
];

// Newsletter signup categories
export const NEWSLETTER_CATEGORIES = [
  { name: 'Morning Briefing', description: 'Start your day with the top 5 stories' },
  { name: 'Technology Update', description: 'Latest in tech and innovation' },
  { name: 'Business Insights', description: 'Markets, trends and analysis' },
  { name: 'Climate Report', description: 'Environmental news and solutions' },
  { name: 'Culture Digest', description: 'Arts, entertainment and ideas' },
  { name: 'Health & Wellness', description: 'Medical breakthroughs and advice' }
];