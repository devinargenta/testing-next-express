import React from 'react';
import { findDOMNode } from 'react-dom';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { cTop: 0, cBottom: 0 };
  }
  debouncedGetDimensions = debounce(el => this.getDimensions(el, 150));
  getDimensions = el => {
    let container = el;
    let cTop = container.scrollTop + container.offsetTop;
    let cBottom = cTop + container.clientHeight;
    this.setState({
      cTop,
      cBottom,
      cOffset: container.offsetTop
    });
  };
  componentWillUnmount() {
    this.el.removeEventListener('scroll', this.debouncedGetDimensions);
  }

  componentDidMount() {
    const el = this.ref;
    this.getDimensions(el);
    el.addEventListener('scroll', this.debouncedGetDimensions.bind(this, el));
  }
  render() {
    return (
      <InWindowView
        render={inView => (
          <ul ref={el => (this.ref = el)}>
            {this.props.render(this.state, inView)}
          </ul>
        )}
      />
    );
  }
}

export default class InWindowView extends React.Component {
  state = { inView: false };
  debouncedCheckInView = debounce(el => this.checkInView(el, 150));
  checkInView = el => {
    let inWindow = el.offsetTop <= window.innerHeight + window.scrollY;
    this.setState(prevState => {
      if (!prevState.inView) {
        return {
          inView: inWindow
        };
      }
    });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedCheckInView);
  }

  componentDidMount() {
    const el = findDOMNode(this);
    this.checkInView(el);
    window.addEventListener('scroll', this.debouncedCheckInView.bind(this, el));
  }

  render() {
    return this.props.render(this.state.inView);
  }
}
