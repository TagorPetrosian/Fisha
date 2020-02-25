import React from 'react';
import styled, { keyframes } from 'styled-components';

const colorAnimation = colors => keyframes`
  0% {background-color: ${colors[0]}}
  50% {background-color: ${colors[1]}}
  100% {background-color: ${colors[2]}}
`;

const bouncyAnimation = keyframes`
  50% {transform: translateY(-2rem);}
  100% {transform: translateY(2rem);}
`;

const Wrapper = styled.div`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  border: 1px solid black;
  animation: ${props => props.isColorSwapping && colorAnimation(props.colors)}
      0.5s linear ${props => (props.isColorSwapping ? 'infinite' : '')},
    ${props => (props.isAnimating ? bouncyAnimation : null)} 0.5s infinite;
`;

const Circle = ({ isAnimating, isColorSwapping, colors }) => {
  return (
    <Wrapper
      isAnimating={isAnimating}
      isColorSwapping={isColorSwapping}
      colors={colors}
    />
  );
};

export default Circle;
