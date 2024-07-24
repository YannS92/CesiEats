import React from 'react';

class ImageWithErrorHandling extends React.Component {
  state = {
    hasError: false,
  };

  handleError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return <div>Sorry, the image couldn't be loaded.</div>;
    }

    return <img src={this.props.src} alt={this.props.alt} onError={this.handleError} />;
  }
}

export default ImageWithErrorHandling;
