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


const Products = () => {
  const { data, loading, error } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const listItems = data.Merchant.productList.map((product) =>
    <li key={product.id}>{product.name}</li>
  );

  return (
    <>
      <h2>CAN YOU GUESS THE TOTAL VALUE OF THESE ITEMS FROM {data ? data.Merchant.name : 'Loading..'}</h2>
      {
        data ?
          <ul>
            {
              listItems
            }
          </ul>
          : ''
      }

      <Link to="/guess">I'M READY TO GUESS</Link>
    </>
  )
}

export default Products;