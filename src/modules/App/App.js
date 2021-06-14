// Modules
import React, { Component } from 'react';
import Axios from 'axios';

// Theme
import { DefaultThemeGlobals } from '../../theme';

// Components
import Searchbox from '../../components/Searchbox';
import Image from '../../components/Image';
import CountryCard from '../../components/CountryCard';

// Elements
import {
  Background,
  Wrapper,
  Header,
  Title,
  Footer,
  Paragraph,
  ResultsWrapper
} from './Layout.styled';

// Configurations
const API_AUTOCOMPLETE_URI = 'https://restcountries.eu/rest/v2/name/';
const API_SEARCH_URI = 'https://restcountries.eu/rest/v2/name/';
const API_COUNTRY_DATA_URI = 'https://restcountries.eu/rest/v2/alpha/'
const MIN_SEARCH_LENGTH = 3;

// Cancel Token
const { CancelToken } = Axios;

/**
 * App react component
 *
 * @version 0.1.0
 */
class App extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      search: '',
      results: [],
      countryData: {},
      autoComplete: [],
      fetching: false,
      error: false,
      view: 'homepage'
    };
  }

  /**
   * Fetch data from the API using the method param for the URL and storage configurations.
   *
   * @param {'autocomplete'|'search'|'countryData'} method   Fetch method [] 
   */
  fetchData(method, search) {
    const {
      fetching
    } = this.state;
    
    // Ignore if fetching
    if (fetching) {
      // Abort if method is countryData
      console.log(method);

      if (method === 'countryData') {
        if (typeof this.abortSearch === 'function') {
          this.abortSearch();
        }
      } else {
        return;
      }
    }

    // Setup fetching state
    this.setState({
      fetching: true,
      autoComplete: [],
      results: []
    });

    // URL
    let URL;
    switch (method) {
      case 'autocomplete':
        URL = API_AUTOCOMPLETE_URI;
        break;
      case 'search':
        URL = API_SEARCH_URI;
        break;
      case 'countryData':
        URL = API_COUNTRY_DATA_URI;
        break;
      default:
        return this.setState({ fetching: false, view: 'error' });
    }

    // Request
    Axios.get(`${URL}${search}`, {
      cancelToken: new CancelToken(cancel => this.abortSearch = cancel)
    })
      // Store data
      .then(data => {
        switch (method) {
          case 'autocomplete':
          case 'search':
            return this.setState({
              view: 'searching',
              [(method === 'autocomplete' ? 'autoComplete' : 'results')]: data.data
            });
          case 'countryData':
            return this.setState({
              view: 'countryData',
              countryData: data.data,
              search: data.data.name
            });
        }
      })
      .catch(error => {
        if (!Axios.isCancel(error)) {
          // Store error and change view
          this.setState({ error, view: 'error' })
        }
      })
      // Remove fetching state
      .finally(() => this.setState({ fetching: false }));
  }

  /**
   * Searchbox onChange event.
   * 
   * @param {DOMEvent} event 
   */
  handleSearchInput(event) {
    const search = `${event?.target?.value}`;
  
    // Abort current search
    if (typeof this.abortSearch === 'function') {
      this.abortSearch();
    }

    // Update state
    this.setState({ view: 'searching', search, autoComplete: [] });

    // Autocomplete if the input length is greather than 3
    if (search.length >= MIN_SEARCH_LENGTH) {
      this.fetchData('autocomplete', search);
    }
  }

  /**
   * The render method
   */
  render() {
    const {
      search,
      autoComplete,
      results,
      view
    } = this.state;

    return (
      <>
        <DefaultThemeGlobals />
        <Background
          view={view}
        />
        <Wrapper
          {...this.props}
          {...this.state}
        >
          <Header>
            <Title>Countries Search Challenge</Title>
          </Header>
          <Paragraph
            id="page-description"
            color="gray"
            align="center"
            size="normal"
          >
            Search any country by it&#39;s name or ISO 3166-1 2/3 letters country code. Discover the language, Currency, Region, Name and Population of any country!
          </Paragraph>
          <Searchbox
            id="searchbox"
            autoComplete={autoComplete}
            value={search}
            fetchData={(method, search) => this.fetchData(method, search)}
            onChange={e => this.handleSearchInput(e)}
          />
          {results.length ? (
            <>
              <Paragraph
                id="results-count"
              >
                {results.length} resultados
              </Paragraph>
              <ResultsWrapper>
                {results.map(country => {
                  return (
                    <CountryCard
                      key={country.alpha3Code}
                      {...country}
                    />
                  );
                })}
              </ResultsWrapper>
            </>
          ) : ''}
        </Wrapper>
        <Footer>
          Coded with
          {' '}
          <Image
            src="img/heart.png"
            width="12px"
            height="12px"
          />
          {' '}
          by
          {' '}
          <a
            href="https://github.com/DanielBGomez"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              rounded
              src="https://avatars.githubusercontent.com/u/11876432?s=400&u=0f103f212612dfe5112ec0da5aba92cb52842418&v=4"
              width="18px"
              height="18px"
            />
            {' '}
            Daniel B Gómez
          </a>
        </Footer>
      </>
    );
  }
}

// Exports
export default App;
