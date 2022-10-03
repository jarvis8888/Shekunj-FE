import { blogsTypes } from ".";

const initialState = {
  isLoading: false,
  error: null,
  blogs: [],
};

export const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogsTypes.FETCH_BLOGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case blogsTypes.FETCH_BLOGS_FINISH:
      return {
        ...state,
        
        blogs: action.payload,
        error: null,
        isLoading: false,
      };
    case blogsTypes.FETCH_BLOGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
