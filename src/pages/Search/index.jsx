import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import httpServices from "../../utils/ApiServices";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./index.scss";
import storyimg from "../../assets/images/storyviewall.png";
import searchnavicon from "../../assets/images/searchicon.svg";
import { GlobalSearchCard } from "../../components/cards/GlobalSearchCard";
import { Grid } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import banner from "../../assets/images/searchbg.jpg";
import { apiConstants } from "../../utils/constants";

const GlobalSearch = () => {
  const location = useLocation();
  const history = useHistory();
  const { lan } = useSelector((state) => state.languageReducer);

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") || "";
  const searchInputRef = useRef(null);

  const [data, setData] = useState({
    blogs: [],
    courses: [],
    mock_tests: [],
    success_stories: [],
  });
  const [hintData, setHintData] = useState([]);
  const [autoSuggestionsData, setAutoSuggestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onSearchInput, setOnSearchInput] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dynamicBackgroundImage, setDynamicBackgroundImage] = useState();

  const auto_suggessions = useDebounce(onSearchInput);

  const placeholderOptions = useMemo(() => {
    return hintData.map((data) => `Search by ${data.name}`);
  }, [hintData]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const placeholder = useMemo(
    () => placeholderOptions[currentIndex],
    [currentIndex],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % placeholderOptions.length,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, placeholderOptions]);

  const getGlobalSearchData = async (search) => {
    setLoading(true);
    try {
      const url = `more/search?query=${search}`;
      const res = await httpServices.get(url);
      setData({
        blogs: res?.blogs,
        courses: res?.courses,
        mock_tests: res?.mock_tests,
        success_stories: res?.success_stories,
      });
      setHintData(res?.search_keywords);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAutoSuggestionData = async (search) => {
    try {
      const url = `more/auto_suggessions?query=${search}`;
      const data = await httpServices.get(url);
      const { keyword_list } = data;
      setAutoSuggestionsData(keyword_list);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getAllBannerData = async () => {
    try {
      const url = `${apiConstants.BANNERS.GET_ALL_BANNERS}`;
      const data = await httpServices.get(url);
      if (data?.data?.length > 0) {
        let filterArray1 = data?.data?.filter((item, index) => {
          return item.image_type === "search-page";
        });
        setDynamicBackgroundImage(filterArray1[0]?.Banner_image);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getAllBannerData();
  }, [lan]);

  const handleSearch = () => {
    setAutoSuggestionsData([]);
    const searchParams = new URLSearchParams();
    searchParams.set("search", onSearchInput);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
    searchInputRef.current.focus();
  };

  const handleAutoSuggestionClick = (search) => {
    searchByTags(search);
    setOnSearchInput(search);
    setAutoSuggestionsData([]);
    searchInputRef.current.focus();
  };

  const handleInputBlur = () => {
    // Delay clearing the auto-suggestions to allow click events to trigger
    setTimeout(() => {
      if (!inputFocused) {
        setAutoSuggestionsData([]);
      }
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        handleAutoSuggestionClick(autoSuggestionsData[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : autoSuggestionsData.length - 1,
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < autoSuggestionsData.length - 1 ? prevIndex + 1 : 0,
      );
    }
  };
  const handleCancel = () => {
    setOnSearchInput("");
    history.push({
      pathname: location.pathname,
    });
  };

  const searchByTags = (search) => {
    setOnSearchInput(search);
    const searchParams = new URLSearchParams();
    searchParams.set("search", search);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    getGlobalSearchData(currentSearch);
  }, [currentSearch, lan]);

  useEffect(() => {
    getAutoSuggestionData(auto_suggessions);
  }, [auto_suggessions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click event occurred outside of the input and auto-suggestion list
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.classList.contains("sk-searchIcon-list")
      ) {
        setInputFocused(false); // Clear auto-suggestion data
      }
    };

    // Attach the click event listener to the document
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const styles = {
    background: dynamicBackgroundImage
      ? `url(${dynamicBackgroundImage}) no-repeat center center`
      : `url(${banner}) no-repeat center center`,
    position: "relative",
    padding: "60px 0 60px",
  };

  return (
    <div>
      <section className='sk-search-sec sk-searchNew-banner' style={styles}>
        <div className='container sk-custom-container'>
          <div className='row'>
            <div className='col-md-7 mx-auto'>
              <div className='sk-carrers-search'>
                <div className='sk-form'>
                  <div className='sk-form-group'>
                    <span className='sk-icon'>
                      <img src={searchnavicon} alt='' />
                    </span>
                    <div className='career_form'>
                      <input
                        ref={searchInputRef}
                        placeholder={placeholder}
                        hide_label='true'
                        type='search'
                        name='search'
                        value={onSearchInput}
                        onChange={(e) => {
                          setInputFocused(true);
                          setOnSearchInput(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setInputFocused(true)}
                        onBlur={handleInputBlur}
                      />
                      {/* {onSearchInput === "" ? (
                        <div className='updown-move'>{placeholder}</div>
                      ) : null} */}

                      <button
                        name='button'
                        type='submit'
                        className='sk-btn'
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {inputFocused &&
                    onSearchInput !== "" &&
                    autoSuggestionsData.length > 0 && (
                      <div className='sk-search-list'>
                        <ul>
                          {autoSuggestionsData.map((item, index) => (
                            <li
                              key={item}
                              className={
                                index === selectedIndex ? "selected" : ""
                              }
                              onClick={() => handleAutoSuggestionClick(item)}
                            >
                              <img
                                src={searchnavicon}
                                alt='searchicon'
                                className='sk-searchIcon-list'
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <ul>
                {hintData?.map((items, index) => {
                  return (
                    <>
                      <li
                        key={items.id}
                        className='hint-key-words'
                        onClick={() => searchByTags(items?.name)}
                      >
                        {`#${items?.name}`}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='sk-viewall-img'>
          {dynamicBackgroundImage ? null : (
            <img src={storyimg} alt='storyimg' />
          )}
        </div>
      </section>
      <GlobalSearchCard
        SuccessStoriesData={data?.success_stories}
        BlogData={data?.blogs}
        CousesData={data?.courses}
        MockTestData={data?.mock_tests}
        loading={loading}
      />
    </div>
  );
};

export default withHeaderFooter(GlobalSearch);
