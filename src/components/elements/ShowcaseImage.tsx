'use client';
import {Dispatch, SetStateAction, useEffect, Activity, useMemo} from 'react';
import {createPortal} from 'react-dom';
import Image from 'next/image';
import {WeberosIcon, WeberosIconNames} from '@components/atoms/WeberosIcon';
import Elements from '@constants/elements';
import cn from '@util/cn';
import {motion as m} from 'motion/react';
import useHasMounted from '@hooks/useHasMounted';
type Props = {
  showcaseImage: string | WeberosIconNames | null;
  setShowcaseImage: Dispatch<SetStateAction<string | null>>;
  className?: string;
};
export default function ShowcaseImage({
  setShowcaseImage,
  showcaseImage,
  className,
}: Props) {
  const hasMounted = useHasMounted();
  useEffect(() => {
    const layoutElement = document.getElementById(Elements.PageLayoutWrapperId);
    if (!layoutElement) {
      return;
    }
    if (showcaseImage) {
      layoutElement.classList.add('popup-mask');
    } else {
      layoutElement.classList.remove('popup-mask');
    }
  }, [showcaseImage]);
  const isRemoteImage = useMemo(() => {
    return showcaseImage?.startsWith('http');
  }, [showcaseImage]);
  if (hasMounted) {
    return (
      <Activity mode={showcaseImage ? 'visible' : 'hidden'}>
        {createPortal(
          <m.figure
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className={cn(
              'absolute rounded-md transition-all overflow-hidden brightness-90 bg-gray-100 z-9999999 h-[400px] w-[400px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              className,
            )}>
            {showcaseImage &&
              (isRemoteImage ? (
                <Image
                  src={showcaseImage}
                  fill
                  alt="showcasing image"
                  className="object-cover"
                />
              ) : (
                <WeberosIcon
                  name={showcaseImage as WeberosIconNames}
                  className="w-full h-full p-10 stroke-4"
                />
              ))}
            <WeberosIcon
              onClick={() => setShowcaseImage(null)}
              name="cancel"
              className="absolute cursor-pointer right-2 top-2 size-10 text-white bg-white/10 backdrop-blur-[4px] backdrop-brightness-60 p-0.5 rounded-full"
            />
          </m.figure>,
          document?.body,
        )}
      </Activity>
    );
  } else {
    return null;
  }
}
