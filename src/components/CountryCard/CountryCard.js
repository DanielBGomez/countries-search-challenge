// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../Image';

// Elements
import {
  Wrapper,
  Contents,
  Value
} from './CountryCard.styled';

/**
 * Country card component
 *
 * @version 0.1.0
 * @author Daniel B Gomez <contact@danielbgomez.com>
 */
class CountryCard extends Component {
  /**
   * The render function
   */
  render() {
    const {
      flag,
      name,
      altSpellings
    } = this.props;

    // Computed values
    const AlternativeSpelling = altSpellings[altSpellings.length - 1];

    return (
      <Wrapper
        {...this.props}
      >
        <Image
          src={flag}
          data-flag
          size="cover"
          width="100%"
          height="33.33%"
        />
        <Contents>
          <Value label="Name">{name}</Value>
          <Value label="Alternative Spelling">{AlternativeSpelling}</Value>
        </Contents>
      </Wrapper>
    );
  }
}
CountryCard.propTypes = {
  flag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  altSpellings: PropTypes.arrayOf(PropTypes.string).isRequired
};

// Exports
export default CountryCard;
