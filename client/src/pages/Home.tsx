import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_USER } from '../graphql/queries';

export const Home = () => {
  const { loading, data } = useQuery(GET_USER);
  console.log(data);
  return <div>Hello World.</div>;
};
