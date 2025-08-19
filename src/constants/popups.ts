import {PopupState, PopupType} from '@store/popup-store';

const PopupContent: {
  [key in PopupType]: Pick<PopupState, 'description' | 'icon' | 'title'> &
    Partial<Pick<PopupState, 'className'>>;
} = {
  browse: {
    title: 'Browse for mock users',
    description: 'You can use this cool Popup to get all kinds of mock data.',
    icon: 'search',
  },
};

export default PopupContent;
