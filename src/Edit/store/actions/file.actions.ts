import { Action, createAction, ThunkAction } from "@reduxjs/toolkit";
import { msalInstance } from "../../../auth/client";
import { loginRequest } from "../../../auth/config";
import { State } from "../../../store/state";
import { FlavorDictionary } from "../../models/brand";
import { fromSaveFile, SaveFileV1, toSaveFile } from "../../models/file";
import { BrandListState, MealListState } from "../state";

const actionPrefix = '[File] ';

export const loadFileStarted = createAction(actionPrefix + 'Load Started');
export const loadFileSucceeded = createAction<{ brands: BrandListState, meals: MealListState }>(actionPrefix + 'Load Succeeded');
export const loadFileFailed = createAction<number>(actionPrefix + 'Load Failed');

export function loadFile(id: string): ThunkAction<Promise<void>, State, unknown, Action> {
  return async function loadFileThunk(dispatch, _getState): Promise<void> {
    try {
      dispatch(loadFileStarted());

      let authToken: string;
      try {
        const authRes = await msalInstance.acquireTokenSilent(loginRequest);
        authToken = authRes.accessToken;
      } catch (e) {
        try {
          const authRes = await msalInstance.acquireTokenPopup(loginRequest);
          authToken = authRes.accessToken;
        } catch (e2) {
          dispatch(loadFileFailed(-2));
          return;
        }
      }

      const fileResponse = await fetch('https://graph.microsoft.com/v1.0/drive/items/' + encodeURIComponent(id) + '/content', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Authorization": "Bearer " + authToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!fileResponse.ok) {
        dispatch(loadFileFailed(fileResponse.status));
        return;
      }

      const resp: SaveFileV1 = await fileResponse.json();

      if (resp.version !== 1) {
        dispatch(loadFileFailed(-3));
        return;
      }

      dispatch(loadFileSucceeded(fromSaveFile(resp)));

    } catch (e) {
      dispatch(loadFileFailed(-1));
    }
  }
}


export const saveFileStarted = createAction(actionPrefix + 'Save Started');
export const saveFileSucceeded = createAction(actionPrefix + 'Save Succeeded');
export const saveFileFailed = createAction<number>(actionPrefix + 'Save Failed');

export function saveFile(id: string): ThunkAction<Promise<void>, State, unknown, Action> {
  return async function saveFileThunk(dispatch, getState): Promise<void> {
    try {
      const state = getState();
      const saveFile = toSaveFile(state.edit.brands.data, state.edit.meals.data);

      dispatch(saveFileStarted());

      let authToken: string;
      try {
        const authRes = await msalInstance.acquireTokenSilent(loginRequest);
        authToken = authRes.accessToken;
      } catch (e) {
        try {
          const authRes = await msalInstance.acquireTokenPopup(loginRequest);
          authToken = authRes.accessToken;
        } catch (e2) {
          dispatch(loadFileFailed(-2));
          return;
        }
      }

      const fileResponse = await fetch('https://graph.microsoft.com/v1.0/drive/items/' + encodeURIComponent(id) + '/content', {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Authorization": "Bearer " + authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveFile)
      });

      if (!fileResponse.ok) {
        dispatch(saveFileFailed(fileResponse.status));
        return;
      }
      dispatch(saveFileSucceeded());

    } catch (e) {
      dispatch(saveFileFailed(-1));
    }
  }
}

export const returnToContent = createAction(actionPrefix + 'Return to content')