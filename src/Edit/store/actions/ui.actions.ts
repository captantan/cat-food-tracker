import { createAction } from "@reduxjs/toolkit";

const actionPrefix = '[UI] ';

export const toggleDrawer = createAction(actionPrefix + 'Toggle Drawer');
export const closeDrawer = createAction(actionPrefix + 'Close Drawer');