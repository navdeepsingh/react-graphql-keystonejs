import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";


const Home = () => {
  return (
    <>
      <Link to="/signup">JOIN</Link>
    </>
  )
}

export default Home;