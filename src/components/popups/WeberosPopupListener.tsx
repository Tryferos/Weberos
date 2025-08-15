'use client';
import Elements from '@constants/elements';
import usePopupStore from '@store/popup-store';
import {useEffect, useRef} from 'react';

export const WeberosPopupListener = () => {
  const popup = usePopupStore(s => s.popup);
  const setPopup = usePopupStore(s => s.setPopup);
  const clickHandlerRef = useRef<(ev: PointerEvent) => void>(null);
  useEffect(() => {
    const layoutElement = document.getElementById(Elements.PageLayoutWrapperId);
    if (!layoutElement) {
      return;
    }
    const handler = (ev: PointerEvent) => {
      //* Check the parent element since the layoutElement has pointer events disabled.
      if (
        ev.target instanceof HTMLElement &&
        ev.target.isEqualNode(layoutElement.parentElement) &&
        popup != null
      ) {
        setPopup(null);
      }
    };
    clickHandlerRef.current = handler;
    if (!clickHandlerRef.current) {
      return;
    }
    window.addEventListener('click', clickHandlerRef.current);
    return () => {
      if (clickHandlerRef.current) {
        window.removeEventListener('click', clickHandlerRef.current);
      }
    };
  }, [popup, setPopup]);

  useEffect(() => {
    const layoutElement = document.getElementById(Elements.PageLayoutWrapperId);
    if (!layoutElement) {
      return;
    }
    if (popup) {
      layoutElement.classList.add('popup-mask');
    } else {
      layoutElement.classList.remove('popup-mask');
    }
  }, [popup]);
  return null;
};
