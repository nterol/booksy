import React, { Component } from "react";

export const ReaderContext = React.createContext();

class ReaderProvider extends Component {
  state = {
    reading: null
  };

  openBook = ({ target: { id } }) => {
    console.log(id);
    this.setState({ reading: id });
  };

  closeBook = () => this.setState({ reading: null });

  render() {
    const { reading } = this.state;
    const { children } = this.props;

    return (
      <ReaderContext.Provider
        value={{
          openBook: this.openBook,
          closeBook: this.closeBook,
          open: reading
        }}
      >
        {children}
      </ReaderContext.Provider>
    );
  }
}

export default ReaderProvider;
