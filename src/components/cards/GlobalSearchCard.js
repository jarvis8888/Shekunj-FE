import React, { useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DateFormat, removeHtmlTags, truncateString } from "../../utils/utils";
import { useHistory, useLocation } from "react-router-dom";
import { routingConstants } from "../../utils/constants";
import { CustomLoader } from "../customLoader/CustomLoader";
import { NoDataFound } from "../noDataFound/NoDataFound";

export const GlobalSearchCard = ({
  SuccessStoriesData = [],
  BlogData = [],
  CousesData = [],
  MockTestData = [],
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("All"); // initialize activeTab state to "All"

  const data = ["All", "Success Story", "Article", "Courses", "Mock Test"]; // add "All" to the data array

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach((node) => {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  const location = useLocation();
  const history = useHistory();

  const filterData = (type) => {
    switch (type) {
      case "Success Story":
        return [
          ...SuccessStoriesData.map((item) => ({
            ...item,
            type: "Success Story",
          })),
        ];
      case "Article":
        return [...BlogData.map((item) => ({ ...item, type: "Article" }))];
      case "Courses":
        return [...CousesData.map((item) => ({ ...item, type: "Courses" }))];
      case "Mock Test":
        return [
          ...MockTestData.map((item) => ({ ...item, type: "Mock Test" })),
        ];
      default:
        // if type is "All" or an unknown value, return all data
        return [
          ...SuccessStoriesData.map((item) => ({
            ...item,
            type: "Success Story",
          })),
          ...BlogData.map((item) => ({ ...item, type: "Article" })),
          ...CousesData.map((item) => ({ ...item, type: "Courses" })),
          ...MockTestData.map((item) => ({ ...item, type: "Mock Test" })),
        ];
    }
  };

  const renderCards = (data, type) => {
    const getRoute = (type, id) => {
      switch (type) {
        case "Success Story":
          return `/success-stories/${id}`;
        case "Article":
          return `/article/${id}`;
        case "Courses":
          return `/courses-details/${id}`;
        case "Mock Test":
          return `/mock-test/${id}1`;
        default:
          return "";
      }
    };
    return data.map((item, index) => (
      <div className='col-md-3' key={index} style={{ cursor: "pointer" }}>
        <div
          className='sk-card-box'
          onClick={() => history.push(`${getRoute(item.type, item.id)}`)}
        >
          <div className='sk-card-img'>
            <img src={item.image} alt={item?.type} />
          </div>
          <div className='sk-content-card'>
            <div className='sk-week-time'>
              {item?.type === "Article" && (
                <span>
                  <AccessTimeIcon /> {DateFormat(`${item.created_at}`)}
                </span>
              )}
              {item?.type === "Success Story" && (
                <span>
                  <AccessTimeIcon /> {item.created_at}
                </span>
              )}
            </div>
            {item?.type === "Article" ? (
              <h6 className='sk-card-heading'>{item.title}</h6>
            ) : (
              <h6 className='sk-card-heading'>{item.name}</h6>
            )}

            <div
              className='sk-card-description'
              dangerouslySetInnerHTML={{
                __html: makeHtml(
                  `${
                    (item?.description && `${item?.description}`) ||
                    (item?.about_blog &&
                      `${removeHtmlTags(item?.about_blog)}`) ||
                    ""
                  }`,
                ),
              }}
            />
            <div className='sk-time-education'>
              {item?.type === "Courses" && (
                <ul>
                  <li>
                    {" "}
                    <AccessTimeIcon /> <span>{item?.reading_time}</span>{" "}
                  </li>
                  <li>
                    {" "}
                    <SchoolRoundedIcon /> {item?.enrold} enrolled{" "}
                  </li>
                </ul>
              )}
              {item?.type === "Mock Test" && (
                <ul>
                  <li>
                    {" "}
                    {/* <AccessTimeIcon /> <span>{item?.reading_time}</span>{" "} */}
                  </li>
                  <li>
                    {" "}
                    <SchoolRoundedIcon /> {item?.enrolled} enrolled{" "}
                  </li>
                </ul>
              )}
            </div>
            <div className='sk-tags'>
              <span>{item?.type}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className='sk-card-sec'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-8 mx-auto'>
            <div className='sk-category'>
              <ul>
                {data.map((item) => (
                  <li key={item}>
                    <a
                      onClick={() => setActiveTab(item)}
                      className={activeTab === item && "active-time"}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {loading ? (
          <CustomLoader />
        ) : (
          <div className='row'>
            {filterData(activeTab).length ? (
              renderCards(filterData(activeTab), activeTab)
            ) : (
              <>
                <NoDataFound />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
