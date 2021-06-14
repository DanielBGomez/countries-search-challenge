// Modules
import Styled from 'styled-components';
import PropTypes from 'prop-types';

// Configs
import colors from './colors';
import spacing from './spacing';

// Values
const values = {
  // Main value (1em)
  default: spacing.m,
  em: spacing.m,
  p: spacing.m,

  size: {
    smallest: 0.625,
    smaller: 0.75,
    small: 0.875,
    normal: 1,
    big: 1.125,
    bigger: 1.25,
    biggest: 1.5
  },

  family: {
    main: '\'Roboto\', sans-serif',
    monospace: 'monospace'
  }
};

// Elements
const Paragraph = Styled.p`
  line-height: 1.5;
  text-decoration: none;
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ weight }) => weight || '400'};
  color: ${({ color }) => (/^#[a-fA-F0-9]{6}$/.test(color) ? color : (colors[color] || colors.gray))};
  font-size: ${({ size }) => {
    if (typeof size === 'number') {
      return `${parseFloat(size)}rem`;
    }
    return (values.size[size] ? `${values.size[size]}rem` : size);
  }};
`;
Paragraph.propTypes = {
  color: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
Paragraph.defaultProps = {
  align: 'left',
  color: colors.gray,
  size: values.size.small
};

const Label = Styled.div`
  text-align: left;
  color: ${colors.gray};
  margin-bottom: ${spacing.xxxs};
  font-size: ${values.size.small}rem;

  ${({ required }) => required && `
    &:after {
      content: ' *';
      color: ${colors.red};
    }
  `}
`;

// Exports
export default {
  Paragraph,
  Label,
  ...values
};
