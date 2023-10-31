import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Outlet} from 'react-router-dom';


import './App.css' //change to styles folder 

const httpLink = createHttpLink({
  uri: '/gr'
})

function App() {


  return (
    <>

    </>
  )
}

export default App
