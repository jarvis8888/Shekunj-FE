/*! For license information please see 18.94980483.chunk.js.LICENSE.txt */
(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[18],{509:function(e,c,t){var s;!function(){"use strict";var t={}.hasOwnProperty;function a(){for(var e=[],c=0;c<arguments.length;c++){var s=arguments[c];if(s){var i=typeof s;if("string"===i||"number"===i)e.push(s);else if(Array.isArray(s)){if(s.length){var n=a.apply(null,s);n&&e.push(n)}}else if("object"===i)if(s.toString===Object.prototype.toString)for(var r in s)t.call(s,r)&&s[r]&&e.push(r);else e.push(s.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(s=function(){return a}.apply(c,[]))||(e.exports=s)}()},510:function(e,c,t){"use strict";t.d(c,"a",(function(){return i}));t(3);var s=t(1),a=(t(0),s.createContext({prefixes:{}}));a.Consumer,a.Provider;function i(e,c){var t=Object(s.useContext)(a).prefixes;return e||t[c]||c}},514:function(e,c,t){"use strict";var s=t(3),a=t(109),i=t(509),n=t.n(i),r=t(1),l=t(510),A=t(0),o=["bsPrefix","className","as"],j=["xxl","xl","lg","md","sm","xs"],d=r.forwardRef((function(e,c){var t=e.bsPrefix,i=e.className,r=e.as,d=void 0===r?"div":r,u=Object(a.a)(e,o),f=Object(l.a)(t,"row"),b="".concat(f,"-cols"),x=[];return j.forEach((function(e){var c,t=u[e];delete u[e],c=null!=t&&"object"===typeof t?t.cols:t;var s="xs"!==e?"-".concat(e):"";null!=c&&x.push("".concat(b).concat(s,"-").concat(c))})),Object(A.jsx)(d,Object(s.a)(Object(s.a)({ref:c},u),{},{className:n.a.apply(void 0,[i,f].concat(x))}))}));d.displayName="Row",c.a=d},515:function(e,c,t){"use strict";var s=t(14),a=t(3),i=t(109),n=t(509),r=t.n(n),l=t(1),A=t(510),o=t(0),j=["as","bsPrefix","className"],d=["className"],u=["xxl","xl","lg","md","sm","xs"];var f=l.forwardRef((function(e,c){var t=function(e){var c=e.as,t=e.bsPrefix,s=e.className,n=Object(i.a)(e,j);t=Object(A.a)(t,"col");var l=[],o=[];return u.forEach((function(e){var c,s,a,i=n[e];delete n[e],"object"===typeof i&&null!=i?(c=i.span,s=i.offset,a=i.order):c=i;var r="xs"!==e?"-".concat(e):"";c&&l.push(!0===c?"".concat(t).concat(r):"".concat(t).concat(r,"-").concat(c)),null!=a&&o.push("order".concat(r,"-").concat(a)),null!=s&&o.push("offset".concat(r,"-").concat(s))})),[Object(a.a)(Object(a.a)({},n),{},{className:r.a.apply(void 0,[s].concat(l,o))}),{as:c,bsPrefix:t,spans:l}]}(e),n=Object(s.a)(t,2),l=n[0],f=l.className,b=Object(i.a)(l,d),x=n[1],h=x.as,O=void 0===h?"div":h,v=x.bsPrefix,m=x.spans;return Object(o.jsx)(O,Object(a.a)(Object(a.a)({},b),{},{ref:c,className:r()(f,!m.length&&v)}))}));f.displayName="Col",c.a=f},516:function(e,c,t){"use strict";var s=t(3),a=t(109),i=t(509),n=t.n(i),r=t(1),l=t(510),A=t(0),o=["bsPrefix","fluid","as","className"],j=r.forwardRef((function(e,c){var t=e.bsPrefix,i=e.fluid,r=e.as,j=void 0===r?"div":r,d=e.className,u=Object(a.a)(e,o),f=Object(l.a)(t,"container"),b="string"===typeof i?"-".concat(i):"-fluid";return Object(A.jsx)(j,Object(s.a)(Object(s.a)({ref:c},u),{},{className:n()(d,i?"".concat(f).concat(b):f)}))}));j.displayName="Container",j.defaultProps={fluid:!1},c.a=j},665:function(e,c,t){},703:function(e,c,t){"use strict";t.r(c);var s=t(1),a=t(34),i=t(516),n=t(514),r=t(515),l=t(28),A=t(174),o=t(54),j=t(184),d=t.p+"static/media/Certificate01.d19f3b57.png",u=(t(665),t(0));c.default=function(){var e=Object(l.g)(),c=Object(a.b)(),t=Object(a.c)((function(e){return e.certificateReducer})).certificates;return Object(s.useEffect)((function(){c(Object(j.c)())}),[c]),Object(u.jsxs)("div",{children:[Object(u.jsx)(A.h,{title:"She\u0915\u0941\u0902\u091c - All Certificates"}),Object(u.jsx)(A.g,{loginPage:!0,subPage:"allCertificatePage"}),Object(u.jsx)("div",{className:"all_certif_banner",children:Object(u.jsx)(i.a,{children:Object(u.jsx)(n.a,{children:Object(u.jsxs)(r.a,{md:5,xs:12,children:[Object(u.jsx)("h2",{children:"achieve your goals"}),Object(u.jsx)("p",{children:"All over Indian Girl students are taking their web design careers to the next-level with Shekunj Academy. Here are some of their stories."})]})})})}),Object(u.jsx)("div",{className:"all_certif_sec",children:Object(u.jsxs)(i.a,{children:[Object(u.jsx)("h2",{className:"my_achiev",children:"my achievements"}),t.length>0?t.map((function(c){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{className:"all_certif_box",children:Object(u.jsxs)(n.a,{children:[Object(u.jsx)(r.a,{md:5,xs:12,children:Object(u.jsx)("img",{className:"certif_img",src:d,alt:""})}),Object(u.jsx)(r.a,{md:7,xs:12,children:Object(u.jsxs)("div",{className:"all_certif_con",children:[Object(u.jsx)("h2",{children:(null===c||void 0===c?void 0:c.course_name)||"N/A"}),Object(u.jsxs)("p",{children:[(null===c||void 0===c?void 0:c.description)||"N/A"," "]}),Object(u.jsxs)("div",{className:"all_list",children:[Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:Object(u.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG2SURBVHgB5VRNToNAFJ4HJWw01kVN3MEJ1BO0PYGsgJ14AvUE2BvoCdruCKt6AvEExRMUV/60jTVxUUKZ8U3/QmEw7c7EL5nA/LzvffN+hpB/ByjbGBhGdU9VHfyt46FTvsYIiRil3VSWg2PPi0R2kmhxbFlX+6raR2MNGOsmAE0+CEALR0Nh7PHNsq63Ujg2TTcFcHA0y1S82rYmIyk669R8v1Wq8MO2HRHZENVkFfE9JY7PGJ59N02jlFBizBUpo4xVUU01u3bY600A4FICaAsJR+iJB73smiLUPC/AT4ghaBQIKQYblTyR3fEgp6lRICSLa0VlVni1Ok9Gfh3jOCGSdFAk/AVUkjqMsZcKY4ORZbU/sUZXe/nYrgkxwCFZFnAePK5Hvu/MAHRK6VeiKNrajpATSshzZr4Avw4q6FfiWOcZJFsCFQ+STGVIWRXIHsxU1d2WjDcBfjbacCOG6OkGS8coa6sNZaZ5wZsg4e2YQaH1Vm2FngJ+OF+Xy0fD5Y5FTSB8beaklN5ios5xGuKhuRGSaIQnDuD+ezq90wWxLn2+VhhiFyyJ+OEIiUJ9h6T9PfwAG23PnwlNklMAAAAASUVORK5CYII=",alt:""})}),Object(u.jsxs)("li",{children:[" ",Object(o.i)(null===c||void 0===c?void 0:c.course_start_time,null===c||void 0===c?void 0:c.course_end_time).hour," ",Object(o.i)(null===c||void 0===c?void 0:c.course_start_time,null===c||void 0===c?void 0:c.course_end_time).minute]})]}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:Object(u.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADKSURBVHgB7ZK/DYJAHIUfBybEAmEDR5ANsDBRY+EI0miMlRMYhzBEGxzBCgsLHYENZAOIGkP4K1dctDABY4OGr3pfLnnFux9QUW5uq04LX8Kx4BrdJk/IOY5CVZkd7My1zI95BSlSuzHZq28faSn+nueG5lDmgzDbMGjTDa/GQEv5eFGgwpHGls5MYEHRd5677umohw71SBRs+NEyty/hPPwU3KtcNn0zrt3nin7y6AkRkFGBAkeaWlvmhAX6KUggwxdlfESCipLzAEQjQWX2LxhjAAAAAElFTkSuQmCC",alt:""})}),Object(u.jsxs)("li",{children:[(null===c||void 0===c?void 0:c.no_of_lecture)||0," lectures"]})]}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:Object(u.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB7SURBVHgB7ZHLCYAwEETHD55ELMGLwWNKsYTtQEuwkzSgpDULEKPeVIIGEwhI3m12l3fYAQJeqASVbKRWt4vxgTQHjxJ0zoRP+BEeP4MhRsKsQM8mGkxuf/JDa2EjSdSSOFwJ1V5sssC42VehDal2umI+xwi3rK454JYNt5kRHKT2sccAAAAASUVORK5CYII=",alt:""})}),Object(u.jsx)("li",{children:"All level"})]})]}),Object(u.jsx)("button",{onClick:function(){return e.push("/certificate-detail/".concat(null===c||void 0===c?void 0:c.id))},children:"View Certificate"}),Object(u.jsx)("button",{children:"Download"})]})})]})},null===c||void 0===c?void 0:c.id)})})):Object(u.jsx)("div",{className:"text-center",children:"No data found!"})]})}),Object(u.jsx)(A.i,{}),Object(u.jsx)(A.e,{loginPage:!1})]})}}}]);
//# sourceMappingURL=18.94980483.chunk.js.map