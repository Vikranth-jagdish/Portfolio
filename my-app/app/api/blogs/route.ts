import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogsDirectory = path.join(process.cwd(), 'blogs');

    // Check if blogs directory exists
    if (!fs.existsSync(blogsDirectory)) {
      return NextResponse.json({ blogs: [] });
    }

    // Read all files from blogs directory
    const files = fs.readdirSync(blogsDirectory);

    // Filter only .txt files and create blog metadata
    const blogs = files
      .filter(file => file.endsWith('.txt'))
      .map(file => {
        const slug = file.replace('.txt', '');
        const filePath = path.join(blogsDirectory, file);
        const stats = fs.statSync(filePath);

        // Read first few lines to get a preview
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim());
        const title = lines[0]?.replace('#', '').trim() || slug;
        const preview = lines.slice(1, 4).join(' ').substring(0, 150) + '...';

        return {
          slug,
          title,
          preview,
          fileName: file,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
        };
      })
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error reading blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
