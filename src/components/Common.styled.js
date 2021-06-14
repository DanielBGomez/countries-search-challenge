// Modules
import Styled, { css } from 'styled-components';

// Configs
import { colors, spacing, animations } from '../theme';

// Animations
const { Rotate } = animations;

// Elements
export const Loading = Styled.div`
  margin: auto;
  border-radius: 50%;
  width: ${({ width }) => width || '24px'}};
  border: ${colors.main} ${({ thickness }) => thickness || spacing.xxs} solid;
  border-bottom-color: ${colors.transparent};

  ${css`
    animation: ${Rotate} 600ms linear infinite;
  `}

  &:before {
    content: '';
    width: 100%;
    display: block;
    padding-top: 100%;
  }
`;
