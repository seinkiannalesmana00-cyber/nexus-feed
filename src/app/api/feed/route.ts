import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
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

      // Extract from media:content
      if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) {
        thumbnail = item.mediaContent['$'].url;
      }
      
      const htmlContent = item.contentEncoded || item.content || item.description || '';

      // Extract first image from HTML content using regex
      if (!thumbnail && htmlContent) {
        const imgRegex = /<img[^>]+src="?([^"\s>]+)"?[^>]*>/i;
        const match = imgRegex.exec(htmlContent);
        if (match && match[1]) {
          thumbnail = match[1];
        }
      }

      return {
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: item.contentSnippet || '',
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
