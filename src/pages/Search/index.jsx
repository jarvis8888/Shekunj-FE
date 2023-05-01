import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import httpServices from "../../utils/ApiServices";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import "./index.scss";
import { GlobalSearchCard } from "../../components/cards/GlobalSearchCard";
import { Grid } from "rsuite";

const GlobalSearch = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("category_id") || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGlobalSearchData = async (search) => {
    setLoading(true);
    try {
      const url = `more/search?query=${search}`;
      const res = await httpServices.get(url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="sk-search-sec">
        <div class="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div class="sk-carrers-search">
                <div class="sk-form">
                  <div class="sk-form-group">
                    <span class="sk-icon">
                      <SearchRoundedIcon/>
                    </span>
                    <form class="career_form">
                      <input placeholder="Search By Name" hide_label="true" type="text" name="search" />
                      <button name="button" type="submit" class="sk-btn">Search</button>
                    </form>              
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      <GlobalSearchCard />
    </div>
  );
};

export default withHeaderFooter(GlobalSearch);
