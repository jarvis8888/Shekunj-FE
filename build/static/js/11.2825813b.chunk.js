(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[11],{139:function(e,t,s){"use strict";var c=s(62),a=s(0),n=s(203),i=s(489),l=s(481),r=s(487),o=s(134),j=s(170),d=s.n(j),A=s(480),b=s(3),m=Object(A.a)({language:{borderRadius:"0 !important",width:"128px",height:"40px",color:"#000000 !important",border:"1px solid #000000 !important",textTransform:"none !important",fontFamily:"Poppins !important",fontStyle:"normal",fontWeight:"300 !important",fontSize:"16px !important"}});t.a=function(){var e=Object(a.useState)(localStorage.getItem("i18nextLng")||"en"),t=Object(c.a)(e,2),s=t[0],j=t[1],A=Object(a.useState)(null),h=Object(c.a)(A,2),x=h[0],u=h[1],O=Object(n.a)().i18n,g=Boolean(x),v=m(),p=function(e,t){O.changeLanguage(t),j(t),u(null)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(i.a,{id:"fade-button",className:v.language,"aria-controls":"fade-menu","aria-haspopup":"true","aria-expanded":g?"true":void 0,onClick:function(e){u(e.currentTarget)},startIcon:Object(b.jsx)(d.a,{}),children:s.startsWith("en")?"English":"Hindi"}),Object(b.jsxs)(l.a,{id:"fade-menu",MenuListProps:{"aria-labelledby":"fade-button"},anchorEl:x,open:g,onClose:function(){u(null)},TransitionComponent:o.a,children:[Object(b.jsx)(r.a,{onClick:function(e){return p(0,"en")},children:"English"}),Object(b.jsx)(r.a,{onClick:function(e){return p(0,"hi")},children:"Hindi"})]})]})}},140:function(e,t,s){"use strict";t.a=s.p+"static/media/logo.de3c6070.svg"},145:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGYSURBVHgB7ZXPTcMwGMW/JBMwQbsB3aDJjWPZoGxAB2jz914xAd2AcuOWMAFmAsKNG2KAJLxXBQm1TWJb6gHUJ0Wf49j++c/nF5Gz/roc3YZRFI0RfMdxGKVpGoWgUF+KgQaBGND3PC8EYILXLeI7613XvWQdJlBWVXWjC+4FpmlK0C2Ki9VqtemY0BzwEODNcrmMxRbYwuZ1XQdDs+d2A5rrQJ2+AXRge31e0Oca5aKrnXusEmd2jxCbJATbArbAKkMxEWeaJMmbWAp9P7MsG3V9P1ghVjfB2b2KpdD3kUchukA0ZvorsVcJ6Fh0gafWARCzK3HwI7FUawhKGwgVeGZiqdaRzI4kjuMc2TYXQ9F1YBh5X5ujZ4hZ0i3WrWHrwnjxQ/qqmALpFIDe0W10oD/OhOJ2yCy8rg8F5Pv+BQZaB0Hwlee56oDRvB9QfMJzNZ1On9H1o2tcnd/TmFbHu4XsVbinO1NoM3nGOmwjbbDAMyG89VNlBfwNRuD/j1m4uz4Ixf4WDkG1gSbqg57EaQghTM76l/oGM2TmLX40cksAAAAASUVORK5CYII="},147:function(e,t,s){"use strict";var c=s(62),a=s(0),n=s(38),i=s(203),l=s(139),r=s(140),o=s(145),j=(s(148),s(3));t.a=function(e){e.loginPage;var t=e.page,s=Object(a.useState)(""),d=Object(c.a)(s,2),A=d[0],b=d[1],m=Object(i.a)().t;return Object(j.jsx)("div",{children:Object(j.jsx)("header",{className:"other_head",children:Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("div",{className:"topbar",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-3",children:Object(j.jsx)(n.b,{className:"navbar-brand",to:"/",children:Object(j.jsx)("img",{src:r.a,alt:"..."})})}),Object(j.jsxs)("div",{className:"col-md-9 pl-md-0 pl-lg-2 text-right",children:[Object(j.jsx)("div",{id:"custom-search-input",className:"mt-lg-3 mt-md-1 d-inline-block",children:Object(j.jsxs)("div",{className:"input-group",children:[Object(j.jsx)("input",{type:"text",className:"search-query form-control",placeholder:m("header.searchPlaceholder"),value:A,onChange:function(e){return b(e.target.value)}}),Object(j.jsx)("span",{className:"input-group-btn",children:Object(j.jsx)("button",{type:"button",disabled:!0,children:Object(j.jsx)("img",{src:o.a,alt:"..."})})})]})}),Object(j.jsxs)("div",{className:"top_bar_btn d-inline-block",children:[Object(j.jsx)(n.b,{className:"btn btn-bg-pink ml-xl-3 ml-md-2",to:"/login",children:m("header.authButton")}),Object(j.jsx)("div",{className:"set_language d-inline-block ml-xl-3 ml-md-2",children:Object(j.jsx)(l.a,{})})]})]})]})}),Object(j.jsx)("div",{className:"middle_nav_login",children:Object(j.jsxs)("nav",{className:"navbar navbar-expand-md",children:[Object(j.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#collapsibleNavbar",children:Object(j.jsx)("span",{className:"navbar-toggler-icon"})}),Object(j.jsx)("div",{className:"collapse navbar-collapse",id:"collapsibleNavbar",children:Object(j.jsxs)("ul",{className:"navbar-nav",children:[Object(j.jsx)("li",{className:"about"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/about",children:m("header.heading.1")})}),Object(j.jsx)("li",{className:"courses"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/courses",children:m("header.heading.2")})}),Object(j.jsx)("li",{className:"guidance"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/guidance",children:m("header.heading.3")})}),Object(j.jsx)("li",{className:"resume"===t?"nav-item active":"nav-item",children:Object(j.jsx)("a",{className:"nav-link",rel:"noreferrer",href:"https://octahire.com/Resume_maker",target:"_blank",children:m("header.heading.4")})}),Object(j.jsx)("li",{className:"career"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/career",children:m("header.heading.5")})}),Object(j.jsx)("li",{className:"jobs"===t?"nav-item active":"nav-item",children:Object(j.jsx)("a",{className:"nav-link",rel:"noreferrer",target:"_blank",href:"https://octahire.com/Recruiters/job_recruiters?location=",children:m("header.heading.6")})}),Object(j.jsx)("li",{className:"blogs"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/blogs",children:m("header.heading.7")})}),Object(j.jsx)("li",{className:"story"===t?"nav-item active":"nav-item",children:Object(j.jsx)(n.b,{className:"nav-link",to:"/success_story",children:m("header.heading.8")})})]})})]})})]})})})}},148:function(e,t,s){},149:function(e,t,s){},150:function(e,t,s){"use strict";s(0),s(149);var c=s(38),a=s(203),n=s.p+"static/media/whitelogo.79226ead.svg",i=s(140),l=s(139),r=s(3);t.a=function(e){var t=e.loginPage,s=Object(a.a)().t;return Object(r.jsx)("div",{children:Object(r.jsx)("footer",{className:t?"footer_login":"footer_other",children:Object(r.jsxs)("div",{className:"container",children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col1.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col1.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/about",children:s("footer.links.col1.3")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col1.4")})})]})}),Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/career",children:s("footer.links.col2.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col2.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col2.3")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col2.4")})})]})}),Object(r.jsx)("div",{className:"col-md-3 col-4",children:Object(r.jsxs)("ul",{className:"p-0",children:[Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col3.1")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col3.2")})}),Object(r.jsx)("li",{children:Object(r.jsx)(c.b,{to:"/",children:s("footer.links.col3.3")})})]})}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)("div",{className:"set_language",children:Object(r.jsx)(l.a,{})})})]}),Object(r.jsx)("div",{className:"bottom-footer mt-5",children:Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-lg-9 col-md-8 col-5 text-left",children:Object(r.jsx)("a",{className:"",href:"#!",children:Object(r.jsx)("img",{src:t?n:i.a,alt:"logo"})})}),Object(r.jsx)("div",{className:"col-lg-3 col-md-4 col-7 text-left",children:Object(r.jsx)("p",{className:"mt-lg-4 mt-md-3",children:"\xa9 2021 SheKunj.Inc."})})]})})]})})})}},162:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAESSURBVHgBjVJBTsMwENyxo1JuzaEHTuQJ7g/aFwAvCP0BSAjELZwqEBLlJ/wAfkB+0HJCogcsIVVtFdvYSgKOGledkzPjnZlsQhTA50Qk34+D45DOQkLE9OlGqXFQp6AlUmZIhmRQoGbEzaxMZkl89f6xNTjLRK97sOr5ZCfqpNogK2+YaVFsnn19te5KOHfOdAYgpT1gK778LDH+q7q4FxfW/WnHjCSDu/5NPq0Mmu/GuXm1ZOLzhihXCmdHt/m85hqfwwkAzVvqSX+oNbHepqtmk2SdHi0Rx1kuWxM5V8PK7q1QGNh6I3d21PpQn/t3Gz8AwFLSuOxflwuoMLKLyzjoxJ59/h+LiRhSAF8PQvjPv0OcW3eLPP86AAAAAElFTkSuQmCC"},168:function(e,t,s){"use strict";var c=s(62),a=s(0),n=s(201),i=s.n(n),l=s(479),r=(s(169),s(3));t.a=function(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),s=t[0],n=t[1];return window.addEventListener("scroll",(function(){var e=document.documentElement.scrollTop;e>300?n(!0):e<=300&&n(!1)})),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(l.a,{title:"Back to top",children:Object(r.jsx)(i.a,{className:"back_to_top",onClick:function(){window.scrollTo({top:0,behavior:"smooth"})},style:{display:s?"inline":"none"}})})})}},169:function(e,t,s){},181:function(e,t,s){"use strict";t.a=s.p+"static/media/1.a8dc8986.png"},182:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGNSURBVHgBlVNBTsJQEJ2Z4t6NTViJJ6DeoJ4ATKBt2IAnMBzBE3AFVqQEFngC4ASWEygrYyHRPfaPM1Ww1AJxkqZ//n+defP+K0JBrBoNFyzLQYCq5gnz0hgzK4/HszwWs0ncajmYJD1gPmfmuRSJ0oMkcYCoRrLcIN6Uw/DlT9e157VXvv8eN5sdOBBxEHQUo9g9Bq9BUCkxP30iXmerv3leHYWNPRr1t3uKtZinYMyt7EfKCs5kg43pFlBzGLGS3UgxiA9I1NOcVDAji2yXU2GHYV91EjYuGSJX6DzCP0OYzWU8h0SEiuTRIaCFeFl4gKjzVwmOBJZKExnPXfv+86HbIZRK8naKDu3BILKHwyujoiHey/XVf2dgR7yyLCkVUbR9hMi3aAD9vc4AtQ3RXZqIOabHDJQPNVQsY/0UEjaW1dV7VZOc+lgxxNxLxNK7AjqrXEtX3XjKymo60WRnOsxXV5tqVRFoIs8iBSHqX+nK4kPZasPtN1jUaSUOk9/X3XqAARYq9kUYzvLYL4m0u2fE2We9AAAAAElFTkSuQmCC"},183:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgB7ZJBCoJAFIafmiFCojfwCB3BdgYt6gbOJpAO0RFaSis7gouoRRuP4A3yBg4FZeo4OcFEtdF2Cn6beT8//DDv/QA9rUPgQ+LPdSnLz6TIJsbqFF29mUUlsm6QgbXlccHFgA8GCnCynSJQ85jpkbsPE8+ujytFDJ3iZ4cPnwzvyEAhrr5riiA6DQJizT3suBa/XFrZqaLDX5TQLYRPcfFshyhp8Nqhb+mDVBnXBRQlway3XL97yI4CWb6Bm8zMCHLVpAKtLbYkyXH1IOhpL080lknpkKlWsQAAAABJRU5ErkJggg=="},184:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABvSURBVHgBvZCxCYBADEVzImhhcSOkULzSERzBEbKBIzmASFZzAvUULDyU/MpAIHwe/ychAoon8ZkF1bP0hSc1wbt+AMMi0sRO9TwVtnikI8ARjv4EW5XxfCjiOJQVdQiIRVuA22m9BtbnfkGF37QD40gSSenY+kcAAAAASUVORK5CYII="},185:function(e,t,s){},222:function(e,t,s){},226:function(e,t,s){"use strict";var c=s(0),a=s.n(c),n=s(269),i=s.n(n),l=(s(270),s(271),s(222),s.p+"static/media/P-1.8dd927ae.png"),r=s(181),o=s(162),j=s(182),d=s(183),A=s(184),b=s(3);t.a=function(e){var t=a.a.useRef(),s=[{img:l,title:"Design",subTitle:"Adobe photoshop training: From beginner to PRO",rating:"4.5",people:"104,716",students:"46,995",time:"11 hr 20 mins",lectures:"20"},{img:l,title:"Life Style",subTitle:"Cat behaviour, Psychology and Care training to Pro",rating:"4.5",people:"104,716",students:"46,995",time:"11 hr 20 mins",lectures:"20"},{img:l,title:"Development",subTitle:"Python Programming Masterclass Beginner to Advanced",rating:"4.5",people:"104,716",students:"36,995",time:"08 hr 20 mins",lectures:"32"}];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"container Our_text",children:[Object(b.jsx)("p",{children:e.title1}),Object(b.jsx)("h2",{children:e.title2})]}),Object(b.jsxs)("div",{className:"set",children:[Object(b.jsx)("div",{className:"abc_box",children:Object(b.jsx)("div",{className:"abc",ref:t})}),Object(b.jsx)(i.a,{className:"owl-theme",loop:!0,margin:210,nav:!0,items:4,dots:!1,autoPlay:!0,smartSpeed:"800",onChanged:function(e){return function(e){var c=null===e||void 0===e?void 0:e.relatedTarget;t.current.innerHTML="".concat(c.relative(c.current())+1,"/").concat(s.length)}(e)},responsive:{0:{items:1,nav:!0},600:{items:2,nav:!0},1e3:{items:3,nav:!0,loop:!0},1200:{items:4,nav:!0,loop:!0}},children:s.map((function(t,s){return Object(b.jsx)("div",{className:"item",children:Object(b.jsxs)("div",{className:"box",children:[Object(b.jsxs)("div",{className:"slide-img",children:[Object(b.jsx)("img",{alt:"",src:l}),Object(b.jsx)("div",{className:"overlay"})]}),e.details?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("div",{className:"tag_btn",children:[Object(b.jsx)("button",{className:"btn btn-info",children:null===t||void 0===t?void 0:t.title}),Object(b.jsx)("h2",{children:null===t||void 0===t?void 0:t.subTitle})]}),Object(b.jsxs)("div",{className:"detail-box",children:[Object(b.jsxs)("div",{className:"type",children:[Object(b.jsxs)("a",{href:"#!",children:[t.rating," ",Object(b.jsx)("img",{src:o.a,alt:""})," ",Object(b.jsxs)("span",{children:["(",null===t||void 0===t?void 0:t.people,")"]})]}),Object(b.jsxs)("span",{className:"std",children:[null===t||void 0===t?void 0:t.students," Students"]})]}),Object(b.jsxs)("div",{className:"time",children:[Object(b.jsxs)("p",{children:[Object(b.jsx)("img",{src:j.a,alt:""})," ",null===t||void 0===t?void 0:t.time]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("img",{src:d.a,alt:""})," ",null===t||void 0===t?void 0:t.lectures," lectures"]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("img",{src:A.a,alt:""})," All level"]})]})]})]}):Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{className:"tag_btn",children:[Object(b.jsx)("button",{className:"btn btn-info",children:"1 Test Set"}),Object(b.jsx)("h2",{children:"Banking and Insurance"})]})}),Object(b.jsx)("hr",{className:"line"}),Object(b.jsxs)("div",{className:"names",children:[Object(b.jsxs)("p",{children:[Object(b.jsx)("img",{src:r.a,alt:"..."})," Ramadhir Krishna"]}),Object(b.jsx)("span",{children:"Free"})]})]})},s)}))})]})]})}},435:function(e,t,s){},482:function(e,t,s){"use strict";s.r(t);s(0);var c=s(203),a=s(150),n=s(147),i=s(226),l=s(168),r=s.p+"static/media/Choose1.93a203cf.png",o=s.p+"static/media/Choose2.b249f87d.png",j=s.p+"static/media/Choose3.5791002c.png",d=s.p+"static/media/Choose4.8a71d07b.png",A=s.p+"static/media/Choose5.d4f23522.png",b=s.p+"static/media/Choose6.dd74f2f8.png",m=s.p+"static/media/exams.2a2d60d3.png",h=(s(185),s(435),s(3));t.default=function(){var e=Object(c.a)().t;return Object(h.jsxs)("div",{children:[Object(h.jsx)(n.a,{loginPage:!0,page:"career"}),Object(h.jsx)("section",{className:"Car_Ban",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("div",{className:"row",children:Object(h.jsx)("div",{className:"col-md-6 offset-6",children:Object(h.jsxs)("div",{className:"Car_con",children:[Object(h.jsx)("h2",{children:e("careerPage.heading")}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit, in vitae in metus, mattis porttitor euismod ac tincidunt. Ac nunc felis pellentesque a aliquam."}),Object(h.jsx)("br",{}),Object(h.jsxs)("div",{class:"pseudo-search",children:[Object(h.jsx)("input",{type:"text",placeholder:e("careerPage.searchPlaceholder"),autofocus:"",required:""}),Object(h.jsx)("button",{class:"fa fa-search",type:"submit",children:Object(h.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIPSURBVHgBtZU7bxNBFIXPzC6O4yUPChwokEKADiFQaIACB1HYNIQ6jStaKxSIFJEiKCJZQiT/ICUdpooLJEwFBZEQ0EUklihQViAFx+BHsnszd/KQ89jxI+uvWl3tnHN179kdgV1WEzOD/TEnQ4QEQAl0gAC+eIT5eP7pQkMN+JWcHY4I6z0BwwgBJVqskzd2Pj9V1AZ/UtnVsMQbTWTl/w3LTWbTQiCN8Bn0bbsmLSEy6BJCiLuSQNfRPRJ2q2+eunYB1khcP3srLja//mzpXFMDFj79JAVvrQTvh6trveM3VZIJpWevdd2E+J3Kkkm8b/oRNp6/wea3gx1HH44qo9GmJhIGuPPyy8Uj4kz17RJq777DmXxgkgg24O65s/qn5cDDldwS7EtxSCfavgEvdG/mQdC/Gvy1v5BD/e0btAqVaxBOD9o24O4jty7DhKU6t9Uoj9tRUwM+5KsdRDmSAfRO3EFV7cGEcUQbrxZ1FFnowCE1ktjje+i5fxX1j8smCfN3oMWGBhCbuK3GdQVbamwsLs8NqM4/66/Z4Si/yGFrxe3MYP9FFUV75Cx8nZySSlBV1zltfdPjgSYtG5hgk73IHkbtQBRwQvjnd5w4X6GSyP+ALuGRNy/taGSOrzeEjAAV4/mpBXkmN7nOF3SYJixeJ39s57kBNzmbtoSd6fyWEwUeeblambtYmFnnyjZ95ddwrp3TUgAAAABJRU5ErkJggg==",alt:"",srcSet:""})})]})]})})})})}),Object(h.jsx)("div",{className:"care_csl",children:Object(h.jsx)(i.a,{items:1,details:!0,title1:e("careerPage.carousel1.heading.1"),title2:e("careerPage.carousel1.heading.2")})}),Object(h.jsx)("section",{className:"choose_ses",children:Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("h2",{children:e("careerPage.heading2")}),Object(h.jsx)("div",{className:"row_box",children:Object(h.jsx)("div",{className:"row",children:[r,o,j].map((function(t,s){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsxs)("div",{className:"choose_box",children:[Object(h.jsx)("img",{src:t,alt:""}),Object(h.jsxs)("div",{className:"choose_con",children:[Object(h.jsx)("h3",{children:"Resume Writing"}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet sit urna amet ipsum ornare urna. Cras viverra orci eros, consequat purus dui."}),Object(h.jsx)("a",{"data-aos":"zoom-in",href:"#!",class:"learn_more aos-init aos-animate",children:e("homePage.highlightStudents.button")})]})]})})})}))})}),Object(h.jsx)("div",{className:"row_box",children:Object(h.jsx)("div",{className:"row",children:[d,A,b].map((function(t,s){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("div",{className:"col-md-4",children:Object(h.jsxs)("div",{className:"choose_box",children:[Object(h.jsx)("img",{src:t,alt:""}),Object(h.jsxs)("div",{className:"choose_con",children:[Object(h.jsx)("h3",{children:"Resume Writing"}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet sit urna amet ipsum ornare urna. Cras viverra orci eros, consequat purus dui."}),Object(h.jsx)("a",{"data-aos":"zoom-in",href:"#!",class:"learn_more aos-init aos-animate",children:e("homePage.highlightStudents.button")})]})]})})})}))})})]})}),Object(h.jsx)("div",{className:"care_csl",children:Object(h.jsx)(i.a,{items:1,details:!0,title1:e("careerPage.carousel2.heading.1"),title2:e("careerPage.carousel2.heading.2")})}),Object(h.jsx)("section",{className:"best_edu",children:Object(h.jsxs)("div",{className:"container",children:[Object(h.jsxs)("div",{className:"edu_tit",children:[Object(h.jsx)("h2",{children:"Choose the best education"}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida tellus leo risus. Proin sagittis nec nisi tortor nisl purus et at."})]}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-md-7",children:[Object(h.jsxs)("div",{className:"ranking",children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAApCAYAAAB3LnrpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPiSURBVHgB7VntVeJAFH0gBbAdxAoM6n+hgsUKgAqUCsQKkAqIFYAVmC1AiRWYrUAsQNl7w5s9MSchCUxQz/GeM85kEt7HzPuYN9akYriu69Tr9cVqtQpqtdrt+/u7HwRBKJbRkOrhoDW1TaGUHB8fzzG+g1JzKLUUC6jLnoDdmEDwX2gDPLqyVuoFO+aKBexjRwyOIPgR+j5aE6bmo91hHIoF7FORSwqvO+PZ9pN9KBJqf71YLEZSEfbmI2LJhLJQuSLwix57mNUF/LopFaFSRU5OTrroRmhz+IYLpa6kIhRSBHG/LyXBRIhdmDIRPj4+nsPBh5i+BK1LKYki/HMV0VWdQrC2FARNCKt/DyWWaOecQ5S6wfgWw3EZWkX51yRHIJjEDI0CMfafF8nEWMEpuj524TAeZpXeAk3wrpMXgsvwr2cI0m+1Ws8g8MxnmgaJ8RnvXjZtNd7RD/h+mBSUQkCYDoaRgBtolOafqggPduzxwxvE/k6MGM1jad4nEXPuCb6/SfuGyuH3pOVCoLEt/pmmZU6tagIBz0S0ezy30kxCv4/8AsxbkgMoMULH3RumKV2Wf6azxz52wHSWMh9napxbjHPnAcKP0PEUfJV2cCzDn8hURJMXbZnb/6Q23UxLapofHHXGUAqCJ2HuIH4/S9Itw59o5DBi7PdgKowUIxDpJ6OGOjdzg4e2pElICRwcHAzAZ6aCdsryN6jJjoAiK7EEBgEIOpctsPPpl0dzWZsVC6ZQyiMyH0YxjH3ZEjsrAgHa6CbYfl+2BML2BAsxg68wfHuyBWzVIx/sNuEnS9p10nfiQeHt7Y0OL7vAemFFgbFLU7Q/OsXylsnsnrcoOsej/aFYRCUVIpXQPGHOXURo5nD8OBPLiBTRhNaX9ZXNZ+I3FHdKfL/UK6WwAUfrwdE8JiZJ2HpBhKw54sTRjrDqnj6/mBexub8JGoHScLUVBTdgDOWHNfzhCTMqfuQbAotzH1Wfsr4JfJJvCg0qzX3eolSKH0W+GjLzCKs9hLYL2GAo67DMUHetNbSJUs20IHF6etpGtp5mkE4tvHi5oGeuiDai2C9819WS1+ccnfrh4aFVShEW+8zEENTTau1Kid2lJLsPgMLM7g6GE4mFdNA807NZKuK0GY10zsfcYBO/jYrYAAQfY1X/5wwtb9tSATIVwaqGLPaxMj19ZpjjLciZWS2xe59L2l1zfFGT5mI4hh/Gr1k/zlQEad+X9CzbkQrAC4Y0fuYWJQ8/4ferwSjy2afendHQf4f1EFECOrjYAYspOmcXofs1OV/mEjsHDlov0kEruhGVkW8GLT1YAgz+AYS/Vzs9n6FDAAAAAElFTkSuQmCC",alt:""})," Rankings"]}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate aliquam convallis urna volutpat, tortor, et eu. Mattis ac praesent ."}),Object(h.jsxs)("div",{className:"tags",children:[Object(h.jsx)("button",{className:"btn btn-info",children:"Top Engineering Colleges in India"}),Object(h.jsx)("button",{className:"btn btn-info",children:"Top MBA Colleges in India"})]}),Object(h.jsxs)("div",{className:"tags",children:[Object(h.jsx)("button",{className:"btn btn-info",children:"Top Engineering Colleges in India"}),Object(h.jsx)("button",{className:"btn btn-info",children:"Top MBA Colleges in India"})]})]}),Object(h.jsxs)("div",{className:"ranking exms",children:[Object(h.jsxs)("h3",{children:[Object(h.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAApCAYAAAB3LnrpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI1SURBVHgB7ZnfbdswEMa/0x+0jx5BRczYj+4GygbNBskERiZIO0FHaDpBskG9QdO3JJJRjqDn2BB7Z7tAIMsoWVGGEvD3YMqSwPNn6hN5R5oo9RtAhteNTrAVUcGYe3jAEI0ImBnuj6TfJkS5z3jcXwbRwCNiTpX6Bk9MlbqQPqfjcd523Xc87utG+ozwRghChkYQMjSStpMZA3sqrXWFDnC4ETcj2/s5nm6e2xOilJrxMP2EPTIffEQH3qXpLTe57f2nJyfnT8vl3ctze0KKopAfRjgij0Vxho4Esw+NVrOPDywv2iCiavc4/jfiS16bWZu9LMtF89whs/+APZ3NzvG+7haTVgSzvwbertlllk2SZAYH2szngqvZ1+v1fXM1sSckTdOMh8k+8TFG8+cCHYiMuWazW/95URxfcWNl9g84Io9leY6OBLMPjVazs08+wZK6rqtlY3JyRVYStK2GWLFare6szE7GzLljq7dIRCSe6iQkBubcWJv9fZJoNF4wh8zeacnhSjD7C4KQoRGEDI0gZGhs5hFOB3MuzbuktwcxFptGPuNhN5GKEI1t8AzHI4PfeDrhfNnrkl02esw/8hm+fvNUFJfwSIKemUwmc06+cnp+vnpoqdn6ojchNaeumy22ur6Q7yZNZ9MsOzPoh96EUBTdblrgu6TDvEl6zWJciuNO9PpocTrw5aEsP8sxb44uWIx4x7rI4IL/eWRbjKh4JC7/ihD4eEFxLIU4zaP1C575A/KQxQxdnP78AAAAAElFTkSuQmCC",alt:""})," Exams"]}),Object(h.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate aliquam convallis urna volutpat, tortor, et eu. Mattis ac praesent ."}),Object(h.jsxs)("div",{className:"tags",children:[Object(h.jsx)("button",{className:"btn btn-info",children:"JEE Main"}),Object(h.jsx)("button",{className:"btn btn-info",children:"GATE"}),Object(h.jsx)("button",{className:"btn btn-info",children:"NEET"}),Object(h.jsx)("button",{className:"btn btn-info",children:"NIFT Entrance Exam"}),Object(h.jsx)("button",{className:"btn btn-info",children:"CAT"}),Object(h.jsx)("button",{className:"btn btn-info",children:"CLAT"})]}),Object(h.jsxs)("div",{className:"tags",children:[Object(h.jsx)("button",{className:"btn btn-info",children:"BITSAT"}),Object(h.jsx)("button",{className:"btn btn-info",children:"SRMJEEE"}),Object(h.jsx)("button",{className:"btn btn-info",children:"VITEEE"}),Object(h.jsx)("button",{className:"btn btn-info",children:"MET"})]})]})]}),Object(h.jsx)("div",{className:"col-md-5",children:Object(h.jsx)("div",{className:"exams",children:Object(h.jsx)("img",{src:m,alt:"",srcSet:""})})})]})]})}),Object(h.jsx)(l.a,{}),Object(h.jsx)(a.a,{loginPage:!1})]})}}}]);
//# sourceMappingURL=11.2825813b.chunk.js.map