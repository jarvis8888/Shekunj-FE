import React, { useEffect, useState } from "react";
import "./index.scss";
import httpServices from "../../utils/ApiServices";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const PopUpAdds = () => {
  const detect = useDeviceDetect();

  const [leftAddIsVisible, setLeftAddIsVisible] = useState(true);
  const [rightAddIsVisible, setRightAddIsVisible] = useState(true);
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);

  const leftHandleClose = () => {
    setLeftAddIsVisible(false);
    sessionStorage.setItem("leftAddClosed", true);
  };
  const rightHandleClose = () => {
    setRightAddIsVisible(false);
    sessionStorage.setItem("rightAddClosed", true);
  };

  const getAllPopUpData = async () => {
    try {
      const url = `private_adds/popup_adds/`;
      const res = await httpServices.get(url);
      const { popup_adds } = res;
      let filterArray1 = popup_adds.filter((item, index) => {
        return item.popup_type === "image";
      });
      setLeftData(filterArray1);
      let filterArray2 = popup_adds.filter((item, index) => {
        return item.popup_type === "video";
      });
      setRightData(filterArray2);
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
      getAllPopUpData();
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
                    <div>
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
              <div className='pop-up-ads right-bottom'>
                <>
                  {rightData.length > 0 && (
                    <div>
                      <a
                        href={rightData[0]?.url_adds}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {detect.isMobile ? (
                          <video controls>
                            <source
                              src={rightData[0]?.file_mobile}
                              type='video/mp4'
                            />
                          </video>
                        ) : (
                          <video controls>
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
