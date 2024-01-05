import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PublicRoute from "./routers/PublicRouter";
import PrivateRoute from "./routers/PrivateRouter";
import { routingConstants } from "./utils/constants";
import "./App.css";

const ForgotPage = React.lazy(() => import("./pages/ForgotPage/ForgotPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage/SignupPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const About = React.lazy(() => import("./pages/About"));
const Career = React.lazy(() => import("./pages/Career"));
const BlogPage = React.lazy(() => import("./pages/More/BlogPage"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));
const EventPage = React.lazy(() => import("./pages/More/EventPage"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));
const MagzineDetails = React.lazy(() => import("./pages/MagzineDetails"));
const MagazinePage = React.lazy(() => import("./pages/More/MagazinePage"));
const CareerDetails = React.lazy(() => import("./pages/CareerDetails"));
const Career1Details = React.lazy(() => import("./pages/Career1Details"));
const Career2Details = React.lazy(() => import("./pages/Career2Details"));
const Career1 = React.lazy(() => import("./pages/Career1"));
const Career2 = React.lazy(() => import("./pages/Career2"));
const MyProfile = React.lazy(() => import("./pages/MyProfile"));
const Courses = React.lazy(() => import("./pages/Courses"));
const CoursesDetails = React.lazy(() => import("./pages/CoursesDetails"));
const CoursesModule = React.lazy(() => import("./pages/CoursesModule"));
const GuidanceBook = React.lazy(() => import("./pages/GuidanceBook"));
const CertificatePage = React.lazy(() => import("./pages/CertificatePage"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const CourseTest = React.lazy(() => import("./pages/CourseTest"));
const CourseResult = React.lazy(() => import("./pages/CourseResult"));
const CareerTestResult = React.lazy(() => import("./pages/CareerTestResult"));
const CourseCertificate = React.lazy(() => import("./pages/CourseCertificate"));
const FaqPage = React.lazy(() => import("./pages/More/FaqPage"));
const MockTest = React.lazy(() => import("./pages/MockTest"));
const MockTestDetail = React.lazy(() => import("./pages/MockTestDetail"));
const SuccessStoryDetailPage = React.lazy(() =>
  import("./pages/SuccessStoryDetails"),
);
// const Magzine = React.lazy(() => import("./pages/Magzine"));
const CertificateFullView = React.lazy(() =>
  import("./pages/CertificateFullView"),
);
const SuccessStories = React.lazy(() => import("./pages/SuccessStories"));
const SuccessCareerTest = React.lazy(() => import("./pages/SuccessCareerTest"));
const SuccessCareerOption = React.lazy(() =>
  import("./pages/SuccessCareerOption"),
);
const SuccessStroyWithHashtag = React.lazy(() =>
  import("./pages/SuccessStroyWithHashtag"),
);
const MyProgress = React.lazy(() => import("./pages/MyProgress"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const AllCertificatePage = React.lazy(() => import("./pages/Certificates"));
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword"));
const CertificateDetail = React.lazy(() =>
  import("./pages/Certificates/CertificatesDetail"),
);
const Notifications = React.lazy(() => import("./pages/Notifications"));
// const NotificationDetails = React.lazy(() => import("./pages/NotificationDetails"));
const EmailPage = React.lazy(() => import("./pages/EmailPage"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const SuccessCareerOption2 = React.lazy(() =>
  import("./pages/SuccessCareerOption/SuccessCareerOption2"),
);
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const DataNotFound = React.lazy(() => import("./pages/DataNotFound"));

const BlogCategoryPage = React.lazy(() => import("./pages/BlogsWithCatogry"));
const BlogTagsPage = React.lazy(() => import("./pages/BlogsWithTags"));
const GlobalSearchPage = React.lazy(() => import("./pages/Search"));
const ResumeBUilderPage = React.lazy(() => import("./pages/ResumeBuilder"));
const JobPage = React.lazy(() => import("./pages/Jobs"));
const AllSuccessStories = React.lazy(() => import("./pages/AllSuccessStories"));
const RssFeedPage = React.lazy(() => import("./pages/rssFeed/RssFeedPage"));

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  useEffect(() => {
    const disableTextSelection = (e) => {
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    const disableCopyCutPaste = (e) => {
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    const disableDelete = (e) => {
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("copy", disableCopyCutPaste);
    document.addEventListener("cut", disableCopyCutPaste);
    document.addEventListener("paste", disableCopyCutPaste);
    document.addEventListener("keydown", disableDelete);
    document.addEventListener("selectstart", disableTextSelection);

    return () => {
      document.removeEventListener("copy", disableCopyCutPaste);
      document.removeEventListener("cut", disableCopyCutPaste);
      document.removeEventListener("paste", disableCopyCutPaste);
      document.removeEventListener("keydown", disableDelete);
      document.removeEventListener("selectstart", disableTextSelection);
    };
  }, []);

  return (
    <>
      <Switch>
        <PublicRoute
          exact
          path={`${routingConstants.LOGIN}`}
          component={LoginPage}
        />
        <PublicRoute
          exact
          path={routingConstants.SIGN_UP}
          component={SignupPage}
        />
        <PublicRoute
          exact
          path={routingConstants.FORGOT}
          component={ForgotPage}
        />
        <PublicRoute
          exact
          path={routingConstants.RESET_PASSWORD}
          component={ResetPassword}
        />
        <Route exact path={routingConstants.HOME_PAGE} component={HomePage} />
        <Route exact path={routingConstants.ABOUT} component={About} />
        <Route exact path={routingConstants.TOP_COLLEGES} component={Career} />
        <Route exact path={routingConstants.TOP_SCHOOLS} component={Career1} />
        <Route exact path={routingConstants.MORE_BLOG} component={BlogPage} />
        <Route
          exact
          path={`${routingConstants.MORE_EVENT}/:genre`}
          component={EventPage}
        />

        <Route
          exact
          path={routingConstants.MORE_MAGAZINE}
          component={MagazinePage}
        />
        <Route
          exact
          path={routingConstants.ALL_NOTIFICATION}
          component={Notifications}
        />
        <Route exact path={routingConstants.MOCKTEST} component={MockTest} />
        <Route exact path={routingConstants.FAQ} component={FaqPage} />
        <Route
          exact
          path={routingConstants.GOVERNMENT_SCHEMES}
          component={Career2}
        />
        <Route exact path={routingConstants.COURSES} component={Courses} />
        <Route exact path={routingConstants.MY_PROFILE} component={MyProfile} />
        <Route
          exact
          path={routingConstants.GUIDANCE_BOOK}
          component={GuidanceBook}
        />
        <Route
          exact
          path={routingConstants.CERTIFICATE_PAGE}
          component={CertificatePage}
        />

        <Route
          exact
          path={routingConstants.SUCCESS_STORIES}
          component={SuccessStories}
        />
        <Route
          exact
          path={`${routingConstants.ALL_SUCCESS_STORIES}:hashtag`}
          component={AllSuccessStories}
        />
        <Route
          exact
          path={`${routingConstants.SUCCESS_STORIES_HASHTAG}/:search`}
          component={SuccessStroyWithHashtag}
        />

        <Route
          exact
          path={`${routingConstants.MORE_BLOG_CATEGORY}/:search`}
          component={BlogCategoryPage}
        />
        <Route
          exact
          path={`${routingConstants.MORE_BLOG_TAGS}/:search`}
          component={BlogTagsPage}
        />
        <Route
          exact
          path={routingConstants.SUCCESS_CAREER_TEST}
          component={SuccessCareerTest}
        />
        <Route
          exact
          path={routingConstants.SUCCESS_CAREER_OPTION}
          component={SuccessCareerOption}
        />
        <Route
          exact
          path={routingConstants.SUCCESS_2}
          component={SuccessCareerOption2}
        />
        <Route
          exact
          path={routingConstants.ALL_CERTIFICATE_PAGE}
          component={AllCertificatePage}
        />
        <Route
          exact
          path={routingConstants.SEARCH}
          component={GlobalSearchPage}
        />
        <Route
          exact
          path={`${routingConstants.MORE_EVENT_DETAILS}:search/:id`}
          component={EventDetails}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.MORE_MAGAZINE}:id`}
          component={MagzineDetails}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.MOCKTEST}:id`}
          component={MockTestDetail}
        />
        <Route
          exact
          path={`${routingConstants.MORE_BLOG}:search/:id`}
          component={BlogDetails}
        />
        <Route
          exact
          path={`${routingConstants.SUCCESS_STORIES}:search/:id`}
          component={SuccessStoryDetailPage}
        />
        {/* <PrivateRoute
          exact
          path={`${routingConstants.ALL_NOTIFICATION}:id`}
          component={NotificationDetails}
        /> */}
        <PrivateRoute
          exact
          path={`${routingConstants.ALL_CERTIFICATE_DETAIL}:id/:isDownload?`}
          component={CertificateDetail}
          showButton
          size='large'
        />
        <Route exact path={routingConstants.CONTACT_US} component={ContactUs} />
        <Route exact path={routingConstants.EMAIL_PAGE} component={EmailPage} />
        <PrivateRoute
          exact
          path={`${routingConstants.COURSE_DETAILS}:id`}
          component={CoursesDetails}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.TOP_COLLEGES}:id`}
          component={CareerDetails}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.TOP_SCHOOL}:id`}
          component={Career1Details}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.GOVERNMENT_SCHEMES}:id`}
          component={Career2Details}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.COURSES_MODULE}:id`}
          component={CoursesModule}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.COURSES_TEST}:id`}
          component={CourseTest}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.COURSES_RESULT}:id`}
          component={CourseResult}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.CAREER_TEST_RESULT}:id`}
          component={CareerTestResult}
        />
        <PrivateRoute
          exact
          path={`${routingConstants.COURSE_CERTIFICATE}:id`}
          component={CourseCertificate}
        />
        <PrivateRoute
          exact
          path={routingConstants.CERTIFICATE_FULL_VIEW}
          component={CertificateFullView}
        />
        <PrivateRoute
          exact
          path={routingConstants.MY_PROGESS}
          component={MyProgress}
        />
        <Route
          exact
          path={routingConstants.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        <Route
          exact
          path={routingConstants.FORGOT_PASSWORD}
          component={ForgetPassword}
        />
        <Route
          exact
          path={routingConstants.DATA_NOT_FOUND}
          component={DataNotFound}
        />
        <Route
          exact
          path={routingConstants.RESUME_BUILDER}
          component={ResumeBUilderPage}
        />
        <Route exact path={routingConstants.JOBS} component={JobPage} />
        <Route exact path={routingConstants.RSSFEED} component={RssFeedPage} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
