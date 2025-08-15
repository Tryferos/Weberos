import {WeberosIconNames} from '@components/atoms/WeberosIcon';
import PopupContent from '@constants/popups';
import {create} from 'zustand';

export type PopupType = 'browse';
export type PopupState = {
  popup: PopupType | null;
  title: string | null;
  description: string | null;
  icon: WeberosIconNames | null;
};

type Actions = {
  setPopup: (state: Partial<PopupState> | null) => void;
};

const usePopupStore = create<PopupState & Actions>()(set => ({
  popup: null,
  title: null,
  icon: null,
  description: null,
  setPopup: state => {
    if (state == null || state.popup == null) {
      set({icon: null, title: null, popup: null, description: null});
    } else {
      set({
        ...state,
        title: state.title ?? PopupContent[state.popup].title,
        icon: state.icon ?? PopupContent[state.popup].icon,
        description: state.description ?? PopupContent[state.popup].description,
      });
    }
  },
}));

export default usePopupStore;
