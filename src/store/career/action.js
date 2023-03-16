import { ColorLensOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

import { coursesTypes } from ".";
import httpServices from "../../utils/ApiServices";
import { apiConstants } from "../../utils/constants";
import toasterConfig from "../../utils/toasterCongig";

const constants = apiConstants.CAREER;

export const getGovernmentExams =
  (filter = null,limit=null,offset=null) =>
    async (dispatch, getState) => {
      try {
        let url = constants.GOVERNMENT_SCHEMES+`?limit=${limit}&offset=${offset}`;
        const { governmentExams } = getState().careerReducer;
        if (filter) {
          const foundExams = governmentExams?.govt_category?.filter(
            (r) => r?.isChecked,
          );
          if (foundExams?.length > 0) {
            url = `${url}&govt_category_id__in=${foundExams
              .map((r) => r?.id)
              .join(",")}`;
          }
        }
        dispatch({ type: coursesTypes.GOVERNMENT_EXAM_REQUEST });
        const res1 = await httpServices.get(url
        //   , navigator.geolocation.getCurrentPosition(async function (
        //   position,
        //   values,
        // ) {
        //   console.log("response+++77", res);
        //   const latitude = position.coords.latitude;
        //   const longitude = position.coords.longitude;
  
        //   let params = {
        //     latitude: latitude.toString(),
        //     longitude: longitude.toString(),
        //   };
        //   console.log("response+++", params);
        //   // let result = await httpServices.put(
        //   //   constants.LOCATION + res.data.id + "/",
        //   //   params,
        //   // );
        //   // console.log("location_resultRegister", result);
        // }),
      );
      const res={data:res1}
        let updatedResponse = res?.data;
        const { govt_category } = res?.data;
        if (govt_category?.length > 0) {
          updatedResponse.govt_category = govt_category.map((g) => {
            g.isChecked = false;
            const foundCollageStream = governmentExams.govt_category?.filter(
              (r) => r.isChecked,
            );
            if (foundCollageStream?.length > 0) {
              foundCollageStream.forEach((f) => {
                if (f.id === g.id) g.isChecked = true;
              });
            }
            return g;
          });
        }
        dispatch({
          type: coursesTypes.GOVERNMENT_EXAM_FINISH,
          payload: updatedResponse,
        });
      } catch (error) {
        dispatch({
          type: coursesTypes.GOVERNMENT_EXAM_FAIL,
          payload: error?.data,
        });
        toast.error(error?.data?.message, toasterConfig);
      }
    };

const handleTopSchoolsFilter = (topSchools, courseSector,ownership,limit,offset,search,latitude,longitude) => {
  const url = constants.TOP_SCHOOL_LIST;
  const stateList = topSchools?.state_list?.filter((r) => r?.isChecked);
  let stateIdString = undefined;
  let searchString=search!==""?search:''
  if (stateList?.length > 0) {
    stateIdString = `state__in=${stateList.map((r) => r?.name).join(",")}`;
  }
  const cityList = topSchools?.city_list?.filter((r) => r?.isChecked);
  let cityIdString = undefined;
  if (cityList?.length > 0) {
    cityIdString = `city__in=${cityList.map((r) => r?.name).join(",")}`;
  }

  const categoryList = topSchools?.gender_intech?.filter((r) => r?.isChecked);
  let categoryIdString = undefined;
  if (categoryList?.length > 0) {
    categoryIdString = `gender_intech__in=${categoryList.map((r) => r?.name).join(",")}`;
  }
  const boardList = topSchools?.board_list?.filter((r) => r?.isChecked);
  let boardIdString = undefined;
  if (boardList?.length > 0) {
    boardIdString = `board_type__in=${boardList.map((r) => r?.name).join(",")}`;
  }
  // const schoolList = topSchools?.school_type?.filter((r) => r?.isChecked);
  // let schoolIdString = undefined;
  // if (schoolList?.length > 0) {
  //   schoolIdString = `school_type__in=${schoolList
  //     .map((r) => r?.name)
  //     .join(",")}`;
  // }
  const schoolList = ownership?.rows?.filter((r) => r?.isChecked);
  let schoolIdString = undefined;
  if (schoolList?.length > 0) {
    schoolIdString = `school_type__in=${schoolList
          .map((r) => r?.name)
          .join(",")}`;
      }

      // const collageList = ownership?.rows?.filter((r) => r?.isChecked);
      // let collageIdString = undefined;
      // if (collageList?.length > 0) {
      //   collageIdString = `collage_type__in=${collageList
      //     .map((r) => r?.name)
      //     .join(",")}`;
      // }
  if (stateIdString && !cityIdString && !categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && !categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${cityIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && !cityIdString && categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${categoryIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!stateIdString && !cityIdString && !categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${boardIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!stateIdString && !cityIdString && !categoryIdString && !boardIdString && schoolIdString) {
    return `${url}?${schoolIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  //222
  if (stateIdString && cityIdString && !categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${categoryIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && !categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && !categoryIdString && !boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${cityIdString}&${categoryIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && !categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${cityIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && !categoryIdString && !boardIdString && schoolIdString) {
    return `${url}?${cityIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && !cityIdString && categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${categoryIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!stateIdString && !cityIdString && categoryIdString && !boardIdString && schoolIdString) {
    return `${url}?${categoryIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!stateIdString && !cityIdString && !categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  //333
  if (stateIdString && cityIdString && categoryIdString && !boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${categoryIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${categoryIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && !categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${cityIdString}&${categoryIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && !categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${cityIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && !cityIdString && categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${categoryIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (stateIdString && cityIdString && !categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  //444
  if (stateIdString && cityIdString && categoryIdString && boardIdString && !schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${categoryIdString}&${boardIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (!stateIdString && cityIdString && categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${cityIdString}&${categoryIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && !cityIdString && categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${categoryIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && cityIdString && !categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  if (stateIdString && cityIdString && categoryIdString && !boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${categoryIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }

  //55
  if (stateIdString && cityIdString && categoryIdString && boardIdString && schoolIdString) {
    return `${url}?${stateIdString}&${cityIdString}&${categoryIdString}&${boardIdString}&${schoolIdString}&limit=${limit}&offset=${offset}${searchString}`;
  }
  return url+`?limit=${limit}&offset=${offset}${searchString}&latitude=${latitude}&longitude=${longitude}`;
};

export const getTopSchools =
  ({search="",filter = false,latitude=null,longitude=null,limit=10,offset=0}) =>
    async (dispatch, getState) => {
      console.log(latitude,longitude)
      try {
        // const ngrok='career/top-school-list/'
        const url = constants.TOP_SCHOOL_LIST+`?latitude=${latitude}&longitude=${longitude}&limit=${limit}&offset=${offset}`;
        // const url = ngrok+`?latitude=${lat}&longitude=${long}&limit=${limit}&offset=${offset}`;
        const { topSchools, courseSector,ownership } = getState().careerReducer;
        dispatch({ type: coursesTypes.TOP_SCHOOL_REQUEST });
        const res = await httpServices.get(
          filter === true ? handleTopSchoolsFilter(topSchools, courseSector, ownership,limit,offset,search,latitude,longitude)
            : search!=="" ? url + search : url
            // , navigator.geolocation.getCurrentPosition(async function (
            //   position,
            //   values,
            // ) {
            //   console.log("response+++topSchool", res);
            //   const latitude = position.coords.latitude;
            //   const longitude = position.coords.longitude;
      
            //   let params = {
            //     latitude: latitude.toString(),
            //     longitude: longitude.toString(),
            //   };
            //   console.log("response+++TopSchool", params);
            //   // let result = await httpServices.put(
            //   //   constants.LOCATION + res.data.id + "/",
            //   //   params,
            //   // );
            //   // console.log("location_resultRegister", result);
            // }),
          );
        let updatedPayload = res//res?.data;
        let updatedResponse = res//res?.data;
        updatedResponse.state_list = updatedResponse?.state_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );
        updatedResponse.city_list = updatedResponse?.city_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );
        updatedResponse.gender_intech = updatedResponse?.gender_intech?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );
        updatedResponse.board_list = updatedResponse?.board_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );
        updatedResponse.school_type = updatedResponse?.school_type?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );
        const { state_list, board_list, city_list, gender_intech, school_type } = updatedResponse;
        if (state_list?.length > 0) {
          updatedPayload.state_list = state_list.map((r) => {
            r.isChecked = false;
            const foundStateList = topSchools?.state_list?.filter(
              (r) => r.isChecked,
            );
            if (foundStateList?.length > 0) {
              foundStateList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }
        if (city_list?.length > 0) {
          updatedPayload.city_list = city_list.map((r) => {
            r.isChecked = false;
            const foundCityList = topSchools?.city_list?.filter(
              (r) => r.isChecked,
            );
            if (foundCityList?.length > 0) {
              foundCityList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }

        if (school_type?.length > 0) {
          updatedPayload.school_type = school_type.map((r) => {
            r.isChecked = false;
            const foundSchoolList = topSchools?.school_type?.filter(
              (r) => r.isChecked,
            );
            if (foundSchoolList?.length > 0) {
              foundSchoolList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }
        if (gender_intech?.length > 0) {
          updatedPayload.gender_intech = gender_intech.map((r) => {
            r.isChecked = false;
            const foundCategoryList = topSchools?.gender_intech?.filter(
              (r) => r.isChecked,
            );
            if (foundCategoryList?.length > 0) {
              foundCategoryList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }

        if (board_list?.length > 0) {
          updatedPayload.board_list = board_list.map((r) => {
            r.isChecked = false;
            const foundBoardList = topSchools?.board_list?.filter(
              (r) => r.isChecked,
            );
            if (foundBoardList?.length > 0) {
              foundBoardList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }
        dispatch({
          type: coursesTypes.TOP_SCHOOL_FINISH,
          payload: updatedPayload,
        });
      } catch (error) {
        dispatch({ type: coursesTypes.TOP_SCHOOL_FAIL, payload: error?.data });
        toast.error(error?.data?.message, toasterConfig);
      }
    };

const handleTopCollagesFilter = (topCollages, courseSector,ownership,limit,offset,search,latitude,longitude) => {

  const url = constants.TOP_COLLEGE_LIST;
  const stateList = topCollages?.state_list?.filter((r) => r?.isChecked);

  let stateIdString = undefined;
  if (stateList?.length > 0) {
    stateIdString = `state__in=${stateList.map((r) => r?.name).join(",")}`;
  }

  const cityList = topCollages?.city_list?.filter((r) => r?.isChecked);

  let cityIdString = undefined;
  if (cityList?.length > 0) {
    cityIdString = `city__in=${cityList.map((r) => r?.name).join(",")}`;
  }

  const streamList = courseSector?.rows?.filter(
    (r) => r?.isChecked,
  );
  let streamIdString = undefined;
  if (streamList?.length > 0) {
    streamIdString = `search=${streamList
      .map((r) => r?.value)
      }`;
  }

  // const collageList = topCollages?.college_type?.filter((r) => r?.isChecked);
  // let collageIdString = undefined;
  // if (collageList?.length > 0) {
  //   collageIdString = `collage_type__in=${collageList
  //     .map((r) => r?.name)
  //     .join(",")}`;
  // }
    const collageList = ownership?.rows?.filter((r) => r?.isChecked);
  let collageIdString = undefined;
  if (collageList?.length > 0) {
    collageIdString = `collage_type__in=${collageList
      .map((r) => r?.name)
      .join(",")}`;
  }




  if (streamIdString && !collageIdString && !stateIdString && !cityIdString) {
    return `${url}?${streamIdString}&limit=${limit}&offset=${offset}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!streamIdString && !collageIdString && !stateIdString && cityIdString) {
    return `${url}?${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (!streamIdString && !collageIdString && stateIdString && !cityIdString) {
    return `${url}?${stateIdString}&limit=${limit}&offset=${offset}`;
  }
  if (!streamIdString && collageIdString && !stateIdString && !cityIdString) {
    return `${url}?${collageIdString}&limit=${limit}&offset=${offset}&latitude=${latitude}&longitude=${longitude}`;
  }


  if (streamIdString && collageIdString && !stateIdString && !cityIdString) {
    return `${url}?${streamIdString}&${collageIdString}&limit=${limit}&offset=${offset}&latitude=${latitude}&longitude=${longitude}`;
  }
  if (!streamIdString && !collageIdString && stateIdString && cityIdString) {
    return `${url}?${stateIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (streamIdString && !collageIdString && stateIdString && !cityIdString) {
    return `${url}?${streamIdString}&${stateIdString}&limit=${limit}&offset=${offset}`;
  }
  if (!streamIdString && collageIdString && !stateIdString && cityIdString) {
    return `${url}?${collageIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (streamIdString && !collageIdString && !stateIdString && cityIdString) {
    return `${url}?${streamIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (!streamIdString && collageIdString && stateIdString && !cityIdString) {
    return `${url}?${collageIdString}&${stateIdString}&limit=${limit}&offset=${offset}`;
  }



  if (streamIdString && collageIdString && stateIdString && !cityIdString) {
    return `${url}?${streamIdString}&${collageIdString}&${stateIdString}&limit=${limit}&offset=${offset}`;
  }
  if (streamIdString && collageIdString && !stateIdString && cityIdString) {
    return `${url}?${streamIdString}&${collageIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (streamIdString && !collageIdString && stateIdString && cityIdString) {
    return `${url}?${streamIdString}&${stateIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (!streamIdString && collageIdString && stateIdString && cityIdString) {
    return `${url}?${collageIdString}&${stateIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  if (streamIdString && collageIdString && stateIdString && cityIdString) {
    return `${url}?${streamIdString}&${collageIdString}&${stateIdString}&${cityIdString}&limit=${limit}&offset=${offset}`;
  }
  return url+`?limit=${limit}&offset=${offset}&latitude=${latitude}&longitude=${longitude}`;
};

export const getTopCollages =
  ({search="",filter=false,latitude=null, longitude=null, limit=10, offset=0}) =>
    async (dispatch, getState) => {

      try {

        const url = constants.TOP_COLLEGE_LIST+`?latitude=${latitude}&longitude=${longitude}&limit=${limit}&offset=${offset}`;
        // const url1 = constants.TOP_COLLEGE_LIST;

        const { courseSector, topCollages,ownership } = getState().careerReducer;
        dispatch({ type: coursesTypes.TOP_COLLAGE_REQUEST });

        let res1 = await httpServices.get(
          filter === true ? handleTopCollagesFilter(topCollages, courseSector,ownership,limit,offset,search,latitude,longitude)
            : search!=="" ? url + search : url
            
          );
         const res={data:res1}
        let updatedPayload = res?.data;
        let updatedResponse = res?.data;

        updatedResponse.state_list = updatedResponse?.state_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );

        updatedResponse.city_list = updatedResponse?.city_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );

        updatedResponse.board_list = updatedResponse?.board_list?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );

        updatedResponse.college_type = updatedResponse?.college_type?.map(
          (obj, idx) => ({
            id: idx,
            name: obj,
            isChecked: false,
          }),
        );

        const { state_list } = updatedResponse;
        if (state_list?.length > 0) {

          updatedPayload.state_list = state_list.map((r) => {
            r.isChecked = false;
            const foundStateList = topCollages?.state_list?.filter(
              (r) => r.isChecked,
            );
            if (foundStateList?.length > 0) {
              foundStateList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }

        const { city_list } = updatedResponse;
        if (city_list?.length > 0) {

          updatedPayload.city_list = city_list.map((r) => {
            r.isChecked = false;
            const foundCityList = topCollages?.city_list?.filter(
              (r) => r.isChecked,
            );
            if (foundCityList?.length > 0) {
              foundCityList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }

        const { college_type } = updatedResponse;
        if (college_type?.length > 0) {

          updatedPayload.college_type = college_type.map((r) => {
            r.isChecked = false;
            const foundCollegeList = topCollages?.college_type?.filter(
              (r) => r.isChecked,
            );
            if (foundCollegeList?.length > 0) {
              foundCollegeList.forEach((f) => {
                if (f.name === r.name) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }


        if (res?.data?.collage_stream_list?.length > 0) {
          updatedResponse = res?.data?.collage_stream_list.map((r) => {
            r.isChecked = false;
            const foundCollageStream = topCollages?.collage_stream_list?.filter(
              (r) => r.isChecked,
            );
            if (foundCollageStream?.length > 0) {
              foundCollageStream.forEach((f) => {
                if (f.id === r.id) {
                  r.isChecked = true;
                }
              });
            }
            return r;
          });
        }
        
        dispatch({
          type: coursesTypes.TOP_COLLAGE_FINISH,
          payload: {
            ...res?.data,
            collage_stream_list: updatedResponse,
            collage_list:
            { ...res?.data?.collage_list,
              results:res?.data?.collage_list?.results?.map((r) => ({
              ...r,
              is_collapse: false,
            }))} || [],
          },
        });
      } catch (error) {
        dispatch({ type: coursesTypes.TOP_COLLAGE_FAIL, payload: error?.data });
        toast.error(error?.data?.message, toasterConfig);
      }
    };


export const singleCareerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.TOP_COLLAGE_REQUEST });
    const res = await httpServices.get("career/top-collage" + "/" + id);
    dispatch({
      type: coursesTypes.TOP_COLLAGE_FINISH,
      payload: {
        ...res?.data,
        image: res?.data.image ? res?.data?.image : httpServices.noImage,
      },
    });
  } catch (error) {
    dispatch({ type: coursesTypes.TOP_COLLAGE_FAIL });
  }
};

export const singleCareer1Details = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.TOP_SCHOOL_REQUEST });
    const res = await httpServices.get("career/top-school" + "/" + id);
    dispatch({
      type: coursesTypes.TOP_SCHOOL_FINISH,
      payload: {
        ...res?.data,
        image: res?.data.image ? res?.data?.image : httpServices.noImage,
      },
    });
  } catch (error) {
    dispatch({ type: coursesTypes.TOP_SCHOOL_FAIL });
  }
};

export const singleCareer2Details = (id) => async (dispatch) => {
  try {
    dispatch({ type: coursesTypes.TOP_SCHOOL_REQUEST });
    const res = await httpServices.get("career/government-exam" + "/" + id);

    dispatch({
      type: coursesTypes.GOVERNMENT_EXAM_FINISH,
      payload: {
        ...res?.data,
        image: res?.data.image ? res?.data?.image : httpServices.noImage,
      },
    });
  } catch (error) {
    dispatch({ type: coursesTypes.GOVERNMENT_EXAM_FAIL });
  }
};


export const setFilterValue =
  ({id, checked:action, type:arrayType, subType,limit,offset,latitude,longitude}) => async (dispatch, getState) => {
    const { courseSector, topCollages, topSchools, governmentExams, ownership } =
      getState().careerReducer;
    if (arrayType === "governmentExam") {
      const updatedPayload = governmentExams;
      const idx = updatedPayload?.govt_category?.findIndex((u) => u.id === id);
      if (idx !== -1) {
        updatedPayload.govt_category[idx].isChecked = action;
      }
      dispatch({
        type: coursesTypes.GOVERNMENT_EXAM_FINISH,
        payload: updatedPayload,
      });
      await dispatch(getGovernmentExams(true));
    }
    //  else if (arrayType === "courseSector") {
    //   const updatedPayload = courseSector;
    //   const idx = updatedPayload?.rows?.findIndex((u) => u.id === id);
    //   if (idx !== -1) {
    //     updatedPayload.rows[idx].isChecked = action;
    //   }
    //   dispatch({
    //     type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
    //     payload: {
    //       data: updatedPayload,
    //       type: "courseSector",
    //     },
    //   });
    //   await dispatch(getTopCollages({search,filter,lat, long, limit, offset}));
    // } 

    else if (arrayType === "topSchools") {
      if (subType === "states") {
        const updatedPayload = topSchools;

        const idx = updatedPayload?.state_list?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.state_list.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.state_list[index].isChecked = false)
              : null;
          });
          updatedPayload.state_list[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.TOP_SCHOOL_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopSchools({filter:true,latitude,longitude,limit,offset}));
      }
      if (subType === "cities") {
        const updatedPayload = topSchools;

        const idx = updatedPayload?.city_list?.findIndex((u) => u.id === id);
        // if (idx !== -1) {
        //   updatedPayload.city_list.filter((item, index) => {
        //     return item.id !== id
        //       ? (updatedPayload.city_list[index].isChecked = false)
        //       : null;
        //   });
        if (idx !== -1) {
          updatedPayload.city_list[idx].isChecked = action;
        }
        //   updatedPayload.city_list[idx].isChecked = action;
        // }
        dispatch({
          type: coursesTypes.TOP_SCHOOL_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopSchools({filter:true,latitude,longitude,limit,offset}));
      }
      
      // if (subType === "ownership") {
      //   const updatedPayload = topSchools;
      //   const idx = updatedPayload?.school_type?.findIndex((u) => u.id === id);
      //   if (idx !== -1) {
      //     updatedPayload.school_type[idx].isChecked = action;
      //   }
      //   dispatch({
      //     type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
      //     payload: {
      //       data: updatedPayload,
      //       type: "courseSector",
      //     },
      //   });
      //   await dispatch(getTopSchools({filter:true,latitude=null,longitude=null,limit,offset}));
      // }
      if (subType === "ownership") {
        const updatedPayload = ownership;
        const idx = updatedPayload?.rows?.findIndex((u) => u.id === id);
        // if (idx !== -1) {
        //   updatedPayload.college_type[idx].isChecked = action;
        // }
        if (idx !== -1) {
          updatedPayload.rows?.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.rows[index].isChecked = false)
              : null;
          });
          updatedPayload.rows[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
          payload: {
            data: updatedPayload,
            // type: "courseSector",
            type: "topSchools",
          },
        });
        await dispatch(getTopSchools({filter:true,latitude,longitude,limit,offset}));
      }

      if (subType === "educationBoard") {
        const updatedPayload = topSchools;
        const idx = updatedPayload?.board_list?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.board_list[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.TOP_SCHOOL_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopSchools({filter:true,latitude,longitude,limit,offset}));
      }
      if (subType === "category") {
        const updatedPayload = topSchools;

        const idx = updatedPayload?.gender_intech?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.gender_intech.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.gender_intech[index].isChecked = false)
              : null;
          });
          updatedPayload.gender_intech[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.TOP_SCHOOL_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopSchools({filter:true,latitude,longitude,limit,offset}));
      }
    } else {

      const updatedPayload = topCollages;
      if (subType === "state") {
        const updatedPayload = topCollages;
        const idx = updatedPayload?.state_list?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.state_list.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.state_list[index].isChecked = false)
              : null;
          });
          updatedPayload.state_list[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.TOP_COLLAGE_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopCollages({filter:true,limit, offset,latitude,longitude}));
      }
      if (subType === "city") {
        const updatedPayload = topCollages;
        const idx = updatedPayload?.city_list?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.city_list.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.city_list[index].isChecked = false)
              : null;
          });
          updatedPayload.city_list[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.TOP_COLLAGE_FINISH,
          payload: updatedPayload,
        });
        await dispatch(getTopCollages({filter:true,limit, offset,latitude,longitude}));
      }
      if (subType === "ownership") {
        const updatedPayload = ownership;
        const idx = updatedPayload?.rows?.findIndex((u) => u.id === id);
        // if (idx !== -1) {
        //   updatedPayload.college_type[idx].isChecked = action;
        // }
        if (idx !== -1) {
          updatedPayload.rows?.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.rows[index].isChecked = false)
              : null;
          });
          updatedPayload.rows[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
          payload: {
            data: updatedPayload,
            type: "ownership",
          },
        });
        await dispatch(getTopCollages({filter:true, limit, offset,latitude,longitude}));
      }
      if (subType === "stream") {
        const updatedPayload = courseSector;
        const idx = updatedPayload?.rows?.findIndex((u) => u.id === id);
        if (idx !== -1) {
          updatedPayload.rows.filter((item, index) => {
            return item.id !== id
              ? (updatedPayload.rows[index].isChecked = false)
              : null;
          });
          updatedPayload.rows[idx].isChecked = action;
        }
        dispatch({
          type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
          payload: {
            data: updatedPayload,
            type: "stream",
          },
        });
        await dispatch(getTopCollages({filter:true, limit, offset,latitude,longitude}));
      }
      // const idx = updatedPayload?.collage_stream_list?.findIndex(
      //   (u) => u.id === id,
      // );
      // if (idx !== -1) {
      //   updatedPayload.collage_stream_list[idx].isChecked = action;
      // }
      // dispatch({
      //   type: coursesTypes.GOVERNMENT_EXAM_FILTER_SET,
      //   payload: {
      //     data: updatedPayload,
      //     type: "stream",
      //   },
      // });
      await dispatch(getTopCollages({filter:true, limit, offset,latitude,longitude}));
    }


  };

