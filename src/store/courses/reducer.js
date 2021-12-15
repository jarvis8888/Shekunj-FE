import { coursesTypes } from "./types";

const initialState = {
  isLoading: false,
  courses: [],
  course: {},
  tests: [],
  courseModulesList: [],
  error: null,
  moduleprogress: 0,
  similarCourses: [],
  question: {},
  questionCount : {}
};

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case coursesTypes.COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.COURSES_FINISH:
      return {
        ...state,
        isLoading: false,
        courses: action.payload,
        tests: action.payload2,
        error: null,
      };
    case coursesTypes.COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case coursesTypes.TESTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.TESTS_FINISH:
      return {
        ...state,
        isLoading: false,
        tests: action.payload,
        error: null,
      };
    case coursesTypes.TESTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case coursesTypes.COURSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.COURSE_FINISH:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
        error: null,
        moduleprogress: action.progress,
      };

    case coursesTypes.COURSE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case coursesTypes.ACCORDIAN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.ACCORDIAN_LIST_FINISH:
      return {
        ...state,
        isLoading: false,
        courseModulesList: action.payload,
        error: null,
      };

    case coursesTypes.ACCORDIAN_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.SIMILAR_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.SIMILAR_COURSES_FINISH:
      return {
        ...state,
        isLoading: false,
        similarCourses: action.payload,
        error: null,
      };

    case coursesTypes.SIMILAR_COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case coursesTypes.TEST_QUEDTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.TEST_QUEDTION_FINISH:
      return {
        ...state,
        isLoading: false,
        question: action.payload,
        error: null,
      };
    case coursesTypes.TEST_QUEDTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.POST_ANSWER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.POST_ANSWER_FINISH:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case coursesTypes.POST_ANSWER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.QUESTION_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.QUESTION_COUNT_FINISH:
      return {
        ...state,
        isLoading: false,
        questionCount : action.payload,
        error: null,
      };
    case coursesTypes.QUESTION_COUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
