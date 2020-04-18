import React, { Component } from 'react';
import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import SearchForBook from './components/searchForBook';
import BookList from './components/bookList';

class BookFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const searches = this.getData();
    const volumes = searches
      .then((data) => data.map((volume) => volume.volumeInfo))
      .then((book) => console.log(book));
  }

  async getData() {
    const resp = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.input}`)
      .then((res) => res.data.items);
    return resp;
  }

  render() {
    const { input } = this.state;
    return (
      <div className=".container-fluid">
        <SearchForBook
          input={input}
          onChange={this.handleChange}
          onClick={this.handleSubmit}
        />
        <BookList volumes="" />
      </div>
    );
  }
}

export default BookFinder;