export const reSetFilterValue = () => async (dispatch) => {
  dispatch({
    type: coursesTypes.GOVERNMENT_EXAM_FILTER_RESET,
  });
};

export const toggleCollapseValue =
  (id, action, type) => (dispatch, getState) => {
    const { topCollages, topSchools, governmentExams } =
      getState().careerReducer;
    if (type === "topCollages") {
      const updatedPayload = topCollages;
      const idx = updatedPayload?.collage_list?.findIndex((u) => u.id === id);
      if (idx !== -1) updatedPayload.collage_list[idx].is_collapse = action;
      dispatch({
        type: coursesTypes.TOP_COLLAGE_FINISH,
        payload: updatedPayload,
      });
    } else if (type === "topSchools") {
      const updatedPayload = topSchools;
      const idx = updatedPayload?.result?.findIndex((u) => u.id === id);
      if (idx !== -1) updatedPayload.result[idx].is_collapse = action;
      dispatch({
        type: coursesTypes.TOP_SCHOOL_FINISH,
        payload: updatedPayload,
      });
    } else if (type === "governmentExams") {
      const updatedPayload = governmentExams;
      const idx = updatedPayload?.govt_list?.findIndex((u) => u.id === id);
      if (idx !== -1) updatedPayload.govt_list[idx].is_collapse = action;
      dispatch({
        type: coursesTypes.GOVERNMENT_EXAM_FINISH,
        payload: updatedPayload,
      });
    }
  };

export const allTopcollegeBySearch =
  (filter = null) =>
    async (dispatch) => {
      try {
        dispatch({ type: coursesTypes.TOP_COLLAGE_SEARCH_REQUEST });

        const res = await httpServices.get(
          `${constants.TOP_COLLEGE_LIST + filter}`
        );

        dispatch({
          type: coursesTypes.TOP_COLLAGE_SEARCH_FINISH,
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
        dispatch({ type: coursesTypes.TOP_COLLAGE_SEARCH_FAIL });
      }
    };

