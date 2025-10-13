import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const headers = request.headers
    // get the real IP address from the CF-Connecting-IP header
    const real_ip = headers.get('CF-Connecting-IP')
    return NextResponse.json({ ip: real_ip }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch IP address' }, { status: 500 })
  }
}
