import { Action, createAction, ThunkAction } from '@reduxjs/toolkit';
import { msalInstance } from '../../../auth/client';
import { loginRequest } from '../../../auth/config';
import { State } from '../../../store/state';
import { openActionPrefix } from '../../feature.const';
import { ContentState } from '../state';

const actionPrefix = openActionPrefix + '[Open] ';

export const loadContentStarted = createAction(actionPrefix + 'Load Started');
export const loadContentSucceeded = createAction<ContentState>(
  actionPrefix + 'Load Succeeded',
);
export const loadContentFailed = createAction<number>(
  actionPrefix + 'Load Failed',
);

export function loadContent(
  path: string,
): ThunkAction<Promise<void>, State, unknown, Action> {
  return async function loadFileThunk(dispatch, _getState): Promise<void> {
    try {
      dispatch(loadContentStarted());

      let authToken: string;
      try {
        const authRes = await msalInstance.acquireTokenSilent(loginRequest);
        authToken = authRes.accessToken;
      } catch (e) {
        try {
          const authRes = await msalInstance.acquireTokenPopup(loginRequest);
          authToken = authRes.accessToken;
        } catch (e2) {
          dispatch(loadContentFailed(-2));
          return;
        }
      }

      const fileResponse = await fetch(
        'https://graph.microsoft.com/v1.0/me/drive/root' +
          (path ? `:/${encodeURIComponent(path)}:/` : '/') +
          'children',
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            Authorization: 'Bearer ' + authToken,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (!fileResponse.ok) {
        dispatch(loadContentFailed(fileResponse.status));
        return;
      }

      const resp = await fileResponse.json();
      const res: ContentState = {
        folders: [],
        files: [],
      };

      // TODO: add a typedef for ms graph? (or install them)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (resp.value as any[]).forEach((element) => {
        if ('folder' in element) {
          res.folders.push(element.name);
        } else if (element.file?.mimeType === 'application/json') {
          res.files.push({ id: element.id, name: element.name });
        }
      });

      dispatch(loadContentSucceeded(res));
    } catch (e) {
      console.error('load content', e);
      dispatch(loadContentFailed(-1));
    }
  };
}
