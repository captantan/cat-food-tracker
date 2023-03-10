import { createAction } from '@reduxjs/toolkit';
import { editActionPrefix } from '../../feature.const';
import { FilterDefinition } from '../../models/filter';

const actionPrefix = editActionPrefix + '[Filter] ';

export const initPage = createAction(actionPrefix + 'Init');
export const viewResults = createAction<FilterDefinition>(
  actionPrefix + 'View results',
);
export const returnToForm = createAction(actionPrefix + 'Return To Form');
