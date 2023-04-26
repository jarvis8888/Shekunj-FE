import Cookies from "js-cookie";

import { coursesTypes } from "./types";
import httpServices from "../../utils/ApiServices";
import { toast } from "react-toastify";
import { toasterConfig } from "../../utils";
import { apiConstants, routingConstants } from "../../utils/constants";

const constants = apiConstants.COURSES;

// export const noImage =
//   "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

export const allHomeCourses = () => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.HOME_COURSE_REQUEST });
    const res = await httpServices.get(constants.HOME);
    dispatch({
      type: coursesTypes.HOME_COURSE_FINISH,
      payload: res?.data?.popular_course
        ? res?.data?.popular_course?.map((c) => ({
            ...c,
            image: c.image ? c?.image : httpServices.noImage,
          }))
        : [],
      payload2: res?.data?.popular_career_test
        ? res?.data?.popular_career_test?.map((c) => ({
            ...c,
            image: c.image ? c?.image : httpServices.noImage,
          }))
        : [],
    });
  } catch (error) {
    dispatch({ type: coursesTypes.HOME_COURSE_FAIL });
  }
};

export const allCourses =
  (filter = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: coursesTypes.COURSES_REQUEST });
      const res = await httpServices.get(
        filter
          ? `${constants.COURSE_LIST + filter}`
          : `${constants.COURSE_LIST}?limit=5`,
      );
      dispatch({
        type: coursesTypes.COURSES_FINISH,
        payload: {
          ...res,
          results: res?.results
            ? res?.results?.map((c) => ({
                ...c,
                image: c.image ? c?.image : httpServices.noImage,
              }))
            : [],
        },
      });
    } catch (error) {
      dispatch({ type: coursesTypes.COURSES_FAIL });
    }
  };

export const allTests = () => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.TESTS_REQUEST });
    const res = await httpServices.get(constants.ONLINE_TEST_CATEGORY_LIST);
    // const res = await httpServices.get(url);
    dispatch({ type: coursesTypes.TESTS_FINISH, payload: res.data });
  } catch (error) {
    dispatch({ type: coursesTypes.TESTS_FAIL });
  }
};

export const singleCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.COURSE_REQUEST });
    const res = await httpServices.get(constants.COURSE_DETAIL + id + "/");
    dispatch({
      type: coursesTypes.COURSE_FINISH,
      payload: {
        ...res?.data,
        image: res?.data.image ? res?.data?.image : httpServices.noImage,
      },
    });
  } catch (error) {
    dispatch({ type: coursesTypes.COURSE_FAIL });
  }
};

export const startCourse =
  (id, page = 1, progress = 0, onLoad = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: coursesTypes.COURSE_REQUEST });
      const currentModule = Cookies.get("module");
      if (currentModule && !onLoad) {
        const singleCourse = await dispatch(getSingleCourseModule(id));
        if (singleCourse && singleCourse.length > 0) {
          progress = Math.round(100 / singleCourse.length || 0);
        }
      }
      const res = await httpServices.get(
        `${constants.START_USER_COURSE + id}?page=${page}&progress=${progress}`,
      );
      dispatch({
        type: coursesTypes.COURSE_FINISH,
        payload: res.data,
        progress: res.data.progress ? parseInt(res.data.progress, 10) : 0,
      });
    } catch (error) {
      dispatch({ type: coursesTypes.COURSE_FAIL });
    }
  };

export const getSingleCourseModule = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.ACCORDIAN_LIST_REQUEST });
    const res = await httpServices.get(constants.COURSE_MODULE_LIST + id + "/");
    dispatch({ type: coursesTypes.ACCORDIAN_LIST_FINISH, payload: res.data });
    return res?.data;
  } catch (error) {
    dispatch({ type: coursesTypes.ACCORDIAN_LIST_FAIL });
    return error;
  }
};

export const getSimilarCourses = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.SIMILAR_COURSES_REQUEST });
    const res = await httpServices.get(
      constants.CATEGORY_DETAIL + categoryId + "/",
    );
    dispatch({
      type: coursesTypes.SIMILAR_COURSES_FINISH,
      payload: res?.data?.course_set
        ? res?.data?.course_set?.map((c) => ({
            ...c,
            image: c.image ? c?.image : httpServices.noImage,
          }))
        : [],
    });
  } catch (error) {
    dispatch({ type: coursesTypes.SIMILAR_COURSES_FAIL });
  }
};

export const getUserTestQuestion =
  (id, history, module, progress) => async (dispatch) => {
    try {
      dispatch({ type: coursesTypes.TEST_QUEDTION_REQUEST });
      let res;
      if (module) {
        res = await httpServices.get(
          `${constants.USER_TEST_COURSE + id}?test_id=${module}`,
        );
      } else if (module && progress > 0) {
        res = await httpServices.get(
          `${
            constants.USER_TEST_COURSE + id
          }?test_id=${module}&progress=${progress}`,
        );
      } else if (progress && progress > 0) {
        res = await httpServices.get(
          `${constants.USER_TEST_COURSE + id}?progress=${progress}`,
        );
      } else {
        res = await httpServices.get(`${constants.USER_TEST_COURSE + id}`);
      }
      dispatch({ type: coursesTypes.TEST_QUEDTION_FINISH, payload: res.data });
    } catch (err) {
      if (err?.data?.status_code === 400) {
        if (err.data.message === "Already course test is completed") {
          const res = await httpServices.get(constants.USER_COURSE_RESULT + id);
          history?.push(routingConstants.COURSE_CERTIFICATE + res.data.id);
          toast.success(err.data.message, toasterConfig);
        } else {
          history?.push(routingConstants.COURSES_RESULT + id);
          window.localStorage.removeItem("isTestStarted");
        }
      } else if (err.data.status_code === 500) {
        history?.push(routingConstants.COURSES_RESULT + id);
        toast.error(err.data.message, toasterConfig);
      }
      dispatch({ type: coursesTypes.TEST_QUEDTION_FAIL });
    }
  };

