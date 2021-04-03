import { JoalState } from "../../modules/api/types";


export interface SeedStartedPayload extends Pick<JoalState, "global" | "client"> {
}

export interface SeedStoppedPayload {}