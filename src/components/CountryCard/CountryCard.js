// Modules
import React, { Component } from 'react';
import {
  string,
  number,
  arrayOf,
  shape,
  object
} from 'prop-types';

// Components
import Image from '../Image';

// Elements
import {
  Wrapper,
  Contents,
  Value
} from './CountryCard.styled';

// Configs
const DECIMALS = 2;

/**
 * Country card component
 *
 * @version 1.0.0
 * @author Daniel B Gomez <contact@danielbgomez.com>
 */
class CountryCard extends Component {
  numberFormat(value, options = {}) {
    try {
      // Split string parsed as float and string
      let [integrer, decimals = '0'] = `${parseFloat(value)}`.split('.');
      // Add commas
      integrer = integrer.replace(/(?!\b)(\d{3}(?=(\d{3})*\b))/g, ',$1');
      // Force decimals
      if (options.decimals) {
        decimals = decimals.slice(0, options.decimals || DECIMALS).padEnd(options.decimals || DECIMALS, '0');
      }
      // Join in value
      return `${integrer}${options.decimals ? `.${decimals}` : ''}`;
    } catch (err) {
      console.error(err);
      // Return 0 if error
      return '0';
    }
  }

  /**
   * The render function
   */
  render() {
    const {
      flag,
      name,
      altSpellings,
      region,
      population,
      languages,
      currencies
    } = this.props;

    // Computed values
    const AlternativeSpelling = altSpellings[altSpellings.length - 1];
    const Currency = currencies[0];

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
          <Value label="Region" style={{ width: 'calc(50% - 8px)', marginRight: '16px' }}>{region}</Value>
          <Value label="Population" style={{ width: 'calc(50% - 8px)' }}>{this.numberFormat(population, { decimals: false })}</Value>
          <Value label="Languages">
            {Object.keys(languages).map((iso3) => {
              const NAME = languages[iso3];

              return (
                <div key={iso3}>
                  <span>
                    [
                    {' '}
                    {iso3}
                    {' '}
                    ]
                  </span>
                  &nbsp;&nbsp;
                  {NAME}
                </div>
              );
            })}
          </Value>
          <Value label="Currency">
            <span>
              [
              {' '}
              {Currency.code}
              {' '}
              ]
            </span>
            &nbsp;&nbsp;
            {Currency.name}
            {Currency.symbol ? (
              <>
                &nbsp;&nbsp;
                <i>
                  (
                  {Currency.symbol}
                  )
                </i>
              </>
            ) : ''}
          </Value>
        </Contents>
      </Wrapper>
    );
  }
}
CountryCard.propTypes = {
  flag: string.isRequired,
  name: string.isRequired,
  altSpellings: arrayOf(string).isRequired,
  region: string.isRequired,
  population: number.isRequired,
  languages: object.isRequired,
  currencies: arrayOf(shape({
    code: string,
    name: string,
    symbol: string
  })).isRequired
};

// Exports
export default CountryCard;
