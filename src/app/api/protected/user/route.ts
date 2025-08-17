import {ServerEnvironment} from '@constants/env-server';
import {UserModel} from '@models/user';
import {UserSchemaType} from '@schemas/user';
import {getToken} from 'next-auth/jwt';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(
  req: NextRequest,
  res: NextResponse,
): Promise<NextResponse<Partial<UserSchemaType | {error: string}>>> {
  const token = await getToken({
    req,
    secret: ServerEnvironment.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  } else {
    const user = await UserModel.findOne({_id: token?.sub}).lean();
    if (!user) {
      return NextResponse.json({error: 'Not Found'}, {status: 401});
    }
    return NextResponse.json({
      email: user?.email ?? undefined,
      name: user?.name ?? undefined,
      imageUrl: user?.image ?? undefined,
      id: user?._id.toString() ?? undefined,
    });
  }
}
