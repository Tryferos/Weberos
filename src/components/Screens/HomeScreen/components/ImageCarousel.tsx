'use client';

import {WeberosIcon, WeberosIconNames} from '@components/atoms/WeberosIcon';
import ShowcaseImage from '@components/elements/ShowcaseImage';
import {useState} from 'react';

export default function ImageCarousel() {
  const [showcaseImage, setShowcaseImage] = useState<string | null>(null);
  const icons: WeberosIconNames[] = ['react', 'javascript', 'golang'];
  return (
    <ul className="flex gap-2">
      {icons.map(name => {
        return (
          <WeberosIcon
            key={name}
            name={name}
            onClick={() => setShowcaseImage(name)}
            className="fill-white p-2 rounded-xl bg-slate-900/70 backdrop-blur-[2px] backdrop-brightness-150 hover:brightness-90 size-10 cursor-pointer"
          />
        );
      })}
      <ShowcaseImage
        setShowcaseImage={setShowcaseImage}
        showcaseImage={showcaseImage}
        className="bg-slate-900/70 text-white fill-white rounded-xl backdrop-blur-[4px] backdrop-brightness-90"
      />
    </ul>
  );
}
