import { createAction } from "@reduxjs/toolkit";
import { JoalState } from "../../modules/api";

export const replaceWholeState = createAction<JoalState>('replaceWholeState')
