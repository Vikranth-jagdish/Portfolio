import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dedicatedBlogs = [
      {
        slug: 'how-ai-actually-works',
        title: 'How AI Actually Works: The Stateless Secret',
        preview: 'An interactive exploration of how LLMs are stateless black boxes, and how context passing creates the illusion of memory...',
        createdAt: new Date('2025-02-28'),
        modifiedAt: new Date('2025-02-28'),
      },
      {
        slug: 'agentic-graph-rag',
        title: 'Agentic Graph RAG: The Future of Knowledge Retrieval',
        preview: 'What happens when you combine graph-based knowledge with autonomous AI agents? A deep dive into the architecture that reasons its way to answers...',
        createdAt: new Date('2025-01-15'),
        modifiedAt: new Date('2025-01-15'),
      },
      {
        slug: 'livekit-voice',
        title: 'Building Real-time Voice Applications with LiveKit',
        preview: 'From telehealth to online education — how LiveKit makes real-time voice accessible, scalable, and production-ready...',
        createdAt: new Date('2025-03-10'),
        modifiedAt: new Date('2025-03-10'),
      },
    ];

    const blogs = dedicatedBlogs.sort(
      (a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
    );

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
