import {ServerEnvironment} from '@constants/env-server';
import {UserModel} from '@models/user';
import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({
    req,
    secret: ServerEnvironment.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  } else {
    const user = await UserModel.findOne({_id: token?.sub}).lean();
    return NextResponse.json({
      databaseUser: user,
      providerUser: {
        name: token.name,
        email: token.email,
        image: token.picture,
        id: token.sub,
      },
    });
  }
}
