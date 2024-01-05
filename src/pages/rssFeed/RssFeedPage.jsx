import React, { useEffect, useState } from "react";
import httpServices from "../../utils/ApiServices";
import xmlParser from "fast-xml-parser";

const RssFeedPage = () => {

  
  const [rssFeedData, setRssFeedData] = useState("");

  const getRssFeedData = async () => {
    try {
      const url = `more/rssfeed`;
      const response = await httpServices.get(url);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, "text/xml");

      setRssFeedData(xmlDoc);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    }
  };

  useEffect(() => {
    getRssFeedData();
  }, []);

  return <pre>{rssFeedData}</pre>; // Display formatted data inside <pre> tag
};

export default RssFeedPage;
