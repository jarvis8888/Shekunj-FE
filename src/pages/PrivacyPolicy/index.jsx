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
            The debugger for the browser must be activated in order to debug the
            code. Built-in debuggers may be switched on and off, requiring the
            user to report faults. The remaining section of the code should stop
            execution before moving on to the next line while debugging.
          </p>

          <h3>Content </h3>

          <p>
            Our platform operates on a model that refrains from reviewing or
            editing content for legal compliance. We do not exert editorial
            control, and thus cannot guarantee the content's reliability,
            validity, accuracy, or truthfulness. Users accessing content do so
            at their own risk. The content, encompassing images, texts, test
            papers, and videos, is curated from reputable sources such as
            Microsoft Learn, Google, Infoedge, Freepik, Shutterstock, and more.
            Importantly, our learning resources are provided free of charge, and
            we do not claim ownership of the content.
          </p>

          <h3>Sensitive information and other related </h3>

          <p>
            While using our services, you may encounter content that some may
            find offensive or objectionable. Shekunj.com holds no responsibility
            for shielding users from such content, and users accept the
            associated risks voluntarily. This extends to health, wellness, and
            physical exercise-related content. Users are accountable for their
            choices and assume risks, including illness, bodily injury,
            disability, or death.
          </p>

          <p>
            Direct interactions with students or instructors require caution in
            sharing personal information. While we restrict the information
            instructors may request, we do not govern the actions of users with
            acquired information. Users are advised against sharing personal
            details for safety reasons. Shekunj.com is not involved in
            instructor/counselor hiring and disclaims responsibility for
            interactions between instructors and students, including disputes,
            claims, losses, injuries, or damages.
          </p>

          <p>
            Users may encounter links to third-party websites not owned or
            controlled by us when using our services. We disclaim responsibility
            for the content and aspects of these sites, including data
            collection practices. Users are encouraged to review the terms and
            conditions and privacy policies of these third-party sites.
          </p>

          <h3>Trademarks and rights</h3>

          <p>
            Our platforms and services are safeguarded by copyright, trademark,
            and other laws. Users are not granted the right to use the Shekunj
            name or trademarks without explicit permission. Feedback, comments,
            or suggestions must be communicated via email and should not be
            posted directly on social media or public platforms that may tarnish
            the brand's image. Shekunj reserves the right to take appropriate
            action in such cases.
          </p>

          <h3>Dispute Resolution </h3>

          <p>
            We advocate a harmonious existence and believe in resolving issues
            through dialogue. If disputes arise, our Support Team is available
            to assist in resolution. In the event of an unsuccessful resolution,
            individuals in India can schedule an appointment for a mediation
            session to address the issue.
          </p>

          <h3>How to Contact Us </h3>

          <p>
            We welcome your inquiries, concerns, and feedback about our
            Services. The most effective way to connect with us is through our
            support team. Your questions will be met with the attention they
            deserve.
          </p>

          <h3>Information collection </h3>

          <p>
            At Shekunj.com, we prioritize enhancing our services for all users,
            and to achieve this, we collect information in various ways:
          </p>

          <ul>
            <li>{t("privacyPolicyPage.content.2")}</li>

            <li>{t("privacyPolicyPage.content.3")}</li>

            {/* <li>{t("privacyPolicyPage.content.2")}</li> */}

            {/* <li>{t("privacyPolicyPage.content.3")}</li> */}

            <li>{t("privacyPolicyPage.content.4")}</li>
            <li>{t("privacyPolicyPage.content.23")}</li>

            {/* <li>{t("privacyPolicyPage.content.5")}</li>

            <li>{t("privacyPolicyPage.content.6")}</li>

            <li>{t("privacyPolicyPage.content.7")}</li>

            <li>{t("privacyPolicyPage.content.8")}</li>

            <li>{t("privacyPolicyPage.content.9")}</li>

            <li>{t("privacyPolicyPage.content.10")}</li>

            <li>{t("privacyPolicyPage.content.11")}</li> */}
          </ul>

          {/* <p>
            When you communicate with shekunj.com or its Application or use the
            shekunj.com platform to communicate with other Members (such as
            advertisers, colleges/ institutes, etc.), we collect information
            about your communication and any other additional information you
            choose to provide.{" "}
          </p> */}

          <h3>Processing personal information</h3>

          <p>
            At Shekunj.com, we engage in the processing of your Personal
            Information for various purposes, ensuring a secure and enhanced
            user experience. The key objectives include:
          </p>

          <ol>
            <li>
              Enhancing User Experience: We utilize data obtained from cookies
              and advanced technologies like pixel tags to elevate your overall
              user experience and optimize the quality of our services. When
              presenting tailored advertisements, we strictly avoid associating
              identifiers with sensitive categories such as race, religion,
              sexual orientation, or health.
            </li>
            <li>
              Tailored Recommendations: Our automated systems analyze your
              content to offer personalized search results, recommendations, and
              exclusive promotions tailored to your preferences.
            </li>
            <li>
              Communication and Alerts: We send alerts and newsletters based on
              your subscription preferences. To manage your subscriptions,
              please visit your account settings.
            </li>
            <li>
              Website Improvement: Continuous enhancement of our website and its
              content to deliver better features and services.
            </li>
            <li>
              Market Research and Surveys: Conducting market research and
              surveys to refine our products and services for an improved user
              experience.
            </li>
            <li>
              Marketing and Promotions: Sending information about our products
              and services for marketing purposes and promotions.
            </li>
            <li>
              Security and Legal Compliance: <br /> - Preventing, detecting, and
              investigating crimes, including fraud and financial crimes. <br />{" "}
              - Identity verification, government sanctions screening, and due
              diligence checks. <br /> - Establishing, exercising, or defending
              legal rights in legal proceedings, seeking professional advice
              when necessary.
            </li>
            <li>
              Sharing with Educational Institutions: We may share personal
              information (name, mobile number, and email address) with
              carefully selected educational institutions based on your
              expressed interest. These institutions may use the information for
              marketing campaigns or recruitment. However, we explicitly
              instruct them not to use this data for any other purposes.
            </li>
          </ol>
          <p>
            Note: The utilization of data by educational institutions is not
            governed by our privacy policy, and we are not responsible for how
            they handle the shared information.
          </p>
          <p>
            Users are encouraged to refer to the privacy policies of respective
            institutions for further information on their data practices.
          </p>
          <h3>Third-Party Services </h3>

          <p>
            Certain services on Shekunj.com are provided by third parties. We
            may share information, including Personal Information, collected on
            the web with third-party service providers to facilitate the
            delivery of programs, products, information, and services. These
            services may include associated charges.
          </p>

          <h3>Social Media </h3>

          <p>
            Shekunj.com actively maintains channels, pages, and accounts on
            various social media platforms to keep you informed, assist, and
            foster engagement. In these spaces, we carefully monitor and
            document comments and posts related to Shekunj.com. This practice
            allows us to enhance our products and services.
          </p>

          <p>
            Kindly be aware that while we encourage interaction, certain
            information should not be shared with Shekunj.com through social
            media channels. This includes sensitive personal data, comprising
            special categories such as racial or ethnic origin, political
            opinions, religious beliefs, and more. Additionally, we discourage
            the sharing of other sensitive personal data like criminal
            convictions and national identification numbers.
          </p>
          <p>
            Inappropriate, offensive, or insulting content towards individuals
            or groups is not in line with our communication standards. We
            appreciate your cooperation in maintaining a positive and respectful
            online environment.
          </p>

          <h3>Changes to this Policy</h3>

          <p>
            Shekunj.com reserves the right to update, modify, or change this
            policy at any time. Such alterations will become effective as of the
            date of the update, modification, or change.
          </p>

          <h3>Disclaimer</h3>

          <p>
            Shekunj.com holds no liability for any loss or damage resulting from
            the inadvertent or intentional disclosure of user account
            information, including details related to online transactions,
            credit/debit card verification processes, and particulars. The
            platform does not store any credit/debit card details. Shekunj.com
            will not be held responsible for the breach of voluntarily shared
            personal information not requested during registration.
          </p>

          {/* <p>
            Any other personal information shared by you which is not asked by
            shekunj.com during registration, either mandatorily or optionally;
            accounts to wilful and intentional furnishing; and shekunj.com will
            not be liable for breach of such information.{" "}
          </p> */}

          {/* <h3 className="text-center">Terms & Conditions </h3> */}

          <h3>Terms and Conditions</h3>

          <p>
            These Terms of Use ("Terms") constitute a legally binding agreement
            ("Agreement") between the user ("You") and R Dot Ventures Pvt. Ltd.,
            the owner and operator of www.shekunj.com ("Website"). These Terms
            govern Your use of the Website, collectively referred to as the
            "Platform," including subdomains, mobile applications, and
            application program interfaces.
          </p>
          <p>
            Access to any part of the Platform or content downloaded from it is
            subject to Your acceptance and compliance with these Terms and the
            Privacy Policy. If You do not understand or agree to be bound by
            these Terms and the Privacy Policy, refrain from using this
            Platform.
          </p>

          <p>
            These Terms are binding upon You, your heirs, representatives,
            successors, and assigns. The headings within these Terms are
            inserted for reference convenience only and carry no additional
            meaning or effect.
          </p>

          <p>
            Additionally, depending on the chosen basic services, specific
            product conditions may apply.
          </p>

          <h3>Representation and Warranty</h3>

          <p>
            You affirm that if you are under 18 or the majority age in your
            jurisdiction, you must use the Platform under the supervision of a
            parent, legal guardian, or responsible adult. By accessing or using
            the Platform, you declare that you meet the minimum age requirement,
            possess the legal capacity, and have the authority to enter into a
            contract by applicable laws. You also assert that you are not under
            any legal or other disability hindering your compliance with these
            Terms or the installation and use of purchased products with minimal
            risk to yourself or others. Additionally, you confirm that you are
            not acquiring products/services for resale without the Company's
            prior written consent.
          </p>

          <p>
            You must lawfully pursue the defined purpose for using the Platform.
          </p>

          <h3>Purpose</h3>

          <p>
            The Platform serves educational purposes, assisting students in
            exploring colleges, courses, and exams. It facilitates connections
            between educational institutions and prospective students. The
            counseling section addresses student queries. Content Material and
            related policies are detailed in the privacy policy document.
          </p>

          <h3>Disclaimer for Linked Websites:</h3>

          <p>
            We diligently ensure that websites/apps included in the Platform
            operate correctly, maintain acceptable content, and do not harm
            users. However, we explicitly disclaim responsibility for:
          </p>

          <ul>
            <li>Infection by computer viruses</li>
            <li>Damage from downloaded software</li>
            <li>Technical issues and speed of operation</li>
            <li>Libelous or illegal material</li>
            <li>The quality or truth of any offered material or advice</li>
          </ul>

          <h3>Use Compliance</h3>

          <p>
            The Platform, its products, or subscribed services are intended
            solely for the specified Purpose and your exclusive use. Any
            unauthorized actions such as copying, downloading, recreating,
            sharing passwords, sublicensing, or any use not by these terms is
            considered misuse. The Company reserves the right to protect against
            revenue loss or damage to reputation, including suspending access,
            reporting to relevant authorities, and seeking damages, if you are
            found to be misusing or transmitting data or information for
            purposes other than the intended bona fide purpose.
          </p>

          <h3>Accuracy and Integrity of Information</h3>

          <p>
            When utilizing this Platform, you must provide only accurate and
            truthful information. If you create a profile, you commit to
            maintaining up-to-date information. We retain the right to suspend
            or remove any content or profile that contains false, incorrect,
            incomplete, or outdated information, or that impersonates someone
            else. Keeping your contact details current is essential, as
            inaccurate information may lead to service termination, and we may
            be unable to reach you.
          </p>

          {/* <p>
            We reserve the right to remove/suspend any content or profile
            providing false/incorrect or incomplete or outdated information or
            masquerading/ impersonating as someone else.
          </p>

          <p>
            Keep Your contact details upto date, wrong and false details by
            themselves can be a cause for termination of services. Also as a
            consequence we may not be able to reach You.
          </p> */}

          <h3>Security of Login Credentials and Content Responsibility</h3>

          <p>
            Maintain the confidentiality of your passwords and exercise
            responsibility in your posts. If you are a registered user,
            safeguarding the security of your login credentials is solely your
            responsibility; refrain from sharing them with others. You are
            accountable for all activities under your account, assuming they are
            performed with proper authorization and lawful permissions. Links to
            third-party websites/apps provided on the Platform are for
            convenience only; their presence does not constitute an endorsement.
            Accessing these links is at your own risk.
          </p>

          {/* <p>
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
          </p> */}

          <h3>Disclaimer of Online Availability</h3>

          <p>
            The Platform makes no guarantees or warranties regarding online
            availability, impressions, and clickthrough. While the Platform
            reserves the right (though not obligated) to approve advertising
            sponsors and content, it is not responsible for verifying the
            authenticity or compliance of banners, graphics, or listings. Users
            are encouraged to report any discrepancies. Users should
            independently verify information before making decisions based on
            the Platform's content. The Platform does not provide legal or
            financial advice and is not responsible for user decisions.
          </p>

          <h3>User Autonomy and Decision-Making</h3>

          <p>
            Users are encouraged to independently verify information before
            making personal or business decisions based on the Platform's
            content. The Platform does not endorse or claim ownership over
            banners hosted by customers and does not conduct independent
            verification of their authenticity or compliance. Users are
            responsible for their decisions.
          </p>

          {/* <p>
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
          </p> */}
          <h3>Terms of Purchase/Subscription</h3>
          <p>
            Before purchasing or subscribing to a product/service on this
            Platform, carefully review and understand the provided terms. By
            proceeding with an order, you acknowledge and agree to the terms. If
            you do not comprehend or agree with these terms, refrain from
            placing an order for a product/service.
          </p>

          <h3>Disclaimer:</h3>

          <p>
            The Company explicitly disclaims all warranties related to the use
            or access of the Platform, including any material, information,
            links, or content displayed on the Platform's web pages, as well as
            any external websites and their associated material, information,
            links, or content. All such resources are provided "as is," without
            any express or implied warranties, such as merchantability, fitness
            for a particular purpose, or non-infringement.
          </p>

          <p>
            The Company lacks control over external websites and their content
            linked to the Platform. In certain jurisdictions, the exclusion of
            implied warranties may not be permitted, and these exclusions may
            not apply to you. Additionally, the Platform and its internal web
            pages may be intermittently unavailable online, with no guarantees
            or warranties regarding availability, impressions, or
            click-throughs.
          </p>

          <p>
            Users, visitors, customers, and others acknowledge that the entire
            risk associated with the performance or non-performance, use, or
            lack of access to the Platform and its contents, as well as external
            websites and their materials, lies with them. It is advisable to
            review the policies before registering on the website, and by
            entering the website, users implicitly accept and agree to abide by
            the policies and terms.
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
