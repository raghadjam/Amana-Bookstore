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

    // Find reviews by bookId
    const bookReviews = await db.collection('reviews').find({ bookId: id }).toArray();

    return NextResponse.json(bookReviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
