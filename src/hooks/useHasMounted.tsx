import {useLayoutEffect, useState} from 'react';

export default function useHasMounted() {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
