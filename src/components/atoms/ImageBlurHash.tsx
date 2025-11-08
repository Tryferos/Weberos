'use client';
import Image from 'next/image';
import blurHashMap from '@constants/images-blurhashes.json';
import {decode} from 'blurhash';
import {useEffect, useState} from 'react';

type Props = Parameters<typeof Image>[0];

export default function ImageBlurHash(props: Props) {
  const [blurDataUrl, setBlurDataUrl] = useState<string | undefined>();
  useEffect(() => {
    const blurHash = (blurHashMap as Record<string, string>)[
      props.src as string
    ];
    if (!blurHash) {
      return;
    }
    console.time(`blurHash convertion of ${props.src}`);
    const url = convertBlurHashToDataUrl({blurHash});
    console.timeEnd(`blurHash convertion of ${props.src}`);
    setBlurDataUrl(url);
  }, [props.src]);

  function convertBlurHashToDataUrl({
    blurHash,
    width = 16,
    height = 16,
  }: {
    blurHash: string;
    width?: number;
    height?: number;
  }) {
    const pixels = decode(blurHash, width, height);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return '';
    }

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL('image/jpg');
  }

  return (
    <Image
      {...props}
      placeholder={blurDataUrl ? 'blur' : 'empty'}
      blurDataURL={blurDataUrl}
    />
  );
}
