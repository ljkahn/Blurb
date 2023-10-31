import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Outlet} from 'react-router-dom';
//Can we use hash router here for the pages
//Would need to import all componenets and pages if so 


import './App.css' //change to styles folder 

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
}); 

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {


  return (
    <ApolloProvider client={client}>

    </ApolloProvider>
  )
}

export default App
