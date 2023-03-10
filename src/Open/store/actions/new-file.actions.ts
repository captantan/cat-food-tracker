import { Action, createAction, ThunkAction } from '@reduxjs/toolkit';
import { msalInstance } from '../../../auth/client';
import { loginRequest } from '../../../auth/config';
import { SaveFileV1 } from '../../../Edit/models/file';
import { State } from '../../../store/state';
import { openActionPrefix } from '../../feature.const';
import { NavigateFunction } from 'react-router';

const actionPrefix = openActionPrefix + '[New File] ';

export const openDialog = createAction(actionPrefix + 'Open Dialog');
export const closeDialog = createAction(actionPrefix + 'Close Dialog');

export const createStarted = createAction<string /* new file path */>(
  actionPrefix + 'Create Started',
);
export const createSucceeded = createAction(actionPrefix + 'Create Succeeded');
export const createFailed = createAction<number>(
  actionPrefix + 'Create Failed',
);

export function createFile(
  path: string,
  navigate: NavigateFunction,
): ThunkAction<Promise<void>, State, unknown, Action> {
  return async function loadFileThunk(dispatch, _getState): Promise<void> {
    try {
      dispatch(createStarted(path));

      let authToken: string;
      try {
        const authRes = await msalInstance.acquireTokenSilent(loginRequest);
        authToken = authRes.accessToken;
      } catch (e) {
        try {
          const authRes = await msalInstance.acquireTokenPopup(loginRequest);
          authToken = authRes.accessToken;
        } catch (e2) {
          dispatch(createFailed(-2));
          return;
        }
      }

      const newFileContentObj: SaveFileV1 = {
        version: 1,
        brands: [],
        meals: [],
      };
      const newFileContent = JSON.stringify(newFileContentObj);

      const uploadResponse = await fetch(
        'https://graph.microsoft.com/v1.0/me/drive/root:' +
          (path.startsWith('/') ? '' : '/') +
          path +
          ':/content',
        {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            Authorization: 'Bearer ' + authToken,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: newFileContent,
        },
      );

      if (!uploadResponse.ok) {
        dispatch(createFailed(uploadResponse.status));
        return;
      }

      const resp = await uploadResponse.json();
      const id = resp.id;

      dispatch(createSucceeded());
      navigate(`/edit/${encodeURIComponent(id)}`);
    } catch (e) {
      console.error('load content', e);
      dispatch(createFailed(-1));
    }
  };
}
