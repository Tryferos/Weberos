import {WeberosIconNames} from '@components/atoms/WeberosIcon';
import PopupContent from '@constants/popups';
import {create} from 'zustand';

export type PopupType = 'browse';

export interface PopupDataMap {
  browse: {startingString: string};
}

export type PopupState<P extends PopupType | unknown = unknown> = {
  popup: PopupType | null;
  title: string | null;
  description: string | null;
  icon: WeberosIconNames | null;
  data: P extends PopupType
    ? P extends keyof PopupDataMap
      ? PopupDataMap[P]
      : undefined
    : unknown | null;
  className?: string | null;
};

export type Actions = {
  setPopup: <P extends PopupType | null>(
    type: P,
    payload?: P extends PopupType
      ? Partial<
          Omit<PopupState, 'popup' | 'data'> & {
            data: P extends keyof PopupDataMap ? PopupDataMap[P] : undefined;
          }
        >
      : undefined,
  ) => void;
};

const usePopupStore = create<PopupState & Actions>()(set => ({
  popup: null,
  title: null,
  icon: null,
  description: null,
  data: null,
  setPopup: (type, payload) => {
    if (type == null) {
      set({
        icon: null,
        title: null,
        popup: null,
        description: null,
        className: null,
        data: null,
      });
    } else {
      const content = PopupContent[type];
      set({
        popup: type,
        className: payload?.className ?? content.className,
        title: payload?.title ?? content.title,
        icon: payload?.icon ?? content.icon,
        description: payload?.description ?? content.description,
        data: payload?.data ?? null,
      });
    }
  },
}));

export default usePopupStore;
