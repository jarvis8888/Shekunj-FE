(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[7],{105:function(e,n,t){},109:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(20),i=t.n(r),l=(t(99),t(5)),s=t(6),c=t(88),u=t(64),d=t.n(u),h=t(3),g=["component"];var b=function(e){var n=e.component,t=Object(c.a)(e,g),a=d.a.get("sheToken");return Object(h.jsx)(l.b,Object(s.a)(Object(s.a)({},t),{},{render:function(e){return a?Object(h.jsx)(l.a,{to:"/"}):Object(h.jsx)(n,Object(s.a)({},e))}}))},p=(t(105),o.a.lazy((function(){return Promise.all([t.e(1),t.e(3),t.e(16)]).then(t.bind(null,474))}))),m=o.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(5),t.e(13)]).then(t.bind(null,475))})),O=o.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(5),t.e(14)]).then(t.bind(null,482))})),j=o.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(4),t.e(6),t.e(10)]).then(t.bind(null,497))})),f=o.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(6),t.e(15)]).then(t.bind(null,501))})),y=o.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(4),t.e(11)]).then(t.bind(null,491))})),I=o.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(4),t.e(21),t.e(12)]).then(t.bind(null,493))})),S=o.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(18)]).then(t.bind(null,494))})),E=o.a.lazy((function(){return t.e(20).then(t.bind(null,484))})),L=o.a.lazy((function(){return Promise.all([t.e(1),t.e(19)]).then(t.bind(null,485))})),w=o.a.lazy((function(){return Promise.all([t.e(1),t.e(3),t.e(17)]).then(t.bind(null,486))}));var x=function(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(l.d,{children:[Object(h.jsx)(b,{exact:!0,path:"/login",component:O}),Object(h.jsx)(b,{exact:!0,path:"/signup",component:m}),Object(h.jsx)(b,{exact:!0,path:"/forgot",component:p}),Object(h.jsx)(b,{exact:!0,path:"/verify",component:E}),Object(h.jsx)(b,{exact:!0,path:"/authentication/email-verify/:token?",component:L}),Object(h.jsx)(b,{exact:!0,path:"/authentication/password-reset/:uidb/:token/",component:w}),Object(h.jsx)(l.b,{exact:!0,path:"/",component:j}),Object(h.jsx)(l.b,{exact:!0,path:"/about",component:f}),Object(h.jsx)(l.b,{exact:!0,path:"/career",component:y}),Object(h.jsx)(l.b,{exact:!0,path:"/Courses",component:I}),Object(h.jsx)(l.b,{exact:!0,path:"/CoursesDetails",component:S})]})})},P=function(e){e&&e instanceof Function&&t.e(22).then(t.bind(null,487)).then((function(n){var t=n.getCLS,a=n.getFID,o=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),a(e),o(e),r(e),i(e)}))},v=t(38),N=t(63),k=t(37),C=t(75),T=t(21),F={isLoading:!1,verifyLoading:!1,user:{},isAuth:!1,error:null},_=Object(k.b)({authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case T.a.LOGIN_REQUEST:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!0,error:null});case T.a.LOGIN_FINISH:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,user:n.payload,isAuth:!0,error:null});case T.a.LOGIN_FAIL:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,user:{},isAuth:!1,error:n.payload});case T.a.SIGNUP_REQUEST:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!0,error:null});case T.a.SIGNUP_FINISH:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,user:n.payload,isAuth:!1,error:null});case T.a.SIGNUP_FAIL:return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,user:{},isAuth:!1,error:n.payload});case T.a.CONTACT_VERIFY_REQUEST:return Object(s.a)(Object(s.a)({},e),{},{verifyLoading:!0,error:null});case T.a.CONTACT_VERIFY_FINISH:return Object(s.a)(Object(s.a)({},e),{},{verifyLoading:!1,error:null});case T.a.CONTACT_VERIFY_FAIL:return Object(s.a)(Object(s.a)({},e),{},{verifyLoading:!1,user:{},isAuth:!1,error:n.payload});default:return e}}}),A=Object(k.c)(_,Object(k.a)(C.a)),R=(t(107),t(65)),G=(t(108),t(61)),U=t(118),H=t(43),z={en:{translation:t(77)},hi:{translation:t(78)}};G.a.use(H.a).use(U.e).use(H.a).init({resources:z,fallbackLng:"en",interpolation:{escapeValue:!1}});G.a;var Y=t(137),M=t(138);var V=function(){return Object(h.jsx)("div",{children:Object(h.jsx)(Y.a,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:!0,children:Object(h.jsx)(M.a,{color:"inherit"})})})},B=t(136),q=t(87),Q=Object(q.a)({palette:{primary:{main:"#ec498a"},secondary:{main:"#000000"}}});i.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(a.Suspense,{fallback:Object(h.jsx)(V,{}),children:Object(h.jsx)(B.a,{theme:Q,children:Object(h.jsx)(N.a,{store:A,children:Object(h.jsxs)(v.a,{children:[Object(h.jsx)(x,{}),Object(h.jsx)(R.a,{position:"top-right",autoClose:2e3,hideProgressBar:!0,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!1,pauseOnHover:!0})]})})})})}),document.getElementById("root")),P()},21:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));var a={LOGIN_REQUEST:"LOGIN_REQUEST",LOGIN_FINISH:"LOGIN_FINISH",LOGIN_FAIL:"LOGIN_FAIL",SIGNUP_REQUEST:"SIGNUP_REQUEST",SIGNUP_FINISH:"SIGNUP_FINISH",SIGNUP_FAIL:"SIGNUP_FAIL",CONTACT_VERIFY_REQUEST:"CONTACT_VERIFY_REQUEST",CONTACT_VERIFY_FINISH:"CONTACT_VERIFY_FINISH",CONTACT_VERIFY_FAIL:"CONTACT_VERIFY_FAIL",LOGOUT_USER:"LOGOUT_USER"}},77:function(e){e.exports=JSON.parse('{"login":{"authContent":{"heading":"Register for Easy & Real Learning to make you Job Ready","content1":{"heading":"Practical Focused Approach","cont":"We believe Why is more important than How. You may know how to use a tool but you will only learn why it will work for the end-users when you engage in practicals under the guidance of mentors who have done 100s of projects for their clients."},"content2":{"heading":"Get real work experience","cont":"Our Master\u2019s Program does not complete without an Internship because we want you to learn how Industry works."},"content3":{"heading":"In Hinglish","cont":"All our courses are in spoken language i.e Hindi + English. These tools or subjects can be a little tricky or complicated but our lectures are very simple to understand."}},"heading":"Login On Shekunj","tabLabel":{"1":"E-MAIL","2":"MOBILE"},"form1":{"placeholder1":"E-mail","placeholder2":"Password","emailError":{"invalid":"Invalid email","required":"Email is required"},"passError":{"min":"At least 6 characters","required":"Password is required"}},"form2":{"placeholder1":"Mobile","placeholder2":"Password","contactError":"Mobile number is required"},"button":"Login","content":"Don\'t have an account?","signupLink":"REGISTER HERE","T&C":{"content1":"Please read our","content2":"and","content3":"to understand how we use your personal data.","link1":"Privacy Notice","link2":"Cookie Notice","link3":"Legal terms"},"google":"Register with Google"},"signup":{"heading":"Signup On Shekunj","placeholder1":"Name","placeholder2":"E-mail","placeholder3":"Mobile Number","verify":"Verify","placeholder4":"OTP","placeholder5":"Password","placeholder6":"Surname","label6":{"1":"Female","2":"Male","placeholder":"Gender"},"button":"Signup","content":"Already have a account ?","loginLink":"LOGIN NOW"},"forgot":{"heading":"Forgot Password","label":"E-mail address","button":"Submit"},"resetPassword":{"heading":"Change Password","label":"New Password"},"verify":{"heading":"Verify your e-mail to finish signing for She\u0915\u0941\u0902\u091c","heading2":"Thank you for choosing She\u0915\u0941\u0902\u091c","content":"Please confirm that {{email}} is your e-mail address by clicking on the link on your given e-mail within 24 hours."},"verifyResult":{"heading":"Verify email address","heading1":"Thanks!","heading2":"Your email address has been verified.","button":"Login"},"header":{"searchPlaceholder":"Career guidence, Online Courses, Success stories","authButton":"Login/Register","heading":{"1":"About","2":"Courses","3":"Guidance","4":"Resume Builder","5":"Career","6":"Jobs","7":"Blogs","8":"Success story"}},"footer":{"links":{"col1":{"1":"Teach on Shekunj","2":"Get the app","3":"About us","4":"Contact us"},"col2":{"1":"Careers","2":"Blog","3":"Help and Support","4":"Affliatate"},"col3":{"1":"Terms","2":"Privacy Policy","3":"Sitemap"}}},"homePage":{"mainSlider":{"heading":{"1":"Anytime, anywhere, Learn on your schedule from any device","2":"Anytime, anywhere, Learn on your schedule from any device","3":{"3.1":"OWN YOUR FUTURE BY","3.2":"Learning Skills"}},"button":"Start Course"},"carousel1":{"heading":{"1":"Our","2":"Most Popular Courses"}},"carousel2":{"heading":{"1":"CHALLENGING","2":"Online Tests"}},"resume":{"heading":"Design your resume in real time and download a print-reday PDF.","button":"DESIGN MY RESUME"},"jobopportunity":{"heading":"Grab job Opportunities...","button":"view all job opportunities"},"community":{"heading":"Shekunj Career Development Community","button":"Start Course"},"certificate":{"heading":{"1":"Gain Industry-Recognized","2":"UX Certificates"}},"highlightStudents":{"heading":"Our highlighted students revealing","button":"Learn more"}},"aboutPage":{"heading":"Empowering Women to Empower the Next Generation","content1":"SheKunj\u2019s cutting-edge learning and examination platform has been designed to equip modern-age females with in-demand tech and non-tech skills. By providing the right information to women, we help them get placed, develop their personalities, and explore career pathways.","content2":"Armed with the best pedagogy experts, learning modules, and certificate courses, SheKunj is determined to impart practical training and educate women. With the right blend of tech and non-tech skills, our drive is to make a community of motivated, highly-skilled and knowledgeable women who build inspiring careers and lead with full gusto.","content3":"We not only thrive on imparting the right skills, but we are also persistent in our approach to develop their personality beyond professional realms such that they conquer every battle of their life with double the vigor and courage. With our tribe of determined, dependable, and proficient women, our sole focus is to uplift women and turn their dreams into a reality."},"careerPage":{"heading":"Start The Journey Of Education","heading2":"Choose A Session","heading3":"Choose The Best Education","searchPlaceholder":"Search...","carousel1":{"heading":{"1":"Most","2":"Featured Colleges"}},"carousel2":{"heading":{"1":"Most","2":"Featured Schools"}},"ranking":"Rankings","exam":"Exams"}}')},78:function(e){e.exports=JSON.parse('{"login":{"authContent":{"heading":"\u0906\u092a\u0915\u0940 \u0928\u094c\u0915\u0930\u0940 \u0914\u0930 \u0935\u093e\u0938\u094d\u0924\u0935\u093f\u0915 \u0936\u093f\u0915\u094d\u0937\u093e \u0915\u0947 \u0932\u093f\u090f \u092a\u0902\u091c\u0940\u0915\u0930\u0923 \u0915\u0930\u0947","content1":{"heading":"\u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0915\u0947\u0902\u0926\u094d\u0930\u093f\u0924 \u0926\u0943\u0937\u094d\u091f\u093f\u0915\u094b\u0923","cont":"\u0939\u092e \u092e\u093e\u0928\u0924\u0947 \u0939\u0948\u0902 \u0915\u093f \u0915\u0948\u0938\u0947 \u0938\u0947 \u091c\u094d\u092f\u093e\u0926\u093e \u092e\u0939\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0915\u094d\u092f\u094b\u0902 \u0939\u0948\u0964 \u0906\u092a \u090f\u0915 \u0909\u092a\u0915\u0930\u0923 \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0928\u093e \u091c\u093e\u0928\u0924\u0947 \u0939\u0948\u0902, \u0932\u0947\u0915\u093f\u0928 \u0906\u092a \u0915\u0947\u0935\u0932 \u092f\u0939 \u0938\u0940\u0916\u0947\u0902\u0917\u0947 \u0915\u093f \u092f\u0939 \u0905\u0902\u0924\u093f\u092e \u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e\u0913\u0902 \u0915\u0947 \u0932\u093f\u090f \u0915\u094d\u092f\u094b\u0902 \u0915\u093e\u092e \u0915\u0930\u0947\u0917\u093e, \u091c\u092c \u0906\u092a \u0909\u0928 \u0906\u0915\u093e\u0913\u0902 \u0915\u0947 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u092e\u0947\u0902 \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0930\u0942\u092a \u0938\u0947 \u0938\u0902\u0932\u0917\u094d\u0928 \u0939\u094b\u0902\u0917\u0947 \u091c\u093f\u0928\u094d\u0939\u094b\u0902\u0928\u0947 \u0905\u092a\u0928\u0947 \u0917\u094d\u0930\u093e\u0939\u0915\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f 100 \u0938\u0947 \u0905\u0927\u093f\u0915 \u092a\u0930\u093f\u092f\u094b\u091c\u0928\u093e\u090f\u0902 \u0915\u0940 \u0939\u0948\u0902\u0964"},"content2":{"heading":"\u0935\u093e\u0938\u094d\u0924\u0935\u093f\u0915 \u0915\u093e\u0930\u094d\u092f \u0905\u0928\u0941\u092d\u0935 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902","cont":"\u0939\u092e\u093e\u0930\u093e \u092e\u093e\u0938\u094d\u091f\u0930 \u092a\u094d\u0930\u094b\u0917\u094d\u0930\u093e\u092e \u0907\u0902\u091f\u0930\u094d\u0928\u0936\u093f\u092a \u0915\u0947 \u092c\u093f\u0928\u093e \u092a\u0942\u0930\u093e \u0928\u0939\u0940\u0902 \u0939\u094b\u0924\u093e \u0939\u0948 \u0915\u094d\u092f\u094b\u0902\u0915\u093f \u0939\u092e \u091a\u093e\u0939\u0924\u0947 \u0939\u0948\u0902 \u0915\u093f \u0906\u092a \u0938\u0940\u0916\u0947\u0902 \u0915\u093f \u0909\u0926\u094d\u092f\u094b\u0917 \u0915\u0948\u0938\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948\u0964"},"content3":{"heading":"\u0939\u093f\u0902\u0917\u094d\u0932\u093f\u0936 \u092e\u0947\u0902","cont":"\u0939\u092e\u093e\u0930\u0947 \u0938\u092d\u0940 \u092a\u093e\u0920\u094d\u092f\u0915\u094d\u0930\u092e \u092c\u094b\u0932\u0940 \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0940 \u092d\u093e\u0937\u093e \u092f\u093e\u0928\u0940 \u0939\u093f\u0902\u0926\u0940 + \u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940 \u092e\u0947\u0902 \u0939\u0948\u0902\u0964 \u092f\u0947 \u0909\u092a\u0915\u0930\u0923 \u092f\u093e \u0935\u093f\u0937\u092f \u0925\u094b\u0921\u093c\u0947 \u092a\u0947\u091a\u0940\u0926\u093e \u092f\u093e \u091c\u091f\u093f\u0932 \u0939\u094b \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u0932\u0947\u0915\u093f\u0928 \u0939\u092e\u093e\u0930\u0947 \u0935\u094d\u092f\u093e\u0916\u094d\u092f\u093e\u0928 \u0938\u092e\u091d\u0928\u0947 \u092e\u0947\u0902 \u092c\u0939\u0941\u0924 \u0938\u0930\u0932 \u0939\u0948\u0902\u0964"}},"heading":"\u0936\u093f\u0915\u0941\u0902\u091c \u092a\u0930 \u0932\u0949\u0917 \u0907\u0928","tabLabel":{"1":"\u0908\u092e\u0947\u0932","2":"\u092e\u094b\u092c\u093e\u0907\u0932"},"form1":{"placeholder1":"\u0908\u092e\u0947\u0932","placeholder2":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921","emailError":{"invalid":"\u0905\u0935\u0948\u0927 \u0908\u092e\u0947\u0932","required":"\u0908\u092e\u0947\u0932 \u091c\u0930\u0941\u0930\u0940 \u0939\u0948"},"passError":{"min":"\u0915\u092e \u0938\u0947 \u0915\u092e 6 \u0935\u0930\u094d\u0923","required":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u091c\u0930\u0941\u0930\u0940 \u0939\u0948"}},"form2":{"placeholder1":"\u092e\u094b\u092c\u093e\u0907\u0932 \u0928\u0902\u092c\u0930","placeholder2":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921","contactError":"\u092e\u094b\u092c\u093e\u0907\u0932 \u0928\u0902\u092c\u0930 \u091c\u0930\u0941\u0930\u0940 \u0939\u0948"},"button":"\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902","content":"\u0916\u093e\u0924\u093e \u0928\u0939\u0940\u0902 \u0939\u0948?","signupLink":"\u092f\u0939\u093e\u0902 \u0930\u091c\u093f\u0938\u094d\u091f\u0930 \u0915\u0930\u0947\u0902","T&C":{"content1":"\u092f\u0939 \u0938\u092e\u091d\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u093f \u0939\u092e \u0906\u092a\u0915\u0947 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u0921\u0947\u091f\u093e \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902, \u0915\u0943\u092a\u092f\u093e \u0939\u092e\u093e\u0930\u0940","content2":"\u0914\u0930","content3":"\u092a\u0922\u093c\u0947\u0902\u0964","link1":"\u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e \u0938\u0942\u091a\u0928\u093e","link2":"\u0915\u0941\u0915\u0940 \u0928\u094b\u091f\u093f\u0938","link3":"\u0915\u093e\u0928\u0942\u0928\u0940 \u0936\u0930\u094d\u0924\u0947\u0902"},"google":"Google \u0915\u0947 \u0938\u093e\u0925 \u0930\u091c\u093f\u0938\u094d\u091f\u0930 \u0915\u0930\u0947\u0902"},"signup":{"heading":"\u0936\u093f\u0915\u0941\u0902\u091c \u092a\u0930 \u0938\u093e\u0907\u0928\u0905\u092a","placeholder1":"\u0928\u093e\u092e","placeholder2":"\u0908\u092e\u0947\u0932","placeholder3":"\u092e\u094b\u092c\u093e\u0907\u0932 \u0928\u0902\u092c\u0930","verify":"\u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0930\u0947","placeholder4":"\u0913\u091f\u0940\u092a\u0940","placeholder5":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921","placeholder6":"\u0909\u092a\u0928\u093e\u092e","label6":{"1":"\u092e\u0939\u093f\u0932\u093e","2":"\u092a\u0941\u0930\u0941\u0937","placeholder":"\u0932\u093f\u0902\u0917"},"button":"\u0938\u093e\u0907\u0928 \u0905\u092a \u0915\u0930\u0947\u0902","content":"\u092a\u0939\u0932\u0947 \u0938\u0947 \u0916\u093e\u0924\u093e \u0939\u0948?","loginLink":"\u0905\u092d\u0940 \u0932\u0949\u0917\u093f\u0928 \u0915\u0930\u0947\u0902"},"forgot":{"heading":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092d\u0942\u0932 \u0917\u090f","label":"\u0908\u092e\u0947\u0932 \u090f\u0921\u094d\u0930\u0947\u0938","button":"\u0908\u092e\u0947\u0932 \u092d\u0947\u091c\u0947\u0902"},"resetPassword":{"heading":"\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u0947\u0902","label":"\u0928\u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921"},"verify":{"heading":"She\u0915\u0941\u0902\u091c \u0915\u0947 \u0932\u093f\u090f \u0938\u093e\u0907\u0928\u0905\u092a \u092a\u094d\u0930\u0915\u094d\u0930\u093f\u092f\u093e \u0938\u092e\u093e\u092a\u094d\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0905\u092a\u0928\u093e \u0908\u092e\u0947\u0932 \u0938\u0924\u094d\u092f\u093e\u092a\u093f\u0924 \u0915\u0930\u0947\u0902","heading2":"She\u0915\u0941\u0902\u091c \u091a\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0927\u0928\u094d\u092f\u0935\u093e\u0926","content":"\u0915\u0943\u092a\u092f\u093e 24 \u0918\u0902\u091f\u0947 \u0915\u0947 \u092d\u0940\u0924\u0930 \u0906\u092a\u0915\u0947 \u0926\u093f\u090f \u0917\u090f \u0908-\u092e\u0947\u0932 \u0915\u0947 \u0932\u093f\u0902\u0915 \u092a\u0930 \u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0915\u0947 \u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0930\u0947\u0902 \u0915\u093f {{email}} \u0906\u092a\u0915\u093e \u0908-\u092e\u0947\u0932 \u092a\u0924\u093e \u0939\u0948\u0964"},"verifyResult":{"heading":"\u0908\u092e\u0947\u0932 \u092a\u0924\u0947 \u0915\u0940 \u092a\u0941\u0937\u094d\u091f\u093f","heading1":"\u0927\u0928\u094d\u092f\u0935\u093e\u0926!","heading2":"\u0906\u092a\u0915\u093e \u0908\u092e\u0947\u0932 \u092a\u0924\u093e \u0938\u0924\u094d\u092f\u093e\u092a\u093f\u0924 \u0915\u0930 \u0926\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948\u0964","button":"\u0932\u0949\u0917 \u0907\u0928 \u0915\u0930\u0947\u0902"},"header":{"searchPlaceholder":"\u0915\u0930\u093f\u092f\u0930 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928, \u0911\u0928\u0932\u093e\u0907\u0928 \u092a\u093e\u0920\u094d\u092f\u0915\u094d\u0930\u092e, \u0938\u092b\u0932\u0924\u093e \u0915\u0940 \u0915\u0939\u093e\u0928\u093f\u092f\u093e\u0902","authButton":"\u0932\u0949\u0917 \u0907\u0928/\u0930\u091c\u093f\u0938\u094d\u091f\u0930","heading":{"1":"\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902","2":"\u0915\u094b\u0930\u094d\u0938","3":"\u0938\u0932\u093e\u0939","4":"\u0930\u093f\u091c\u094d\u092f\u0942\u092e\u0947 \u092c\u093f\u0932\u094d\u0921\u0930","5":"\u0915\u0930\u093f\u092f\u0930","6":"\u0928\u094c\u0915\u0930\u093f\u092f\u093e\u0902","7":"\u092c\u094d\u0932\u0949\u0917","8":"\u0938\u092b\u0932\u0924\u093e \u0915\u0940 \u0915\u0939\u093e\u0928\u0940"}},"footer":{"links":{"col1":{"1":"\u0936\u093f\u0915\u0941\u0902\u091c \u092a\u0930 \u092a\u0922\u093c\u093e\u0928\u093e","2":"\u0910\u092a \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902","3":"\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902","4":"\u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902"},"col2":{"1":"\u0915\u0930\u093f\u092f\u0930","2":"\u092c\u094d\u0932\u0949\u0917","3":"\u0938\u0939\u093e\u092f\u0924\u093e \u0914\u0930 \u0938\u092e\u0930\u094d\u0925\u0928","4":"\u0938\u0902\u092c\u0926\u094d\u0927"},"col3":{"1":"\u0928\u093f\u092f\u092e","2":"\u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e \u0928\u0940\u0924\u093f","3":"\u0938\u093e\u0907\u091f \u092e\u0948\u092a"}}},"homePage":{"mainSlider":{"heading":{"1":"\u0915\u093f\u0938\u0940 \u092d\u0940 \u0938\u092e\u092f, \u0915\u0939\u0940\u0902 \u092d\u0940, \u0915\u093f\u0938\u0940 \u092d\u0940 \u0921\u093f\u0935\u093e\u0907\u0938 \u0938\u0947 \u0905\u092a\u0928\u0947 \u0936\u0947\u0921\u094d\u092f\u0942\u0932 \u092a\u0930 \u0938\u0940\u0916\u0947","2":"\u0915\u093f\u0938\u0940 \u092d\u0940 \u0938\u092e\u092f, \u0915\u0939\u0940\u0902 \u092d\u0940, \u0915\u093f\u0938\u0940 \u092d\u0940 \u0921\u093f\u0935\u093e\u0907\u0938 \u0938\u0947 \u0905\u092a\u0928\u0947 \u0936\u0947\u0921\u094d\u092f\u0942\u0932 \u092a\u0930 \u0938\u0940\u0916\u0947","3":{"3.1":"\u0915\u094c\u0936\u0932 \u0938\u0940\u0916 \u0915\u0930","3.2":"\u0905\u092a\u0928\u093e \u092d\u0935\u093f\u0937\u094d\u092f \u092c\u0928\u093e\u090f\u0902"}},"button":"\u0915\u094b\u0930\u094d\u0938 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"},"carousel1":{"heading":{"1":"\u0939\u092e\u093e\u0930\u0947","2":"\u0938\u092c\u0938\u0947 \u0932\u094b\u0915\u092a\u094d\u0930\u093f\u092f \u092a\u093e\u0920\u094d\u092f\u0915\u094d\u0930\u092e"}},"carousel2":{"heading":{"1":"\u091a\u0941\u0928\u094c\u0924\u0940\u092a\u0942\u0930\u094d\u0923","2":"\u0911\u0928\u0932\u093e\u0907\u0928 \u091f\u0947\u0938\u094d\u091f"}},"resume":{"heading":"\u0935\u093e\u0938\u094d\u0924\u0935\u093f\u0915 \u0938\u092e\u092f \u092e\u0947\u0902 \u0905\u092a\u0928\u093e \u0930\u093f\u091c\u094d\u092f\u0942\u092e\u0947 \u0921\u093f\u091c\u093e\u0907\u0928 \u0915\u0930\u0947\u0902 \u0914\u0930 \u090f\u0915 \u092a\u094d\u0930\u093f\u0902\u091f-\u0930\u0940\u0921\u0947 \u092a\u0940\u0921\u0940\u090f\u092b \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902\u0964","button":"\u092e\u0947\u0930\u093e \u0930\u093f\u091c\u094d\u092f\u0942\u092e\u0947 \u0921\u093f\u091c\u093e\u0907\u0928 \u0915\u0930\u0947\u0902"},"jobopportunity":{"heading":"\u0928\u094c\u0915\u0930\u0940 \u0915\u0947 \u0905\u0935\u0938\u0930 \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0915\u0930\u0947\u0902...","button":"\u0928\u094c\u0915\u0930\u0940 \u0915\u0947 \u0938\u092d\u0940 \u0905\u0935\u0938\u0930 \u0926\u0947\u0916\u0947\u0902"},"community":{"heading":"\u0936\u093f\u0915\u0941\u0902\u091c \u0915\u0948\u0930\u093f\u092f\u0930 \u0921\u0947\u0935\u0932\u092a\u092e\u0947\u0902\u091f \u0915\u092e\u094d\u092f\u0941\u0928\u093f\u091f\u0940","button":"\u0915\u094b\u0930\u094d\u0938 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"},"certificate":{"heading":{"1":"\u0932\u093e\u092d \u0909\u0926\u094d\u092f\u094b\u0917-\u092e\u093e\u0928\u094d\u092f\u0924\u093e \u092a\u094d\u0930\u093e\u092a\u094d\u0924","2":"\u092f\u0942\u090f\u0915\u094d\u0938 \u092a\u094d\u0930\u092e\u093e\u0923\u092a\u0924\u094d\u0930"}},"highlightStudents":{"heading":"\u0939\u092e\u093e\u0930\u0947 \u0939\u093e\u0907\u0932\u093e\u0907\u091f \u091b\u093e\u0924\u094d\u0930\u094b\u0902 \u0928\u0947 \u092c\u0924\u093e\u092f\u093e","button":"\u0914\u0930 \u0905\u0927\u093f\u0915 \u091c\u093e\u0928\u0947\u0902"}},"aboutPage":{"heading":"\u0905\u0917\u0932\u0940 \u092a\u0940\u0922\u093c\u0940 \u0915\u094b \u0938\u0936\u0915\u094d\u0924 \u092c\u0928\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u094b \u0938\u0936\u0915\u094d\u0924 \u092c\u0928\u093e\u0928\u093e","content1":"\u0936\u093f\u0915\u0941\u0902\u091c \u0915\u0947 \u0905\u0924\u094d\u092f\u093e\u0927\u0941\u0928\u093f\u0915 \u0936\u093f\u0915\u094d\u0937\u0923 \u0914\u0930 \u092a\u0930\u0940\u0915\u094d\u0937\u093e \u092e\u0902\u091a \u0915\u094b \u0906\u0927\u0941\u0928\u093f\u0915 \u092f\u0941\u0917 \u0915\u0940 \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u094b \u0907\u0928-\u0921\u093f\u092e\u093e\u0902\u0921 \u0924\u0915\u0928\u0940\u0915 \u0914\u0930 \u0917\u0948\u0930-\u0924\u0915\u0928\u0940\u0915\u0940 \u0915\u094c\u0936\u0932 \u0938\u0947 \u0932\u0948\u0938 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0921\u093f\u091c\u093c\u093e\u0907\u0928 \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0939\u0948\u0964 \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u094b \u0938\u0939\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u092a\u094d\u0930\u0926\u093e\u0928 \u0915\u0930\u0915\u0947, \u0939\u092e \u0909\u0928\u094d\u0939\u0947\u0902 \u0938\u094d\u0925\u093e\u0928 \u092a\u093e\u0928\u0947, \u0909\u0928\u0915\u0947 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0924\u094d\u0935 \u0915\u094b \u0935\u093f\u0915\u0938\u093f\u0924 \u0915\u0930\u0928\u0947 \u0914\u0930 \u0915\u0930\u093f\u092f\u0930 \u0915\u0947 \u0930\u093e\u0938\u094d\u0924\u0947 \u0924\u0932\u093e\u0936\u0928\u0947 \u092e\u0947\u0902 \u092e\u0926\u0926 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964","content2":"\u0938\u0930\u094d\u0935\u0936\u094d\u0930\u0947\u0937\u094d\u0920 \u0936\u093f\u0915\u094d\u0937\u093e\u0936\u093e\u0938\u094d\u0924\u094d\u0930 \u0935\u093f\u0936\u0947\u0937\u091c\u094d\u091e\u094b\u0902, \u0932\u0930\u094d\u0928\u093f\u0902\u0917 \u092e\u0949\u0921\u094d\u092f\u0942\u0932 \u0914\u0930 \u0938\u0930\u094d\u091f\u093f\u092b\u093f\u0915\u0947\u091f \u0915\u094b\u0930\u094d\u0938 \u0938\u0947 \u0932\u0948\u0938, \u0936\u0947\u0915\u0941\u0902\u091c \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u094b \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u092a\u094d\u0930\u0936\u093f\u0915\u094d\u0937\u0923 \u0926\u0947\u0928\u0947 \u0914\u0930 \u0909\u0928\u094d\u0939\u0947\u0902 \u0936\u093f\u0915\u094d\u0937\u093f\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u092a\u094d\u0930\u0924\u093f\u092c\u0926\u094d\u0927 \u0939\u0948\u0964 \u0924\u0915\u0928\u0940\u0915\u0940 \u0914\u0930 \u0917\u0948\u0930-\u0924\u0915\u0928\u0940\u0915\u0940 \u0915\u094c\u0936\u0932 \u0915\u0947 \u0938\u0939\u0940 \u092e\u093f\u0936\u094d\u0930\u0923 \u0915\u0947 \u0938\u093e\u0925, \u0939\u092e\u093e\u0930\u093e \u0905\u092d\u093f\u092f\u093e\u0928 \u092a\u094d\u0930\u0947\u0930\u093f\u0924, \u0905\u0924\u094d\u092f\u0927\u093f\u0915 \u0915\u0941\u0936\u0932 \u0914\u0930 \u091c\u093e\u0928\u0915\u093e\u0930 \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u093e \u090f\u0915 \u0938\u092e\u0941\u0926\u093e\u092f \u092c\u0928\u093e\u0928\u093e \u0939\u0948 \u091c\u094b \u092a\u094d\u0930\u0947\u0930\u0915 \u0915\u0930\u093f\u092f\u0930 \u092c\u0928\u093e\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u092a\u0942\u0930\u0947 \u0909\u0924\u094d\u0938\u093e\u0939 \u0915\u0947 \u0938\u093e\u0925 \u0928\u0947\u0924\u0943\u0924\u094d\u0935 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964","content3":"\u0939\u092e \u0928 \u0915\u0947\u0935\u0932 \u0938\u0939\u0940 \u0915\u094c\u0936\u0932 \u092a\u094d\u0930\u0926\u093e\u0928 \u0915\u0930\u0928\u0947 \u092e\u0947\u0902 \u0915\u093e\u092e\u092f\u093e\u092c\u0940 \u0928\u0939\u0940\u0902  \u0915\u0940 , \u092c\u0932\u094d\u0915\u093f \u0939\u092e \u092a\u0947\u0936\u0947\u0935\u0930 \u0915\u094d\u0937\u0947\u0924\u094d\u0930\u094b\u0902 \u0938\u0947 \u092a\u0930\u0947 \u0909\u0928\u0915\u0947 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0924\u094d\u0935 \u0915\u094b \u0935\u093f\u0915\u0938\u093f\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0905\u092a\u0928\u0947 \u0926\u0943\u0937\u094d\u091f\u093f\u0915\u094b\u0923 \u092e\u0947\u0902 \u092d\u0940 \u0928\u093f\u0930\u0902\u0924\u0930 \u0939\u0948\u0902, \u0924\u093e\u0915\u093f \u0935\u0947 \u0905\u092a\u0928\u0947 \u091c\u0940\u0935\u0928 \u0915\u0940 \u0939\u0930 \u0932\u0921\u093c\u093e\u0908 \u0915\u094b \u0926\u094b\u0917\u0941\u0928\u0947 \u091c\u094b\u0936 \u0914\u0930 \u0938\u093e\u0939\u0938 \u0915\u0947 \u0938\u093e\u0925 \u091c\u0940\u0924 \u0938\u0915\u0947\u0902\u0964 \u0926\u0943\u0922\u093c, \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0914\u0930 \u0915\u0941\u0936\u0932 \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u0940 \u0939\u092e\u093e\u0930\u0940 \u091c\u092e\u093e\u0924 \u0915\u0947 \u0938\u093e\u0925, \u0939\u092e\u093e\u0930\u093e \u090f\u0915\u092e\u093e\u0924\u094d\u0930 \u0927\u094d\u092f\u093e\u0928 \u092e\u0939\u093f\u0932\u093e\u0913\u0902 \u0915\u093e \u0909\u0924\u094d\u0925\u093e\u0928 \u0915\u0930\u0928\u093e \u0914\u0930 \u0909\u0928\u0915\u0947 \u0938\u092a\u0928\u094b\u0902 \u0915\u094b \u0939\u0915\u0940\u0915\u0924 \u092e\u0947\u0902 \u092c\u0926\u0932\u0928\u093e \u0939\u0948\u0964"},"careerPage":{"heading":"\u0936\u093f\u0915\u094d\u0937\u093e \u0915\u0940 \u092f\u093e\u0924\u094d\u0930\u093e \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902","heading2":"\u090f\u0915 \u0938\u0924\u094d\u0930 \u091a\u0941\u0928\u0947\u0902","heading3":"\u0938\u0930\u094d\u0935\u0936\u094d\u0930\u0947\u0937\u094d\u0920 \u0936\u093f\u0915\u094d\u0937\u093e \u091a\u0941\u0928\u0947\u0902","searchPlaceholder":"\u0916\u094b\u091c\u0947...","carousel1":{"heading":{"1":"\u0905\u0927\u093f\u0915\u093e\u0902\u0936","2":"\u091a\u0941\u0928\u093f\u0902\u0926\u093e \u0915\u0949\u0932\u0947\u091c"}},"carousel2":{"heading":{"1":"\u0905\u0927\u093f\u0915\u093e\u0902\u0936","2":"\u091a\u0941\u0928\u093f\u0902\u0926\u093e \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f"}},"ranking":"\u0930\u0948\u0902\u0915\u093f\u0902\u0917","exam":"\u092a\u0930\u0940\u0915\u094d\u0937\u093e"}}')},99:function(e,n,t){}},[[109,8,9]]]);
//# sourceMappingURL=main.12c7b31b.chunk.js.map