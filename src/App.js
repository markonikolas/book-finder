import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  setInput,
  setQuery,
  getData,
  getWebStorageSupport,
} from './helpers/helpers';

import './assets/spinner.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css';
import 'animate.css';

import BookList from './components/bookList';
import BookDetailed from './components/bookDetailed';
import SearchForBook from './components/searchForBook';
import Spinner from './components/spinner';

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

  handleSubmit(event) {
    event.preventDefault();
    const { input } = this.state;

    if (!input) return;

    this.setState(() => ({ isLoading: true }));
    getData(input)
      .then((query) => {
        this.setState(setQuery([...query], this.state.query), () => {
          this.props.history.push('/');
          this.setState(() => ({ isLoading: false }));
        });
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState(setInput(event.target.value));
  }

  render() {
    const { input, query = [], isLoading } = this.state;
    return (
      <Fragment>
        <div className=".container-fluid animate fadeIn">
          <SearchForBook
            input={input}
            onChange={this.handleChange}
            onClick={this.handleSubmit}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                isLoading ? (
                  <Spinner />
                ) : (
                  <BookList
                    {...props}
                    query={query}
                    onBookClick={this.handleClick}
                  />
                )
              }
            />
            <Route path="/:id" render={() => <BookDetailed />} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(BookFinder);
