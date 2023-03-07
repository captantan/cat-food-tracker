import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { loginRequest } from './auth/config';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoadingDisplay } from './components/LoadingDisplay';
import { EditFeature } from './Edit/EditFeature';
import { OpenFeature } from './Open/OpenFeature';

function App() {
  return (
    <MsalAuthenticationTemplate
    interactionType={InteractionType.Redirect} 
    authenticationRequest={loginRequest} 
    errorComponent={(props) => {
      console.error(props.error);
      return (<ErrorDisplay
        title="Login Failed"
        onClick={() => props.login(InteractionType.Redirect)}
        body="An error occurred trying to log you in.  Please try again."
      />)
    }} 
    loadingComponent={() => <LoadingDisplay text="Requesting login..." />}>
      <Routes>
        <Route index element={<Navigate to="/open" />}/>
        <Route path="open/*" element={<OpenFeature/>} />
        <Route path="edit/:fileId/*" element={<EditFeature />} />
      </Routes>
    </MsalAuthenticationTemplate>
  );
}

export default App;
