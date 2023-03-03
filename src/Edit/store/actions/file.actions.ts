import { Action, createAction, ThunkAction } from "@reduxjs/toolkit";
import { msalInstance } from "../../../auth/client";
import { loginRequest } from "../../../auth/config";
import { State } from "../../../store/state";
import { Brand, Flavor } from "../../models/brand";
import { MealEntry } from "../../models/meal";
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

      const metaResponse = await fetch('https://graph.microsoft.com/v1.0/drive/items/' + encodeURIComponent(id), {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Authorization": "Bearer " + authToken,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!metaResponse.ok) {
        dispatch(loadFileFailed(metaResponse.status));
        return;
      }

      const metaObj = await metaResponse.json();
      const downloadURI = metaObj['@microsoft.graph.downloadUrl'];

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

      const fileResponse = await fetch(downloadURI, {
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

      const resp = await fileResponse.json();

      if (resp.version !== 1) {
        dispatch(loadFileFailed(-3));
        return;
      }

      dispatch(loadFileSucceeded({
        brands: (resp.brands as Array<Omit<Brand, 'flavors'> & { flavors: Flavor[] }>).reduce((dict, brand) => {
          dict[brand.id] = {
            ...brand,
            flavors: brand.flavors.reduce((fDict, flavor) => {
              fDict[flavor.id] = flavor;
              return fDict;
            }, {} as Brand['flavors'])
          }
          return dict;
        }, {} as BrandListState), meals: (resp.meals as MealEntry[]).reduce((dict, meal) => {
          dict[meal.id] = meal;
          return dict
        }, {} as MealListState)
      }));

    } catch (e) {
      dispatch(loadFileFailed(-1));
    }
  }
}