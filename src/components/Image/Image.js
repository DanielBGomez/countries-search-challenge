// Modules
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

// Elements
import { Wrapper } from './Image.styled';

// Configurations
const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

/**
 * Image component
 *
 * @version 0.3.0
 * @author Daniel B Gómez <contact@danielbgomez.com>
 *
 * @todo Test lazy loading
 */
class Image extends Component {
  constructor(props) {
    super(props);

    // Props destruction
    const {
      // lazy,
      src
    } = props;

    this.state = {
      loaded: false,
      // src // : lazy ? 'unset' : src
    };

    // Lazy Observer
    // if (lazy) {
    //   this.setupIntersectionObserver();
    // }

    // Lazy dom ref
    this.dom = createRef();
  }

  // componentDidMount() {
  //   const {
  //     lazy
  //   } = this.props;

  //   if (lazy) {
  //     this.observer.observe(this.dom.current);
  //   }
  // }

  // componentWillUnmount() {
  //   const {
  //     lazy
  //   } = this.props;

  //   if (lazy) {
  //     this.observer.unobserve(this.dom.current);
  //   }
  // }

  /**
   * Setup the Intersection observer for lazy loading.
   */
  setupIntersectionObserver() {
    const {
      observerOptions
    } = this.props;

    // Observer callback
    const callback = (entries) => {
      console.log(entries);
    };
    // Observer options
    const options = {
      ...OBSERVER_OPTIONS,
      ...observerOptions
    };

    // Use the global observer if no root element is specified for the observer
    if (!observerOptions.root) {
      // Register global observer if doesn't exists
      if (!window.__global_intersection_observer) {
        window.__global_intersection_observer = new IntersectionObserver(callback, options);
      }
      // Assign ref
      this.observer = window.__global_intersection_observer;
      return;
    }

    // Create local observer
    this.observer = new IntersectionObserver(callback, options);
  }

  /**
   * React render (JSX)
   */
  render() {
    return <Wrapper ref={this.dom} {...this.props} {...this.state} />;
  }
}
// Prop validations
Image.propTypes = {
  // Attributes
  lazy: PropTypes.bool,
  observerOptions: PropTypes.object,
  size: PropTypes.string,
  repeat: PropTypes.bool,
  position: PropTypes.string,
  rounded: PropTypes.bool,
  // Values
  src: PropTypes.string.isRequired,
  srcset: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
// Defaults
Image.defaultProps = {
  // Attributes
  lazy: false,
  size: 'cover',
  repeat: false,
  position: 'center',
  observerOptions: {},
  // Values
  width: '100%',
  height: '75%',
};

// Exports
export default Image;
