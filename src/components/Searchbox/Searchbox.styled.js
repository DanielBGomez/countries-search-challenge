// Modules
// import React from 'react';
import Styled from 'styled-components';
import { transparentize } from 'polished';

// Icons
import FlagIcon from '@material-ui/icons/Flag';

// Theme
import { fonts, spacing, colors } from '../../theme';

// Configurations
const BOX_SHADOW_OPACITY = 0.5;

// Elements
const Wrapper = Styled.div`
  z-index: 2;
  width: 100%;
  height: 45px;
  display: flex;
  position: relative;
  border-radius: ${spacing.xxs};
  border: ${colors.main} 1px solid;
  background-color: ${colors.white};
  box-shadow: 0 2px 4px ${transparentize(BOX_SHADOW_OPACITY, colors.main)};
  transition: all 100ms linear;

  ${({ focused }) => focused && `
    box-shadow: 0 1px 7px 4px ${transparentize(BOX_SHADOW_OPACITY, colors.main)};
  `}
`;

const Input = Styled.input`
  width: 100%;
  border: none;
  flex-grow: 1;
  outline: none;
  flex-shrink: 1;
  text-align: left;
  color: ${colors.black};
  font-size: ${fonts.normal};
`;

const Flag = Styled(FlagIcon)`
  flex-shrink: 0;
  user-select: none;
  color: ${colors.main};
  padding-right: ${spacing.s};
  border-right: ${colors.main} 1px solid;
  width: calc(1em + ${spacing.s}) !important;
  margin: auto ${spacing.m} auto ${spacing.s};
`;

const Button = Styled.button`
  border: none;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  align-items: center;
  display: inline-flex;
  color: ${colors.white};
  margin: 0 0 0 ${spacing.m};
  background-color: ${colors.main};
  padding: ${spacing.noSpace} ${spacing.m} ${spacing.noSpace} ${spacing.s};

  * {
    margin-right: ${spacing.xxs};
  }
`;

const AutoCompleteWrapper = Styled.div`
  left: 0;
  top: 100%;
  width: 100%;
  margin-top: 1px;
  overflow-y: auto;
  position: absolute;
  max-height: calc(100vh - 200px);
  background-color: ${colors.white};
  padding: ${spacing.xxs} ${spacing.noSpace};
  box-shadow: 0 3px 6px ${transparentize(BOX_SHADOW_OPACITY, colors.black)};
`;

const CountryWrapper = Styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  padding: ${spacing.s} ${spacing.m};
  transition: all 100ms linear;

  &:focus,
  &:hover {
    color: ${colors.white};
    background-color: ${colors.main};
  }
  
  ${({ selected }) => selected && `
    color: ${colors.white};
    background-color: ${colors.main};
  `}}
`;

const CountryFlag = Styled.div`
  width: 40px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  margin: auto ${spacing.m} auto ${spacing.noSpace};

  img {
    max-width: 40px;
    max-height: 20px;
    box-shadow: 0 1px 2px ${transparentize(BOX_SHADOW_OPACITY, colors.black)};
  }
`;

const CountryText = Styled.div`
  text-align: left;
  margin-left: ${spacing.noSpace};

  i,
  .light {
    font-weight: 300; 
  }
`;

// Exports
export {
  Wrapper,
  Flag,
  Input,
  Button,
  AutoCompleteWrapper,
  CountryWrapper,
  CountryFlag,
  CountryText
};
