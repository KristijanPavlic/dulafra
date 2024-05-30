import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    const data = await resend.emails.send({
      from: 'Dulafra foto corner <onboarding@resend.dev>',
      to: ['dulafra2705@gmail.com'],
      subject: 'Novi upit',
      text: `Imate novu poruku: \n Ime i prezime: ${name} \n Email: ${email} \n Poruka: ${message}`
    })

    return NextResponse.json(data)
  } catch (error: any) {
    return new Response('Dogodila se greška u slanju upita.', { status: 500 })
  }
}
