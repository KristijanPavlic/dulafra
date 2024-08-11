import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = await request.json()

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const isAdmin = userId === process.env.NEXT_PRIVATE_ADMIN_KEY
  const isBranko = userId === process.env.NEXT_PRIVATE_BRANKO_KEY

  if (isAdmin || isBranko) {
    return NextResponse.json({ canDelete: true }, { status: 200 })
  } else {
    return NextResponse.json({ canDelete: false }, { status: 403 })
  }
}
