(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[23],{557:function(e,t,n){},574:function(e,t,n){"use strict";var o=n(15),i=n(1);t.a=function(){var e=function(){return window.innerWidth<767.98},t=Object(i.useState)(e()),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(i.useEffect)((function(){var t=function(){r(e)};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),window.addEventListener("load",t),window.addEventListener("reload",t),function(){window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t),window.removeEventListener("load",t),window.removeEventListener("reload",t)}}),[]),{isMobile:a}}},616:function(e,t,n){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIISURBVHgBpVRBbtNQEH0zttJsUMIJCCcgnKDhBJgTtF2higVEAiRW/RELJEAkGxRYpZyA5ASYE1Bu4COYXRXZM8yYNrSpHaXtkyzL39/P82fee4QGhDDr4s5pwogfANoluxScAcVvWSINbw6zuu+ojijqFM9VZd9IMrsvBJRDOWcqewTeVaIESseyLEfrxJcIw/vPfY7j7wpdKO2EMDzI66oI42mPFMHJpSiehNfPTq4QnpNJKQfh1WGKLRA+fk2YMb5IWhGGd9Me7/APEQzDy6dzXAPhw3TAEc+EWg/9ROyL3IqOQJQ2kb21SkafvkxqCe003iKS0xf+HHt1IN0XyP2mKkqSLlPUaXrv/WYsf4XxbMJoYeB/CMN6GWwDP6qCMhaTGRH1SSnFLUFamDKozy5aQHLcEq5VIu7E6y/Op7a2bD/FxulHJnxRuWuE5gJQd0VoU7NBPbryRbu98RRqLjK9ZLGqnoB4z9ZWsmjy6SYQ4l1ouWBwe26e7dnIu7ghXHpKmggj5WrkKt9Ylke4Ic6McezSq5yi3J5YzYkPBNeE+9k0MxCUo4q8WrQq3eA+3WrDtmSuCA8HsnA4M0ZtfNnI0rqsW+2zzOSOtUiR/COria/V5v9Zt2f3uaL8KRplcD97clP82Kza8757q9YzkxqPY8Qm/4FbkxX3FMiV8KeSmSmjKXz/AkexCz9cP9aVAAAAAElFTkSuQmCC"},782:function(e,t,n){},878:function(e,t,n){"use strict";n.r(t);var o=n(25),i=n(3),a=n(7),r=n.n(a),c=n(19),s=n(15),l=n(1),d=n.n(l),u=n(32),j=n(548),b=n(549),v=n(20),O=n(30),x=n(450),g=n(611),h=n.n(g),m=n(599),f=n(890),p=n(519),A=n(900),C=n(511),w=n(540),S=n(521),_=n(895),E=n(874),k=n(5),N=n(532),P=n(10),I=n(165),M=n(194),y=n(574),L=n(616),R=(n(782),n(557),n(0)),q=Object(k.a)(_.a)((function(e){var t=e.theme;return{color:(t.palette.mode,"#3880ff"),marginTop:20,height:10,padding:"15px 0","& .MuiSlider-valueLabel":{fontSize:12,fontWeight:"normal",top:-6,backgroundColor:"unset",color:t.palette.text.primary,"&:before":{display:"none"}}}}));t.default=function(){var e=d.a.useState(1),t=Object(s.a)(e,2),n=t[0],a=t[1],g=d.a.useState(),_=Object(s.a)(g,2),k=_[0],T=_[1],B=d.a.useState(!0),z=Object(s.a)(B,2),D=z[0],W=z[1],Q=d.a.useState(!1),Y=Object(s.a)(Q,2),V=Y[0],J=Y[1],K=d.a.useState(!1),H=Object(s.a)(K,2),U=H[0],X=H[1],F=d.a.useState(!1),G=Object(s.a)(F,2),Z=G[0],$=G[1],ee=d.a.useState(!1),te=Object(s.a)(ee,2),ne=te[0],oe=te[1],ie=d.a.useState(!1),ae=Object(s.a)(ie,2),re=ae[0],ce=ae[1],se=Object(l.useState)(!1),le=Object(s.a)(se,2),de=le[0],ue=le[1],je=Object(l.useState)(null),be=Object(s.a)(je,2),ve=be[0],Oe=be[1],xe=Object(l.useState)(null),ge=Object(s.a)(xe,2),he=ge[0],me=ge[1],fe=Object(l.useState)(null),pe=Object(s.a)(fe,2),Ae=pe[0],Ce=pe[1],we=Object(O.g)(),Se=Object(u.b)(),_e=Object(y.a)(),Ee=Object(u.c)((function(e){return e.guidanceReducer})),ke=Ee.isLoading,Ne=Ee.guidanceCategory,Pe=Ee.testData,Ie=Ee.countData,Me=Object(u.c)((function(e){return e.languageReducer})).lan,ye=Math.round(100/((null===Ie||void 0===Ie?void 0:Ie.total_career_que)||0))||0,Le=Object(x.a)().t;Object(l.useEffect)((function(){if(_e.isMobile&&(v.b.error(Le("error.mobile.1")),we.push(P.routingConstants.HOME_PAGE)),localStorage.getItem("isCarrerTestStarted")){alert(Le("alert"));var e=localStorage.getItem("selectedCourseCategoryValue");localStorage.removeItem("isCarrerTestStarted"),Se(Object(M.c)(e,we))}}),[we,_e.isMobile,Le,Se,null===Ae||void 0===Ae?void 0:Ae.id]),Object(l.useEffect)((function(){return function(){var e=localStorage.getItem("selectedCourseCategoryValue");Se(Object(M.c)(e))}}),[]),Object(l.useEffect)((function(){Pe&&("A"===(null===Pe||void 0===Pe?void 0:Pe.answer)?(X(!0),$(!1),oe(!1),ce(!1),T(null===Pe||void 0===Pe?void 0:Pe.answer)):"B"===(null===Pe||void 0===Pe?void 0:Pe.answer)?($(!0),X(!1),oe(!1),ce(!1),T(null===Pe||void 0===Pe?void 0:Pe.answer)):"C"===(null===Pe||void 0===Pe?void 0:Pe.answer)?(oe(!0),X(!1),$(!1),ce(!1),T(null===Pe||void 0===Pe?void 0:Pe.answer)):"D"===(null===Pe||void 0===Pe?void 0:Pe.answer)?(ce(!0),X(!1),$(!1),oe(!1),T(null===Pe||void 0===Pe?void 0:Pe.answer)):(X(!1),$(!1),oe(!1),ce(!1)))}),[Pe,null===Pe||void 0===Pe?void 0:Pe.answer,null===Pe||void 0===Pe?void 0:Pe.optionA,null===Pe||void 0===Pe?void 0:Pe.optionB,null===Pe||void 0===Pe?void 0:Pe.optionC,null===Pe||void 0===Pe?void 0:Pe.optionD]);var Re=function(){var e={answer:k,career_test:null===Pe||void 0===Pe?void 0:Pe.id};k?(Se(Object(M.i)(e,we,null===Ae||void 0===Ae?void 0:Ae.id,!0)),T("")):v.b.error("Select option for next question",{position:"bottom-center"})};d.a.useEffect((function(){(null===Ae||void 0===Ae?void 0:Ae.id)&&Se(Object(M.e)(null===Ae||void 0===Ae?void 0:Ae.id,we))}),[Se,D,we,null===Ae||void 0===Ae?void 0:Ae.id]),d.a.useEffect((function(){Ie&&(null===Ie||void 0===Ie?void 0:Ie.career_time)>0&&(Oe(6e4*parseInt(null===Ie||void 0===Ie?void 0:Ie.career_time,10)),J(!0))}),[Ie,null===Ie||void 0===Ie?void 0:Ie.career_time]),Object(l.useEffect)((function(){Se(Object(M.g)())}),[Se,Me]);var qe,Te=function(){var e=Object(c.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(localStorage.setItem("isCarrerTestStarted",!0),Ae){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,Se(Object(M.d)(null===Ae||void 0===Ae?void 0:Ae.id,we));case 5:if(200!==(null===(t=e.sent)||void 0===t?void 0:t.status_code)){e.next=11;break}return e.next=9,Se(Object(M.e)(null===Ae||void 0===Ae?void 0:Ae.id));case 9:200===(n=e.sent).status_code&&n.data.career_time&&(ue(!0),Oe(6e4*(parseInt(null===n||void 0===n?void 0:n.data.career_time,10)||0)));case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Be=function(e,t){T(t),"1"===e.target.value?(X(!0),$(!1),oe(!1),ce(!1)):"2"===e.target.value?(X(!1),$(!0),oe(!1),ce(!1)):"3"===e.target.value?(X(!1),$(!1),oe(!0),ce(!1)):"4"===e.target.value&&(X(!1),$(!1),oe(!1),ce(!0))};return Object(R.jsxs)("div",{children:[Object(R.jsx)(I.g,{loginPage:!0,page:"guidance",subPage:"careerTest"}),Object(R.jsxs)(m.a,{children:[Object(R.jsxs)("div",{className:"maindiv_prog setmain noselect",children:[Object(R.jsxs)("div",{className:"select_test",children:[Object(R.jsx)("h2",{children:Le("successCareerTestPage.heading.1")}),Object(R.jsxs)(j.a,{children:[Object(R.jsx)(b.a,{md:9,xs:12,children:Object(R.jsx)(N.a,{sx:{m:1},children:Object(R.jsx)(f.a,{className:"auto-complete",options:Ne,getOptionLabel:function(e){return e.name},onChange:function(e,t){Ce(t),localStorage.setItem("selectedCourseCategoryValue",null===t||void 0===t?void 0:t.id)},onInputChange:function(e,t){return me(t)},disabled:de,inputValue:String(he),id:"disable-clearable",disableClearable:!0,renderInput:function(e){return Object(R.jsx)(p.a,Object(i.a)(Object(i.a)({},e),{},{color:"primary",label:Le("successCareerTestPage.other.1"),variant:"standard"}))}})})}),Object(R.jsx)(b.a,{md:3,xs:12,className:"mt-1",children:Object(R.jsx)("button",{onClick:function(){return Te()},disabled:de,children:Le(de?"successCareerTestPage.button.1":"successCareerTestPage.button.2")})})]})]}),de&&Object(R.jsx)(j.a,{className:"pt-md-5 pb-md-5",children:Object(R.jsx)(b.a,{md:12,xs:12,className:"text-left",children:Object(R.jsxs)("div",{className:"circular_progress_module",children:[Object(R.jsxs)(E.a,{className:"d-flex justify-content-between",spacing:2,direction:"row",children:[Object(R.jsx)("h3",{children:he}),Object(R.jsx)("button",{onClick:function(){return Re()},children:Le("coursesPage.coursesModulePage.button.2")})]}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Object(R.jsx)(q,{"aria-label":"ios slider",className:((null===Pe||void 0===Pe?void 0:Pe.progress)<=33?"red1-progress":(null===Pe||void 0===Pe?void 0:Pe.progress)<=60&&"yellow1-progress")||(null===Pe||void 0===Pe?void 0:Pe.progress)<=100&&"green1-progress",value:e,valueLabelFormat:function(e){return Object(R.jsxs)("div",{children:[e,"%"]})},valueLabelDisplay:"on",disabled:!0})}(null===Pe||void 0===Pe?void 0:Pe.progress)]})})})]}),de&&Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)("div",{className:"time_set noselect",children:Object(R.jsxs)("p",{children:[Object(R.jsx)("img",{src:L.a,alt:"timeIcon"})," ",Le("common.time.5")+" ",V&&(qe=ve,Object(R.jsx)(h.a,{initialTime:qe,checkpoints:[{time:0,callback:function(){return Se(Object(M.c)(null===Ae||void 0===Ae?void 0:Ae.id)),v.b.error(Le("error.other.2")),void we.push(P.routingConstants.CAREER_TEST_RESULT+(null===Ae||void 0===Ae?void 0:Ae.id))}}],direction:"backward",children:function(){return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(h.a.Hours,{})," :",Object(R.jsx)(h.a.Minutes,{}),":",Object(R.jsx)(h.a.Seconds,{})]})}}))]})}),Object(R.jsxs)(j.a,{children:[Object(R.jsxs)(b.a,{md:8,xs:12,children:[Object(R.jsxs)("div",{className:"que_box noselect",children:[Object(R.jsx)("h2",{children:Le("allCertificatePage.other.5")}),ke?Object(R.jsx)(A.a,{}):Object(R.jsxs)("p",{children:[n,"."," ",null===Pe||void 0===Pe?void 0:Pe.question]}),Pe&&Object(R.jsxs)(C.a,{"aria-label":"gender",name:"radio-buttons-group",children:[(null===Pe||void 0===Pe?void 0:Pe.optionA)&&(ke?Object(R.jsx)(A.a,{}):Object(R.jsx)(w.a,{value:"1",control:Object(R.jsx)(S.a,{checked:U,onChange:function(e){return Be(e,"A")}}),label:null===Pe||void 0===Pe?void 0:Pe.optionA})),(null===Pe||void 0===Pe?void 0:Pe.optionB)&&(ke?Object(R.jsx)(A.a,{}):Object(R.jsx)(w.a,{value:"2",control:Object(R.jsx)(S.a,{checked:Z,onChange:function(e){return Be(e,"B")}}),label:null===Pe||void 0===Pe?void 0:Pe.optionB})),(null===Pe||void 0===Pe?void 0:Pe.optionC)&&(ke?Object(R.jsx)(A.a,{}):Object(R.jsx)(w.a,{value:"3",control:Object(R.jsx)(S.a,{checked:ne,onChange:function(e){return Be(e,"C")}}),label:null===Pe||void 0===Pe?void 0:Pe.optionC})),(null===Pe||void 0===Pe?void 0:Pe.optionD)&&(ke?Object(R.jsx)(A.a,{}):Object(R.jsx)(w.a,{value:"4",control:Object(R.jsx)(S.a,{checked:re,onChange:function(e){return Be(e,"D")}}),label:null===Pe||void 0===Pe?void 0:Pe.optionD}))]})]})," ",Object(R.jsx)("div",{className:"prev_next_btn noselect",children:Object(R.jsxs)(j.a,{children:[Object(R.jsx)(b.a,{md:6,xs:6,children:Object(R.jsx)("button",{className:"back_button",onClick:function(){return n>1&&a((function(e){return e-1})),void Se(Object(M.d)(null===Ae||void 0===Ae?void 0:Ae.id,we,null===Pe||void 0===Pe?void 0:Pe.prev_module,0))},disabled:!(null===Pe||void 0===Pe?void 0:Pe.prev_module),children:Le("coursesPage.coursesModulePage.button.1")})}),Object(R.jsx)(b.a,{md:6,xs:6,className:"text-right",children:(null===Ie||void 0===Ie?void 0:Ie.total_career_que)===n?Object(R.jsx)("button",{className:"next_button",onClick:function(){return Re()},children:Le("coursesPage.coursesModulePage.button.2")}):Object(R.jsx)("button",{className:"next_button",onClick:function(){return function(){a((function(e){return e+1}));var e={answer:k,career_test:null===Pe||void 0===Pe?void 0:Pe.id},t=((null===Ie||void 0===Ie?void 0:Ie.user_career_test_count)+1)*ye;k?(Se(Object(M.i)(e,we,null===Ae||void 0===Ae?void 0:Ae.id,!1)),T(""),(null===Pe||void 0===Pe?void 0:Pe.answer)?Se(Object(M.d)(null===Ae||void 0===Ae?void 0:Ae.id,we,null===Pe||void 0===Pe?void 0:Pe.next_module)):Se(Object(M.d)(null===Ae||void 0===Ae?void 0:Ae.id,we,null===Pe||void 0===Pe?void 0:Pe.next_module,t)),W((function(e){return!e}))):v.b.error(Le("error.other.1"),{position:"bottom-center"})}()},children:Le("coursesPage.coursesModulePage.button.3")})})]})})]}),Object(R.jsxs)(b.a,{md:4,xs:12,children:[Object(R.jsxs)("div",{className:"que_status noselect",children:[Object(R.jsx)("h2",{children:Le("successCareerTestPage.heading.2")}),Object(R.jsx)("div",{className:"que_num",children:Object(o.a)(Array(null===Ie||void 0===Ie?void 0:Ie.total_career_que).keys()).map((function(e){return Object(R.jsx)("p",{id:e+1<=(null===Ie||void 0===Ie?void 0:Ie.user_career_test_count)?"col_gre":"col_grey",children:e+1})}))})]}),Object(R.jsx)("div",{className:"ans_not noselect",children:Object(R.jsxs)("ul",{children:[Object(R.jsxs)("li",{children:[Object(R.jsx)("span",{className:"dotte1"})," ",Le("successCareerTestPage.other.2")]}),Object(R.jsxs)("li",{children:[Object(R.jsx)("span",{className:"dotte2"})," ",Le("successCareerTestPage.other.3")]})]})})]})]})]})]}),Object(R.jsx)(I.e,{loginPage:!1})]})}}}]);
//# sourceMappingURL=23.207ca615.chunk.js.map