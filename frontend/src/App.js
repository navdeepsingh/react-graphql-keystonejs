import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ApolloProvider } from 'react-apollo'; // Allows to fetch data from GraphQL server
import { ApolloClient } from 'apollo-client'; // Caching GraphQL client
import { createHttpLink } from 'apollo-link-http'; // system of modular components for GraphQL networking
import { InMemoryCache } from 'apollo-cache-inmemory'; // Cache Implementation

import Home from "./components/Home";
import Signup from "./components/Signup";
import './sass/styles.scss'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/admin/api'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



const App = () => {
  return (
    <>
      <h1>MERN APP</h1>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/join">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App;