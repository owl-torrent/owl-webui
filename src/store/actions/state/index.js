import types from "./actionTypes";
import API from "../../../api"

export const getInitialState = () => async (dispatch) => {
    const { data } = await API.state.get()
    dispatch({
        type: types.INIT_STATE,
        payload: { ...data },
    });
};