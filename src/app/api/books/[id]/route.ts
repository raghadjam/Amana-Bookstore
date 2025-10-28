import { NextResponse } from 'next/server';
import clientPromise from '@/app/utils/mongodb';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db('amanaDB');

    // Use string 'id' field, NOT _id
    const book = await db.collection('books').findOne({ id });

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error('Error fetching book:', err);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}
