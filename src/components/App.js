import React, { useState, useRef } from 'react';
import useContainerSize from '../hooks/useContainerSize';
import Circle from './Circle';
import Todos from './Todos';

const ASPECT_RATIO = 16 / 9;

const App = () => {
  const containerSize = useContainerSize(ASPECT_RATIO);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isColorSwapping, setIsColorSwapping] = useState(false);
  const firstColorRef = useRef(null);
  const secondColorRef = useRef(null);
  const thirdColorRef = useRef(null);

  const containerStyle = {
    height: `${containerSize.height}px`,
    width: `${containerSize.width}px`
  };

  const toggleAnimation = () => {
    if (isColorSwapping && isAnimating) setIsColorSwapping(false);
    setIsAnimating(!isAnimating);
  };

  const toggleColorAnimation = () => {
    setIsColorSwapping(!isColorSwapping);
  };

  return (
    <>
      <div className='container' style={containerStyle}>
        <Circle
          isAnimating={isAnimating}
          isColorSwapping={isColorSwapping}
          colors={[
            firstColorRef.current?.value,
            secondColorRef.current?.value,
            thirdColorRef.current?.value
          ]}
        />
      </div>
      <div className='buttons-wrapper'>
        <button onClick={toggleAnimation}>bounce</button>
        <button onClick={toggleColorAnimation}>fill</button>
        <input
          ref={firstColorRef}
          className='color-picker'
          name='Color Picker'
          type='color'
        />
        <input
          ref={secondColorRef}
          className='color-picker'
          name='Color Picker'
          type='color'
        />
        <input
          ref={thirdColorRef}
          className='color-picker'
          name='Color Picker'
          type='color'
        />
      </div>
      <Todos />
    </>
  );
};

export default App;
