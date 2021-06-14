// Modules
import { keyframes } from 'styled-components';

// Elements
const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BackgroundScrollX = keyframes`
  from {
    background-position-x: -1000%;
  }
  to {
    background-position-x: 1000%;
  }
`;

// Exports
export default {
  Rotate,
  BackgroundScrollX
};
