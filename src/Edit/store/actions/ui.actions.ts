import { createAction } from "@reduxjs/toolkit";
import { editActionPrefix } from "../../feature.const";

const actionPrefix = editActionPrefix + '[UI] ';

export const toggleDrawer = createAction(actionPrefix + 'Toggle Drawer');
export const closeDrawer = createAction(actionPrefix + 'Close Drawer');