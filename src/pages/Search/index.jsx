import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import httpServices from "../../utils/ApiServices";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./index.scss";
import { GlobalSearchCard } from "../../components/cards/GlobalSearchCard";
import { Grid } from "rsuite";

const GlobalSearch = () => {
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") || "";

  const [data, setData] = useState({
    blogs: [],
    courses: [],
    mock_tests: [],
    success_stories: [],
  });
  const [hintData, setHintData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onSearchInput, setOnSearchInput] = useState("");

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

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("search", onSearchInput);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleCancel = () => {
    setOnSearchInput("");
    history.push({
      pathname: location.pathname,
    });
  };

  const searchByTags = (search) => {
    const searchParams = new URLSearchParams();
    searchParams.set("search", search);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    getGlobalSearchData(currentSearch);
  }, [currentSearch]);

  return (
    <div>
      <section className='sk-search-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7 mx-auto'>
              <div className='sk-carrers-search'>
                <div className='sk-form'>
                  <div className='sk-form-group'>
                    <span className='sk-icon'>
                      <SearchRoundedIcon />
                    </span>
                    <div className='career_form'>
                      <input
                        placeholder='Search By Name'
                        hide_label='true'
                        type='search'
                        name='search'
                        value={onSearchInput}
                        onChange={(e) => setOnSearchInput(e.target.value)}
                      />

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
                </div>
              </div>
              {hintData?.map((items, index) => {
                return (
                  <>
                    <span
                      key={items.id}
                      className='hint-key-words'
                      onClick={() => searchByTags(items?.name)}
                    >{`#${items?.name}`}</span>
                  </>
                );
              })}
            </div>
          </div>
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