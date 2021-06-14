// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

// Contents
import { normalize } from 'styled-normalize';

// Configs
import colors from '../colors';
import fonts from '../fonts';
import spacing from '../spacing';

// Global style
const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    padding: 0;
    margin: auto;
    text-align: center;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
    font-size: ${fonts.em};
    font-family: ${fonts.family.main};
  }
  body,
  #app {
    display: flex;
    width: inherit;
    height: inherit;
    opacity: 1 !important;
    flex-direction: column;
  }

  #app {
    flex-shrink: 0;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 ${spacing.m};
    background-color: ${({ background }) => background || colors.background};
  }
`;

// Components
const GlobalStyleWrapper = props => <GlobalStyle {...props} />;

// Props
GlobalStyleWrapper.defaultProps = {
  transparent: false,
  fitContent: false
};
GlobalStyleWrapper.propTypes = {
  transparent: PropTypes.bool,
  fitContent: PropTypes.bool
};

// Exports
export default GlobalStyleWrapper;
