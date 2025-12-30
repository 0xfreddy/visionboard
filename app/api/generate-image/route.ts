import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Prompt too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const FAL_KEY = process.env.FAL_KEY;
    if (!FAL_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Using fal.ai nano-banana model (Google's image generation model)
    const response = await fetch('https://fal.run/fal-ai/nano-banana', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        num_images: 1,
        aspect_ratio: '1:1',
        output_format: 'png',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fal.ai error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const imageUrl = data.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'No image generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error('Generate image error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
