import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import logo from "../../assets/icons/logo.png";
import "./index.scss";

function EmailPage() {
  const { t } = useTranslation();
  return (
    <div>
      <div className='email_bg'></div>
      <Container>
        <div className='main_box_email'>
          <img src={logo} alt='' />
          <hr />
          <h2>{t("common.greeting.hello")} {t("allCertificatePage.name.1")},</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            ipsum, erat viverra rhoncus massa in enim fermentum vel. In mi ut
            amet, vitae massa ipsum. Maecenas faucibus et eget nibh netus
            molestie volutpat dignissim vulputate. Arcu hendrerit netus
            pellentesque pellentesque diam suscipit turpis. Amet orci vitae quam
            id pulvinar consectetur. Facilisi enim turpis urna amet purus enim
            ac tortor lectus justo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            ipsum, erat viverra rhoncus massa in enim fermentum vel. In mi ut
            amet, vitae massa ipsum.
          </p>

          <h5>{t("common.greeting.thankyouagain")},</h5>
        </div>
      </Container>

      <div className='email_bg2'></div>
    </div>
  );
}

export default EmailPage;
