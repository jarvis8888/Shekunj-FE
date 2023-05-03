import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import "./index.scss";
import httpServices from "../../utils/ApiServices";
import { useHistory, useLocation } from "react-router-dom";
import FeaturedCards from "../../components/cards/FeaturedCards";
import { HashtagAndCatagories } from "../../components/HastagAndCatagories/Index";
import hash from "../../assets/icons/svgs/hashtag.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { adsList } from "../../store/ads";
import { TrendingBlogsCard2 } from "../../components/cards/TrendingBlogsCard2";
import catagorie from "../../assets/icons/svgs/categories.png";
import cross from "../../assets/icons/svgs/cross.png";
import { routingConstants } from "../../utils/constants";

const SuccessStroyWithHashtag = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { state } = location;

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") || "";

  const [data, setData] = useState([]);
  const [allHashTag, setAllHashTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succesStoriesRight1, setSuccesStoriesRight1] = useState([]);
  const [succesStoriesRight2, setSuccesStoriesRight2] = useState([]);

  const getBlogWithHashtagData = async (search) => {
    setLoading(true);
    try {
      const url = `more/blogs?search=${search}`;
      const res = await httpServices.get(url);
      setData(res?.filtered_blogs);
      setAllHashTag(res?.blog_categories);
    } catch (error) {
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

  const addEmail = (email) => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
      axios
        .post("/private_adds/click_add/", {
          // add_email:`${adds[0]?.add_email}`
          add_email: email,
          latitude: params.latitude.toString(),
          longitude: params.longitude.toString(),
        })
        .then((response) => {
          // setAdds(response.data.results);
          console.log("addEmailresponse", response);
        });
    });
  };

  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right1";
              });

              setSuccesStoriesRight1(filterArray2);
              let filterArray3 = response.data.results.filter((item, index) => {
                return item.image_type === "blog_index_right2";
              });

              setSuccesStoriesRight2(filterArray3);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
          }
        });
      },
    );
  }, []);
  useEffect(() => {
    if (state) {
      getBlogWithHashtagData(state);
    }
  }, [state]);

  return (
    <div>
      <Header />
      <div className='Hashtag_container'>
        <div className='Hashtag_container_cards sk-blog-detail-wa'>
          <div className='Hashtag_container_title'>
            <span className='catagories-search'>
              {state ? `${currentSearch}` : null}{" "}
              <img
                src={cross}
                alt='crros'
                onClick={() => history.push(routingConstants.MORE_BLOG)}
              />
            </span>
          </div>
          {loading ? (
            "Loading..."
          ) : (
            <div>
              {data?.length
                ? data?.map((items, index) => {
                    return (
                      <>
                        <TrendingBlogsCard2
                          image={items.image}
                          title={items.title}
                          id={items.id}
                          // description={items.about_blog}
                          time='5'
                          date={items.created_at}
                        />
                      </>
                    );
                  })
                : "no data"}
            </div>
          )}
        </div>
        <div>
          <HashtagAndCatagories
            image={catagorie}
            title={`Categories`}
            addEmail={addEmail}
            hashtags={allHashTag}
            rightOne={succesStoriesRight1}
            rightTwo={succesStoriesRight2}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default SuccessStroyWithHashtag;