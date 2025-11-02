import {HomePageScreen} from '@components/Screens/HomeScreen/HomePageScreen';
import {preload} from 'react-dom';

export default async function Home() {
  preload('/sprite.svg', {type: 'image/svg+xml', as: 'image'});
  const hasEnvVariables =
    !!process.env.NEXTAUTH_SECRET &&
    !!process.env.GOOGLE_CLIENT_ID &&
    !!process.env.GOOGLE_CLIENT_SECRET;
  return <HomePageScreen hasEnvVariables={hasEnvVariables} />;
}
