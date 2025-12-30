import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 25);

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
    if (!GIPHY_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    const url = new URL('https://api.giphy.com/v1/gifs/search');
    url.searchParams.set('api_key', GIPHY_API_KEY);
    url.searchParams.set('q', query);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('rating', 'g');

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error('Giphy error:', await response.text());
      return NextResponse.json(
        { success: false, error: 'Failed to search GIFs' },
        { status: 500 }
      );
    }

    const data = await response.json();

    const gifs = data.data.map((gif: {
      id: string;
      images: {
        original: { url: string; width: string; height: string };
        fixed_width: { url: string };
      };
    }) => ({
      id: gif.id,
      url: gif.images.original.url,
      previewUrl: gif.images.fixed_width.url,
      width: parseInt(gif.images.original.width),
      height: parseInt(gif.images.original.height),
    }));

    return NextResponse.json({
      success: true,
      gifs,
    });
  } catch (error) {
    console.error('Search GIFs error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search GIFs' },
      { status: 500 }
    );
  }
}

