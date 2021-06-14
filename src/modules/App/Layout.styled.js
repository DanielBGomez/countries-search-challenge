// Modules
import Styled, { css } from 'styled-components';

// Theme
import {
  fonts,
  colors,
  spacing,
  animations
} from '../../theme';

const { Paragraph } = fonts;

// Configurations
const LARGE_VP_CARDS = 3;
const MEDIUM_VP_CARDS = 2;
const ONE_HUNDRED = 100;

// Elements
const Header = Styled.header`
`;

const Title = Styled.h1`
  cursor: pointer;
  font-weight: 900;
  user-select: none;
  color: ${colors.main};
  font-size: ${spacing.xxl};
  margin-bottom: ${spacing.m};

  @media (max-width: 700px) {
    font-size: ${spacing.xl};
  }
`;

const Footer = Styled.footer`
  z-index: 1;
  opacity: 0.6;
  display: block;
  position: relative;
  color: ${colors.gray};
  font-size: ${fonts.size.smaller};
  transition: opacity 100ms linear;
  margin: ${spacing.noSpace} auto ${spacing.m};

  a {
    color: inherit;

    * {
      margin-left: ${spacing.xxxs};
      margin-bottom: -${spacing.xxxs};
    }

    &:focus,
    &:hover {
      color: ${colors.main};
      text-decoration: none;
    }
  }

  &:focus,
  &:hover {
    opacity: 1;
  }
`;

const Background = Styled.div`
  top: 50%;
  left: 50%;
  width: 90%;
  position: fixed;
  border-radius: 50%;
  background-size: auto 100%;
  background-repeat-y: no-repeat;
  background-position: left center;
  background-image: url('img/world.svg');
  transform: translateX(-50%) translateY(-50%);
  border: ${colors.white} ${spacing.xxxl} solid;
  
  ${css`
    animation: ${animations.BackgroundScrollX} 1000s linear infinite;
  `}

  &:before {
    content: '';
    width: 100%;
    display: block;
    padding-top: 100%;
  }

  @media (max-width: 700px) {
    width: 90%;
    border-width: ${spacing.xxl};
  }

  @media (max-width: 500px) {
    width: 140%;
    border-width: ${spacing.xl};
  }
`;

const Wrapper = Styled.div`
  z-index: 1;
  width: 90%;
  max-width: 1000px;
  position: relative;
  display
  padding-top: ${spacing.xxl};
  transition: all 100ms linear;
  
  #page-description {
    max-width: 556px;
    overflow: hidden;
    transition: all 100ms linear;
  }
  #results-count {
    margin-bottom: ${spacing.s};
  }
  #searchbox {
    max-width: 520px;
    margin: ${spacing.xl} auto ${spacing.l};
  }

  ${({ view }) => {
    switch (view) {
      case 'searching':
      case 'countryData':
        return `
          margin-top: ${spacing.noSpace};
          padding-top: ${spacing.noSpace};

          ${Header} {
            display: flex;
            margin-top: ${spacing.xl};

            @media (max-width: 500px) {
              flex-direction: column;

              * {
                margin-left: auto !important;
                margin-right: auto !important;
              }
            }
          }

          #page-description {
            margin; 0;
            padding: 0;
            max-height: 0;
          }

          ${Title} {
            font-size: ${spacing.l};
            margin: auto auto auto 0;
          }

          #searchbox {
            max-width: 100%;
          }
        `;
      default:
        return '';
    }
  }}
`;

const ResultsWrapper = Styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin-bottom: ${spacing.xxxl};

  > * {
    @media (min-width: 901px) {
      width: calc(${ONE_HUNDRED / LARGE_VP_CARDS}% - ${spacing.number.m - spacing.number.m / LARGE_VP_CARDS}px);
  
      &:nth-of-type(${LARGE_VP_CARDS}n) {
        margin-right: ${spacing.noSpace};
      }
    }
    @media (max-width: 900px) and (min-width: 601px) {
      width: calc(${ONE_HUNDRED / MEDIUM_VP_CARDS}% - ${spacing.number.m - spacing.number.m / MEDIUM_VP_CARDS}px);
  
      &:nth-of-type(${MEDIUM_VP_CARDS}n) {
        margin-right: ${spacing.noSpace};
      }
    }
    @media (max-width: 600px) {
      width: 100%;
      margin-right: ${spacing.noSpace};
    }
  }
`;

// Exports
export {
  Background,
  Wrapper,
  Header,
  Title,
  Footer,
  Paragraph,
  ResultsWrapper
};
