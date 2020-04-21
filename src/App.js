import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css';

import { getData, webStorageSupport } from './helpers/helpers';

// import Spinner from './components/spinner';
import BookList from './components/bookList';
import BookDetailed from './components/bookDetailed';
import SearchForBook from './components/searchForBook';

class BookFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      query: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { input, query } = this.state;
    const inputQuery =
      !input && webStorageSupport() ? sessionStorage.getItem('input') : false;

    if (inputQuery) {
      this.setState({ input: inputQuery });
    }

    if (Array.isArray(query) && !query.length && webStorageSupport()) {
      this.setState({
        query: JSON.parse(sessionStorage.getItem('query')),
      });
    }
    this.setState({ isLoading: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    const searches = getData(input);

    searches
      .then((query) => {
        this.setState({
          query: [...query],
        });
        return query;
      })
      .then((query) => {
        if (webStorageSupport()) {
          sessionStorage.setItem('query', JSON.stringify(query));
          sessionStorage.setItem('input', input);
        }
      });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    const { input, query = [] } = this.state;

    return (
      <Router>
        <div className=".container-fluid">
          <SearchForBook
            input={input}
            onChange={this.handleChange}
            onClick={this.handleSubmit}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <BookList
                  {...props}
                  query={query}
                  onBookClick={this.handleClick}
                />
              )}
            />
            {/* implement spinner when searching 
              fix unneccesery renders
              add selecting books, adding to fav basket, removing from basket etc...
            */}
            <Route path="/:id" render={() => <BookDetailed />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BookFinder;
