import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ApolloProvider } from 'react-apollo'; // Allows to fetch data from GraphQL server
import { ApolloClient } from 'apollo-client'; // Caching GraphQL client
import { createHttpLink } from 'apollo-link-http'; // system of modular components for GraphQL networking
import { InMemoryCache } from 'apollo-cache-inmemory'; // Cache Implementation

import Context from './context';
import reducer from './reducer';

import Home from "./components/Home";
import Signup from "./components/Signup";
import Category from "./components/Category";
import Products from "./components/Products";
import Guess from "./components/Guess";
import './sass/styles.scss'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/admin/api'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>MERN APP</h1>
      <ApolloProvider client={client}>
        <Router>
          <Context.Provider value={{ state, dispatch }}>
            <Switch>
              <Route path="/guess" component={Guess} />
              <Route path="/enter" component={Products} />
              <Route path="/join" component={Category} />
              <Route path="/signup" component={Signup} />
              <Route path="/" component={Home} />
            </Switch>
          </Context.Provider>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App;