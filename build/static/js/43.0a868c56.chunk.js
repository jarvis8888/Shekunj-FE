(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[43],{588:function(e,s,t){},887:function(e,s,t){"use strict";t.r(s);var c=t(1),i=t(26),r=t(32),n=t(554),o=t(548),l=t(549),a=t(783),A=t(686),d=(t(588),t(450)),j=t(0);A.d.register(A.a,A.l,A.f);var b=function(e){var s=e.userProgress,t=Object(d.a)().t,c={labels:[],datasets:[{data:[(null===s||void 0===s?void 0:s.in_progress_course)||0,(null===s||void 0===s?void 0:s.complate_course)||0],backgroundColor:["#FF6384","#FFCE56"],hoverBackgroundColor:["#FF6384","#FFCE56"]}],options:{elements:{center:{text:"50%",color:"#FFCE56",fontStyle:"Arial",sidePadding:20,minFontSize:25,lineHeight:25}}}},i=[{beforeDraw:function(e){var s=e.width,t=e.height,c=e.ctx;c.restore();var i=(t/160).toFixed(2);c.font="".concat(i,"em sans-serif"),c.fillStyle="#FFCE56",c.textBaseline="top";var n="".concat(r(),"%"),o=Math.round((s-c.measureText(n).width)/2),l=t/2;c.fillText(n,o,l),c.save()}}],r=function(){return s?(((null===s||void 0===s?void 0:s.complate_course)||0)/((null===s||void 0===s?void 0:s.total_course)||0)*100).toFixed():0};return Object(j.jsx)("div",{className:"course_completedright",children:Object(j.jsxs)(o.a,{children:[Object(j.jsx)(l.a,{md:7,xs:6,children:Object(j.jsx)(a.a,{data:c,plugins:i})}),Object(j.jsxs)(l.a,{md:5,xs:6,children:[Object(j.jsxs)("div",{className:"course_prog pink_col",children:[Object(j.jsx)("h6",{children:(null===s||void 0===s?void 0:s.in_progress_course)||0}),Object(j.jsxs)("h3",{children:[t("myProgressPage.heading.1.1")," ",Object(j.jsx)("br",{})," ",t("myProgressPage.heading.1.2")]})]}),Object(j.jsxs)("div",{className:"course_prog yelloow_col",children:[Object(j.jsx)("h6",{children:(null===s||void 0===s?void 0:s.complate_course)||0}),Object(j.jsxs)("h3",{children:[t("myProgressPage.heading.1.1")," ",Object(j.jsx)("br",{})," ",t("myProgressPage.heading.1.3")]})]})]})]})})},u=t(537),v=t(536),h=t(858),x=t(59),g=function(e){var s=e.courses,t=Object(d.a)().t;return Object(j.jsxs)("div",{className:"current_course",children:[Object(j.jsx)("h3",{children:t("dashboardPage.current")}),Object(j.jsx)("div",{className:"Scrl_div",children:(null===s||void 0===s?void 0:s.length)>0?s.map((function(e){return Object(j.jsx)("div",{className:"course_explore",children:Object(j.jsxs)(o.a,{children:[Object(j.jsx)(l.a,{md:2,xs:6,children:Object(j.jsx)("h6",{children:Object(x.o)(null===e||void 0===e?void 0:e.course_name,40)||"N/A"})}),Object(j.jsx)(l.a,{md:2,xs:6,children:Object(j.jsx)("div",{children:Object(j.jsxs)(h.a,{sx:{position:"relative",display:"inline-flex"},children:[Object(j.jsx)(u.a,{variant:"determinate",value:(null===e||void 0===e?void 0:e.progress)||0}),Object(j.jsx)(h.a,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:Object(j.jsxs)(v.a,{variant:"caption",component:"div",color:"text.secondary",children:[(null===e||void 0===e?void 0:e.progress)||0,"%"]})})]})})}),Object(j.jsx)(l.a,{md:5,xs:6,children:Object(j.jsxs)("ul",{className:"p-0",children:[Object(j.jsxs)("li",{children:[Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC0SURBVHgB7VPbDYMwDLxUHaAjZARGYYR2g27CCO0IrNAJ6AZ0g7JBepYSKQIHuRJ8IDjplMg+n+w8gM0ihHAhvRL3ksO/YNGVfCjxp+RKdW4krrg0pCdTF8OoJo8Lb865NwpddbEzGetOtnGfs425pOkwM+YnnZt0S9aKps40YtqbDC3QDM+KrqFogA2T29YMX5hexJxhVcwuMfIJC+MwXMfQww55MuUnFr9VH+z4at9zZ/gB54nGVVON/LYAAAAASUVORK5CYII=",alt:"...",className:"pr-2"}),Object(x.f)(null===e||void 0===e?void 0:e.course_start_time,"MMM Do YYYY")]}),Object(j.jsxs)("li",{children:[Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD8SURBVHgBlVTREYIwDE09/9UNOgIjsIFsIBvgCDiCE+gm1AnQCWQEN8AXeXi114Lk7l1ok7y0aYKRhPR9n0EpXgpjjIv5mSBoC1UBJXADOpqUaMP1CWRdNCPQAjWJYj4lfbLQYGmwMiNRXyyesWA6Z6nT6vdKjwXtovcSyYEi3ITvHeqB2GKFjwNwluVyBSolsGRcJHxWu/Y3WX3/zmMfJHnWgYOV4d5bQsVNEPSatUm9+5TwhZzWQDvuKMslFy2kZmcf/H0KZm++veO16CwJE7bsnx9DnerIIPNnXsa9cBpzqIsMlfen0QJ7YAfU/mibRCYlyhkoJHKxf8Ibqn+/AR3ySM8AAAAASUVORK5CYII=",alt:"...",className:"pr-2"})," ",Object(x.g)(null===e||void 0===e?void 0:e.course_start_time).hour," ",Object(x.g)(null===e||void 0===e?void 0:e.course_start_time).minute]})]})}),Object(j.jsx)(l.a,{md:3,xs:6,className:"p-0",children:Object(j.jsx)("div",{className:"button_paddingarea",children:Object(j.jsx)("button",{disabled:!0,className:"explore_button btn",children:t("myProgressPage.button.1")})})})]})})})):Object(j.jsx)("div",{className:" mb-2",children:t("common.noCurrentCourse")})})]})},O=t(30),m=t(10),p=function(e){var s=e.courses,t=Object(O.g)(),c=Object(d.a)().t;return Object(j.jsxs)("div",{className:"current_course",children:[Object(j.jsx)("h3",{children:c("dashboardPage.inProgress")}),Object(j.jsx)("div",{className:"Scrl_div",children:(null===s||void 0===s?void 0:s.length)>0?s.map((function(e){return Object(j.jsx)("div",{className:"course_inprogress",children:Object(j.jsxs)(o.a,{children:[Object(j.jsxs)(l.a,{md:7,xs:9,children:[Object(j.jsx)("h6",{children:Object(x.o)(null===e||void 0===e?void 0:e.course_name,40)||"N/A"}),Object(j.jsx)("p",{children:Object(x.o)(null===e||void 0===e?void 0:e.description,40)||"N/A"}),Object(j.jsxs)("ul",{className:"p-0 list-style-none list-inline",children:[Object(j.jsxs)("li",{className:"list-inline-item mr-4",children:[Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADDSURBVHgB7ZPLDcIwDIbN4w4btCOwAWUDRoANYAJGgA3ICIzQIzdgAsIG5cgJ/qiuiKw82p5aqZ/0KY2TWLYqEw14mMOjI57BXejh1BFbsCbpBj7E+RKmsIAa5jLBSOzX8AwvnDTjb5uUzXk1rCiA4uqqxzfHHXN+svZPmNgXXO1XaE8FisouvIwpTNEw7kTBbwuTWKVbKn9gXbVMEGu/FUPSniSVE3WHB/rPdIwZry87OBGXrvBNkTG0+MA9NZyw7vAD+IYnDt1/MbEAAAAASUVORK5CYII=",alt:"...",className:"pr-2"})," ",Object(x.f)(null===e||void 0===e?void 0:e.course_start_time,"MMM Do YYYY")]}),Object(j.jsxs)("li",{className:"list-inline-item",children:[Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADkSURBVHgBnZLhEYIwDIUfOICM0A1kAzsCI7CBI4AbuIFs4AjoBLIBuIE//WliAxe9liLf3TuOXPqSNtkgjpHvK5SQeGIZ6UCyYjAosyvpqGJectKdVIvZLyWpJ1UxA4M4jc/IkFr4DXwdQfILHTjDtRqqagPm3DlSCeSS/A9P0o0LpFLlgXV0pCKVtjqsYyBtx+voxzvBjXHUHgvg92ixjhJupz70CI9yjgvU5Goox4UYKT6RSSBfdn7KNz5nXp4S8Q5m8ziB78kbbPH9TvxfiYHVh5KAmZVKO2XEu8Qb2sBt68QbwlAr3ms9Q0QAAAAASUVORK5CYII=",alt:"...",className:"pr-2"})," ",Object(x.g)(null===e||void 0===e?void 0:e.course_start_time).hour," ",Object(x.g)(null===e||void 0===e?void 0:e.course_start_time).minute]})]})]}),Object(j.jsx)(l.a,{md:2,xs:3,className:"p-0",children:Object(j.jsx)("div",{className:"progress-coursebardiv",children:Object(j.jsxs)(h.a,{sx:{position:"relative",display:"inline-flex"},children:[Object(j.jsx)(u.a,{variant:"determinate",value:(null===e||void 0===e?void 0:e.progress)||0}),Object(j.jsx)(h.a,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:Object(j.jsxs)(v.a,{variant:"caption",component:"div",color:"text.secondary",children:[(null===e||void 0===e?void 0:e.progress)||0,"%"]})})]})})}),(null===e||void 0===e?void 0:e.in_progress_course)&&Object(j.jsx)(l.a,{md:3,xs:12,children:Object(j.jsx)("div",{className:"button_paddingarea",onClick:function(){return t.push(m.routingConstants.ALL_CERTIFICATE_DETAIL+(null===e||void 0===e?void 0:e.id))},children:Object(j.jsx)("button",{className:"btn certificate_button",children:c("dashboardPage.certificate")})})})]})})})):Object(j.jsx)("div",{className:" mb-2",children:c("common.noCurrentCourse")})})]})},N=function(e){var s=e.tests,t=Object(d.a)().t;return Object(j.jsxs)("div",{className:"your-testdiv",children:[Object(j.jsx)("h6",{children:t("dashboardPage.heading.1")}),Object(j.jsx)("div",{className:"your-testcontent",children:Object(j.jsx)(o.a,{children:(null===s||void 0===s?void 0:s.length)>0?null===s||void 0===s?void 0:s.map((function(e){return Object(j.jsx)(l.a,{lg:6,md:12,xs:6,children:Object(j.jsxs)("div",{className:"first-test",children:[Object(j.jsx)("h5",{children:Object(x.a)(null===e||void 0===e?void 0:e.course_name,!0,30)||"N/A"}),Object(j.jsxs)("p",{children:[(null===e||void 0===e?void 0:e.test_progress)||0,"% ",Object(j.jsx)("br",{})," ",Object(j.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADpSURBVHgB7ZNNDgFBEIWryvjZcQRHcARuwA1YEGLBsEZbSZBYycQKJxAncAVHmCM4gHSZJhKZDNM1O8l8m170q3qp1CuAlJRP1MqrqoVXltSQRAxIJcrTRa13desSEKKW2wo5zgmRDhO3PY/Tiw2eJhuvTEwXG5NEBm8TZDoh43U67rREBmaRmIMmWBBMMWBAnzFbU27rFv6PXnIBrEBwisFTQmQ/qvlLkxAzpUkUA59no+7wm04W03Bz1sdfzQ3ymAbHRhnaA+v5dNw7xOlFBubAiGCj8d5Qbv9qU+OAEI06SEvfh5S/4QF62kY73CoFWwAAAABJRU5ErkJggg==",alt:""})]})]})})})):Object(j.jsx)("div",{style:{marginLeft:"40%"},children:t("common.noTestFound")})})})]})},f=t(165),B=t(239);s.default=function(){var e,s=Object(r.c)((function(e){return e.authReducer})).user,t=Object(r.c)((function(e){return e.myProgressReducer})).myProgress,a=Object(r.b)(),A=Object(d.a)().t,u=Object(r.c)((function(e){return e.languageReducer})).lan;Object(c.useEffect)((function(){a(Object(B.a)())}),[a,u]);var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],s=arguments.length>1?arguments[1]:void 0;return"current"===s?e.filter((function(e){return!1===(null===e||void 0===e?void 0:e.is_current)})):"inProgress"===s?e.filter((function(e){return!0===(null===e||void 0===e?void 0:e.is_current)})):[]};return Object(j.jsxs)("div",{children:[Object(j.jsx)(f.i,{title:"She\u0915\u0941\u0902\u091c - My Progress"}),Object(j.jsx)(f.g,{loginPage:!0,subPage:"myProgress"}),Object(j.jsx)("div",{className:"dashboard_main pt-5 pb-5 noselect",children:Object(j.jsxs)(n.a,{children:[Object(j.jsx)(o.a,{children:Object(j.jsxs)(l.a,{md:12,children:[Object(j.jsxs)("h1",{children:[A("common.greeting.hello")," ",(null===s||void 0===s?void 0:s.name)||A("common.n/a"),"!"]}),Object(j.jsx)("p",{className:"dashboard_back",children:A("common.greeting.goodToSeeYou")})]})}),Object(j.jsxs)(o.a,{children:[Object(j.jsxs)(l.a,{md:7,xs:12,children:[Object(j.jsx)(g,{courses:v(null===t||void 0===t?void 0:t.courses_data,"current")}),Object(j.jsx)(p,{courses:v(null===t||void 0===t?void 0:t.courses_data,"inProgress")})]}),Object(j.jsxs)(l.a,{md:5,xs:12,children:[0===(null===t||void 0===t||null===(e=t.user_progress_data)||void 0===e?void 0:e.total_course)?"":Object(j.jsx)(b,{userProgress:(null===t||void 0===t?void 0:t.user_progress_data)||null}),Object(j.jsxs)("div",{className:"certificate-section",children:[Object(j.jsx)(o.a,{children:Object(j.jsxs)(l.a,{md:12,children:[Object(j.jsx)("h6",{children:A("dashboardPage.certificate")}),Object(j.jsx)("p",{children:"Your path to the success by our industry recognized certificates to help you achieve your desired goals."})]})}),Object(j.jsx)("div",{children:Object(j.jsx)(i.b,{to:m.routingConstants.ALL_CERTIFICATE_PAGE,children:Object(j.jsx)("button",{className:"btn all_certificatebutton",children:A("dashboardPage.button.1")})})})]}),Object(j.jsx)(N,{tests:null===t||void 0===t?void 0:t.courses_data})]})]})]})}),Object(j.jsx)(f.e,{loginPage:!1})]})}}}]);
//# sourceMappingURL=43.0a868c56.chunk.js.map