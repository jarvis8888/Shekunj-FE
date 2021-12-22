(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[29],{180:function(t,e,n){"use strict";n.d(e,"e",(function(){return h})),n.d(e,"d",(function(){return S})),n.d(e,"f",(function(){return b})),n.d(e,"h",(function(){return _})),n.d(e,"b",(function(){return y})),n.d(e,"i",(function(){return O})),n.d(e,"a",(function(){return E})),n.d(e,"g",(function(){return I})),n.d(e,"c",(function(){return m}));var r=n(1),a=n(18),c=n.n(a),u=n(32),o=n(8),s=n(25),i=n(31),p=n(35),l=n(30),d=n.n(l),f=(n(185),n(232)),v=n.n(f),h=function(t,e,n){return function(){var r=Object(u.a)(c.a.mark((function r(a){var u;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a({type:o.a.LOGIN_REQUEST}),r.next=4,i.a.post("authentication/login/",t);case 4:u=r.sent,a({type:o.a.LOGIN_FINISH,payload:{name:u.data.name,email:u.data.email}}),d.a.set("sheToken",u.data.tokens),n?e.push(n):e.push("/MyProgress"),r.next=14;break;case 10:r.prev=10,r.t0=r.catch(0),a({type:o.a.LOGIN_FAIL}),r.t0&&500===r.t0.status?s.b.error(r.t0.data.message,p.a):r.t0&&400===r.t0.status&&s.b.error(r.t0.data.errors.error[0],p.a);case 14:case"end":return r.stop()}}),r,null,[[0,10]])})));return function(t){return r.apply(this,arguments)}}()},S=function(t){return function(){var e=Object(u.a)(c.a.mark((function e(n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d.a.remove("sheToken"),n({type:o.a.LOGIN_FAIL}),t.push("/login");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},b=function(t,e){return function(){var n=Object(u.a)(c.a.mark((function n(r){var a;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:o.a.SIGNUP_REQUEST}),n.next=4,i.a.post("authentication/register/",t);case 4:a=n.sent,r({type:o.a.SIGNUP_FINISH,payload:t}),d.a.set("sheToken",a.data.token),e.push("/MyProgress"),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),r({type:o.a.SIGNUP_FAIL}),400===(null===n.t0||void 0===n.t0?void 0:n.t0.status)?s.b.error(n.t0.data.errors.error[0],p.a):500===(null===n.t0||void 0===n.t0?void 0:n.t0.status)&&s.b.error("Not valid OTP",p.a);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(t){return n.apply(this,arguments)}}()},_=function(t,e){return function(){var n=Object(u.a)(c.a.mark((function n(r){var a;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.a.post("social_auth/google/",t);case 3:a=n.sent,r({type:o.a.LOGIN_FINISH,payload:{name:a.data.username,email:a.data.email}}),d.a.set("sheToken",a.data.tokens.access),e.push("/MyProgress"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),s.b.error("Google Login failed.",p.a);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(t){return n.apply(this,arguments)}}()},y=function(t){return function(){var e=Object(u.a)(c.a.mark((function e(n){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:o.a.CONTACT_VERIFY_REQUEST}),e.next=4,i.a.post("authentication/user-send-otp/",{contact:t.contact.toString()});case 4:r=e.sent,n({type:o.a.CONTACT_VERIFY_FINISH}),s.b.success(r.message,p.a),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),n({type:o.a.CONTACT_VERIFY_FAIL}),400===(null===e.t0||void 0===e.t0?void 0:e.t0.status)&&s.b.error(e.t0.data.errors.error[0],p.a);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()},O=function(t,e){return function(){var n=Object(u.a)(c.a.mark((function n(r){var a;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:o.a.EMAIL_VERIFY_REQUEST}),n.next=4,i.a.post("authentication/request-reset-email/",t);case 4:a=n.sent,r({type:o.a.EMAIL_VERIFY_FINISH}),e.push("/login"),s.b.success(a.data.success,p.a),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),r({type:o.a.EMAIL_VERIFY_FAIL}),s.b.error("E-mail not found",p.a);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(t){return n.apply(this,arguments)}}()},E=function(t,e){return function(){var n=Object(u.a)(c.a.mark((function n(r){var a;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:o.a.RESET_PASSWORD_REQUEST}),n.next=4,i.a.post("/authentication/change_password/",t);case 4:a=n.sent,r({type:o.a.RESET_PASSWORD_FINISH}),d.a.remove("sheToken"),e.push("/login"),s.b.success(a.message,p.a),n.next=15;break;case 11:n.prev=11,n.t0=n.catch(0),r({type:o.a.RESET_PASSWORD_FAIL}),400===n.t0.status&&s.b.error(n.t0.data.errors.old_password.old_password,p.a);case 15:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(t){return n.apply(this,arguments)}}()},I=function(){return function(){var t=Object(u.a)(c.a.mark((function t(e){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:d.a.get("sheToken")&&e({type:o.a.REFRESH});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},m=function(){return function(){var t=Object(u.a)(c.a.mark((function t(e){var n,a,u,l,d,f,h,S,b,_,y,O,E;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e({type:o.a.USER_PROFILE_REQUEST}),t.next=4,i.a.get("/authentication/user-profile/");case 4:E=t.sent,e({type:o.a.USER_PROFILE_FINISH,payload:Object(r.a)(Object(r.a)({},null===E||void 0===E?void 0:E.data),{},{contact:(null===E||void 0===E||null===(n=E.data)||void 0===n?void 0:n.contact)?(null===E||void 0===E||null===(a=E.data)||void 0===a||null===(u=a.contact)||void 0===u?void 0:u.includes("+91"))?null===E||void 0===E||null===(d=E.data)||void 0===d?void 0:d.contact:"+91 ".concat(null===E||void 0===E||null===(l=E.data)||void 0===l?void 0:l.contact):null,profile_pic:(null===E||void 0===E||null===(f=E.data)||void 0===f?void 0:f.profile_pic)?(null===E||void 0===E||null===(h=E.data)||void 0===h||null===(S=h.profile_pic)||void 0===S?void 0:S.includes("http://3.109.195.234"))?null===E||void 0===E||null===(b=E.data)||void 0===b?void 0:b.profile_pic:"http://3.109.195.234".concat(null===E||void 0===E||null===(_=E.data)||void 0===_?void 0:_.profile_pic):null,dob:(null===E||void 0===E||null===(y=E.data)||void 0===y?void 0:y.dob)?v()(null===E||void 0===E||null===(O=E.data)||void 0===O?void 0:O.dob).format("DD-MM-YYYY"):null})}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),e({type:o.a.USER_PROFILE_FAIL}),400===(null===t.t0||void 0===t.t0?void 0:t.t0.status)?s.b.error(t.t0.data.errors.error[0],p.a):500===(null===t.t0||void 0===t.t0?void 0:t.t0.status)&&s.b.error("Internal Server Error",p.a);case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}},182:function(t,e,n){"use strict";n(0),n(195);var r=n(4);e.a=function(t){var e=t.error,n=t.touched;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"text-danger err",children:e&&n?e:null})})}},185:function(t,e,n){"use strict";n.d(e,"h",(function(){return v})),n.d(e,"b",(function(){return h})),n.d(e,"a",(function(){return S})),n.d(e,"l",(function(){return b})),n.d(e,"m",(function(){return _})),n.d(e,"f",(function(){return y})),n.d(e,"e",(function(){return O})),n.d(e,"g",(function(){return E})),n.d(e,"i",(function(){return I})),n.d(e,"o",(function(){return m})),n.d(e,"n",(function(){return x})),n.d(e,"d",(function(){return g})),n.d(e,"k",(function(){return R})),n.d(e,"c",(function(){return j})),n.d(e,"p",(function(){return T})),n.d(e,"j",(function(){return N}));var r=n(33),a=n(1),c=n(18),u=n.n(c),o=n(32),s=n(30),i=n.n(s),p=n(6),l=n(31),d=n(25),f=n(113),v="https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",h=function(){return function(){var t=Object(o.a)(u.a.mark((function t(e){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e({type:p.a.HOME_COURSE_REQUEST}),t.next=4,l.a.get("/course/home/");case 4:n=t.sent,e({type:p.a.HOME_COURSE_FINISH,payload:n.data.popular_course,payload2:n.data.popular_career_test}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e({type:p.a.HOME_COURSE_FAIL});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},S=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.COURSES_REQUEST}),e.next=4,l.a.get(t?"/course/list/".concat(t):"/course/list/");case 4:r=e.sent,n({type:p.a.COURSES_FINISH,payload:r}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n({type:p.a.COURSES_FAIL});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},b=function(t){return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.COURSE_REQUEST}),e.next=4,l.a.get("/course/detail/".concat(t,"/"));case 4:r=e.sent,n({type:p.a.COURSE_FINISH,payload:r.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n({type:p.a.COURSE_FAIL});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},_=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return function(){var a=Object(o.a)(u.a.mark((function a(c,o){var s,d;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,c({type:p.a.COURSE_REQUEST}),!i.a.get("module")||r){a.next=8;break}return a.next=6,c(y(t));case 6:(s=a.sent)&&s.length>0&&(n=Math.round(100/s.length||0));case 8:return a.next=10,l.a.get("/course/start-user-course/".concat(t,"?page=").concat(e,"&progress=").concat(n));case 10:d=a.sent,c({type:p.a.COURSE_FINISH,payload:d.data,progress:d.data.progress?parseInt(d.data.progress,10):0}),a.next=17;break;case 14:a.prev=14,a.t0=a.catch(0),c({type:p.a.COURSE_FAIL});case 17:case"end":return a.stop()}}),a,null,[[0,14]])})));return function(t,e){return a.apply(this,arguments)}}()},y=function(t){return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.ACCORDIAN_LIST_REQUEST}),e.next=4,l.a.get("/course/course-module-list/".concat(t,"/"));case 4:return r=e.sent,n({type:p.a.ACCORDIAN_LIST_FINISH,payload:r.data}),e.abrupt("return",null===r||void 0===r?void 0:r.data);case 9:return e.prev=9,e.t0=e.catch(0),n({type:p.a.ACCORDIAN_LIST_FAIL}),e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()},O=function(t){return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.SIMILAR_COURSES_REQUEST}),e.next=4,l.a.get("/course/category-detail/".concat(t,"/"));case 4:r=e.sent,n({type:p.a.SIMILAR_COURSES_FINISH,payload:r.data.course_set}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n({type:p.a.SIMILAR_COURSES_FAIL});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},E=function(t,e,n,r){return function(){var a=Object(o.a)(u.a.mark((function a(c){var o;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,c({type:p.a.TEST_QUEDTION_REQUEST}),!n){a.next=8;break}return a.next=5,l.a.get("/course/user-test-course/".concat(t,"?test_id=").concat(n,"&progress=").concat(r));case 5:o=a.sent,a.next=17;break;case 8:if(!r){a.next=14;break}return a.next=11,l.a.get("/course/user-test-course/".concat(t,"?progress=").concat(r));case 11:o=a.sent,a.next=17;break;case 14:return a.next=16,l.a.get("/course/user-test-course/".concat(t));case 16:o=a.sent;case 17:c({type:p.a.TEST_QUEDTION_FINISH,payload:o.data}),a.next=24;break;case 20:a.prev=20,a.t0=a.catch(0),400===(null===a.t0||void 0===a.t0?void 0:a.t0.status)?"Already course test is completed"===a.t0.data.message?(null===e||void 0===e||e.push("/CourseCertificate"),d.b.success(a.t0.data.message,f.b)):null===e||void 0===e||e.push("/CourseResult/".concat(t)):500===a.t0.data.status_code&&(null===e||void 0===e||e.push("/CourseResult/".concat(t)),d.b.error(a.t0.data.message,f.b)),c({type:p.a.TEST_QUEDTION_FAIL});case 24:case"end":return a.stop()}}),a,null,[[0,20]])})));return function(t){return a.apply(this,arguments)}}()},I=function(t,e){return function(){var n=Object(o.a)(u.a.mark((function n(r){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:p.a.POST_ANSWER_REQUEST}),n.next=4,l.a.post("/course/user-test-course/".concat(e),t);case 4:r({type:p.a.POST_ANSWER_FINISH}),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),r({type:p.a.POST_ANSWER_FAIL});case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(t){return n.apply(this,arguments)}}()},m=function(t,e){return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.QUESTION_COUNT_REQUEST}),e.next=4,l.a.get("/course/user-test-count/".concat(t));case 4:r=e.sent,n({type:p.a.QUESTION_COUNT_FINISH,payload:r.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n({type:p.a.QUESTION_COUNT_FAIL});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},x=function(){return function(){var t=Object(o.a)(u.a.mark((function t(e){var n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e({type:p.a.SUCCESS_STORY_REQUEST}),t.next=4,l.a.get("/course/success-story");case 4:r=t.sent,e({type:p.a.SUCCESS_STORY_FINISH,payload:(null===r||void 0===r||null===(n=r.data)||void 0===n?void 0:n.map((function(t){var e;return Object(a.a)(Object(a.a)({},t),{},{image:t.image?(null===t||void 0===t||null===(e=t.image)||void 0===e?void 0:e.includes("http://3.109.195.234"))?null===t||void 0===t?void 0:t.image:"http://3.109.195.234".concat(null===t||void 0===t?void 0:t.image):v,is_collapse:!1})})))||[]}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e({type:p.a.SUCCESS_STORY_FAIL});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},g=function(){return function(){var t=Object(o.a)(u.a.mark((function t(e){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e({type:p.a.CATEGORY_LIST_REQUEST}),t.next=4,l.a.get("course/category-list/");case 4:n=t.sent,e({type:p.a.CATEGORY_LIST_FINISH,payload:n.results}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e({type:p.a.CATEGORY_LIST_FAIL});case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},R=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(){var e=Object(o.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n({type:p.a.SELECTED_FILTER,payload:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},j=function(t){return function(){var e=Object(o.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post("/course/user-course-end-time/".concat(t));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},T=function(t){return function(){var e=Object(o.a)(u.a.mark((function e(n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:p.a.RESULT_REQUEST}),e.next=4,l.a.get("/course/user-course-result/".concat(t));case 4:r=e.sent,n({type:p.a.RESULT_FINISH,payload:r.data}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n({type:p.a.RESULT_FINISH,payload:e.t0.data});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},N=function(t,e){return function(n,a){var c=a().coursesReducer.successStories,u=Object(r.a)(c),o=u.findIndex((function(e){return e.id===t}));-1!==o&&(u[o].is_collapse=e),n({type:p.a.SUCCESS_STORY_FINISH,payload:u})}}},195:function(t,e,n){},312:function(t,e,n){"use strict";e.a=n.p+"static/media/logo.f7da92ab.svg"},313:function(t,e,n){},564:function(t,e,n){"use strict";n.r(e);n(0);var r=n(199),a=n(200),c=n(312),u=n(609),o=n(78),s=n(7),i=n(155),p=n(182),l=(n(313),n(180)),d=n(4),f=a.b({email:a.d().email("Invalid emial").required("Email is required")});e.default=function(){var t=Object(o.c)((function(t){return t.authReducer})).isLoading,e=Object(o.b)(),n=Object(s.g)(),a=Object(r.a)({initialValues:{email:""},validationSchema:f,onSubmit:function(t){e(Object(l.i)(t,n))}}),v=a.handleSubmit,h=a.handleChange,S=a.handleBlur,b=a.values,_=a.errors,y=a.touched,O=Object(u.a)().t;return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"logo_1",children:Object(d.jsx)("img",{src:c.a,alt:"..."})}),Object(d.jsxs)("div",{className:"main_div",children:[Object(d.jsx)("h3",{className:"text-center",children:O("forgot.heading")}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-sm-4 col-md-4"}),Object(d.jsx)("div",{className:"col-sm-4 col-md-4",children:Object(d.jsxs)("form",{className:"set_form",onSubmit:v,children:[Object(d.jsxs)("div",{className:"err",children:[Object(d.jsxs)("label",{htmlFor:"email",children:[O("forgot.label")," ",Object(d.jsx)("span",{children:"*"})]}),Object(d.jsx)("input",{name:"email",type:"email",className:"w-100 mt-2",onChange:h,value:b.email,onBlur:S,autoComplete:"off"}),Object(d.jsx)(p.a,{error:_.email,touched:y.email})]}),Object(d.jsx)("button",{className:"w-100 my-4 login-button",type:"submit",children:t?Object(d.jsx)(i.a,{color:"secondary",className:"my-2"}):O("forgot.button")})]})}),Object(d.jsx)("div",{className:"col-sm-4 col-md-4"})]})]})]})})}}}]);
//# sourceMappingURL=29.aebaf6bf.chunk.js.map