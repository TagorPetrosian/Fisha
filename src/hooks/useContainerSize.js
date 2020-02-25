import { useEffect, useState, useCallback } from 'react';
import useWindowSize from './useWindowSize';

export default function(aspectRatio, scale = 0.5) {
  const size = useWindowSize();

  const getSize = useCallback(() => {
    const newSize = { width: window.innerWidth, height: window.innerHeight };
    let value;
    if (newSize.width > newSize.height) {
      value = {
        width: newSize.height * aspectRatio * scale,
        height: newSize.height * scale
      };
    } else
      value = { width: newSize.width, height: newSize.width / aspectRatio };

    return value;
  }, [size, aspectRatio, scale]);

  const [containerSize, setContainerSize] = useState(getSize);

  useEffect(() => {
    setContainerSize(getSize());
  }, [getSize]);

  return containerSize;
}
