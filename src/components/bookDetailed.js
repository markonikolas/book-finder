import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import BookPage from './bookPage';

class BookDetailed extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    (async (id) => {
      const response = await axios
        .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((bookDetails) => bookDetails.data)
        .then((data) => {
          this.setState({
            book: data.volumeInfo,
          });
        });
      return response;
    })(id);
  }

  render() {
    return <BookPage {...this.state.book} />;
  }
}

export default withRouter(BookDetailed);
