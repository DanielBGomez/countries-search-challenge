// Modules
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Elements
import {
  Wrapper,
  Flag,
  Input,
  Button,
  AutoCompleteWrapper,
  CountryWrapper,
  CountryFlag,
  CountryText
} from './Searchbox.styled';

/**
 * Searchbox component
 *
 * @version 1.0.0
 * @author Daniel B Gomez <contact@danielbgomez.com>
 */
class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      selectedCountry: false
    };

    // References
    this.input = createRef();
    this.autoComplete = createRef();
  }

  /**
   * Focus the input on mount
   */
  componentDidMount() {
    this.focusInput();
  }

  /**
   * Input key down handler.
   *
   * This method allows the autocomplete navegation and UX features.
   *
   * @param {DOMEvent} event 
   */
  inputKeyDown(event) {
    const { autoComplete, fetchData, value } = this.props;
    const { selectedCountry } = this.state;
    const { key } = event;
    
    const parsedKey = `${key}`.toUpperCase();

    // Ignore if not an autocomplete nav key or there is not any elements
    if (!['ARROWDOWN', 'ARROWUP', 'TAB', 'ENTER'].includes(parsedKey) || !autoComplete.length) {
      return true;
    }

    event.preventDefault();

    // Submit if enter
    if (parsedKey === 'ENTER') {
      return selectedCountry ? fetchData('countryData', selectedCountry) : fetchData('search', value); 
    }

    // Current index
    const DIRECTION = parsedKey === 'ARROWUP' ? -1 : 1;
    const CURRENT_INDEX = autoComplete.findIndex(country => country.alpha3Code === selectedCountry)
    const NEXT_INDEX = CURRENT_INDEX + DIRECTION;

    // Less than 0 (Up from the first element) selects the last item
    if (NEXT_INDEX < 0) {
      return this.setState({ selectedCountry: autoComplete[autoComplete.length + DIRECTION]?.alpha3Code });
    }
    // Greather or equal than the elements length (Down/Tab from the last element or any error) selects the first item.
    if(NEXT_INDEX >= autoComplete.length) {
      return this.setState({ selectedCountry: autoComplete[0]?.alpha3Code });
    }
    // Default
    return this.setState({ selectedCountry: autoComplete[NEXT_INDEX]?.alpha3Code });
  }

  /**
   * Focus the input ref.
   *
   * This method uses the event param to ignore the execution if it's the input itself, the button or the SVG in the button.
   *
   * @param {DOMEvent} event 
   */
  focusInput(event) {
    // Ignore if button or input itself
    const type = `${event?.target?.nodeName}`.toUpperCase();

    switch(type) {
      case 'INPUT':
      case 'BUTTON':
      case 'SVG':
        return false;
      default:
        return this.input.current.focus();
    }
  }

  render() {
    const {
      value,
      onChange,
      autoComplete,
      fetchData
    } = this.props;
    const {
      selectedCountry
    } = this.state;

    return (
      <Wrapper
        {...this.props}
        {...this.state}
        onClick={e => this.focusInput(e)}
      >
        <Flag
          onClick={() => this.focusInput()}
        />
        <Input
          ref={this.input}
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={e => this.inputKeyDown(e)}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
        <Button
          onClick={() => fetchData('search', value)}
        >
          <SearchIcon />
          Search
        </Button>
        {autoComplete.length ? (
          <AutoCompleteWrapper ref={this.autoComplete}>
            {autoComplete.map(country => {
              const {
                name,
                flag,
                altSpellings,
                alpha3Code
              } = country;

              return (
                <CountryWrapper
                  key={alpha3Code}
                  tabIndex={0}
                  selected={selectedCountry === alpha3Code}
                  onClick={() => fetchData('countryData', alpha3Code)}
                >
                  <CountryFlag>
                    <img src={flag} />
                  </CountryFlag>
                  <CountryText>
                    <span className="light">[ {alpha3Code} ]</span>
                    &nbsp;&nbsp;
                    {name}
                    &nbsp;&nbsp;&nbsp;
                    <i>( {altSpellings[altSpellings.length - 1]} )</i>
                  </CountryText>
                </CountryWrapper>
              );
            })}
          </AutoCompleteWrapper>
        ) : ''}
      </Wrapper>
    );
  }
}
Searchbox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  autoComplete: PropTypes.arrayOf(PropTypes.object)
};
Searchbox.defaultProps = {
  value: '',
  autoComplete: []
}

// Exports
export default Searchbox;
