import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import httpServices from "../../utils/ApiServices";
import "./index.scss";
import { GlobalSearchCard } from "../../components/cards/GlobalSearchCard";

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
      <div>top section</div>
      <GlobalSearchCard />
    </div>
  );
};

export default withHeaderFooter(GlobalSearch);
