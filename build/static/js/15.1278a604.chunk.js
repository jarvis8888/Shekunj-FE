(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[15],{139:function(e,c,t){"use strict";var s=t(62),a=t(0),i=t(208),l=t(499),n=t(490),r=t(498),j=t(134),d=t(175),o=t.n(d),b=t(489),h=t(3),m=Object(b.a)({language:{borderRadius:"0 !important",width:"128px",height:"40px",color:"#000000 !important",border:"1px solid #000000 !important",textTransform:"none !important",fontFamily:"Poppins !important",fontStyle:"normal",fontWeight:"300 !important",fontSize:"16px !important"}});c.a=function(){var e=Object(a.useState)(localStorage.getItem("i18nextLng")||"en"),c=Object(s.a)(e,2),t=c[0],d=c[1],b=Object(a.useState)(null),x=Object(s.a)(b,2),O=x[0],u=x[1],g=Object(i.a)().i18n,v=Boolean(O),A=m(),N=function(e,c){g.changeLanguage(c),d(c),u(null)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(l.a,{id:"fade-button",className:A.language,"aria-controls":"fade-menu","aria-haspopup":"true","aria-expanded":v?"true":void 0,onClick:function(e){u(e.currentTarget)},startIcon:Object(h.jsx)(o.a,{}),children:t.startsWith("en")?"English":"Hindi"}),Object(h.jsxs)(n.a,{id:"fade-menu",MenuListProps:{"aria-labelledby":"fade-button"},anchorEl:O,open:v,onClose:function(){u(null)},TransitionComponent:j.a,children:[Object(h.jsx)(r.a,{onClick:function(e){return N(0,"en")},children:"English"}),Object(h.jsx)(r.a,{onClick:function(e){return N(0,"hi")},children:"Hindi"})]})]})}},140:function(e,c,t){"use strict";c.a=t.p+"static/media/logo.de3c6070.svg"},144:function(e,c,t){"use strict";c.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGYSURBVHgB7ZXPTcMwGMW/JBMwQbsB3aDJjWPZoGxAB2jz914xAd2AcuOWMAFmAsKNG2KAJLxXBQm1TWJb6gHUJ0Wf49j++c/nF5Gz/roc3YZRFI0RfMdxGKVpGoWgUF+KgQaBGND3PC8EYILXLeI7613XvWQdJlBWVXWjC+4FpmlK0C2Ki9VqtemY0BzwEODNcrmMxRbYwuZ1XQdDs+d2A5rrQJ2+AXRge31e0Oca5aKrnXusEmd2jxCbJATbArbAKkMxEWeaJMmbWAp9P7MsG3V9P1ghVjfB2b2KpdD3kUchukA0ZvorsVcJ6Fh0gafWARCzK3HwI7FUawhKGwgVeGZiqdaRzI4kjuMc2TYXQ9F1YBh5X5ujZ4hZ0i3WrWHrwnjxQ/qqmALpFIDe0W10oD/OhOJ2yCy8rg8F5Pv+BQZaB0Hwlee56oDRvB9QfMJzNZ1On9H1o2tcnd/TmFbHu4XsVbinO1NoM3nGOmwjbbDAMyG89VNlBfwNRuD/j1m4uz4Ixf4WDkG1gSbqg57EaQghTM76l/oGM2TmLX40cksAAAAASUVORK5CYII="},146:function(e,c,t){"use strict";var s=t(62),a=t(0),i=t(38),l=t(208),n=t(139),r=t(140),j=t(144),d=(t(147),t(3));c.a=function(e){e.loginPage;var c=e.page,t=Object(a.useState)(""),o=Object(s.a)(t,2),b=o[0],h=o[1],m=Object(l.a)().t;return Object(d.jsx)("div",{children:Object(d.jsx)("header",{className:"other_head",children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"topbar",children:Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-3",children:Object(d.jsx)(i.b,{className:"navbar-brand",to:"/",children:Object(d.jsx)("img",{src:r.a,alt:"..."})})}),Object(d.jsxs)("div",{className:"col-md-9 pl-md-0 pl-lg-2 text-right",children:[Object(d.jsx)("div",{id:"custom-search-input",className:"mt-lg-3 mt-md-1 d-inline-block",children:Object(d.jsxs)("div",{className:"input-group",children:[Object(d.jsx)("input",{type:"text",className:"search-query form-control",placeholder:m("header.searchPlaceholder"),value:b,onChange:function(e){return h(e.target.value)}}),Object(d.jsx)("span",{className:"input-group-btn",children:Object(d.jsx)("button",{type:"button",disabled:!0,children:Object(d.jsx)("img",{src:j.a,alt:"..."})})})]})}),Object(d.jsxs)("div",{className:"top_bar_btn d-inline-block",children:[Object(d.jsx)(i.b,{className:"btn btn-bg-pink ml-xl-3 ml-md-2",to:"/login",children:m("header.authButton")}),Object(d.jsx)("div",{className:"set_language d-inline-block ml-xl-3 ml-md-2",children:Object(d.jsx)(n.a,{})})]})]})]})}),Object(d.jsx)("div",{className:"middle_nav_login",children:Object(d.jsxs)("nav",{className:"navbar navbar-expand-md",children:[Object(d.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#collapsibleNavbar",children:Object(d.jsx)("span",{className:"navbar-toggler-icon"})}),Object(d.jsx)("div",{className:"collapse navbar-collapse",id:"collapsibleNavbar",children:Object(d.jsxs)("ul",{className:"navbar-nav",children:[Object(d.jsx)("li",{className:"about"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/about",children:m("header.heading.1")})}),Object(d.jsx)("li",{className:"courses"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/courses",children:m("header.heading.2")})}),Object(d.jsx)("li",{className:"guidance"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/guidance",children:m("header.heading.3")})}),Object(d.jsx)("li",{className:"resume"===c?"nav-item active":"nav-item",children:Object(d.jsx)("a",{className:"nav-link",rel:"noreferrer",href:"https://octahire.com/Resume_maker",target:"_blank",children:m("header.heading.4")})}),Object(d.jsx)("li",{className:"career"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/career",children:m("header.heading.5")})}),Object(d.jsx)("li",{className:"jobs"===c?"nav-item active":"nav-item",children:Object(d.jsx)("a",{className:"nav-link",rel:"noreferrer",target:"_blank",href:"https://octahire.com/Recruiters/job_recruiters?location=",children:m("header.heading.6")})}),Object(d.jsx)("li",{className:"blogs"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/blogs",children:m("header.heading.7")})}),Object(d.jsx)("li",{className:"story"===c?"nav-item active":"nav-item",children:Object(d.jsx)(i.b,{className:"nav-link",to:"/success_story",children:m("header.heading.8")})})]})})]})})]})})})}},147:function(e,c,t){},148:function(e,c,t){},149:function(e,c,t){"use strict";t(0),t(148);var s=t(38),a=t(208),i=t.p+"static/media/whitelogo.79226ead.svg",l=t(140),n=t(139),r=t(3);c.a=function(e){var c=e.loginPage,t=Object(a.a)().t;return Object(r.jsx)("div",{children:Object(r.jsx)("footer",{className:c?"footer_login":"footer_other",children:Object(r.jsxs)("div",{className:"container",children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col1.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col1.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/about",children:t("footer.links.col1.3")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col1.4")})})]})}),Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/career",children:t("footer.links.col2.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col2.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col2.3")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col2.4")})})]})}),Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col3.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col3.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(s.b,{to:"/",children:t("footer.links.col3.3")})})]})}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)("div",{className:"set_language",children:Object(r.jsx)(n.a,{})})})]}),Object(r.jsx)("div",{className:"bottom-footer mt-5",children:Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-lg-9 col-md-8 col-5 text-left",children:Object(r.jsx)("a",{className:"",href:"#!",children:Object(r.jsx)("img",{src:c?i:l.a,alt:"logo"})})}),Object(r.jsx)("div",{className:"col-lg-3 col-md-4 col-7 text-left",children:Object(r.jsx)("p",{className:"mt-lg-4 mt-md-3",children:"\xa9 2021 SheKunj.Inc."})})]})})]})})})}},163:function(e,c,t){"use strict";c.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAESSURBVHgBjVJBTsMwENyxo1JuzaEHTuQJ7g/aFwAvCP0BSAjELZwqEBLlJ/wAfkB+0HJCogcsIVVtFdvYSgKOGledkzPjnZlsQhTA50Qk34+D45DOQkLE9OlGqXFQp6AlUmZIhmRQoGbEzaxMZkl89f6xNTjLRK97sOr5ZCfqpNogK2+YaVFsnn19te5KOHfOdAYgpT1gK778LDH+q7q4FxfW/WnHjCSDu/5NPq0Mmu/GuXm1ZOLzhihXCmdHt/m85hqfwwkAzVvqSX+oNbHepqtmk2SdHi0Rx1kuWxM5V8PK7q1QGNh6I3d21PpQn/t3Gz8AwFLSuOxflwuoMLKLyzjoxJ59/h+LiRhSAF8PQvjPv0OcW3eLPP86AAAAAElFTkSuQmCC"},164:function(e,c,t){"use strict";var s=t(62),a=t(0),i=t(191),l=t.n(i),n=t(488),r=(t(165),t(3));c.a=function(){var e=Object(a.useState)(!1),c=Object(s.a)(e,2),t=c[0],i=c[1];return window.addEventListener("scroll",(function(){var e=document.documentElement.scrollTop;e>300?i(!0):e<=300&&i(!1)})),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(n.a,{title:"Back to top",children:Object(r.jsx)(l.a,{className:"back_to_top",onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},style:{display:t?"inline":"none"}})})})}},165:function(e,c,t){},176:function(e,c,t){},229:function(e,c,t){"use strict";c.a=t.p+"static/media/Nikita-Sharma.a8dc8986.png"},437:function(e,c,t){},501:function(e,c,t){"use strict";t.r(c);var s=t(0),a=t(206),i=t.n(a),l=t(208),n=t(149),r=t(146),j=t(164),d=t.p+"static/media/img1.52079d11.png",o=t(229),b=t(163),h=(t(176),t(437),t(275),t(274),t(3));c.default=function(){var e=Object(l.a)().t;return Object(s.useEffect)((function(){i.a.init({duration:2e3})}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)(r.a,{loginPage:!1,page:"about"}),Object(h.jsx)("section",{className:"about_ban",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("div",{className:"row",children:Object(h.jsx)("div",{className:"col-md-5",children:Object(h.jsxs)("div",{className:"about_Con",children:[Object(h.jsx)("h2",{children:e("aboutPage.heading")}),Object(h.jsx)("p",{children:e("aboutPage.content1")})]})})})})}),Object(h.jsx)("section",{className:"ban_sec2",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-md-6",children:Object(h.jsx)("img",{src:d,alt:"",srcSet:""})}),Object(h.jsx)("div",{className:"col-md-6",children:Object(h.jsxs)("div",{className:"sec2_con",children:[Object(h.jsxs)("p",{children:[" ",e("aboutPage.content2")]}),Object(h.jsx)("p",{children:e("aboutPage.content3")})]})})]})})}),Object(h.jsx)("section",{className:"about_testim",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-md-6",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-md-6",children:[Object(h.jsx)("div",{"data-aos":"slide-right",children:Object(h.jsxs)("div",{className:"tes_box tes-before",children:[Object(h.jsx)("img",{src:o.a,alt:""}),Object(h.jsx)("p",{children:"\u201cI love their flexibility, Even when my request is too complicated to handle, the could still suggest something useful for me.\u201d"}),Object(h.jsxs)("ul",{className:"star",children:[Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})})]}),Object(h.jsx)("h2",{children:"Nikita Sharma"}),Object(h.jsx)("h6",{children:"Content Writer"})]})}),Object(h.jsx)("div",{className:"tes_box2","data-aos":"slide-up",children:Object(h.jsx)("h2",{children:"\u201cBest out of the best in the online learning field...\u201d"})})]}),Object(h.jsxs)("div",{className:"col-md-6",children:[Object(h.jsx)("div",{"data-aos":"slide-down",children:Object(h.jsxs)("div",{className:"tes_box3",children:[Object(h.jsx)("h2",{children:"4.9/5"}),Object(h.jsxs)("ul",{className:"star",children:[Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})})]}),Object(h.jsx)("h6",{children:"by 1000+ Students for 2500+ Sales"})]})}),Object(h.jsx)("div",{"data-aos":"slide-left",children:Object(h.jsxs)("div",{className:"tes_box heg_cha",children:[Object(h.jsx)("img",{src:o.a,alt:""}),Object(h.jsx)("p",{children:"\u201cExcellent guiding instructions. They are all great mentors at life & career"}),Object(h.jsxs)("ul",{className:"star",children:[Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})}),Object(h.jsx)("li",{children:Object(h.jsx)("img",{src:b.a,alt:""})})]}),Object(h.jsx)("h2",{children:"Nikita Sharma"}),Object(h.jsx)("h6",{children:"Content Writer"})]})})]})]})}),Object(h.jsx)("div",{className:"col-md-6",children:Object(h.jsxs)("div",{className:"our_his",children:[Object(h.jsx)("h2",{children:e("homePage.highlightStudents.heading")}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae donec molestie sit diam aliquam egestas erat tincidunt magna. Tincidunt et faucibus a curabitur sed at sagittis orci id. Odio nunc, purus a, ut integer. Ultricies orci nulla eu, libero ornare ipsum. Tincidunt erat pulvinar viverra pharetra."}),Object(h.jsx)("a",{"data-aos":"zoom-in",href:"#!",class:"learn_more aos-init",children:e("homePage.highlightStudents.button")})]})})]})})}),Object(h.jsx)(j.a,{}),Object(h.jsx)(n.a,{loginPage:!1})]})}}}]);
//# sourceMappingURL=15.1278a604.chunk.js.map