import { toast } from "react-toastify";
import httpServices from "../../utils/ApiServices";
import { blogsTypes } from ".";
import { toasterConfig, ApiService } from "../../utils";
import { apiConstants, routingConstants } from "../../utils/constants";
import { handleErrorMessage } from "../../utils/utils";

const constants = apiConstants.ALL_BLOGS;

export const getAllBlogs = (lat="19.8508544",long="75.3762304") => async (dispatch) => {
  try {
    const url = constants.ALL_BLOGS+`?latitude=${lat}&longitude=${long}`;

    dispatch({ type: blogsTypes.FETCH_BLOGS_REQUEST });
    const res = await ApiService.get(url);
    console.log("resss", res);
    dispatch({
      type: blogsTypes.FETCH_BLOGS_FINISH,
      payload: { ...res?.data, is_collapse: false },
    });
  } catch (error) {
    dispatch({
      type: blogsTypes.FETCH_BLOGS_FAIL,
      payload: error?.data,
    });
    toast.error(handleErrorMessage(error), toasterConfig);
  }
};

export const singleBlogDetails = (id,lat="19.8508544",long="75.3762304") => async (dispatch) => {
  try {
    dispatch({ type: blogsTypes.FETCH_BLOGS_REQUEST });
    const res = await httpServices.get("more/blog" + "/" + id+`?latitude=${lat}&longitude=${long}`);
    dispatch({
      type: blogsTypes.FETCH_BLOGS_FINISH,
      // payload: {
      //   ...res?.data,
      //   image: res?.data.image ? res?.data?.image : httpServices.noImage,
      // },
      payload: { ...res?.data, is_collapse: false },
    });
    console.log("resSingleBlog",res)
  } catch (error) {
    dispatch({ type: blogsTypes.FETCH_BLOGS_FAIL });
  }
};

export const setCollapseBlogs = (id, action) => (dispatch, getState) => {
  const { blogsReducer } = getState();

  const { blogs } = blogsReducer;
  const { blog_list } = blogs;
  const updatedPayload = [...blog_list];
  const idx = updatedPayload?.findIndex((u) => u.id === id);

  if (idx !== -1) {
    console.log("idx!!! ", idx);
    updatedPayload[idx].is_collapse = action;
  }
  dispatch({
    type: blogsTypes.FETCH_BLOGS_FINISH,
    payload: { ...blogs, blog_list: updatedPayload },
  });
};
