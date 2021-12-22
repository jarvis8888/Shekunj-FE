import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Certificate_FullView from "../../assets/images/Courses/Certificate_FullView.png";
import "./index.scss";

const CertificatePage = () => {
  return (
    <div>
      <div className='_full_certif text-center'>
        <Container>
          <img src={Certificate_FullView} alt='' />
          <Link to='/courses'>
            <button className='back_course'>Back To Course</button>
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default CertificatePage;