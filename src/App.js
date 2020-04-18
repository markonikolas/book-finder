import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getData } from './helpers/helpers';

import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import SearchForBook from './components/searchForBook';
import BookList from './components/bookList';
import BookDetailed from './components/bookDetailed';

class BookFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      bookID: '',
      query: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const searches = getData(this.state.input);
    searches
      .then((res) =>
        res.map((volume) => {
          const volumeData = { id: volume.id, data: volume.volumeInfo };
          return volumeData;
        }),
      )
      .then((book) => {
        this.setState({
          query: [...book],
        });
      });
    this.setState({ input: '' });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleClick(bookID) {
    this.setState({ bookID });
  }

  render() {
    const { input, query, bookID } = this.state;
    return (
      <Router>
        <div className=".container-fluid">
          <SearchForBook
            input={input}
            onChange={this.handleChange}
            onClick={this.handleSubmit}
          />
          <Switch>
            <Route exact path="/">
              <BookList volumes={query} onBookClick={this.handleClick} />
            </Route>

            <Route path={`/${bookID}`}>
              <BookDetailed
                volumes={this.state.query.find(
                  (volume) => volume.id === bookID,
                )}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BookFinder;
