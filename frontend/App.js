import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import MainContainer from './src/navigations/MainContainer'
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from './src/contexts/LoginProvider';

const App = () => {
  return(
    <ApplicationProvider {...eva} theme={eva.light}>
      <LoginProvider>
      <NavigationContainer>
    <MainContainer />
    </NavigationContainer>
    </LoginProvider>
    </ApplicationProvider>
  )
}

export default App;