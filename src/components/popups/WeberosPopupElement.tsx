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
import Spacer from '@components/atoms/Spacer';

const PopupContentMap: {
  [key in PopupType]: React.LazyExoticComponent<
    (args: PopupState<key>) => ReactNode
  >;
} = {
  browse: lazy(() => import('@components/popups/app-popups/BrowsePopup')),
};

function PopupElement() {
  const {popup, data, description, icon, title, className} = usePopupStore();
  const WeberosPopupContent = useMemo(() => {
    if (popup) {
      return PopupContentMap[popup];
    }
  }, [popup]);
  if (WeberosPopupContent) {
    return (
      <AnimatePresence>
        {popup && (
          <PopupContainer className={className}>
            <>
              <PopupHeader
                icon={icon}
                title={title}
                description={description}
              />
              <Spacer className="h-4" />
              <ScrollView
                className={twMerge(
                  'px-2 pb-2 w-full relative',
                  'min-h-[calc(30vh+50px)] max-h-[calc(45vh+150px)]',
                )}>
                <Suspense fallback={<></>}>
                  <WeberosPopupContent
                    popup={popup}
                    description={description}
                    icon={icon}
                    title={title}
                    data={data as never}
                  />
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

const PopupContainer = ({
  children,
  className,
}: PropsWithChildren & Pick<PopupState, 'className'>) => {
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
        'absolute flex flex-col shadow-xl rounded-t-xl rounded-b z-[99999999999] left-[50%] translate-x-[-50%] bg-white',
        'w-[calc(40vw+250px)] min-h-[calc(30vh+150px)] min-w-[400px] top-[10%]',
        className,
      )}>
      {children}
    </motion.section>
  );
};
