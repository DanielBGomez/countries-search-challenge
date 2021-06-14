// Modules
import Styled from 'styled-components';

// Elements
const Wrapper = Styled.div`
  margin: auto;
  position: relative;
  display: inline-block;

  &:before {
    content: '';
    width: 100%;
    display: block;
  }

  ${({
    width,
    height,
    size,
    rounded,
    repeat,
    position,
    src
  }) => `
    width: ${width};
    background-size: ${size};
    background-image: url('${src}');
    background-position: ${position};
    border-radius: ${rounded ? '50%' : '0'};
    background-repeat: ${repeat ? '' : 'no-'}repeat;

    &:before {
      padding-top: ${height}
    }
  `}
`;

// Exports
export {
  Wrapper
};
