import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Radio, RadioGroup } from "@mui/material";
import { getTopSchools, setFilterValue } from "../../store/career";
import "./index.scss";
import { CheckBox } from "@mui/icons-material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(270deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function AccordionComponent({
  type,
  states,
  cities,
  ownership,
  educationBoard,
  category,
  stream,
  state,
  courseLength,
  categories,
  city,
  offset,
  limit,
}) {
  const dispatch = useDispatch();
  const [remainingColleges, setRemainingColleges] = useState(false);
  const [remainingSchoolsState, setRemainingSchoolsState] = useState(false);
  const [remainingSchoolsCities, setRemainingSchoolsCities] = useState(false);
  const [remainingSchoolsOwnership, setRemainingSchoolsOwnership] =
    useState(false);
  const [remainingSchoolsCategory, setRemainingSchoolsCategory] =
    useState(false);
  const [remainingCollegeState, setRemainingCollegeState] = useState(false);
  const [remainingCollegeCity, setRemainingCollegeCity] = useState(false);
  const [remainingCollegeOwnership, setRemainingCollegeOwnership] =
    useState(false);
  const [remainingSchoolEducationBoard, setRemainingSchoolEducationBoard] =
    useState(false);
  const [remainingGovtExamsCategory, setRemainingGovtExamsCategory] =
    useState(false);

  const hasMoreCount = (rows = [], count = 0) => {
    if (Array.isArray(rows)) {
      return (rows.length || 0) - rows.slice(0, count)?.length || 0;
    } else return 0;
  };

  const onChangeFilter = (
    id,
    { target: { checked } },
    type,
    subType,
    pageLimit,
  ) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position, values) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(
            setFilterValue({
              id,
              checked,
              type,
              subType,
              limit,
              offset,
              latitude,
              longitude,
            }),
          );
        },
        function (error) {
          // Handle the error if location access is denied or any other geolocation-related error.
          console.error("Error getting geolocation:", error);
          dispatch(
            setFilterValue({
              id,
              checked,
              type,
              subType,
              limit,
              offset,
              latitude: null, // Provide a fallback value for latitude (null in this case).
              longitude: null, // Provide a fallback value for longitude (null in this case).
            }),
          );
        },
      );
    } else {
      // Handle the case when geolocation is not supported by the browser.
      console.error("Geolocation is not supported in this browser.");
      dispatch(
        setFilterValue({
          id,
          checked,
          type,
          subType,
          limit,
          offset,
          latitude: null, // Provide a fallback value for latitude (null in this case).
          longitude: null, // Provide a fallback value for longitude (null in this case).
        }),
      );
    }
  };

  const hasMoreCountShowFunction = (data, category, subCategory) => {
    return data?.map(
      (s) =>
        s?.name && (
          <li key={s?.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={s?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(s?.id, e, category, subCategory)
                  }
                />
              }
              label={s?.name ? s?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  // const hasMoreSchoolStateFunction = (data) => {
  //   return data?.map(
  //     (s) =>
  //       s?.name && (
  //         <li key={s?.id}>
  //           <FormControlLabel
  //             value={s?.name}
  //             control={
  //               <Radio
  //                 checked={s?.isChecked}
  //                 onChange={(e) =>
  //                   onChangeFilter(s?.id, e, "topSchools", "states")
  //                 }
  //               />
  //             }
  //             label={s?.name ? s?.name : "N/A"}
  //           />
  //         </li>
  //       ),
  //   );
  // };
  const hasMoreSchoolStateFunction = (data) => {
    return data?.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c?.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c?.id, e, "topSchools", "states")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };
  const hasMoreSchoolCityFunction = (data) => {
    return data?.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c?.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c?.id, e, "topSchools", "cities")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  const hasMoreSchoolOwnershipFunction = (data) => {
    return data?.map(
      (c, index) =>
        c?.name && (
          <li key={index}>
            <FormControlLabel
              value={c?.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c?.id, e, "topSchools", "ownership")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };
  // const hasMoreSchoolCategoryFunction = (data) => {
  //   return data && data.length && data.map((c) => (
  //     c?.name &&
  //     <li key={c?.id}>
  //       <FormControlLabel
  //         value={c?.name}
  //         control={
  //           <Radio
  //             checked={c?.isChecked}
  //             onChange={(e) => onChangeFilter(c?.id, e, "topSchools", "category")}
  //           />
  //         }
  //         label={c?.name ? c?.name : "N/A"}
  //       />
  //     </li>
  //   ));

  // };

  const hasMoreSchoolCategoryFunction = (data) => {
    return data.map(
      (c) =>
        c?.name && (
          <li key={c?.id}>
            <FormControlLabel
              value={c?.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c?.id, e, "topSchools", "category")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };
  // const hasMoreCollegeStateFunction = (data) => {
  //   return data?.map(
  //     (s, index) =>
  //       s && (
  //         <li key={index}>
  //           <FormControlLabel
  //             value={s.name}
  //             control={
  //               <Radio
  //                 checked={s?.isChecked}
  //                 onChange={(e) =>
  //                   onChangeFilter(s.id, e, "topCollages", "state")
  //                 }
  //               />
  //             }
  //             label={s?.name ? s?.name : "N/A"}
  //           />
  //         </li>
  //       ),
  //   );
  // };

  // const hasMoreCollegeStateFunction = (data) => {
  //   return data?.map(
  //     (s, index) =>
  //       s && (
  //         <li key={index}>
  //           <FormControlLabel
  //             value={s.name}
  //             control={
  //               <Radio
  //                 checked={s?.isChecked}
  //                 onChange={(e) =>
  //                   onChangeFilter(s.id, e, "topCollages", "state")
  //                 }
  //               />
  //             }
  //             label={s?.name ? s?.name : "N/A"}
  //           />
  //         </li>
  //       ),
  //   );
  // };
  const hasMoreCollegeStateFunction = (data) => {
    return data?.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c.id, e, "topCollages", "state")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  const hasMoreCollegeStreamFunction = (data) => {
    return data.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c?.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c?.id, e, "courseSector", "stream")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  const hasMoreCollegeCityFunction = (data) => {
    return data?.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c.id, e, "topCollages", "city")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  const hasMoreCollegeOwnerShipFunction = (data) => {
    return data?.map(
      (c, index) =>
        c && (
          <li key={index}>
            <FormControlLabel
              value={c.name}
              control={
                <Checkbox
                  checked={c?.isChecked}
                  onChange={(e) =>
                    onChangeFilter(c.id, e, "topCollages", "ownership")
                  }
                />
              }
              label={c?.name ? c?.name : "N/A"}
            />
          </li>
        ),
    );
  };

  // const hasMoreCollegeOwnerShipFunction = (data) => {
  // return data && data.length && data.map((c) => (
  //   c?.name &&
  //   <li key={c?.id}>
  //     <FormControlLabel
  //       value={c?.name}
  //       control={
  //         <Radio
  //           checked={c?.isChecked}
  //           onChange={(e) => onChangeFilter(c?.id, e, "ownership","ownership")}
  //         />
  //       }
  //       label={c?.name ? c?.name : "N/A"}
  //     />
  //   </li>
  // ));
  //     }

  return (
    <div className='accordion_box_all label_list_radio ul_list_radio_filter'>
      {type === "colleges" && (
        <>
          <Typography>{stream?.name}</Typography>
          <ul className='sk-cityschool-remove pl-0'>
            <RadioGroup>
              {remainingColleges
                ? hasMoreCollegeStreamFunction(stream?.rows)
                : hasMoreCollegeStreamFunction(stream?.rows?.slice(0, 3))}
            </RadioGroup>
          </ul>
          {hasMoreCount(stream?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingColleges((prev) => !prev)}
            >
              {hasMoreCount(stream?.rows, 3)}{" "}
              {remainingColleges ? "Less" : "More"}
            </div>
          )}

          <Typography>{ownership?.name}</Typography>

          <ul className='pl-0'>
            <FormGroup>
              {remainingCollegeOwnership
                ? hasMoreCollegeOwnerShipFunction(ownership?.rows)
                : hasMoreCollegeOwnerShipFunction(ownership?.rows?.slice(0, 3))}
            </FormGroup>
          </ul>
          {/* {hasMoreCount(ownership?.rows, 3) > 0 && (
            <div
              className=''
              onClick={() => setRemainingCollegeOwnership((prev) => !prev)}
            >
              {hasMoreCount(ownership?.rows, 3)}{" "}
              {remainingCollegeOwnership ? "Less" : "More"}
            </div>
          )} */}
          <Typography>{state?.name}</Typography>
          <ul className='sk-cityschool-remove pl-0'>
            <FormGroup>
              {remainingCollegeState
                ? hasMoreCountShowFunction(state?.rows, "topCollages", "state")
                : hasMoreCountShowFunction(
                    state?.rows?.slice(0, 6),
                    "topCollages",
                    "state",
                  )}
            </FormGroup>
          </ul>
          {hasMoreCount(state?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingCollegeState((prev) => !prev)}
            >
              {hasMoreCount(state?.rows, 3)}{" "}
              {remainingCollegeState ? "Less" : "More"}
            </div>
          )}
          <Typography>{city?.name}</Typography>

          <ul className='sk-cityschool-remove pl-0'>
            {remainingCollegeCity
              ? hasMoreCountShowFunction(city?.rows, "topCollages", "city")
              : hasMoreCountShowFunction(
                  city?.rows?.slice(0, 6),
                  "topCollages",
                  "city",
                )}
          </ul>
          {hasMoreCount(city?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingCollegeCity((prev) => !prev)}
            >
              {hasMoreCount(city?.rows, 3)}{" "}
              {remainingCollegeCity ? "Less" : "More"}
            </div>
          )}
        </>
      )}
      {type === "schools" && (
        <>
          <Typography>{states?.name}</Typography>
          <ul className='pl-0'>
            {/* <RadioGroup name='radio-buttons-group'> */}
            <FormGroup>
              {/* {remainingSchoolsState
                ? hasMoreSchoolStateFunction(states?.rows)
                : hasMoreSchoolStateFunction(states?.rows?.slice(0, 3))} */}
              {remainingSchoolsState
                ? hasMoreCountShowFunction(states?.rows, "topSchools", "states")
                : hasMoreCountShowFunction(
                    states?.rows?.slice(0, 6),
                    "topSchools",
                    "states",
                  )}
              {/* </RadioGroup> */}
            </FormGroup>
          </ul>
          {hasMoreCount(states?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingSchoolsState((prev) => !prev)}
            >
              {/* {hasMoreCount(states?.rows, 3)}{" "} */}
              {remainingSchoolsState ? "view less" : "+View All"}
            </div>
          )}

          <Typography>{cities?.name}</Typography>

          <ul className='sk-cityschool-remove pl-0'>
            <FormGroup>
              {/* <RadioGroup name='radio-buttons-group'>
                {remainingSchoolsCities
                  ? hasMoreSchoolCityFunction(cities?.rows)
                  : hasMoreSchoolCityFunction(cities?.rows?.slice(0, 3))}
              </RadioGroup> */}
              {remainingSchoolsCities
                ? hasMoreCountShowFunction(cities?.rows, "topSchools", "cities")
                : hasMoreCountShowFunction(
                    cities?.rows?.slice(0, 6),
                    "topSchools",
                    "cities",
                  )}
            </FormGroup>
          </ul>
          {hasMoreCount(cities?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingSchoolsCities((prev) => !prev)}
            >
              {/* {hasMoreCount(cities?.rows, 3)}{" "} */}
              {remainingSchoolsCities ? "view less" : "+View All"}
            </div>
          )}
          <Typography>{category?.name}</Typography>
          <ul className='pl-0'>
            <RadioGroup name='radio-buttons-group'>
              {Array.isArray(category?.rows) &&
                (remainingSchoolsCategory
                  ? hasMoreSchoolCategoryFunction(category?.rows)
                  : hasMoreSchoolCategoryFunction(category?.rows?.slice()))}
            </RadioGroup>
          </ul>
          {/* {hasMoreCount(category?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingSchoolsCategory((prev) => !prev)}
            >
              {hasMoreCount(category?.rows, 3)}{" "}
              {remainingSchoolsCategory ? "view less" : "+View All"}
            </div>
          )} */}
          <Typography>{ownership?.name}</Typography>
          <ul className='pl-0'>
            <FormGroup>
              {Array.isArray(ownership?.rows) &&
                (remainingSchoolsOwnership
                  ? hasMoreSchoolOwnershipFunction(
                      ownership?.rows,
                      "topSchools",
                      "ownership",
                    )
                  : hasMoreSchoolOwnershipFunction(
                      ownership?.rows?.slice(0, 3),
                    ))}
            </FormGroup>
          </ul>
          {/* {hasMoreCount(ownership?.rows, 3) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingSchoolsOwnership((prev) => !prev)}
            >
              {hasMoreCount(ownership?.rows, 3)}{" "}
              {remainingSchoolsOwnership ? "view less" : "+View All"}
            </div>
          )} */}
          <Typography>{educationBoard?.name}</Typography>
          <ul className='pl-0'>
            <FormGroup>
              {remainingSchoolEducationBoard
                ? hasMoreCountShowFunction(
                    educationBoard?.rows,
                    "topSchools",
                    "educationBoard",
                  )
                : hasMoreCountShowFunction(
                    educationBoard?.rows?.slice(0, 6),
                    "topSchools",
                    "educationBoard",
                  )}
            </FormGroup>
          </ul>
          {/* {hasMoreCount(educationBoard?.rows, 6) > 0 && (
            <div
              className='sk-lessshow-more'
              onClick={() => setRemainingSchoolEducationBoard((prev) => !prev)}
            >
              {hasMoreCount(educationBoard?.rows, 6)}{" "}
              {remainingSchoolEducationBoard ? "view less" : "+View All"}
            </div>
          )} */}
        </>
      )}
      {type === "governmentExams" && (
        <>
          <Accordion>
            <AccordionSummary
              aria-controls='panel1d-content'
              id={categories?.name}
            >
              <Typography>{categories?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className='pl-0'>
                <FormGroup>
                  {Array.isArray(categories?.rows) &&
                    (remainingGovtExamsCategory
                      ? hasMoreCountShowFunction(
                          categories?.rows,
                          "governmentExam",
                        )
                      : hasMoreCountShowFunction(
                          categories?.rows?.slice(0, 6),
                          "governmentExam",
                        ))}
                </FormGroup>
              </ul>
              {hasMoreCount(categories?.rows, 6) > 0 && (
                <div
                  className=''
                  onClick={() => setRemainingGovtExamsCategory((prev) => !prev)}
                >
                  {hasMoreCount(categories?.rows, 6)}{" "}
                  {remainingGovtExamsCategory ? "Less" : "More"}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
}
