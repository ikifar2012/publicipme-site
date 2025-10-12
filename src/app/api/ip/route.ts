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

    // Attempt to get IPv6 from the external worker
    let ipv6 = 'unknown'
    try {
      const resp = await fetch('https://ip-worker.steplock.workers.dev/api/ip/v6')
      if (resp.ok) {
        // Some IP services return JSON { ip: '...' } — handle both JSON and plain text
        const contentType = resp.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          const data = await resp.json()
          ipv6 = data.ipv6 || 'unknown'
        } else {
          const text = await resp.text()
          ipv6 = text || 'unknown'
        }
      }
    } catch (e) {
      // network failure — leave ipv6 as 'unknown'
    }

    return NextResponse.json({ ip: ip || 'unknown', ipv6: ipv6 || 'unknown' })
  } catch (err) {
    return NextResponse.json({ ip: 'unknown', ipv6: 'unknown' }, { status: 500 })
  }
}
