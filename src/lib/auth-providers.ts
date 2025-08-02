import {Provider} from 'next-auth/providers/index';
import GoogleProvider from 'next-auth/providers/google';

const AuthProviders: Provider[] = [];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  AuthProviders.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

export default AuthProviders;
