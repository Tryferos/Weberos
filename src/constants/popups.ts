import {WeberosIconNames} from '@components/atoms/WeberosIcon';
import {PopupType} from '@store/popup-store';

const PopupContent: {
  [key in PopupType]: {
    title: string;
    description: string;
    icon: WeberosIconNames;
  };
} = {
  browse: {
    title: 'Browse for mock users',
    description: 'You can use this cool Popup to get all kinds of mock data.',
    icon: 'search',
  },
};

export default PopupContent;
