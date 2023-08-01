import { coursesTypes } from ".";

const initialOwnership = {
  name: "Ownership",
  rows: [
    {
      id: 1,
      name: "private",
      isChecked: false,
      value: "private",
    },
    {
      id: 2,
      name: "government",
      isChecked: false,
      value: "government",
    },
  ],
};

const initialCourseSector = {
  name: "Stream",
  rows: [
    {
      id: 1,
      name: "Arts",
      isChecked: false,
      value: "Arts",
    },
    {
      id: 2,
      name: "Architecture",
      isChecked: false,
      value: "Architecture",
    },
    {
      id: 3,
      name: "Agriculture",
      isChecked: false,
      value: "Agriculture",
    },
    {
      id: 4,
      name: "Ayurveda",
      isChecked: false,
      value: "Ayurveda",
    },
    {
      id: 5,
      name: "Academic Courses",
      isChecked: false,
      value: "Academic Courses",
    },
    {
      id: 6,
      name: "Biotechnology",
      isChecked: false,
      value: "Biotechnology",
    },
    {
      id: 7,
      name: "Commerce",
      isChecked: false,
      value: "Commerce",
    },
    {
      id: 8,
      name: "Computer Application",
      isChecked: false,
      value: "Computer Application",
    },
    {
      id: 9,
      name: "Diploma",
      isChecked: false,
      value: "Diploma",
    },
    {
      id: 10,
      name: "Dental",
      isChecked: false,
      value: "Dental",
    },
    {
      id: 11,
      name: "Data Science",
      isChecked: false,
      value: "Data Science",
    },
    {
      id: 12,
      name: "Engineering",
      isChecked: false,
      value: "Engineering",
    },
    {
      id: 13,
      name: "Education",
      isChecked: false,
      value: "Education",
    },
    {
      id: 14,
      name: "Environmental Studies",
      isChecked: false,
      value: "Environmental Studies",
    },
    {
      id: 15,
      name: "Energy Technology",
      isChecked: false,
      value: "Energy Technology",
    },
    {
      id: 16,
      name: "Fashion",
      isChecked: false,
      value: "Fashion",
    },
    {
      id: 17,
      name: "Forest Management",
      isChecked: false,
      value: "Forest Management",
    },
    {
      id: 18,
      name: "Hotel Management",
      isChecked: false,
      value: "Hotel Management",
    },
    {
      id: 19,
      name: "Instrumentation",
      isChecked: false,
      value: "Instrumentation",
    },
    {
      id: 20,
      name: "Information Technology",
      isChecked: false,
      value: "Information Technology",
    },
    {
      id: 21,
      name: "Journolism",
      isChecked: false,
      value: "Journolism",
    },
    {
      id: 22,
      name: "Law",
      isChecked: false,
      value: "Law",
    },
    {
      id: 23,
      name: "Library Science",
      isChecked: false,
      value: "Library Science",
    },
    {
      id: 24,
      name: "Management",
      isChecked: false,
      value: "Management",
    },
    {
      id: 25,
      name: "Nano Technology",
      isChecked: false,
      value: "Nano Technology",
    },
    {
      id: 26,
      name: "Nursing",
      isChecked: false,
      value: "Nursing",
    },
    {
      id: 27,
      name: "Paramedical",
      isChecked: false,
      value: "Paramedical",
    },
    {
      id: 28,
      name: "Professional Courses",
      isChecked: false,
      value: "Professional Courses",
    },
    {
      id: 29,
      name: "Pharmacy",
      isChecked: false,
      value: "Pharmacy",
    },
    {
      id: 30,
      name: "Pharmaceutical Chemistery",
      isChecked: false,
      value: "Pharmaceutical Chemistery",
    },
    {
      id: 31,
      name: "Physics",
      isChecked: false,
      value: "Physics",
    },
    {
      id: 32,
      name: "Polytechnic",
      isChecked: false,
      value: "Polytechnic",
    },
    {
      id: 33,
      name: "Science",
      isChecked: false,
      value: "Science",
    },
    {
      id: 34,
      name: "Social work",
      isChecked: false,
      value: "Social work",
    },
  ],
};
// const initialOwnership = {
//   name: "Ownership",
//   rows: [
//     {
//       id: 1,
//       name: "Private",
//       isChecked: false,
//       value: "Private",
//     },
//     {
//       id: 2,
//       name: "Government",
//       isChecked: false,
//       value: "Government",
//     },
//   ],
// };
const initialCategory = {
  name: "Category",
  rows: [
    {
      id: 1,
      name: "Girls",
      isChecked: false,
      value: "Girls",
    },
    {
      id: 2,
      name: "Boys",
      isChecked: false,
      value: "Boys",
    },
    {
      id: 3,
      name: "Co-Ed",
      isChecked: false,
      value: "Co-Ed",
    },
  ],
};
const initialEducationBoard = {
  name: "Category",
  rows: [
    {
      id: 1,
      name: "ICSE/ISC",
      isChecked: false,
      value: "ICSE/ISC",
    },
    {
      id: 2,
      name: "Mp Board",
      isChecked: false,
      value: "Mp Board",
    },
    {
      id: 3,
      name: "State Board",
      isChecked: false,
      value: "State Board",
    },
    {
      id: 4,
      name: "MPBSE Board",
      isChecked: false,
      value: "MPBSE Board",
    },
    {
      id: 5,
      name: "CBSE",
      isChecked: false,
      value: "CBSE",
    },
  ],
};

