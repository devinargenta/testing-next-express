import React from 'react';

class LazyBgImage extends React.Component {
  constructor(props) {
    super(props);
    this.elRef = React.createRef();
    this.state = { hasRendered: false, shouldShow: false };
    this.checkInView();
  }

  checkInView() {
    const el = this.elRef;
    const props = this.props;

    const cTop = props.cTop;
    const cBottom = props.cBottom;
    //Get element properties
    const eTop = el.offsetTop;
    const eBottom = eTop + el.clientHeight;
    //Check if in view
    const isTotal = eTop >= cTop && eBottom <= cBottom;
    const isPartial =
      (eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom);

    const shouldShowBackground = props.inView && (isTotal || isPartial);
    if (shouldShowBackground && !this.state.hasRendered) {
      this.setState({
        shouldShow: true,
        hasRendered: true
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.hasRendered) {
      this.checkInView();
    }
  }

  render() {
    const props = this.props;
    const style = {
      backgroundColor: props.backgroundColor || '#666',
      height: props.height || '180px',
      ...(this.state.shouldShow && { backgroundImage: `url(${props.src})` })
    };

    return (
      <div
        ref={el => (this.elRef = el)}
        style={style}
        className={props.className}
      >
        {props.children}
      </div>
    );
  }
}

export default LazyBgImage;
