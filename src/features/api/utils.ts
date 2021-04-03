import { createAction } from "@reduxjs/toolkit";
import { JoalState } from "../../modules/api/types";

export const replaceWholeState = createAction<JoalState>('replaceWholeState')
