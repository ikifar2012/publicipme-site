import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const headers = request.headers
    // x-forwarded-for may contain multiple addresses, take the first
    const xff = headers.get('x-forwarded-for') || headers.get('x-real-ip') || headers.get('x-vercel-forwarded-for')
    let ip = xff ? xff.split(',')[0].trim() : ''

    // If still empty, try to read from forwarded header used by some proxies
    if (!ip) {
      ip = headers.get('x-client-ip') || ''
    }

    if (!ip) {
      // Fallback to unknown — in some runtimes the remote address isn't exposed on the Web Request API
      ip = 'unknown'
    }

    return NextResponse.json({ ip })
  } catch (err) {
    return NextResponse.json({ ip: 'unknown' }, { status: 500 })
  }
}
