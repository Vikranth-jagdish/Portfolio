import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const response = await getTopTracks();

    if (response.status !== 200) {
        return NextResponse.json({ tracks: [] });
    }

    const { items } = await response.json();

    const tracks = items.map((track: any) => ({
        artist: track.artists.map((_artist: any) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        albumImageUrl: track.album.images[0].url // Get largest image
    }));

    return NextResponse.json({ tracks });
}