export const postAnswer =
  (values, history, id, last = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: coursesTypes.POST_ANSWER_REQUEST });
      const res = await httpServices.post(
        constants.USER_TEST_COURSE + id,
        values,
      );
      dispatch({ type: coursesTypes.POST_ANSWER_FINISH });

      if (res.status_code === 200 && !last) {
        dispatch({ type: coursesTypes.QUESTION_COUNT_REQUEST });
        const res = await httpServices.get(constants.USER_TEST_COUNT + id);
        dispatch({
          type: coursesTypes.QUESTION_COUNT_FINISH,
          payload: res.data,
        });
      }

      if (res.status_code === 200 && last) {
        await httpServices.post(constants.USER_COURSE_END_TIME + id);
        history.push(routingConstants.COURSES_RESULT + id);
        window.localStorage.removeItem("isTestStarted");
      }
    } catch (err) {
      dispatch({ type: coursesTypes.POST_ANSWER_FAIL });
    }
  };

export const testCountSummery = (id, history) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.QUESTION_COUNT_REQUEST });
    const res = await httpServices.get(constants.USER_TEST_COUNT + id);
    dispatch({ type: coursesTypes.QUESTION_COUNT_FINISH, payload: res.data });
  } catch (err) {
    dispatch({ type: coursesTypes.QUESTION_COUNT_FAIL });
  }
};

export const successStories = (limit, offset, page) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.SUCCESS_STORY_REQUEST });
    const url =
      constants.SUCCESS_STORY + `?limit=${limit}&offset=${offset}&p=${page}`;
    const res = await httpServices.get(url);
    dispatch({
      type: coursesTypes.SUCCESS_STORY_FINISH,
      payload: res,
    });
  } catch (err) {
    dispatch({ type: coursesTypes.SUCCESS_STORY_FAIL });
  }
};
export const successStoriesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.SUCCESS_STORY_DETAILS_REQUEST });
    const res = await httpServices.get(constants.SUCCESS_STORY + id);
    dispatch({
      type: coursesTypes.SUCCESS_STORY_DETAILS_FINISH,
      payload: res?.data,
      // res?.data?.map((d) => ({
      //   ...d,
      //   image: d.image ? d?.image : httpServices.noImage,
      //   is_collapse: false,
      // })) || [],
    });
  } catch (err) {
    dispatch({ type: coursesTypes.SUCCESS_STORY_DETAILS_FAIL });
  }
};

export const getCategoryList = () => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.CATEGORY_LIST_REQUEST });
    const res = await httpServices.get(constants.CATEGORY_LIST);
    dispatch({ type: coursesTypes.CATEGORY_LIST_FINISH, payload: res.results });
  } catch (error) {
    dispatch({ type: coursesTypes.CATEGORY_LIST_FAIL });
  }
};

export const setFilter =
  (payload = null) =>
  async (dispatch) => {
    dispatch({ type: coursesTypes.SELECTED_FILTER, payload });
  };

export const endTest = (id, history) => async (dispatch) => {
  const res = await httpServices.post(constants.USER_COURSE_END_TIME + id);
  window.localStorage.removeItem("isTestStarted");
  if (res.status_code === 200 && history) {
    history?.push(routingConstants.COURSES_RESULT + id);
  }
};

export const testResult = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.RESULT_REQUEST });
    const res = await httpServices.get(constants.USER_COURSE_RESULT + id);
    dispatch({ type: coursesTypes.RESULT_FINISH, payload: res.data });
  } catch (err) {
    dispatch({ type: coursesTypes.RESULT_FINISH, payload: err.data });
  }
};
export const setCollapseSuccessStory = (id, action) => (dispatch, getState) => {
  const { coursesReducer } = getState();
  const { successStories } = coursesReducer;
  const updatedPayload = [...successStories];
  const idx = updatedPayload.findIndex((u) => u.id === id);
  if (idx !== -1) {
    updatedPayload[idx].is_collapse = action;
  }
  dispatch({
    type: coursesTypes.SUCCESS_STORY_FINISH,
    payload: updatedPayload,
  });
};

export const subModule = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.COURSE_REQUEST });
    const res = await httpServices.get(
      `/course/sub-course-module-detail/${id}`,
    );
    dispatch({
      type: coursesTypes.COURSE_FINISH,
      payload: res.data,
      progress: res.data.progress ? parseInt(res.data.progress, 10) : 0,
    });
    dispatch({
      type: coursesTypes.CURRENT_MODAL,
      payload: res?.data?.current_module,
    });
  } catch (err) {
    dispatch({ type: coursesTypes.COURSE_FAIL });
  }
};
