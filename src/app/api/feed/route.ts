import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['media:group', 'mediaGroup'],
      ['media:description', 'mediaDescription'],
      ['content:encoded', 'contentEncoded'],
      ['description', 'description'],
    ],
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(url);

    const items = feed.items.map((item) => {
      let thumbnail = null;

      // Extract from media:thumbnail
      if (item.mediaThumbnail && item.mediaThumbnail['$'] && item.mediaThumbnail['$'].url) {
        thumbnail = item.mediaThumbnail['$'].url;
      }
      // Extract from media:content
      else if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) {
        thumbnail = item.mediaContent['$'].url;
      }
      // Extract from media:group (YouTube)
      else if (item.mediaGroup && item.mediaGroup['media:thumbnail'] && item.mediaGroup['media:thumbnail'][0] && item.mediaGroup['media:thumbnail'][0]['$']) {
        thumbnail = item.mediaGroup['media:thumbnail'][0]['$'].url;
      }
      
      let htmlContent = item.contentEncoded || item.content || item.mediaDescription || item.description || '';
      
      // Extract first image from HTML content using regex if still no thumbnail
      if (!thumbnail && htmlContent) {
        const imgRegex = /<img[^>]+src="?([^"\s>]+)"?[^>]*>/i;
        const match = imgRegex.exec(htmlContent);
        if (match && match[1]) {
          thumbnail = match[1];
        }
      }

      // If YouTube or Reddit and no content snippet, generate from htmlContent
      let snippet = item.contentSnippet || '';
      if (!snippet && htmlContent) {
        // Strip HTML tags
        snippet = htmlContent.replace(/<[^>]+>/g, ' ').substring(0, 200).trim();
      }

      return {
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: snippet,
        content: htmlContent,
        thumbnail: thumbnail,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
  }
}
