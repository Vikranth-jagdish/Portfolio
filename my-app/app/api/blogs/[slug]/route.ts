import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const blogsDirectory = path.join(process.cwd(), 'blogs');
    const filePath = path.join(blogsDirectory, `${slug}.txt`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);

    // Extract title from first line
    const lines = content.split('\n').filter(line => line.trim());
    const title = lines[0]?.replace('#', '').trim() || slug;

    return NextResponse.json({
      slug,
      title,
      content,
      fileName: `${slug}.txt`,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    });
  } catch (error) {
    console.error('Error reading blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog content' },
      { status: 500 }
    );
  }
}
