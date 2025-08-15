import {HomePageScreen} from '@components/Screens/HomeScreen/HomePageScreen';
import {getCurrentUser} from '../util/auth';

export default async function Home() {
  const hasEnvVariables =
    !!process.env.NEXTAUTH_SECRET &&
    !!process.env.GOOGLE_CLIENT_ID &&
    !!process.env.GOOGLE_CLIENT_SECRET;
  return <HomePageScreen hasEnvVariables={hasEnvVariables} />;
}
