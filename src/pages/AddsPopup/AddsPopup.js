import "./index.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { adsList } from "../../store/ads";

const AddsPopup = (props) => {
  const dispatch = useDispatch();
  const [popupAds, setPopupAds] = useState([]);
  const [image, setImage] = useState("NA");

  // useEffect(() => {
  //     axios.get('/private_adds/private_add?image_type=popup_ads')
  //         .then((response) => {
  //             setPopupAds(response.data.results);
  //         });
  // }, [])

  // useEffect(() => {
  // 	axios.get('/private_adds/private_add')
  // 		.then((response) => {

  //     if(response.data.results.length > 0)

  //     {
  //      let filterArray = response.data.results.filter((item,index)=>{
  //         return item.image_type == "popup_ads"
  //       })
  //       let findImage = filterArray.length>0 ? filterArray[0].image : "NA"
  //       setImage(findImage)
  //       setPopupAds(filterArray)
  //         }
  // 		});

  // }, [])

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
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
          if (response.data.results.length > 0) {
            let filterArray = response.data.results.filter((item, index) => {
              return item.image_type == "popup_ads";
            });
            let findImage =
              filterArray.length > 0 ? filterArray[0].image : "NA";
            setImage(findImage);
            setPopupAds(filterArray);
          }
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
    dispatch(adsList());
  }, [dispatch]);

  return (
    <div>
      <Modal
        show={props.popupShow}
        onHide={props.popupClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        {popupAds.length > 0 && (
          <Modal.Body>
            <div onClick={() => addEmail(popupAds[0]?.add_email)}>
              <a href={popupAds[0]?.url_adds} target='_blank'>
                <img
                  src={popupAds[0]?.image}
                  alt='Image'
                  className='pop_up_add modaladimage'
                />
              </a>
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant='danger' onClick={props.popupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddsPopup;
