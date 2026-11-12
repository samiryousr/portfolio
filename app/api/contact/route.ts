const formspreeEndpoint = 'https://formspree.io/f/mzerzrdv';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxMessageLength = 5000;

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { email, message } = payload as Record<string, unknown>;

  if (
    typeof email !== 'string' ||
    email.length > 254 ||
    !emailPattern.test(email.trim()) ||
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > maxMessageLength
  ) {
    return Response.json(
      { error: 'Enter a valid email address and a message under 5,000 characters.' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        message: message.trim(),
        _subject: 'New portfolio project inquiry',
      }),
    });

    if (!response.ok) {
      console.error(
        'Formspree rejected contact email:',
        response.status,
        await response.text(),
      );
      return Response.json(
        { error: 'We could not send your message. Please try again later.' },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to reach Formspree:', error);
    return Response.json(
      { error: 'We could not send your message. Please try again later.' },
      { status: 502 },
    );
  }
}
