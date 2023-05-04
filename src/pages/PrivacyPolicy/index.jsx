import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Header, Footer } from "../../components";
import "./index.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Header loginPage={false} page='home' />
      <div className='priva_policy noselect'>
        <Container>
          <h2>{t("privacyPolicyPage.heading.1")}</h2>
        </Container>
      </div>

      <div className='priva_policy_content noselect'>
        <Container>
          <h3>{t("privacyPolicyPage.heading.2")}</h3>
          <p>
            Making women more educated and empowered is the main aim of Shekunj.
            An educated woman can do wonders in her field and an empowered woman
            can lead and empower others. By this thought we have started this
            platform for acheive this aim we have added multiple courses of
            different domains, The content includes but not limited only to
            images, Texts, Test papers, Videos of these courses has been added
            from the multiple websites/Blogs/Pages and other resources include
            but not limited to Microsoft Learn, Google etc. We are not charging
            anything for the learning and certification. We also not claim that
            the learning content belongs to us.
          </p>

          <h3>Content </h3>

          <p>
            Our platform model means we do not review or edit the content for
            legal issues, and we are not in a position to determine the legality
            of content. We do not exercise any editorial control over the
            content that is available on the platform and, as such, do not
            guarantee in any manner the reliability, validity, accuracy, or
            truthfulness of the content. If you access content, you rely on any
            information provided by an counsellor at your own risk. The content
            includes but not limited only to images, Texts, Test papers, Videos
            of these courses has been added from the multiple
            websites/Blogs/Pages and other resources include but not limited to
            Microsoft Learn, Google, Infoedge , Freepik , shutter stock images
            etc. We are not charging anything for the learning and
            certification. We also not claim that the learning content belongs
            to us.{" "}
          </p>

          <h3>Sensitive information and other related </h3>

          <p>
            If, By using the Services, you may be exposed to content that you
            consider offensive, indecent, or objectionable. Shekunj.com has no
            responsibility to keep such content from you and no liability for
            your access or enrollment in any course or other content, to the
            extent permissible under applicable law. This also applies to any
            content relating to health, wellness, and physical exercise. You
            acknowledge the inherent risks and dangers in the strenuous nature
            of these types of content, and by accessing such content you choose
            to assume those risks voluntarily, including risk of illness, bodily
            injury, disability, or death. You assume full responsibility for the
            choices you make before, during, and after your access to the
            content.{" "}
          </p>

          <p>
            When you interact directly with a student or an instructor, you must
            be careful about the types of personal information that you share.
            While we restrict the types of information instructors may request
            from students, we do not control what students and instructors do
            with the information they obtain from other users on the platform.
            You should not share your email or other personal information about
            you for your safety.
          </p>

          <p>
            We do not hire or employ instructors/counsellor nor are we
            responsible or liable for any interactions involved between
            instructors and students. We are not liable for disputes, claims,
            losses, injuries, or damage of any kind that might arise out of or
            relate to the conduct of instructors/counsellors or students.
          </p>

          <p>
            When you use our Services, you will find links to other websites
            that we don’t own or control. We are not responsible for the content
            or any other aspect of these third-party sites, including their
            collection of information about you. You should also read their
            terms and conditions and privacy policies.
          </p>

          <h3>Trademarks and rights</h3>

          <p>
            Our platforms and services are protected by copyright, trademark,
            and other laws . Nothing gives you a right to use the Shekunj name
            or any of the shekunj trademarks, logos, domain names, and other
            distinctive brand features. Any feedback, comments, or suggestions
            you may provide regarding Shekunj on our email address. You cannot
            directly post it on social media and other public platform which can
            create a negative image of our brand name. Shekunj has all the
            rights to take action on it.
          </p>

          <h3>Dispute Resolution </h3>

          <p>
            We belive to live with happiness and we believe to solve the issues
            by words but still If there’s a dispute, our Support Team is happy
            to help resolve the issue. If that doesn't work and you live in
            India, Then you can book an appointment for a small meet to solve
            the issue.{" "}
          </p>

          <h3>How to Contact Us </h3>

          <p>
            The best way to get in touch with us is to contact our support team.
            We’d love to hear your questions, concerns, and feedback about our
            Services.{" "}
          </p>

          <h3>Information collection </h3>

          <p>
            We collect information about you or your usage to provide better
            services to all of our users. We collect information in the
            following ways:{" "}
          </p>

          <ul>
            <li>{t("privacyPolicyPage.content.2")}</li>

            <li>{t("privacyPolicyPage.content.3")}</li>

            <li>{t("privacyPolicyPage.content.2")}</li>

            <li>{t("privacyPolicyPage.content.3")}</li>

            <li>{t("privacyPolicyPage.content.4")}</li>

            {/* <li>{t("privacyPolicyPage.content.5")}</li>

            <li>{t("privacyPolicyPage.content.6")}</li>

            <li>{t("privacyPolicyPage.content.7")}</li>

            <li>{t("privacyPolicyPage.content.8")}</li>

            <li>{t("privacyPolicyPage.content.9")}</li>

            <li>{t("privacyPolicyPage.content.10")}</li>

            <li>{t("privacyPolicyPage.content.11")}</li> */}
          </ul>

          <p>
            When you communicate with shekunj.com or its Application or use the
            shekunj.com platform to communicate with other Members (such as
            advertisers, colleges/ institutes, etc.), we collect information
            about your communication and any other additional information you
            choose to provide.{" "}
          </p>

          <h3>Processing personal information</h3>

          <p>
            Shekunj.com may process your Personal Information for the following
            purposes:{" "}
          </p>

          <ul>
            <li>
              We use information collected from cookies and other technologies,
              like pixel tags, to improve your user experience and the overall
              quality of our services. When showing you tailored ads, we will
              not associate an identifier from cookies or similar technologies
              with sensitive categories, such as those based on race, religion,
              sexual orientation or health.
            </li>
            <li>
              Our automated systems analyse your content to provide you
              customised search results, recommendations and specific promotions
              and offers{" "}
            </li>
            <li>
              Send alerts and newsletter(s) to you (Provided you subscribe to
              the same. To unsubscribe, please visit your account settings)
            </li>
            <li>
              Improving our website and its content to provide better features
              and services{" "}
            </li>
            <li>
              Conducting market research and surveys with the aim of improving
              our products and services.
            </li>
            <li>
              Sending you information about our products and services for
              marketing purposes and promotions.{" "}
            </li>
            <li>
              Preventing, detecting, investigating and prosecuting crimes
              (including but not limited to fraud and other financial crimes) in
              any jurisdiction, identity verification, government sanctions
              screening and due diligence checks{" "}
            </li>
            <li>
              Establishing, exercising or defending legal rights in connection
              with legal proceedings (including any prospective legal
              proceedings) and seeking professional or legal advice in relation
              to such legal proceedings.{" "}
            </li>
            <li>
              We may share personal information (such as name, mobile number,
              and email address) with carefully selected education colleges/
              educational institutions based on your expression of interest
              regarding courses, specializations and institutions so that they
              may consider further marketing campaigns or recruitment measures.
              Some of these educational institutions may have access to your
              personal information to verify the status of your application or
              enrolment. We will inform the education institutions that they are
              not allowed to use your personal information for any reason other
              than mentioned above. Users should note however that, how these
              educational institutions use this data is not governed by our
              privacy policy. Therefore, we cannot be held responsible for how
              the data is utilized once it is shared with them. Educational
              institutions have separate policy practices for which shekunj.com
              has no responsibility or liability. For further information on how
              such institutions use your information, please visit the
              applicable privacy policy of that institution.{" "}
            </li>
          </ul>

          <h3>Third-Party Services </h3>

          <p>
            Third parties provide certain services available on shekunj.com, we
            may provide information, including Personal Information, that
            ‘shekunj.com collects on the Web to third-party service providers to
            help us deliver programs, products, information, and services. These
            third party services include charges and fees
          </p>

          <h3>Social Media </h3>

          <p>
            shekunj.com operates channels, pages and accounts on some social
            media sites to inform, assist and engage with you. shekunj.com
            monitors and records comments and posts made on these channels about
            shekunj.com in order to improve its products and services. Please
            note that you must not communicate with shekunj.com through such
            social media sites the following information:{" "}
          </p>

          <p>
            Sensitive personal data includes (i) special categories of personal
            data meaning any information revealing racial or ethnic origin,
            political opinions, religious or philosophical beliefs, or trade
            union membership, and the processing of genetic data, biometric data
            for the purpose of uniquely identifying a natural person, data
            concerning health or data concerning a natural person's sex life or
            sexual orientation and (ii) other sensitive personal data such as
            criminal convictions and offences and national identification number
            ; Excessive, inappropriate, offensive or insulting information
            towards individuals. (iii) You cannot post anything against
            shekunj.com on social media without the permission of{" "}
            <a href='/'> shekunj.com</a>
          </p>

          <h3>Changes to this Policy</h3>

          <p>
            Shekunj.com reserves the right to update, change or modify this
            policy at any time. The policy shall come to effect from the date of
            such update, change or modification.{" "}
          </p>

          <h3>Disclaimer</h3>

          <p>
            Shekunj.com shall not be liable for any loss or damage sustained by
            reason of any disclosure (inadvertent or otherwise) of any
            information concerning the user's account and / or information
            relating to or regarding online transactions using credit cards /
            debit cards and / or their verification process and particulars nor
            for any error, omission or inaccuracy with respect to any
            information so disclosed and used whether or not in pursuance of a
            legal process or otherwise. shekunj.com does not store any Credit /
            Debit card details.{" "}
          </p>

          <p>
            Any other personal information shared by you which is not asked by
            shekunj.com during registration, either mandatorily or optionally;
            accounts to wilful and intentional furnishing; and shekunj.com will
            not be liable for breach of such information.{" "}
          </p>

          {/* <h3 className="text-center">Terms & Conditions </h3> */}

          <h3>Terms and Conditions</h3>

          <p>
            The following terms and conditions, along with all other terms and
            legal notices located on www.shekunj.com (collectively, "Terms"),
            govern Your use of www.shekunj.com (the "Website"). The Website is
            owned and operated by Rdot Ventures Pvt.Ltd.{" "}
          </p>

          <p>
            These Terms of Use ("Terms") constitute a legally binding agreement
            ("Agreement") between the user who visits the Website in connection
            with use of our services, or whose information Company otherwise
            receives in connection with the services provided through its
            education business (“You”) and the Company governing Your access to
            and use of the Platform, including any subdomains thereof, and any
            other websites through which the Website makes its services
            available (collectively, "Site"), our mobile, tablet and other smart
            device applications, and application program interfaces
            (collectively, "Application"). The Application and Site are
            collectively termed as "Platform".
          </p>

          <p>
            Access to any part of the Platform or any content downloaded from it
            is contingent on Your acceptance of and compliance with these Terms
            and Privacy Policy. If You do not understand and agree to be bound
            by all Terms and the Privacy Policy, do not use this Platform.{" "}
          </p>

          <p>
            These Terms are binding upon You and Your heirs, representatives,
            successors and assigns, as may be applicable. The headings of the
            several articles and subdivisions of these Terms are inserted solely
            for the convenience of reference and shall have no further meaning,
            force or effect.{" "}
          </p>

          <p>
            Additionally, basis services chosen, certain product specific
            conditions may apply.{" "}
          </p>

          <h3>You represent and warrant that: </h3>

          <p>
            If You are under the age of 18 or the age of majority in Your
            jurisdiction, You must use the Platform under the supervision of
            Your parent, legal guardian or responsible adult.{" "}
          </p>

          <p>
            By accessing or using the Platform You r epresent and warrant that
            You fulfil the requirement of minimum age and have the legal
            capacity and authority to enter into a contract as per the
            applicable laws.{" "}
          </p>

          <p>
            You are not under any legal or other disability which limits Your
            ability to comply with these Terms or to install and use the
            products You purchase with minimal risk of harm to You or others.
            You further represent that You are not purchasing the
            products/services for resale to others and will not do so without
            the Company’s prior written consent.{" "}
          </p>

          <p>
            You are eligible to conduct the purpose “hereinafter defined”
            lawfully
          </p>

          <h3>Purpose</h3>

          <p>
            The Platform is made available for Learning use and to help students
            get details, discover & research on colleges, courses and exams of
            their interest and for allied services related thereto. Platform
            also helps connect colleges/educational institutes/ coaching centres
            etc. with prospective students who may be of interest to them.
            Counselling section is just solve the queries of the students and
            the person who shared that.
          </p>

          <h3>
            Content Material and related policies has been added in the privacy
            policy document
          </h3>

          <h3>Disclaimer for websites that we link to</h3>

          <p>We use our best endeavours to ensure that:</p>

          <ul>
            <li>
              the websites/apps we select for inclusion in the Platform work,
              and continue to work properly;
            </li>
            <li>their content remains acceptable and useful; and</li>
            <li>their operation will not be injurious to our users.</li>
          </ul>

          <p>
            We explicitly disclaim, and will not accept any responsibility for
            any of the following in respect of the sites that we link to:
          </p>

          <ul>
            <li>Infection by computer viruses</li>
            <li>Damage caused by downloaded software</li>
            <li>Technical problems, failures and speed of operation</li>
            <li>Libelous or illegal material</li>
            <li>
              The quality or truth of any material, or advice that is offered
            </li>
          </ul>

          <h3>Use to be in conformity with the Purpose</h3>

          <p>
            The Platform (including the Platform and related products) or
            Service or Product that You subscribe to or use (whether the same is
            paid for by You or not) is meant for the Purpose and only Your
            exclusive use. Copying or downloading or recreating or sharing
            passwords or sublicensing or sharing in any manner which is not in
            accordance with these terms, is a misuse of the Platform or Service
            or Product and Company reserves its rights to act in such manner as
            to protect its loss of revenue or reputation or claim damages
            including stopping Your service or access and reporting to relevant
            authorities. In the event You are found to be copying or misusing or
            transmitting, scraping or crawling any data or photographs or
            graphics or any information available on the Platform or Service of
            Product for any purpose other than that being a bonafide purpose, we
            reserve the right to take such action that we deem fit including
            stopping access and claiming damages.
          </p>

          <h3>Accuracy and correctness of the information provided by You:</h3>

          <p>
            Whilst using this Platform an obligation is cast upon You to only
            provide true and correct information and in the case of creating a
            profile You undertake to at all times keep the information up to
            date.
          </p>

          <p>
            We reserve the right to remove/suspend any content or profile
            providing false/incorrect or incomplete or outdated information or
            masquerading/ impersonating as someone else.
          </p>

          <p>
            Keep Your contact details upto date, wrong and false details by
            themselves can be a cause for termination of services. Also as a
            consequence we may not be able to reach You.
          </p>

          <h3>
            Security of Log in credentials and Responsibility of
            content/activities:
          </h3>

          <p>
            Do not share passwords, be responsible in what You post If You have
            registered on the Platform, the safety and security of Your log in
            credentials is Your responsibility, do not share these with anyone.
          </p>

          <p>
            You are fully responsible for all activities that occur under the
            account and any other actions taken in connection with the Platform.
            It is presumed that all activity happening through a user’s account
            on the Platform are being done after having obtained proper
            authorizations and all lawful permissions as may be applicable.
          </p>

          <p>
            The Platform may contain links to third party websites/apps, these
            links are provided solely as convenience to You and the presence of
            these links should not under any circumstances be considered as an
            endorsement of the contents of the same, if You choose to access
            these websites/apps You do so at Your own risk.
          </p>

          <h3>Disclaimer of Online Avability:</h3>

          <p>
            In addition to the other disclaimers and limitations discussed in
            this notice, there are no guarantees and no warranties regarding
            online availability, impressions, and clickthrough of the Website,
            its web pages, the Application and any material, information, links,
            or content presented on the web pages that may be accessible through
            the Platform. Platform reserves the right although it is under no
            obligation to ensure that advertising sponsors and advertising must
            be approved by Company before the posting of any advertising
            material, information, links, content, banners, and graphics on the
            Platform, however, the same may be reported by contacting us. Any
            advertising should be related to interactive digital television and
            related subject areas. Company reserves the right to accept or to
            reject any advertising sponsor or any advertising for any reason.
          </p>

          <h3>Make Your own decisions:</h3>

          <p>
            If You are making or planning to make any decision, whether personal
            or business decisions, based on the content on the site, You should
            conduct an independent verification before making Your important
            decision. In the case of any listings or banners displaying any
            content related to any educational products, You may contact the
            institution/individual directly. All decisions made would be
            entirely Your prerogative and Company does not claim to offer any
            advice, either legal or financial. Company doesn't take any
            ownership, directly or indirectly towards any person whatsoever,
            with respect to banners hosted on its Platform by its customers,
            which{" "}
          </p>

          <p>
            are strictly in the nature of sale of space by Platform & it has not
            carried out any independent verification on the authenticity or
            compliance requirements, as may have been required under any law for
            the time being in force, of such images/ banners/ listings. We are
            not responsible for any of your decisions.
          </p>

          <p>
            IN PURCHASING/SUBSCRIBING TO A PRODUCT/SERVICE OFFERED ON THIS
            PLATFORM YOU ARE ADVISED TO READ THESE TERMS CAREFULLY BEFORE
            PROCEEDING FURTHER. YOU HEREBY UNDERSTAND AND AGREE TO THE TERMS
            BELOW. IF YOU DO NOT UNDERSTAND AND AGREE WITH THESE TERMS THEN DO
            NOT PLACE AN ORDER FOR A PRODUCT/SERVICE.
          </p>

          <h3>Disclaimer :</h3>

          <p>
            The Company expressly disclaims warranties of any kind for any use
            of or any access to the Platform, to any material, information,
            links, or content presented on the web pages at the Platform, to any
            external website linked thereto, and to any external material,
            information, links, or content linked thereto. The Platform, and any
            material, information, links, and content presented on the web pages
            at the Platform, as well as any external website and any external
            material, information, links, and content linked thereto, are
            provided on an "as is" basis, without warranty of any kind, either
            express or implied, including, without limitation, the implied
            warranties of merchantability or fitness for a particular purpose,
            or non-infringement. The Company has no control over any external
            website or over any external material, information, links, and
            content linked to the Platform. Certain jurisdictions do not permit
            the exclusion of implied warranties and the foregoing exclusions of
            implied warranties may not apply to You. The Platform and its
            internal web pages may be unavailable for online access from time to
            time and at anytime; there are no guarantees and no warranties of
            online availability, impressions, and click-throughs. The entire
            risk as to the performance of, or non-performance of, or arising out
            of the use of, or the access of, or the lack of access to the
            Platform, to any material, information, links, or content presented
            on the web pages at the Platform, to any external website linked
            thereto, or to any external material, information, links, or content
            linked thereto, is borne by the user, visitor, customer, or other
            people. you can read the policies before registering in the website.
            Policies and terms will be considered as accepted by you while you
            are entering in the website{" "}
          </p>

          {/* <hr />
          <h3>{t("privacyPolicyPage.heading.3")}</h3>
          <p>
            <b>"{t("privacyPolicyPage.content.1.1")}"</b> -{" "}
            {t("privacyPolicyPage.content.1.2")}:
          </p>

          <h3>{t("privacyPolicyPage.heading.4")}</h3>

          <p>{t("privacyPolicyPage.content.12")}</p>

          <p>{t("privacyPolicyPage.content.13")}</p>

          <p className='para_bg'>{t("privacyPolicyPage.content.14")}</p>

          <hr />

          <h3>{t("privacyPolicyPage.heading.5")}</h3>

          <p>{t("privacyPolicyPage.content.15")}</p>

          <p>{t("privacyPolicyPage.content.16")}</p>

          <hr />

          <h3>{t("privacyPolicyPage.heading.6")}</h3>
          <p>{t("privacyPolicyPage.content.17")}</p>
          <hr />
          <h3>{t("privacyPolicyPage.heading.7")}</h3>

          <p>{t("privacyPolicyPage.content.18")}</p>

          <p>{t("privacyPolicyPage.content.19")}</p>

          <hr />

          <h3>{t("privacyPolicyPage.heading.8")}</h3>

          <p>{t("privacyPolicyPage.content.20")}</p>

          <p>{t("privacyPolicyPage.content.21")}</p>

          <p>{t("privacyPolicyPage.content.22")}</p> */}
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
};

export default PrivacyPolicy;
