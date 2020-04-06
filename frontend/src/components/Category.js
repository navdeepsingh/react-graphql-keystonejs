import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const query = gql`{
  allCategories(first: 1) {
    id,
    name
  }
}`



const Category = () => {
  //const [category, setCategory] = useState({})
  const { data, loading, error } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <p>THIS WEEK'S CATEGORY</p>
      <h1>{data.allCategories[0].name}</h1>
      <Link to="/enter">ENTER</Link>
    </>
  )
}

export default Category;