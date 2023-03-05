import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { loginRequest } from './auth/config';
import { EditFeature } from './Edit/EditFeature';
import { OpenFeature } from './Open/OpenFeature';

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
        <Route index element={<Navigate to="/open" />}/>
        <Route path="open/*" element={<OpenFeature/>} />
        <Route path="edit/:fileId/*" element={<EditFeature />} />
      </Routes>
    </MsalAuthenticationTemplate>
  );
}

export default App;
