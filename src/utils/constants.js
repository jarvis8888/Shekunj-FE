const carouselConstant = {
  COURSES: "COURSES",
  TEST: "TEST",
  COLLEGES: "COLLEGES",
  SCHOOLS: "SCHOOLS",
  COURSE_DETAIL: "courseDetail",
  HOMEPAGE: "homePage",
};

const routingConstants = {
  ABOUT: "/about/",
  ALL_CERTIFICATE_DETAIL: "/certificate-detail/",
  ALL_CERTIFICATE_PAGE: "/all-certificate-page/",
  BLOGS: "http://www.thehrnotes.com/",
  CERTIFICATE_FULL_VIEW: "/certificate-full-view/",
  CERTIFICATE_PAGE: "certificate-page/",
  CONTACT_US: "/contact-us/",
  COURSE_CERTIFICATE: "/course-certificate/",
  COURSE_DETAILS: "/courses-details/",
  COURSES_MODULE: "/courses-module/",
  COURSES_RESULT: "/course-result/",
  COURSES_TEST: "/courses-test/",
  COURSES: "/courses/",
  EMAIL_PAGE: "/email-page/",
  FORGOT: "/forgot",
  GOVERNMENT_EXAMS: "/government-exams/",
  GUIDANCE_BOOK: "/guidance-book/",
  HOME_PAGE: "/",
  LOGIN: "/login",
  MY_PROFILE: "/my-profile/",
  MY_PROGESS: "/my-progress/",
  PRIVACY_POLICY: "/privacy-policy/",
  RESET_PASSWORD: "/authentication/password-reset/:uidb/:token/",
  SIGN_UP: "/sign-up",
  SUCCESS_2: "/success2/",
  SUCCESS_CAREER_OPTION: "/success-career-option/",
  SUCCESS_CAREER_TEST: "/success-career-test/",
  SUCCESS_STORIES: "/success-stories/",
  TOP_COLLEGES: "/top-colleges/",
  TOP_SCHOOLS: "/top-schools/",
};

const apiConstants = {
  AUTH: {
    CHANGE_PASSWORD : "/authentication/change_password/",
    LOGIN: "authentication/login/",
    REGISTER: "authentication/register/",
    REGISTER_WITH_GOOGLE : "social_auth/google/",
    REQUEST_RESET_EMAIL : "authentication/request-reset-email/",
    USER_PROFILE : "/authentication/user-profile/",
    USER_PROFILE_UPDATE : "/authentication/user-profile-update/",
    USER_SEND_OTP : "authentication/user-send-otp/",
  },
  CAREER: {
    GOVERNMENT_EXAMS: "career/government-exam/",
    TOP_COLLEGE_LIST: "career/top-collage-list/",
    TOP_SCHOOL_LIST: "career/top-school-list/",
  },
  CERTIFICATE: {
    USER_ALL_CERTIFICATE: "course/user-all-certificate/",
    USER_CERTIFICATE: "course/user-certificate/",
  },
  COURSES: {
    HOME : "/course/home/",
    CATEGORY_DETAIL : "/course/category-detail/",
    CATEGORY_LIST : "course/category-list/",
    COURSE_LIST : "/course/list/",
    COURSE_DETAIL : "/course/detail/",
    COURSE_MODULE_LIST : "/course/course-module-list/",
    ONLINE_TEST_CATEGORY_LIST : "/course/online-test-category-list/",
    START_USER_COURSE : "/course/start-user-course/",
    SUCCESS_STORY : "/course/success-story",
    USER_COURSE_END_TIME : "/course/user-course-end-time/",
    USER_COURSE_RESULT : "/course/user-course-result/",
    USER_TEST_COURSE : "/course/user-test-course/",
    USER_TEST_COUNT : "/course/user-test-count/",
  },
  GUIDANCE : {
    BOOK_SESSION : "/course/book-session/",
    GUIDANCE_CATEGORY : "career/guidance-category/",
    START_USER_CAREER_TEST : "career/start-user-career-test/",
    USER_CAREER_COUNT : "career/user-career-count/",
  },
  MY_PROGRESS : {
    USER_PROGRESS : "course/user-progress/",
  }
};

export { carouselConstant, routingConstants, apiConstants };
