import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";

import { Header, Footer, SEO } from "../../components";
import BasicTabs from "./../MyProfile/TabsMyProfile/index";
import "../../pages/responsive.scss";
import "./index.scss";
import { useTranslation } from "react-i18next";

function MyProfile() {
  const { user } = useSelector((state) => state.authReducer);

  const { t } = useTranslation();

  return (
    <div>
      <SEO title='Sheकुंज - My Profile' />
      <Header loginPage={true} subPage='myProfile' />
      <div className='my_profile_div'>
        <Container>
          <div className='profile_con'>
            {/* <h2>{t("common.greeting.hello")} {user?.name || t("common.n/a")}</h2> */}
            <p>{t("myProfilePage.heading.1")}</p>
          </div>
        </Container>
      </div>

      <Container>
        <div className='my_pro_tabs'>
          <BasicTabs />
        </div>
      </Container>
      <Footer loginPage={false} />
    </div>
  );
}

export default MyProfile;
