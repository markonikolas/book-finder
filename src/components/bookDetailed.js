import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../assets/spinner.css';
import BookPage from './bookPage';
import Spinner from './spinner';

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
    const pageIsLoading = !this.state.book;
    return pageIsLoading ? <Spinner /> : <BookPage {...this.state.book} />;
  }
}

export default withRouter(BookDetailed);
