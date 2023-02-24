import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import { noImage } from "../../../../utils/ApiServices";
import { checkIsValidImage } from "../../../../utils";
import { toast } from "react-toastify";
import { updateProfile } from "../../../../store/auth/action";
import { Avatar, Box, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./index.scss";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { convertRelativeUriToFile } from "../../../../utils/utils";
import profile_img from "../../../../assets/images/MyProfile/profile_img.png";
import x from "../../../../assets/images/MyProfile/x.png";

const ProfileImage = ({ isEditable }) => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const cropperRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authReducer);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setFileName(files[0].name);
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCropper(cropper);
  };

  const getCropData = () => {
    convertRelativeUriToFile(cropper?.getCroppedCanvas()?.toDataURL(), fileName, null, async (file) => {
      if (file) {
        if (!checkIsValidImage(file)) {
          inputRef.current.value = "";
          setOpen(false);
        } else {
          dispatch(
            updateProfile(user?.id, {
              profile_pic: file,
              name: user.name,
              last_name: user.last_name,
            }),
          );
          setOpen(false);
          setImage(null);
          setFileName("");
        }
      } else {
        toast.error(t("error.other.3"));
        setOpen(false);
      }
    });
  };

  const style = {
    width: "882px",
    height: "560px",
    background: "#ffffff",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    padding: "20px 10px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "0",
  };

  const onButtonClick = () => {
    inputRef?.current?.click();
  };
  return (
    <>
        {/* { console.log(user?.profile_pic)}        <img src={user?.profile_pic || noImage} alt="" /> */}
      <div className='myProfile_img'>
        <Avatar
          src={user?.profile_pic || noImage}
          sx={{ width: 200, height: 200 }}
        />
        {/* <img src={user?.profile_pic || noImage} alt="..."/> */}
        <input
          type='file'
          id='file'
          ref={inputRef}
          hidden
          onChange={onChange}
        />

        {isEditable && (
          <EditIcon onClick={() => handleOpen()} className='pointer' />
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <button
            style={{
              float: "right",
              border: "none",
              background: "transparent",
            }}
            onClick={() => handleClose()}
          >
            <img src={x} alt='...' />
          </button>
          {/* {cropper?.getCroppedCanvas()?.toDataURL() &&   <img height={100} width={100} src={cropper?.getCroppedCanvas()?.toDataURL()} alt='...' />} */}
          <div className='pro_pop_con'>
            {image ? (
              <Cropper
                style={{ margin: "0 auto", height: "280px", width: "200px" }}
                // zoomTo={0.7}
                initialAspectRatio={1}
                preview='.img-preview'
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(instance) => setCropper(instance)}
                crop={onCrop}
                ref={cropperRef}
                guides={true}
              />
            ) : (
              <img src={profile_img} alt='...' />
            )}
            <h6>Drag and drop an image</h6>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Or <span>select one</span> from your computer.
            </Typography>
            <div className='upload_input'>
              <input type='text' value={fileName} readOnly />
              <button onClick={() => onButtonClick()}>Upload Image</button>
            </div>
            <button className='upl_img' onClick={() => getCropData()}>
              Upload Image
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileImage;
