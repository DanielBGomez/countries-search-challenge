// Modules
import Styled from 'styled-components';
import { transparentize } from 'polished';

// Theme
import {
  fonts,
  colors,
  spacing
} from '../../theme';

// Configurations
const BOX_SHADOW_TRANSPARENTIZE = 0.7;

// Elements
const Wrapper = Styled.div`
  overflow: hidden;
  border-radius: ${spacing.xxs};
  background-color: ${colors.white};
  margin: ${spacing.noSpace} ${spacing.m} ${spacing.m} ${spacing.noSpace};
  box-shadow: 0 2px 4px ${transparentize(BOX_SHADOW_TRANSPARENTIZE, colors.black)};

  [data-flag]:after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    position: absolute;
    background-color: ${colors.black};
  }
`;

const Contents = Styled.div`
  padding: ${spacing.m};
`;

const Value = Styled.div`
  text-align: left;
  line-height: 1.3;
  color: ${colors.black};
  margin-bottom: ${spacing.m};
  font-size: ${fonts.size.small}rem;

  &:before {
    content: '${({ label }) => label}';
    display: block;
    font-weight: 300;
    color: ${colors.blackLighten};
    margin-bottom: ${spacing.xxs};
    font-size ${fonts.size.smaller}rem;
  }
`;

// Exports
export {
  Wrapper,
  Contents,
  Value
};
