import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  setInput,
  setQuery,
  getData,
  getWebStorageSupport,
} from './helpers/helpers';

import './assets/App.css';
import './assets/spinner.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css';

import BookList from './components/bookList';
import BookDetailed from './components/bookDetailed';
import SearchForBook from './components/searchForBook';

class BookFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      query: [],
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetStateAndStorage = this.resetStateAndStorage.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    const { input, query } = this.state;
    const inputQuery =
      !input && getWebStorageSupport()
        ? sessionStorage.getItem('input')
        : false;

    if (inputQuery) {
      this.setState(setInput(inputQuery));
    }

    if (Array.isArray(query) && !query.length && getWebStorageSupport()) {
      const queryValid = sessionStorage.getItem('query');
      this.setState(setQuery(JSON.parse(queryValid)));
      setTimeout(() => {
        this.setState(() => ({ isLoading: false }));
      }, 1000);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextProps ? true : false;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;
    if (!input) return;

    getData(input)
      .then((query) => {
        this.setState(setQuery([...query], this.state.query));
        return query;
      })
      .catch((error) => {
        console.log(error);
      })
      .then((query) => {
        if (getWebStorageSupport()) {
          sessionStorage.setItem('query', JSON.stringify(query));
          sessionStorage.setItem('input', input);
        }
        this.setState(() => ({ isLoading: true }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState(setInput(event.target.value));
  }

  resetStateAndStorage() {
    // sessionStorage.removeItem('input');
    // this.setState(setInput(''));
    sessionStorage.removeItem('query');
    this.setState(setQuery(null));
  }

  handleLoading() {
    this.setState(() => ({ isLoading: false }));
  }
  render() {
    const { input, query = [] } = this.state;
    return (
      <Fragment>
        <Router>
          <div className=".container-fluid">
            <SearchForBook
              input={input}
              onChange={this.handleChange}
              onClick={this.handleSubmit}
              onReset={this.resetStateAndStorage}
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

              <Route path="/:id" render={() => <BookDetailed />} />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default BookFinder;
