import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';

import { getData } from './helpers/helpers';

import './assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css';

import SearchForBook from './components/searchForBook';
import BookList from './components/bookList';
import BookDetailed from './components/bookDetailed';

class BookFinder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      query: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { query } = this.state;
    if (Array.isArray(query) && !query.length) {
      this.setState({ query: JSON.parse(localStorage.getItem('query')) });
    }
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
      .then((query) => {
        this.setState({
          query: [...query],
        });
        return query;
      })
      .then((query) => localStorage.setItem('query', JSON.stringify(query)));
    this.setState({ input: null });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    const { input, activeBook, query = [] } = this.state;
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
            <Route path="/:id" render={(props) => <BookDetailed />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BookFinder;
