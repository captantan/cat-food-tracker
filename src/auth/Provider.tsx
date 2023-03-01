import { MsalProvider } from '@azure/msal-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { msalInstance } from './client';
import { MsalNavigationClient } from './NavClient';

export const AppMsalProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const navigate = useNavigate();
  const navigationClient = new MsalNavigationClient(navigate);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  )
}