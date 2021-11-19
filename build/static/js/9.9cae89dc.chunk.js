(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[9],{140:function(e,t,a){"use strict";a.d(t,"b",(function(){return b})),a.d(t,"c",(function(){return A})),a.d(t,"a",(function(){return O})),a.d(t,"d",(function(){return g})),a.d(t,"e",(function(){return x}));var c=a(147),n=a.n(c),r=a(148),s=a(21),i=a(65),l=a(168),o=a.n(l),d=a(64),j=a.n(d);o.a.defaults.baseURL="http://13.127.152.236/api/",o.a.defaults.withCredentials=!0;var m=function(e){return e.data};o.a.interceptors.request.use((function(e){var t=j.a.get("sheToken");return t&&(e.headers.Authorization="Bearer ".concat(t)),e})),o.a.interceptors.response.use(function(){var e=Object(r.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){var t=!e.response;switch(t.status){case 401:console.log("Logout user!");break;case 403:console.log("You are not allowed to do that!")}return Promise.reject(e.response)}));var u={get:function(e,t){return o.a.get(e,{params:t}).then(m)},post:function(e,t){return o.a.post(e,t).then(m)},put:function(e,t){return o.a.put(e,t).then(m)},patch:function(e,t){return o.a.patch(e,t).then(m)},delete:function(e){return o.a.delete(e).then(m)},postForm:function(e,t){return o.a.post(e,t,{headers:{"Content-type":"multipart/form-data"}}).then(m)},putForm:function(e,t){return o.a.put(e,t,{headers:{"Content-type":"multipart/form-data"}}).then(m)}},h={position:"top-right",autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1,progress:void 0},b=function(e,t){return function(){var a=Object(r.a)(n.a.mark((function a(c){var r;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c({type:s.a.LOGIN_REQUEST}),a.next=4,u.post("authentication/login/",e);case 4:r=a.sent,c({type:s.a.LOGIN_FINISH,payload:{name:r.data.name,email:r.data.email}}),j.a.set("sheToken",r.data.tokens),t.push("/"),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(0),c({type:s.a.LOGIN_FAIL}),a.t0&&500===a.t0.status?i.b.error(a.t0.data.errors.non_field_errors,h):a.t0&&400===a.t0.status&&i.b.error(a.t0.data.errors.error[0],h);case 14:case"end":return a.stop()}}),a,null,[[0,10]])})));return function(e){return a.apply(this,arguments)}}()},A=function(e,t){return function(){var a=Object(r.a)(n.a.mark((function a(c){return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c({type:s.a.SIGNUP_REQUEST}),a.next=4,u.post("authentication/register/",e);case 4:a.sent,c({type:s.a.SIGNUP_FINISH,payload:e}),localStorage.setItem("email",e.email),t.push("/verify"),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(0),c({type:s.a.SIGNUP_FAIL}),400===(null===a.t0||void 0===a.t0?void 0:a.t0.status)&&i.b.error(a.t0.data.errors.email);case 14:case"end":return a.stop()}}),a,null,[[0,10]])})));return function(e){return a.apply(this,arguments)}}()},O=function(e){return function(){var t=Object(r.a)(n.a.mark((function t(a){var c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.get("authentication/email-verify/?token=".concat(e));case 3:return c=t.sent,window.location.replace("success"),t.abrupt("return",c);case 8:t.prev=8,t.t0=t.catch(0),i.b.error();case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},g=function(e,t){return function(){var a=Object(r.a)(n.a.mark((function a(c){var r;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c({type:s.a.EMAIL_VERIFY_REQUEST}),a.next=4,u.post("authentication/request-reset-email/",e);case 4:r=a.sent,c({type:s.a.EMAIL_VERIFY_FINISH}),t.push("/login"),i.b.success(r.data.success,h),a.next=14;break;case 10:a.prev=10,a.t0=a.catch(0),c({type:s.a.EMAIL_VERIFY_FAIL}),i.b.error("E-mail not found",h);case 14:case"end":return a.stop()}}),a,null,[[0,10]])})));return function(e){return a.apply(this,arguments)}}()},x=function(e,t){return function(){var a=Object(r.a)(n.a.mark((function a(c){var r;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c({type:s.a.EMAIL_VERIFY_REQUEST}),a.next=4,u.patch("authentication/password-reset-complete/",e);case 4:r=a.sent,c({type:s.a.EMAIL_VERIFY_FINISH}),t.push("/login"),i.b.success(r.data.message,h),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(0),i.b.error("Internal Server Error",h);case 13:case"end":return a.stop()}}),a,null,[[0,10]])})));return function(e){return a.apply(this,arguments)}}()}},141:function(e,t,a){"use strict";a(0),a(154);var c=a(3);t.a=function(e){var t=e.error,a=e.touched;return Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"text-danger err",children:t&&a?t:null})})}},143:function(e,t,a){"use strict";t.a=a.p+"static/media/logo.f7da92ab.svg"},144:function(e,t,a){"use strict";var c=a(62),n=a(0),r=a(208),s=a(455),i=a(450),l=a(454),o=a(132),d=a(182),j=a.n(d),m=a(449),u=a(3),h=Object(m.a)({language:{borderRadius:"0 !important",width:"128px",height:"40px",color:"#000000 !important",border:"1px solid #000000 !important",textTransform:"none !important",fontFamily:"Poppins !important",fontStyle:"normal",fontWeight:"300 !important",fontSize:"16px !important"}});t.a=function(){var e=Object(n.useState)(localStorage.getItem("i18nextLng")||"en"),t=Object(c.a)(e,2),a=t[0],d=t[1],m=Object(n.useState)(null),b=Object(c.a)(m,2),A=b[0],O=b[1],g=Object(r.a)().i18n,x=Boolean(A),p=h(),v=function(e,t){g.changeLanguage(t),d(t),O(null)};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(s.a,{id:"fade-button",className:p.language,"aria-controls":"fade-menu","aria-haspopup":"true","aria-expanded":x?"true":void 0,onClick:function(e){O(e.currentTarget)},startIcon:Object(u.jsx)(j.a,{}),children:"en"===a?"English":"Hindi"}),Object(u.jsxs)(i.a,{id:"fade-menu",MenuListProps:{"aria-labelledby":"fade-button"},anchorEl:A,open:x,onClose:function(){O(null)},TransitionComponent:o.a,children:[Object(u.jsx)(l.a,{onClick:function(e){return v(0,"en")},children:"English"}),Object(u.jsx)(l.a,{onClick:function(e){return v(0,"hi")},children:"Hindi"})]})]})}},145:function(e,t,a){"use strict";t.a=a.p+"static/media/logo.de3c6070.svg"},154:function(e,t,a){},161:function(e,t,a){},162:function(e,t,a){},163:function(e,t,a){"use strict";var c=a(62),n=a(0),r=a(38),s=a(208),i=a(144),l=a(145),o=(a(161),a(3));t.a=function(e){e.loginPage;var t=Object(n.useState)(""),a=Object(c.a)(t,2),d=a[0],j=a[1],m=Object(s.a)().t;return Object(o.jsx)("div",{children:Object(o.jsx)("header",{className:"other_head",children:Object(o.jsxs)("div",{className:"container",children:[Object(o.jsx)("div",{className:"topbar",children:Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("div",{className:"col-md-3",children:Object(o.jsx)(r.b,{className:"navbar-brand",to:"/",children:Object(o.jsx)("img",{src:l.a,alt:"..."})})}),Object(o.jsxs)("div",{className:"col-md-9 pl-md-0 pl-lg-2 text-right",children:[Object(o.jsx)("div",{id:"custom-search-input",className:"mt-lg-3 mt-md-1 d-inline-block",children:Object(o.jsxs)("div",{className:"input-group",children:[Object(o.jsx)("input",{type:"text",className:"search-query form-control",placeholder:m("header.searchPlaceholder"),value:d,onChange:function(e){return j(e.target.value)}}),Object(o.jsx)("span",{className:"input-group-btn",children:Object(o.jsx)("button",{type:"button",disabled:!0,children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGYSURBVHgB7ZXPTcMwGMW/JBMwQbsB3aDJjWPZoGxAB2jz914xAd2AcuOWMAFmAsKNG2KAJLxXBQm1TWJb6gHUJ0Wf49j++c/nF5Gz/roc3YZRFI0RfMdxGKVpGoWgUF+KgQaBGND3PC8EYILXLeI7613XvWQdJlBWVXWjC+4FpmlK0C2Ki9VqtemY0BzwEODNcrmMxRbYwuZ1XQdDs+d2A5rrQJ2+AXRge31e0Oca5aKrnXusEmd2jxCbJATbArbAKkMxEWeaJMmbWAp9P7MsG3V9P1ghVjfB2b2KpdD3kUchukA0ZvorsVcJ6Fh0gafWARCzK3HwI7FUawhKGwgVeGZiqdaRzI4kjuMc2TYXQ9F1YBh5X5ujZ4hZ0i3WrWHrwnjxQ/qqmALpFIDe0W10oD/OhOJ2yCy8rg8F5Pv+BQZaB0Hwlee56oDRvB9QfMJzNZ1On9H1o2tcnd/TmFbHu4XsVbinO1NoM3nGOmwjbbDAMyG89VNlBfwNRuD/j1m4uz4Ixf4WDkG1gSbqg57EaQghTM76l/oGM2TmLX40cksAAAAASUVORK5CYII=",alt:"..."})})})]})}),Object(o.jsxs)("div",{className:"top_bar_btn d-inline-block",children:[Object(o.jsx)(r.b,{className:"btn btn-bg-pink ml-xl-3 ml-md-2",to:"/login",children:"Login/Register"}),Object(o.jsx)("div",{className:"set_language d-inline-block ml-xl-3 ml-md-2",children:Object(o.jsx)(i.a,{})})]})]})]})}),Object(o.jsx)("div",{className:"middle_nav_login",children:Object(o.jsxs)("nav",{className:"navbar navbar-expand-md",children:[Object(o.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#collapsibleNavbar",children:Object(o.jsx)("span",{className:"navbar-toggler-icon"})}),Object(o.jsx)("div",{className:"collapse navbar-collapse",id:"collapsibleNavbar",children:Object(o.jsxs)("ul",{className:"navbar-nav",children:[Object(o.jsx)("li",{className:"nav-item active",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/about",children:m("header.heading.1")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/courses",children:m("header.heading.2")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/guidance",children:m("header.heading.3")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)("a",{className:"nav-link",rel:"noreferrer",href:"https://octahire.com/Resume_maker",target:"_blank",children:m("header.heading.4")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/career",children:m("header.heading.5")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)("a",{className:"nav-link",rel:"noreferrer",target:"_blank",href:"https://octahire.com/Recruiters/job_recruiters?location=",children:m("header.heading.6")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/blogs",children:m("header.heading.7")})}),Object(o.jsx)("li",{className:"nav-item",children:Object(o.jsx)(r.b,{className:"nav-link",to:"/success_story",children:m("header.heading.8")})})]})})]})})]})})})}},164:function(e,t,a){"use strict";a(0),a(162);var c=a(38),n=a(208),r=a.p+"static/media/whitelogo.79226ead.svg",s=a(145),i=a(144),l=a(3);t.a=function(e){var t=e.loginPage,a=Object(n.a)().t;return Object(l.jsx)("div",{children:Object(l.jsx)("footer",{className:t?"footer_login":"footer_other",children:Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col-md-3 col-4",children:Object(l.jsxs)("ul",{className:"p-0",children:[Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col1.1")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col1.2")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col1.3")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col1.4")})})]})}),Object(l.jsx)("div",{className:"col-md-3 col-4",children:Object(l.jsxs)("ul",{className:"p-0",children:[Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col2.1")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col2.2")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col2.3")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col2.4")})})]})}),Object(l.jsx)("div",{className:"col-md-3 col-4",children:Object(l.jsxs)("ul",{className:"p-0",children:[Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col3.1")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col3.2")})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/",children:a("footer.links.col3.3")})})]})}),Object(l.jsx)("div",{className:"col-md-3",children:Object(l.jsx)("div",{className:"set_language",children:Object(l.jsx)(i.a,{})})})]}),Object(l.jsx)("div",{className:"bottom-footer mt-5",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col-lg-9 col-md-8 col-5 text-left",children:Object(l.jsx)("a",{className:"",href:"#!",children:Object(l.jsx)("img",{src:t?r:s.a,alt:"logo"})})}),Object(l.jsx)("div",{className:"col-lg-3 col-md-4 col-7 text-left",children:Object(l.jsx)("p",{className:"mt-lg-4 mt-md-3",children:"\xa9 2021 SheKunj.Inc."})})]})})]})})})}},204:function(e,t,a){},205:function(e,t,a){},207:function(e,t,a){"use strict";var c=a(0),n=a(38),r=a(62),s=a(456),i=a(457),l=a(442),o=a(452),d=a(458),j=(a(204),a(149)),m=a(150),u=a(141),h=a(63),b=a(5),A=a(140),O=a(137),g=a(3),x=m.b({email:m.d().email("Invalid email").required("Email is required"),password:m.d().min(6,"At least 6 characters").required("Password is required")});var p=function(){var e=Object(h.c)((function(e){return e.authReducer})).isLoading,t=Object(h.b)(),a=Object(b.g)(),c=Object(j.a)({initialValues:{email:"",password:""},validationSchema:x,onSubmit:function(e){t(Object(A.b)(e,a))}}),n=c.handleSubmit,r=c.handleChange,s=c.handleBlur,i=c.values,l=c.errors,o=c.touched;return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("form",{onSubmit:n,children:[Object(g.jsxs)("div",{className:"form-group mb-4",children:[Object(g.jsx)("input",{name:"email",type:"email",className:"form-control",onChange:r,value:i.email,onBlur:s,autoComplete:"off",placeholder:"E-mail"}),Object(g.jsx)(u.a,{error:l.email,touched:o.email})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"password",type:"password",className:"form-control",onChange:r,value:i.password,onBlur:s,autoComplete:"off",placeholder:"Password"}),Object(g.jsx)(u.a,{error:l.password,touched:o.password})]}),Object(g.jsx)("button",{type:"submit",className:"btn btn_login w-100",children:e?Object(g.jsx)(O.a,{color:"secondary",size:20}):"Login"})]})})},v=m.b({contact:m.a().required("Mobile number is required"),password:m.d().min(6,"At least 6 characters").required("Password is required")});var f=function(){var e=Object(h.c)((function(e){return e.authReducer})).isLoading,t=Object(h.b)(),a=Object(b.g)(),c=Object(j.a)({initialValues:{contact:"",password:""},validationSchema:v,onSubmit:function(e){t(Object(A.b)(e,a))}}),n=c.handleSubmit,r=c.handleChange,s=c.handleBlur,i=c.values,l=c.errors,o=c.touched;return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("form",{onSubmit:n,children:[Object(g.jsxs)("div",{className:"form-group mb-4",children:[Object(g.jsx)("input",{name:"contact",type:"number",className:"form-control",onChange:r,value:i.contact,onBlur:s,autoComplete:"off",placeholder:"Mobile"}),Object(g.jsx)(u.a,{error:l.contact,touched:o.contact})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"password",type:"password",className:"form-control",onChange:r,value:i.password,onBlur:s,autoComplete:"off",placeholder:"Password"}),Object(g.jsx)(u.a,{error:l.password,touched:o.password})]}),Object(g.jsx)("button",{type:"submit",className:"btn btn_login w-100",children:e?Object(g.jsx)(O.a,{color:"secondary",size:20}):"Login"})]})})};function N(){var e=c.useState("1"),t=Object(r.a)(e,2),a=t[0],n=t[1];return Object(g.jsx)(s.a,{sx:{width:"100%",typography:"body1"},children:Object(g.jsxs)(l.a,{value:a,children:[Object(g.jsx)(s.a,{sx:{borderColor:"divider"},children:Object(g.jsxs)(o.a,{onChange:function(e,t){n(t)},"aria-label":"lab API tabs example",color:"primary",children:[Object(g.jsx)(i.a,{className:"xyz",label:"E-mail",value:"1"}),Object(g.jsx)(i.a,{className:"xyz",label:"Mobile",value:"2"})]})}),Object(g.jsx)(d.a,{value:"1",children:Object(g.jsx)(p,{})}),Object(g.jsx)(d.a,{value:"2",children:Object(g.jsx)(f,{})})]})})}var w="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJqSURBVHgBpZRNiNNAFMffm/RrWYqpIniS+AEWQayweBIakQUvanNcQWzBu5T17t5EQbpevLYLnjUVVkSUjVf30N7sMQjioSwdVJS2yTxnWlqSNLXV/UMgM3nvl/97bxKEOeqZa2Yiod0SQCYQGQCoAxAHRJcBOp4ndnLOfjsuF2dhBUPTknUCNGGBZLLt+4Nqzmm7MA/689rluz7Q9tjVsqK28IdXJZhPdhJhIDRizP9NEqhZsg18xqkqmWnJ1oxDIi6Q7QCJNjBy5Vo+10qMoCiQmuCvbuUch0ffNHKqZVmNfoWBJPtFYrUSk2T3TFOPg02dDt5BAb6nW/3d0yC+ZKdA/cMnC/5TTF5lPNKHzO3PkLzyVRFd8lkVDqEEIhQnCwXVsgMn/aDrRgNLj34bkIIyLBRy1VMjtHeh24yNTYCBiA9hCagqPzQgJoDDoUS6goYgpEWc/7PG5bvyKky2vom0vO/PxpImXy6cGIrKDVRLrjpS23JY99XyhX8SnntneHdIp1zLWdgGNTxM4x4E5iKP4zMmgbZaPPHOwWMvDz8gqadTqTosIZbCGkQHjV5j9JneebO2ty+OmsFnJF+Gg0G1YzluFFbaksPI9usyphTiEdgvNzPWCJp/dd3ApGhR5CSA6jeiI3xqMhQcGBpEeFFOt3zsYEM/frARjOWEdMmurrjTX1L+9XpZJi1V9kS53k040b03royoYm+uNEaOg0EKjAxrMY7nKtM/yw33aXUCnIGOwLIVlBI12Z/SYiQ5MNQqHeutG9yd+0c+v7te8IX81hGLsoeGci+DuVB9JvqIQHbnxnsnLvcPz+fyB9Ha/YgAAAAASUVORK5CYII=",B="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYoAAAAXCAYAAAAV8Qg5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALlSURBVHgB7dvNThNRFAfwc+5My8o4CzfoZniD8gTAEwhPAGwwjQvTEElcCLewMPGj6MI04ALegPgErU/AvAHjQliwqTsNnXs8M9GkIQjFzmDT+f8SSNp7Or1N2p5zz70lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAcmgBLb2f20RSLzQhKmt1koSpJ+0248jQbj7Nu9RcM0t7n+pGHftOeN8Zb1wxO8XF9bIoAJZwighKw9CJqt/WMRZ4kk0GTRZZFImGrG94+zBDKA2dW0rFrcae0/M57pELt5/QsIoAT8k5OzcNjgmZnpmAAmgLl3sasJoqaJorm5Xrd/7re77ZDFHJEmEF05fLHP693BxzmSFUncwuX7ASaZP1WtdIYNPv12HlIBmDimnGkrocdMPSqCFDBfkZ5+aX2nnAnnP9fsupLEVIB+n+KbYkYtWOyrdqg9phUm6Q4miWysUY81WSxpsjhhz0tXFd2BYU0i1NhCkoCS8R8+ejBD/9ltVjXDqlS8QBwX0hrQNkRIOTOUzTX3+TKbOSqAzneZCuBVObw2QCTW/ws0ynNUTE2yS/Hnq8bTZLHT2ovSFcflMedcRCM4Oz3vaPYOrw3i7DXmT4opGpxLvlLO9H3b09Vb7oVeUQUOs9e7uEhyn++4dHF8GgNoacFdSnRvwWTbc+6aDzb3sr2LnP342V+9Kcb3/ZAKUESBk11XV1qUMycSsjH3KWdFFTgq0O5M7u+XcejiTOtiYiwSBcCdSryIfEnbcrW/hUi6f0E00urhKkMWRcPEAPyz23ZxkCigdOzGWrTd2ou1qlrW/Yr39kU9HhxPTzzpflHA4j4QwAS6bRcHiQJKySVuNT3maqZMZ/tdu+mcVvFsAsP8WJPEiobEutF9SACA31FAOaXHW12/P5vdYHOQJQ1DR+lpKG3mHzquzhIAZPDLbCg9+/pjjczvDWSv2rWN1WKOVQMAAAAAAAAAAAAAAADA0H4BCQkA04ZHGzcAAAAASUVORK5CYII=",C=function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"login_form",children:[Object(g.jsx)("h2",{children:"Login on Shekunj"}),Object(g.jsxs)("p",{children:["Don't have an account?"," ",Object(g.jsxs)(n.b,{to:"/signup",className:"register",children:[" ","REGISTER HERE"," "]})]}),Object(g.jsx)(N,{}),Object(g.jsx)("div",{className:"text-center",children:Object(g.jsxs)("p",{className:"policy_para",children:["Please read our ",Object(g.jsx)("a",{href:"#!",children:" Privacy Notice "})," ,"," ",Object(g.jsx)("a",{href:"#!",children:" Cookie Notice "})," and ",Object(g.jsx)("a",{href:"#!",children:" Legal terms "}),"to understand how we use your personal data."]})}),Object(g.jsx)("div",{className:"text-center",children:Object(g.jsx)("div",{className:"mt-3 mb-3",children:Object(g.jsx)("img",{src:B,className:"orimg",alt:"..."})})}),Object(g.jsxs)("button",{className:"btn btn-google",children:[Object(g.jsx)("img",{src:w,alt:"...",className:"mr-2"})," Register with Google"]})]})})},I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP5SURBVHgBrVe/SyNBFH7ZBLQQ3ANBC8E9ELRLymBhTgS9yktlYaH+A6JXXqOJNnZnykPQaCHYiFrIaRNjIacgJKKChbIBRS3ETaEmhe69b8iGZN2drOd9MOzO7Mx8837OWx95QCwWU/kRUhTlm8/n+2KapsZ9tfTZ4LEMj2VeX1/TPHfdy56+WoR+v3+cN51oa2tTOzo6iJ+kqirV19eLOYVCge7u7uj29pbOz88pl8vpfJDky8vLEq/X3008MzMDwlgwGFS7u7sFmRcYhkF7e3uUzWZ17sYnJyeT5BXT09M/E4mEeXNzY/4rHh4eTOyBvbySLm5sbJjPz8/mR4E9VldXQb5YU1JM/N+AIHbJ/dYLO8Io23F2aGiIAoGA9IDFYpGur6/Fs6GhgWoBDnl6ehru6urKp1KpPxjzlUg1DpXU2NiYJnMi9lhKp9PiaQHzBwcHqbm5WUoOr5+fnzc45D4znyEk7u3tHWfvjXJzXbi9vU1bW1uUz+erxhFOR0dHQvqmpqZymNkBzfDaeg694i5DEPf09CT51KrTImy4srJCZ2dnJANUf3BwIN41TXOcA60cHh6GIpHIL4XjNco2cFQxSJeXl6tUWwuIYaxzAjiQiAhZkHX+BRnJCXV1dcIxZICWWALq6+srj2UyGdf54OLMFg2wUwVbWlpcJyJrcRYStgRwkFAoRI2NjaJVagr7QEPWXCeUzBAJcJiFZMSQCAQAvFemASuPy4C9WGINAatCpTKAHK2W2q2N3ZzL2gucCnmAW4h8BCA23LzQgt2WMuCQuB7dULK/obC+db5JZHvR8fExDQwMkBfAD+CMbsDdjcIB4ZR+T5x+FEidzJlV2KvXZaoBkHE2NzfJC5BarShwAriYcxc2zrDEhj0HVwJqhu1qkYMU/jI8POz4HRwojVCXKbgp+AQJ3DpugGMhM6GssfKxHUiVMJl1SCeAg7mW8C7CiTtz7BAGDC8DHAfE9nmQBGkS392AOajDmCuJvrid+JYq8A1VvLi4+Ip06FYIYBzSnJycUGdnZ5Uk7e3tojkB6l9YWEAofZ+amtotEwOoDMLh8KfHx8ew06UBKS8vL0WoIDO1traWv93f35djl0PlTVWytrZGV1dXCSadtcbelLfxeDzJ0oz09/cL9cFuUBPSKrwbeR0FQ6UdkRRAbNXXWIP0inl4532WmHS0ksexrmbyOT75OIhwAC852g74ws7ODvwHkk7Yv/udFrHNf/Mdm3t6egpxV4WUXvM1tAPC/f19g7s/mDTmNK/WL4zGko9yG0GVAtvjEGjWjQbHQZjpum79wojwRKQgVN32lhLbDhHFDxsKB9zhVP3TpiP1IgtyPyMjtPAX7Lfu7wlN+rsAAAAASUVORK5CYII=",y=m.b({name:m.d().required("Name is required"),contact:m.a().required("Contact is required").positive(),email:m.d().email("Invalid email").required("Email is required"),password:m.d().min(6,"At least 6 characters").required("Password is required"),confirmPassword:m.d().oneOf([m.c("password"),null],"Passwords must match")}),E=function(){var e=Object(h.b)(),t=Object(b.g)(),a=Object(h.c)((function(e){return e.authReducer})).isLoading,c=Object(j.a)({initialValues:{name:"",contact:"",email:"",password:"",confirmPassword:""},validationSchema:y,onSubmit:function(a){var c={email:a.email,name:a.name,password:a.password,contact:a.contact};e(Object(A.c)(c,t))}}),r=c.handleSubmit,s=c.handleChange,i=c.handleBlur,l=c.values,o=c.errors,d=c.touched;return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:"login_form",children:[Object(g.jsx)("h2",{children:"Signup on Shekunj "}),Object(g.jsxs)("p",{children:["Already have an account?"," ",Object(g.jsxs)(n.b,{to:"/login",className:"register",children:[" ","\xa0 LOGIN NOW"," "]})]}),Object(g.jsxs)("div",{className:"text-center",children:[Object(g.jsxs)("button",{className:"btn btn-google",children:[Object(g.jsx)("img",{src:w,alt:"...",className:"mr-2"})," Register with Google"]}),Object(g.jsx)("div",{className:"or",children:Object(g.jsx)("img",{src:B,className:"orimg",alt:"..."})})]}),Object(g.jsxs)("form",{onSubmit:r,children:[Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"name",type:"text",className:"form-control",onChange:s,value:l.name,onBlur:i,autoComplete:"off",placeholder:"Name"}),Object(g.jsx)(u.a,{error:o.name,touched:d.name})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"email",type:"email",className:"form-control",onChange:s,value:l.email,onBlur:i,autoComplete:"off",placeholder:"Email"}),Object(g.jsx)(u.a,{error:o.email,touched:d.email})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("div",{className:"ver",children:[Object(g.jsx)("span",{children:"Verify"}),Object(g.jsx)("input",{name:"contact",type:"number",className:"form-control",onChange:s,onBlur:i,autoComplete:"off",placeholder:"Mobile Number"})]}),Object(g.jsx)(u.a,{error:o.contact,touched:d.contact})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"confirmPassword",type:"",className:"form-control",onChange:s,onBlur:i,placeholder:"OTP"}),Object(g.jsx)(u.a,{error:o.confirmPassword,touched:d.confirmPassword})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("input",{name:"confirmPassword",type:"password",className:"form-control",onChange:s,onBlur:i,placeholder:"Password"}),Object(g.jsx)(u.a,{error:o.confirmPassword,touched:d.confirmPassword})]}),Object(g.jsx)("div",{className:"rad_set",children:Object(g.jsxs)("div",{className:"radio-with-Icon",children:[Object(g.jsxs)("p",{className:"gender",children:["Gender ",Object(g.jsx)("span",{children:"*"})]}),Object(g.jsxs)("p",{className:"radioOption-Item",children:[Object(g.jsx)("input",{type:"radio",name:"BannerTypes",id:"BannerType1",value:"true",className:"ng-valid ng-dirty ng-touched ng-empty"}),Object(g.jsx)("label",{for:"BannerType1",children:Object(g.jsx)("img",{src:I,alt:"",srcset:""})})]}),Object(g.jsx)("p",{className:"fel",children:"Female"}),Object(g.jsxs)("p",{className:"radioOption-Item",children:[Object(g.jsx)("input",{type:"radio",name:"BannerTypes",id:"BannerType2",value:"false",className:"ng-valid ng-dirty ng-touched ng-empty"}),Object(g.jsx)("label",{for:"BannerType2",children:Object(g.jsx)("img",{src:I,alt:"",srcset:""})})]}),Object(g.jsx)("p",{className:"male",children:"Male"})]})}),Object(g.jsx)("button",{type:"submit",className:"btn btn_login w-100 mt-3",children:a?Object(g.jsx)(O.a,{color:"secondary",size:20}):"Signup"})]}),Object(g.jsx)("div",{className:"text-center",children:Object(g.jsxs)("p",{className:"policy_para",children:["Please read our ",Object(g.jsx)("a",{href:"#!",children:" Privacy Notice "})," ,"," ",Object(g.jsx)("a",{href:"#!",children:" Cookie Notice "})," and ",Object(g.jsx)("a",{href:"#!",children:" Legal terms "}),"to understand how we use your personal data."]})})]})})};a(205),t.a=function(e){var t=e.loginPage;return Object(g.jsx)("div",{className:"",children:Object(g.jsx)("div",{className:t?"login_bg_main login_main mt-3":"login_main mt-3",children:Object(g.jsx)("div",{className:"container logincontentbg",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-md-4"}),Object(g.jsx)("div",{className:"col-md-4",children:Object(g.jsxs)("div",{className:"login_content",children:[Object(g.jsx)("h1",{children:"Register for Easy & Real Learning to make you Job Ready"}),Object(g.jsxs)("div",{className:"mt-4",children:[Object(g.jsx)("div",{className:"login_detail mb-2",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-md-2",children:Object(g.jsx)("div",{className:"login-content-img",children:Object(g.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAhgSURBVHgB1VgLcJRXFf42+948No8lDwIhlJBAQpaY8H6GCVB5hLZgxQoTK1MVrBbHjohlpoi0ROrUarXAtExH2zJE26pQqjMtUKDl0bzAEkma55Jk896EvDb7vp6zm01XCJt1Az6+zJf9//uf+9/zn3vOuede4H8cktvuY4hq4gHi5OG2T4ivEluJDowfSmIU8WHiQmIcsZt4mfjO8DijQkt8i2gKC1WLhx9cInIXZgmZTGqltl7iTqIK44OUuJ1Ym5EaIZ7YPFU8s2O6eGKjWmQ8AMHtxO8My410YLDVjqQkJz62ae1yTUryJGx5ZBX0M6fBZrNLF8+Zpaxval1otdqd8Fg0GPBsPR0bo3xu786M+JefzUL+ykQoFVJ8LX8itq0fQqjKHF3ZgNzBIbBRrhHtXgXjib/cuGaZZuvG1VAo5Tj5wSdoNHZg84Y8LMjOQNn1z1Ut7aYwkjuK4JAZEiJ5tXBXZtT3C1IQFiqHsW0I2fmn8WTBLEycGIvF6QbERAjFqY+RTeb8C/XpDBnu/EKYRh3V2z+IiqoG7Ck8DMtQNarrS/CTnx9Be1cPnA4XaLpzSPa7CA4FqxbH6r6xaQoMzYOYuux9vHi0GqUn8nD4rTpMXXEJDR0T8NXVQN586Eh+C3fyKpiwcmkOvvnoGlwsq0COXovXD87FGy/Og8Peh8oaA3Z/bwvIBWQkG0vMIn403Pel4Wt/ZMzISNPC4RAoPPw5NGoZLl81YeOOyzj1UQsiIxR47rAJgkyXmeKWn8X/ZN7Pu9U3ALagXBaCIYsTfYN2dHRZYbML8hM5unv6YLHYRsSJ54ev/w5PEI0FWQh5odMlMClejaKXF8BO787Z8CHK31tFsyPBOyc+pfF6EeLJLXLfzrs4WskHxdtH9onMGVNFQmyomJwQLtasmCdO/q5QTJuSyBHN6WAdgsMzi3JiRMuVfGGr3iRcdY+KhgtrOXLdv3xvK48XnWcgFma6I/pnvhYscjice6IiwhS6aC2e3fk4quobIZOGIH16MsI1amgjQuG46bxJsn9FcPhz8bXup974kyHuB9tSIZH960OJqwcuWxd+fRwovoF2avqj73MWf0qjUvbm6NNEVkaKePe1/eLwgR+KpMQ4kZ2Zyl/UhOCt59aB+AhFcvO6FfGivST/Cwue0YuOsxqxdjGEXAoDy+HORcSdhH9ELFYpFfYZKUkieXI8v8BILCeugo/PBglOa5wFBufqo0VWeqRbwdw5UjE7zT2tQ8RvwSdRSzD6l+6AJ1oZxcS/8Ytwb/CeLm3J+riMlSMN/UNONJrsNEfnaKG7cpKaHvI+G80irMgh3D9EhcelIHbm8pEGST8tUCoLrciVfBuO/zL444UfvuIrPF6fCgaLZ+bvhn5z4UhDU7cdl2rMwKV9QNlLS3yFb1eQ/Y/LoS8R1xD18Jg8ZJSBuPRqhqdM4tTDwRSIn15uKnk3zVR7ReltsNpdFB7EnhouEs7drpAvphH3yGTyrTrdBLlWq6UML79zCFqPBs1m9Pb2wGw2C6vVwmXSfmIR0Q7/iCYex4z01chb5WlppvRaVkq/zR/Q3WPw1Idu+FowRSKRvBkVFT03J3ueNCwsDHK5AtQ26igulwtt7a0wmTol3d2m6V1dnYccDgcv8r+Cf0vy4KWI0K5GFk2UTOZJKteu8rOL8FGO4R2dc+ChCRPiCubPWygNDQ1DIHC5nGhpNaKvrw9dXR1oa2vtF0IshWd99gcuB2jNcLsSq8dW5/rv6/AUrXcouIym8nTu8jx5TIwO/w5sNisaDPVUpdhhNDajp6ebl6jH4Um644bX+dfpYnTyCK125AFPYU+PCeXlJSgrL3YPPmgeoArETvP3xQxKpTKo1WpyhRBotZHcxKXY5ADH5w5cjk25m4DXB1O1kZFUHHhWmIGBAdTVVaOxsQHL5qQinOLt4tUSdA86ERkZjZhoHchXQYEEhUJB5ZgKA/Sn0Wi4+yR4Nl+Bgsu23rEUjGBLUEWDxqY6VFffgD51EvYVbsfqpXooSPEeqhera+txvrgC58vq0Wa8gRsVFig14VCp1OTrMiiV7szB+xs5AgPXlef8CXgVvGW1WIantBQv7NqCr3x5PqZMnDAiqNGokBivw4ol86hwtaC67iY+u16BS5+W4lSxESarAgkJiSxKGTfg7WkyPFOcPKzsXRX8/c3GhjVSmVTNkfn0tvXwB5VKBX1GGvRJSmyd40JcpBIH3q5FSwtXZO4B63CP4A2SC5TD3qyrq7EhSNhsNvZdtsIeYkeA3djpRSAKziXmOZ3OQH1nVFAOZP/7NjwnB4Egg9gFPy7hVfDJgoeWTTv6/HYJgkTu/HRcLNrPUVIAz5KZzM1+yCcMzxP/QGy/23u9Pqh9ICkO05LiMR4syk7jHy4uQuHZHuz1I95JPEY8CD8W9CpYdeby9Vy704VgYWjuxMHXTvAl+18/8afDHBe8Cr7ycWlVInEBXcdYrLYQ2peM3Vu43BttLpcMxs7u3b841katR4g3cI/g9cEK4gbig8Qug7ErsN6OQfB5ktHkXnb56Iyd/je4R+uwr4JecNFZdfJsCa3FY9We9HywHaY+G65UuiukK7gPuF1BdtwzRacuoq3zlv+e1ltuFl1oQk1rP2/oz+I+QDpKWzEpt7bmZmtC3qJMhKpHObO09dGnXMWxD6uw//g/BvrMjh9T6wX8hxTkkK80tnXPvlZpiE9K0Em04Ro6VJKBi2uruRfGmmIce78Eu17/rL/jlpWPh3+LsUv9oOAvMacT94ZpVBvmz05R6WdMgYJOoNoaa3HpejNqWwcMFMHefYgZ9wljrRyccPnQknc3HKG8UvAh92l4dnONuHcnDv+f+CdN/h5oV+ExqgAAAABJRU5ErkJggg==",alt:"Image"})})}),Object(g.jsx)("div",{className:"col-md-10",children:Object(g.jsxs)("div",{className:"login-content-right",children:[Object(g.jsx)("h5",{className:"mt-1",children:"Practical Focused Approach"}),Object(g.jsx)("p",{children:"We believe Why is more important than How. You may know how to use a tool but you will only learn why it will work for the end-users when you engage in practicals under the guidance of mentors who have done 100s of projects for their clients."})]})})]})}),Object(g.jsx)("div",{className:"login_detail mb-2",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-md-2",children:Object(g.jsx)("div",{className:"login-content-img",children:Object(g.jsx)("img",{src:"data:image/png;base64,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",alt:"Image"})})}),Object(g.jsx)("div",{className:"col-md-10",children:Object(g.jsxs)("div",{className:"login-content-right",children:[Object(g.jsx)("h5",{className:"mt-1",children:"Get real work experience"}),Object(g.jsx)("p",{children:"Our Master\u2019s Program does not complete without an Internship because we want you to learn how Industry works."})]})})]})}),Object(g.jsx)("div",{className:"login_detail mb-3",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-md-2",children:Object(g.jsx)("div",{className:"login-content-img",children:Object(g.jsx)("img",{src:"data:image/png;base64,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",alt:"Image"})})}),Object(g.jsx)("div",{className:"col-md-10",children:Object(g.jsxs)("div",{className:"login-content-right",children:[Object(g.jsx)("h5",{className:"mt-1",children:"In Hinglish"}),Object(g.jsx)("p",{className:"mb-0",children:"All our courses are in spoken language i.e Hindi + English. These tools or subjects can be a little tricky or complicated but our lectures are very simple to understand."})]})})]})})]})]})}),Object(g.jsx)("div",{className:"col-md-4",children:t?Object(g.jsx)(C,{}):Object(g.jsx)(E,{})})]})})})})}},382:function(e,t,a){},443:function(e,t,a){"use strict";a.r(t);a(0);var c=a(163),n=a(207),r=a(149),s=a(150),i=a(5),l=a(63),o=a(208),d=(a(141),a(143),a(140)),j=a(164),m=(a(382),a(3)),u=s.b({email:s.d().email("Invalid email").required("Email is required"),password:s.d().min(6,"At least 6 characters").required("Password is required")});t.default=function(e){e.p;var t=Object(l.b)(),a=Object(i.g)(),s=(Object(l.c)((function(e){return e.authReducer})).isLoading,Object(o.a)().t,Object(r.a)({initialValues:{email:"",password:""},validationSchema:u,onSubmit:function(e){t(Object(d.b)(e,a))}}));return s.handleSubmit,s.handleChange,s.handleBlur,s.values,s.errors,s.touched,Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{children:[Object(m.jsx)(c.a,{loginPage:!0}),Object(m.jsx)(n.a,{loginPage:!0}),Object(m.jsx)(j.a,{loginPage:!0})]})})}}}]);
//# sourceMappingURL=9.9cae89dc.chunk.js.map