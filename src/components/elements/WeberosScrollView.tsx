import {useEffect, useImperativeHandle, useLayoutEffect, useRef} from 'react';
import ScrollView from './ScollView';

type Props = {
  onIndexChange: (index: number) => void;
  startingIndex: number;
  itemsLength: number;
} & Parameters<typeof ScrollView>[0];

export default function WeberosScrollView(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    onIndexChange,
    startingIndex,
    itemsLength,
    children,
    ...scrollViewProps
  } = props;
  const scrollEndRef = useRef<(ev: Event) => void>(null);
  useImperativeHandle(props.ref, () => ref.current as HTMLDivElement, []);
  useLayoutEffect(() => {
    ref.current?.scrollTo({
      left: ref.current.scrollWidth * ((1 / itemsLength) * 1),
      behavior: 'instant',
    });
  }, [startingIndex, itemsLength]);
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    scrollEndRef.current = ev => {
      const el = ev.target as HTMLDivElement;
      const itemWidth = el.scrollWidth / itemsLength;
      const visibleOffset = el.getBoundingClientRect().width - itemWidth + 16;
      const index = Math.floor((el.scrollLeft + visibleOffset) / itemWidth);
      onIndexChange?.(index);
    };
    element.addEventListener('scrollend', scrollEndRef.current);
    return () => {
      if (scrollEndRef.current) {
        element.removeEventListener('scrollend', scrollEndRef.current);
      }
    };
  }, [itemsLength]);
  return (
    <ScrollView {...scrollViewProps} ref={ref}>
      {children}
    </ScrollView>
  );
}
