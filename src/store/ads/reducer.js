import { adsTypes } from "./types";

const initialState = {
  isLoading: false,
  adsData: [],
  error: null,
};


export const adsReducer = (state = initialState, action) => {

  switch (action.type) {
       
    case adsTypes.ADS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case adsTypes.ADS_FINISH:
      return {
        ...state,
        isLoading: false,
        adsData: action.payload,
        error: null,
      };
    case adsTypes.ADS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};