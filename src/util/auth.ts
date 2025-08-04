'use server';
import {UserModel} from '@models/user';
import {getServerSession} from 'next-auth/next';

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession();
    if (session && session.user) {
      return await UserModel.findOne({email: session.user.email}).lean();
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
