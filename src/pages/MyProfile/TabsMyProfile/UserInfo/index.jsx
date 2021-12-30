import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import ProfileImage from "../ProfileImage";

function UserInfo(props) {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className='myProfile_box'>
      <Row>
        <Col md={3} xs={12}>
          <ProfileImage isEditable={true} />
        </Col>

        <Col md={5} xs={12}>
          <h2>{user?.name || "N/A"}{" "}{user?.last_name}</h2>
          <div className='user_detail'>
            <ul>
              <li>{user?.email || "Email - N/A"}</li>
              <li>{user?.highest_education || "Highest Education - N/A"}</li>
              <li>{user?.dob || "DOB - N/A"}</li>
              <li>{user?.city || "City - N/A"}</li>
            </ul>

            <ul>
              <li>{user?.contact || "Contact - N/A"}</li>
              <li>{user?.stream || "Stream - N/A"}</li>
              <li>{user?.state || "State - N/A"}</li>
            </ul>
          </div>
          <button className='edit_profile_btn' onClick={props.func}>
            Edit Profile
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default UserInfo;
