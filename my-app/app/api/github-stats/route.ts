import { NextResponse } from 'next/server';
import { getGithubStats } from '@/lib/github';

export async function GET() {
    try {
        const username = 'Vikranth-jagdish';
        const stats = await getGithubStats(username);

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Github API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch Github stats' }, { status: 500 });
    }
}