const initialState = {
  isLoading: false,
  governmentExams: [],
  topCollages: [],
  topSchools: [],
  error: null,
  courseSector: initialCourseSector,
  lan: true,
  categoryList: initialCategory,
  educationBoard: initialEducationBoard,
  ownership: initialOwnership,
};

export const careerReducer = (state = initialState, action) => {
  switch (action.type) {
    case coursesTypes.GOVERNMENT_EXAM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.GOVERNMENT_EXAM_FINISH:
      return {
        ...state,
        isLoading: false,
        governmentExams: action.payload,
        error: null,
      };
    case coursesTypes.GOVERNMENT_EXAM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.TOP_COLLAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.TOP_COLLAGE_FINISH:
      return {
        ...state,
        isLoading: false,
        topCollages: action.payload,
        error: null,
      };
    case coursesTypes.TOP_COLLAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case coursesTypes.TOP_COLLAGE_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.TOP_COLLAGE_SEARCH_FINISH:
      return {
        ...state,
        isLoading: false,
        topCollages: action.payload,
        error: null,
      };
    case coursesTypes.TOP_COLLAGE_SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.TOP_SCHOOL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case coursesTypes.TOP_SCHOOL_FINISH:
      return {
        ...state,
        isLoading: false,
        topSchools: action.payload,
        error: null,
      };
    case coursesTypes.TOP_SCHOOL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case coursesTypes.GOVERNMENT_EXAM_FILTER_SET:
      const { data, type } = action.payload;
      if (type === "courseSector") {
        return {
          ...state,
          isLoading: false,
          courseSector: data,
        };
      }
      return {
        ...state,
        isLoading: false,
        governmentExams: data,
      };

    case coursesTypes.GOVERNMENT_EXAM_FILTER_RESET:
      return {
        ...state,
        isLoading: false,
        topCollages: {
          ...state.topCollages?.state_list,
          collage_stream_list: state.topCollages?.state_list?.map(
            (r) =>
              ({
                ...r,
                isChecked: false,
              } || []),
          ),
        },
        governmentExams: {
          ...state.governmentExams,
          govt_category:
            (Array.isArray(state.governmentExams?.govt_category) &&
              state.governmentExams?.govt_category?.map((r) => ({
                ...r,
                isChecked: false,
              }))) ||
            [],
        },
        topSchools: {
          ...state.governmentExams,
          board_list:
            state.topSchools?.govt_list?.map((r) => ({
              ...r,
              isChecked: false,
            })) || [],
          state_list:
            state.topSchools?.state_list?.map((r) => ({
              ...r,
              isChecked: false,
            })) || [],
          city_list:
            state.topSchools?.city_list?.map((r) => ({
              ...r,
              isChecked: false,
            })) || [],
          school_type:
            state.topSchools?.school_type?.map((r) => ({
              ...r,
              isChecked: false,
            })) || [],
        },
        courseSector: {
          ...initialCourseSector,
          rows: initialCourseSector.rows.map((r) => ({
            ...r,
            isChecked: false,
          })),
        },
        categoryList: {
          ...initialCategory,
          rows: initialCategory.rows.map((r) => ({
            ...r,
            isChecked: false,
          })),
        },
        educationBoard: {
          ...initialEducationBoard,
          rows: initialEducationBoard.rows.map((r) => ({
            ...r,
            isChecked: false,
          })),
        },
        ownership: {
          ...initialOwnership,
          rows: initialOwnership.rows.map((r) => ({
            ...r,
            isChecked: false,
          })),
        },
      };

    default:
      return state;
  }
};
