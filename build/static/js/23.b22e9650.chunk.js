(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[23],{142:function(e,t,n){"use strict";var r=n(146),a=n.n(r),s=n(147),c=n(189),o=n.n(c),u=n(41),i=n.n(u);o.a.defaults.baseURL="http://3.109.195.234/api/",o.a.defaults.withCredentials=!0;var l=function(e){return e.data};o.a.interceptors.request.use((function(e){var t=i.a.get("sheToken");return t&&(e.headers.Authorization="Bearer ".concat(t)),e})),o.a.interceptors.response.use(function(){var e=Object(s.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){var t=!e.response;switch(t.status){case 401:console.log("Logout user!");break;case 403:console.log("You are not allowed to do that!")}return Promise.reject(e.response)}));var p={get:function(e,t){return o.a.get(e,{params:t}).then(l)},post:function(e,t){return o.a.post(e,t).then(l)},put:function(e,t){return o.a.put(e,t).then(l)},patch:function(e,t){return o.a.patch(e,t).then(l)},delete:function(e){return o.a.delete(e).then(l)},postForm:function(e,t){return o.a.post(e,t,{headers:{"Content-type":"multipart/form-data"}}).then(l)},putForm:function(e,t){return o.a.put(e,t,{headers:{"Content-type":"multipart/form-data"}}).then(l)}};t.a=p},143:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"d",(function(){return h})),n.d(t,"f",(function(){return m})),n.d(t,"a",(function(){return b})),n.d(t,"g",(function(){return v})),n.d(t,"h",(function(){return j})),n.d(t,"e",(function(){return O}));var r=n(146),a=n.n(r),s=n(147),c=n(20),o=n(68),u=n(142),i={position:"top-right",autoClose:2e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1,progress:void 0},l=n(41),p=n.n(l),d=function(e,t,n){return function(){var r=Object(s.a)(a.a.mark((function r(s){var l;return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,s({type:c.a.LOGIN_REQUEST}),r.next=4,u.a.post("authentication/login/",e);case 4:l=r.sent,s({type:c.a.LOGIN_FINISH,payload:{name:l.data.name,email:l.data.email}}),p.a.set("sheToken",l.data.tokens),n?t.push(n):t.push("/dashboard"),r.next=15;break;case 10:r.prev=10,r.t0=r.catch(0),s({type:c.a.LOGIN_FAIL}),r.t0&&500===r.t0.status?o.b.error(r.t0.data.message,i):r.t0&&400===r.t0.status&&o.b.error(r.t0.data.errors.error[0],i);case 15:case"end":return r.stop()}}),r,null,[[0,10]])})));return function(e){return r.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:p.a.remove("sheToken"),n({type:c.a.LOGIN_FAIL}),e.push("/login");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},h=function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){var s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:c.a.SIGNUP_REQUEST}),n.next=4,u.a.post("authentication/register/",e);case 4:s=n.sent,r({type:c.a.SIGNUP_FINISH,payload:e}),p.a.set("sheToken",s.data.token),t.push("/dashboard"),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),r({type:c.a.SIGNUP_FAIL}),400===(null===n.t0||void 0===n.t0?void 0:n.t0.status)?o.b.error(n.t0.data.errors.error[0],i):500===(null===n.t0||void 0===n.t0?void 0:n.t0.status)&&o.b.error("Not valid OTP",i);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},m=function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){var s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,u.a.post("social_auth/google/",e);case 3:s=n.sent,r({type:c.a.LOGIN_FINISH,payload:{name:s.data.username,email:s.data.email}}),p.a.set("sheToken",s.data.tokens.access),t.push("/dashboard"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),o.b.error("Google Login failed.",i);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:c.a.CONTACT_VERIFY_REQUEST}),t.next=4,u.a.post("authentication/user-send-otp/",{contact:e.contact.toString()});case 4:r=t.sent,n({type:c.a.CONTACT_VERIFY_FINISH}),o.b.success(r.message,i),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),n({type:c.a.CONTACT_VERIFY_FAIL}),400===(null===t.t0||void 0===t.t0?void 0:t.t0.status)&&o.b.error("Invalid mobile number.");case 13:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},v=function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){var s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:c.a.EMAIL_VERIFY_REQUEST}),n.next=4,u.a.post("authentication/request-reset-email/",e);case 4:s=n.sent,r({type:c.a.EMAIL_VERIFY_FINISH}),t.push("/login"),o.b.success(s.data.success,i),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),r({type:c.a.EMAIL_VERIFY_FAIL}),o.b.error("E-mail not found",i);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},j=function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){var s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:c.a.EMAIL_VERIFY_REQUEST}),n.next=4,u.a.patch("authentication/password-reset-complete/",e);case 4:s=n.sent,r({type:c.a.EMAIL_VERIFY_FINISH}),t.push("/login"),o.b.success(s.data.message,i),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),o.b.error("Internal Server Error",i);case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},O=function(){return function(){var e=Object(s.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.a.get("sheToken")&&t({type:c.a.REFRESH});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},145:function(e,t,n){"use strict";n(0),n(155);var r=n(3);t.a=function(e){var t=e.error,n=e.touched;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{className:"text-danger err",children:t&&n?t:null})})}},155:function(e,t,n){},256:function(e,t,n){"use strict";t.a=n.p+"static/media/logo.f7da92ab.svg"},257:function(e,t,n){},524:function(e,t,n){"use strict";n.r(t);n(0);var r=n(157),a=n(158),s=n(256),c=n(561),o=n(67),u=n(6),i=n(117),l=n(145),p=(n(257),n(143)),d=n(3),f=a.b({email:a.c().email("Invalid emial").required("Email is required")});t.default=function(){var e=Object(o.c)((function(e){return e.authReducer})).isLoading,t=Object(o.b)(),n=Object(u.g)(),a=Object(r.a)({initialValues:{email:""},validationSchema:f,onSubmit:function(e){t(Object(p.g)(e,n))}}),h=a.handleSubmit,m=a.handleChange,b=a.handleBlur,v=a.values,j=a.errors,O=a.touched,g=Object(c.a)().t;return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"logo_1",children:Object(d.jsx)("img",{src:s.a,alt:"..."})}),Object(d.jsxs)("div",{className:"main_div",children:[Object(d.jsx)("h3",{className:"text-center",children:g("forgot.heading")}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-sm-4 col-md-4"}),Object(d.jsx)("div",{className:"col-sm-4 col-md-4",children:Object(d.jsxs)("form",{className:"set_form",onSubmit:h,children:[Object(d.jsxs)("div",{className:"err",children:[Object(d.jsxs)("label",{htmlFor:"email",children:[g("forgot.label")," ",Object(d.jsx)("span",{children:"*"})]}),Object(d.jsx)("input",{name:"email",type:"email",className:"w-100 mt-2",onChange:m,value:v.email,onBlur:b,autoComplete:"off"}),Object(d.jsx)(l.a,{error:j.email,touched:O.email})]}),Object(d.jsx)("button",{className:"w-100 my-4 login-button",type:"submit",children:e?Object(d.jsx)(i.a,{color:"secondary",className:"my-2"}):g("forgot.button")})]})}),Object(d.jsx)("div",{className:"col-sm-4 col-md-4"})]})]})]})})}}}]);
//# sourceMappingURL=23.b22e9650.chunk.js.map