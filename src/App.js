import React from 'react';
import { Routs } from './config';
import { UserContextProvider } from './context/Context';



const App = () => {

  return (
    <>
      <UserContextProvider>
        <Routs />
      </UserContextProvider>
    </>
  );
}

export default App;
