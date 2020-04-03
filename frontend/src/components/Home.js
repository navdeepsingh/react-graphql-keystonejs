import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const query = gql`{
  Merchant(where: {id: "5e7c4d29d5fb7107e81ce6a9"}) {
    name,
    category{id},
    productList{
      id,
      name,
      image{
        filename
      }
    }
  }
}`


const Home = () => {
  const { data, loading, error } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <>
      <Link to="/join">JOIN</Link>
    </>
  )
}

export default Home;