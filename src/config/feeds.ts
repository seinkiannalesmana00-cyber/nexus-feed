export interface FeedSource {
  id: string;
  name: string;
  url: string;
  platform: 'web_forum' | 'reddit' | 'social';
  scope: 'lokal' | 'global';
  pillar: 'intersection' | 'gaming' | 'internet_culture';
  categoryLabel: string;
  isCustom?: boolean;
  isFocus?: boolean;
}

export const DEFAULT_FEEDS: FeedSource[] = [
  // 1. Web Editorial & Forum Lokal
  { id: 'gb', name: 'Gamebrott', url: 'https://gamebrott.com/feed/', platform: 'web_forum', scope: 'lokal', pillar: 'intersection', categoryLabel: 'Gaming & Pop Culture', isFocus: true },
  { id: 'hyb', name: 'Hybrid.co.id', url: 'https://hybrid.co.id/feed/', platform: 'web_forum', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Esports & Industry' },
  { id: 'jp', name: 'Jagat Play', url: 'https://jagatplay.com/feed/', platform: 'web_forum', scope: 'lokal', pillar: 'gaming', categoryLabel: 'PC & Console' },
  { id: 'kc', name: 'Kincir Gaming', url: 'https://kincir.com/feed/', platform: 'web_forum', scope: 'lokal', pillar: 'intersection', categoryLabel: 'Pop Culture' },
  { id: 'mjk', name: 'Mojok (Game)', url: 'https://mojok.co/tag/game/feed/', platform: 'web_forum', scope: 'lokal', pillar: 'internet_culture', categoryLabel: 'Social Essays' },
  { id: 'idg', name: 'Indogamers Forum', url: 'https://forum.indogamers.com/external.php?type=RSS2', platform: 'web_forum', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Community Forum' },

  // 2. Web Editorial & Forum Global
  { id: 'am', name: 'Aftermath', url: 'https://aftermath.site/rss/', platform: 'web_forum', scope: 'global', pillar: 'intersection', categoryLabel: 'Labor & Culture' },
  { id: 'poly', name: 'Polygon', url: 'https://www.polygon.com/rss/index.xml', platform: 'web_forum', scope: 'global', pillar: 'intersection', categoryLabel: 'Games & Web Culture' },
  { id: 'ktk', name: 'Kotaku', url: 'https://kotaku.com/rss', platform: 'web_forum', scope: 'global', pillar: 'intersection', categoryLabel: 'Gaming & Memes' },
  { id: 'm404', name: '404 Media', url: 'https://www.404media.co/rss/', platform: 'web_forum', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Underground Tech' },
  { id: 'kym', name: 'Know Your Meme News', url: 'https://knowyourmeme.com/news.rss', platform: 'web_forum', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Meme Culture' },
  { id: 'vrg-g', name: 'The Verge Games', url: 'https://www.theverge.com/games/rss/index.xml', platform: 'web_forum', scope: 'global', pillar: 'gaming', categoryLabel: 'Industry Tech' },
  { id: 'vrg-c', name: 'The Verge Culture', url: 'https://www.theverge.com/culture/rss/index.xml', platform: 'web_forum', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Digital Culture' },
  { id: 're', name: 'ResetEra Forum', url: 'https://www.resetera.com/forums/video-games.7/index.rss', platform: 'web_forum', scope: 'global', pillar: 'gaming', categoryLabel: 'Hardcore Gaming' },
  { id: 'ng', name: 'NeoGAF Forum', url: 'https://neogaf.com/forums/gaming-discussion.2/index.rss', platform: 'web_forum', scope: 'global', pillar: 'gaming', categoryLabel: 'Discussion Board' },
  { id: 'hn', name: 'Hacker News Gaming', url: 'https://hnrss.org/newest?q=gaming+OR+"game+design"', platform: 'web_forum', scope: 'global', pillar: 'gaming', categoryLabel: 'Dev & Design' },

  // 3. Reddit Lokal & Global (.rss native)
  { id: 'r-id', name: 'r/indonesia', url: 'https://www.reddit.com/r/indonesia/.rss', platform: 'reddit', scope: 'lokal', pillar: 'internet_culture', categoryLabel: 'Local Discourse' },
  { id: 'r-ig', name: 'r/IndoGamer', url: 'https://www.reddit.com/r/IndoGamer/.rss', platform: 'reddit', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Local Gamers' },
  { id: 'r-wb', name: 'r/wibu', url: 'https://www.reddit.com/r/wibu/.rss', platform: 'reddit', scope: 'lokal', pillar: 'intersection', categoryLabel: 'Anime & Gacha' },
  { id: 'r-tg', name: 'r/truegaming', url: 'https://www.reddit.com/r/truegaming/.rss', platform: 'reddit', scope: 'global', pillar: 'gaming', categoryLabel: 'Game Critique' },
  { id: 'r-gm', name: 'r/Games', url: 'https://www.reddit.com/r/Games/.rss', platform: 'reddit', scope: 'global', pillar: 'gaming', categoryLabel: 'Curated News' },
  { id: 'r-gc', name: 'r/gachagaming', url: 'https://www.reddit.com/r/gachagaming/.rss', platform: 'reddit', scope: 'global', pillar: 'intersection', categoryLabel: 'Gacha Monetization' },
  { id: 'r-lsf', name: 'r/LivestreamFail', url: 'https://www.reddit.com/r/LivestreamFail/.rss', platform: 'reddit', scope: 'global', pillar: 'intersection', categoryLabel: 'Streamers & Drama' },
  { id: 'r-ootl', name: 'r/OutOfTheLoop', url: 'https://www.reddit.com/r/OutOfTheLoop/.rss', platform: 'reddit', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Drama Context' },
  { id: 'r-srd', name: 'r/SubredditDrama', url: 'https://www.reddit.com/r/SubredditDrama/.rss', platform: 'reddit', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Community Drama' },
  { id: 'r-ic', name: 'r/InternetCulture', url: 'https://www.reddit.com/r/InternetCulture/.rss', platform: 'reddit', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Web Phenomena' },

  // 4. Media Sosial via RSSHub (X, Facebook, Threads)
  { id: 'x-gb', name: 'X @Gamebrott', url: 'https://rsshub.app/twitter/user/Gamebrott', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Twitter/X ID' },
  { id: 'x-gd', name: 'X @gamedevid', url: 'https://rsshub.app/twitter/user/gamedevid', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Gamedev ID' },
  { id: 'x-txt', name: 'X @txtdrgaming', url: 'https://rsshub.app/twitter/user/txtdrgaming', platform: 'social', scope: 'lokal', pillar: 'intersection', categoryLabel: 'Meme & Banter' },
  { id: 'x-jp', name: 'X @JagatPlay', url: 'https://rsshub.app/twitter/user/JagatPlay', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Twitter/X ID' },
  { id: 'x-js', name: 'X @jasonschreier', url: 'https://rsshub.app/twitter/user/jasonschreier', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'Investigative' },
  { id: 'x-st', name: 'X @stephentotilo', url: 'https://rsshub.app/twitter/user/stephentotilo', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'Journalism' },
  { id: 'x-zg', name: 'X @ZhugeEX', url: 'https://rsshub.app/twitter/user/ZhugeEX', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'Market Analyst' },
  { id: 'x-tl', name: 'X @TaylorLorenz', url: 'https://rsshub.app/twitter/user/TaylorLorenz', platform: 'social', scope: 'global', pillar: 'internet_culture', categoryLabel: 'Internet Culture' },
  { id: 'x-dx', name: 'X @Dexerto', url: 'https://rsshub.app/twitter/user/Dexerto', platform: 'social', scope: 'global', pillar: 'intersection', categoryLabel: 'Streamers & News' },
  { id: 'fb-gb', name: 'FB Gamebrott', url: 'https://rsshub.app/facebook/page/gamebrott', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Facebook Page' },
  { id: 'fb-jp', name: 'FB Jagat Play', url: 'https://rsshub.app/facebook/page/jagatplay', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Facebook Page' },
  { id: 'fb-pcmr', name: 'FB PC Master Race', url: 'https://rsshub.app/facebook/page/OfficialPCMR', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'PCMR Community' },
  { id: 'fb-vghf', name: 'FB Game History', url: 'https://rsshub.app/facebook/page/gamehistoryorg', platform: 'social', scope: 'global', pillar: 'intersection', categoryLabel: 'Game Archives' },
  { id: 'th-gb', name: 'Threads @gamebrott', url: 'https://rsshub.app/threads/user/gamebrott', platform: 'social', scope: 'lokal', pillar: 'gaming', categoryLabel: 'Threads ID' },
  { id: 'th-tw', name: 'Threads @tomwarren', url: 'https://rsshub.app/threads/user/tomwarren', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'Tech & Gaming' },
  { id: 'th-gk', name: 'Threads @geoffkeighley', url: 'https://rsshub.app/threads/user/geoffkeighley', platform: 'social', scope: 'global', pillar: 'gaming', categoryLabel: 'Industry Events' },
  { id: 'th-poly', name: 'Threads @polygon', url: 'https://rsshub.app/threads/user/polygon', platform: 'social', scope: 'global', pillar: 'intersection', categoryLabel: 'Culture' },
  { id: 'th-ktk', name: 'Threads @kotakudotcom', url: 'https://rsshub.app/threads/user/kotakudotcom', platform: 'social', scope: 'global', pillar: 'intersection', categoryLabel: 'Gaming Threads' }
];
