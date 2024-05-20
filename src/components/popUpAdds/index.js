import React, { useEffect, useState } from "react";
import "./index.scss";
import httpServices from "../../utils/ApiServices";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { addEmailToClient } from "../../utils/utils";

const PopUpAdds = () => {
  const detect = useDeviceDetect();

  const [leftAddIsVisible, setLeftAddIsVisible] = useState(true);
  const [rightAddIsVisible, setRightAddIsVisible] = useState(false);
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);

  const leftHandleClose = () => {
    setLeftAddIsVisible(false);
    sessionStorage.setItem("leftAddClosed", true);
    setTimeout(() => {
      setRightAddIsVisible(true); // Show right add when left add is closed
    }, 45000);
  };
  const rightHandleClose = () => {
    setRightAddIsVisible(false);
    sessionStorage.setItem("rightAddClosed", true);
  };

  const getAllPopUpData = async (latitude, longitude) => {
    try {
      // http://13.233.216.29:8000/admin/private_adds/popupadds/
      const url = `private_adds/popup_adds?latitude=${latitude}&longitude=${longitude}`;
      const res = await httpServices.get(url);
      const { popup_adds } = res;

      const homePagePopups = popup_adds.filter(
        (item) => item.popup_adds_on_page === "home_page",
      );

      // Separate image and video popups
      const imagePopups = homePagePopups.filter(
        (item) => item.popup_type === "image",
      );
      const videoPopups = homePagePopups.filter(
        (item) => item.popup_type === "video",
      );

      // Set the data for the home page popups
      setLeftData(imagePopups); // Assuming left data is for images
      setRightData(videoPopups);
      // let filterArray1 = popup_adds.filter((item, index) => {
      //   return item.popup_type === "image";
      // });
      // setLeftData(filterArray1);
      // let filterArray2 = popup_adds.filter((item, index) => {
      //   return item.popup_type === "video";
      // });
      // setRightData(filterArray2);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    const leftAddClosed = sessionStorage.getItem("leftAddClosed") === "true";
    const rightAddClosed = sessionStorage.getItem("rightAddClosed") === "true";

    if (leftAddClosed) {
      setLeftAddIsVisible(false);
    }

    if (rightAddClosed) {
      setRightAddIsVisible(false);
    }

    if (!leftAddClosed || !rightAddClosed) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getAllPopUpData(latitude, longitude);
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
          // alert("Your location is blocked")

          // If the location is blocked, you can set default values for latitude and longitude
          const defaultLatitude = 0;
          const defaultLongitude = 0;
          getAllPopUpData(defaultLatitude, defaultLongitude);
        },
      );
    }
  }, []);

  if (!leftAddIsVisible && !rightAddIsVisible) {
    return null;
  }
  const isLeftDataAvailable = leftData.length > 0;
  const isRightDataAvailable = rightData.length > 0;
  return (
    <>
      {isLeftDataAvailable && isRightDataAvailable && (
        <>
          <div className='pop-up-ads-container'>
            {leftAddIsVisible && (
              <div className='pop-up-ads '>
                <>
                  {leftData.length > 0 && (
                    <div onClick={() => addEmailToClient(leftData[0]?.add_email)}>
                      <div class='sk-ad-title d-block p-2 sk-ad-windows'>
                        Ad
                      </div>
                      <a
                        href={leftData[0]?.url_adds}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {detect.isMobile
                          ? leftData[0]?.file_mobile && (
                              <img src={leftData[0]?.file_mobile} alt='' />
                            )
                          : leftData[0]?.file && (
                              <img src={leftData[0]?.file} alt='' />
                            )}
                      </a>
                    </div>
                  )}
                </>
                <button className='close-button' onClick={leftHandleClose}>
                  &#x2715;
                </button>
              </div>
            )}
            {rightAddIsVisible && (
              <div className='pop-up-ads'>
                <>
                  {rightData.length > 0 && (
                    <div onClick={() => addEmailToClient(rightData[0]?.add_email)}>
                      <div class='sk-ad-title d-block p-2 sk-ad-windows'>
                        Ad
                      </div>

                      <a
                        href={rightData[0]?.url_adds}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {detect.isMobile ? (
                          <video controls autoPlay>
                            <source
                              src={rightData[0]?.file_mobile}
                              type='video/mp4'
                            />
                          </video>
                        ) : (
                          <video controls autoPlay>
                            <source src={rightData[0]?.file} type='video/mp4' />
                          </video>
                        )}
                      </a>
                    </div>
                  )}
                </>

                <button className='close-button' onClick={rightHandleClose}>
                  &#x2715;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PopUpAdds;
