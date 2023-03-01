import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { loginRequest } from './auth/config';
import { createEditFeature } from './Edit/EditFeture';

function App() {
  return (
    <MsalAuthenticationTemplate
    interactionType={InteractionType.Redirect} 
    authenticationRequest={loginRequest} 
    errorComponent={(e) => {
      console.error(e.error);
    return (<p>An error occured</p>)
    }} 
    loadingComponent={() => <p>Loading...</p>}>
      <Routes>
        <Route index element={<Navigate to="/edit" />}/>
        {createEditFeature('/edit')}
      </Routes>
    </MsalAuthenticationTemplate>
  );
}

export default App;
