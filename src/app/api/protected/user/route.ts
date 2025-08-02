import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  } else {
    return NextResponse.json({
      user: {
        name: token.name,
        email: token.email,
        image: token.picture,
        id: token.sub,
      },
    });
  }
}
