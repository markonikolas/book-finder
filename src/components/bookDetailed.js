import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getData, formatData } from '../helpers/helpers';

class BookDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    const search = getData(id);
    search
      .then((res) =>
        res.map((volume) => {
          const volumeData = { id: volume.id, data: volume.volumeInfo };
          return volumeData;
        }),
      )
      .then((book) => {
        this.setState({
          book: [...book],
        });
        return book;
      });
  }

  render() {
    const pageIsLoading = !this.state.book;
    return pageIsLoading ? 'Loading...' : this.state.book[0].id;
  }
}

export default withRouter(BookDetailed);
