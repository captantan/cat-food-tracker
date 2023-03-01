import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "7467afe9-b4c6-4e8c-b3cd-86febcfa68c3",
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "/",
    postLogoutRedirectUri: "/"
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "Files.ReadWrite"]
};
