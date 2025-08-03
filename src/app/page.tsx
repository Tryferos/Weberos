import {HomePageScreen} from '@components/Screens/HomeScreen/HomePageScreen';
import {getCurrentUser} from '../util/auth';

export default async function Home() {
  const user = await getCurrentUser();
  return <HomePageScreen />;
}
