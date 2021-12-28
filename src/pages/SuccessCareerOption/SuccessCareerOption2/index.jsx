import React from "react";
import { Header, Footer } from "../../../components";
import { Container } from "react-bootstrap";
import TabsExams from "../TabsExams/index";
import "./index.scss";
import "./../index.scss";

function SuccessCareerOption2() {
  return (
    <div>
      <Header loginPage={true} page='guidance' subPage='careerOption' />

      <div className='SucOption'>
        <Container>
          <h2>Choose Your Career</h2>
        </Container>
      </div>

      <div className='CompExams'>
        <Container>
          <TabsExams />
        </Container>
      </div>
      <Footer loginPage={false} />
    </div>
  );
}

export default SuccessCareerOption2;
