'use client';

import Elements from '@constants/elements';
import usePopupStore, {PopupState, PopupType} from '@store/popup-store';
import {AnimatePresence, motion} from 'motion/react';
import {PopupHeader} from './PopupHeader';
import {
  lazy,
  memo,
  PropsWithChildren,
  ReactNode,
  Suspense,
  useMemo,
} from 'react';
import ScrollView from '@components/elements/ScollView';
import {twMerge} from 'tailwind-merge';

const PopupContentMap: {
  [key in PopupType]: React.LazyExoticComponent<
    (args: PopupState) => ReactNode
  >;
} = {
  browse: lazy(() => import('@components/popups/app-popups/BrowsePopup')),
};

function PopupElement() {
  const {popup, ...rest} = usePopupStore();
  const WeberosPopupContent = useMemo(() => {
    if (popup) {
      return PopupContentMap[popup];
    }
  }, [popup]);
  if (WeberosPopupContent) {
    return (
      <AnimatePresence>
        {popup && (
          <PopupContainer>
            <>
              <PopupHeader popup={popup} {...rest} />
              <ScrollView
                className={twMerge(
                  'px-2 pb-2 w-full relative',
                  'min-h-[calc(30vh+50px)] max-h-[calc(35vh+150px)]',
                )}>
                <Suspense fallback={<></>}>
                  <WeberosPopupContent popup={popup} {...rest} />
                </Suspense>
              </ScrollView>
            </>
          </PopupContainer>
        )}
      </AnimatePresence>
    );
  }
}
const WeberosPopupElement = memo(PopupElement);
export default WeberosPopupElement;

const PopupContainer = ({children}: PropsWithChildren) => {
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      id={Elements.PopupContainerId}
      className={twMerge(
        'absolute flex flex-col shadow-xl rounded left-[50%] translate-x-[-50%] bg-white',
        'w-[calc(40vw+250px)] min-h-[calc(30vh+150px)] min-w-[400px] top-[10%]',
      )}>
      {children}
    </motion.section>
  );
};
