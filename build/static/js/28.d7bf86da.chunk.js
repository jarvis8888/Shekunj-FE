(this["webpackJsonpshekung-frontend"]=this["webpackJsonpshekung-frontend"]||[]).push([[28],{522:function(e,s,c){"use strict";c.d(s,"a",(function(){return t}));c(3);var A=c(1),i=(c(0),A.createContext({prefixes:{}}));i.Consumer,i.Provider;function t(e,s){var c=Object(A.useContext)(i).prefixes;return e||c[s]||s}},528:function(e,s,c){"use strict";var A=c(3),i=c(113),t=c(178),a=c.n(t),n=c(1),r=c(522),l=c(0),j=["bsPrefix","className","as"],o=["xxl","xl","lg","md","sm","xs"],d=n.forwardRef((function(e,s){var c=e.bsPrefix,t=e.className,n=e.as,d=void 0===n?"div":n,b=Object(i.a)(e,j),x=Object(r.a)(c,"row"),u="".concat(x,"-cols"),v=[];return o.forEach((function(e){var s,c=b[e];delete b[e],s=null!=c&&"object"===typeof c?c.cols:c;var A="xs"!==e?"-".concat(e):"";null!=s&&v.push("".concat(u).concat(A,"-").concat(s))})),Object(l.jsx)(d,Object(A.a)(Object(A.a)({ref:s},b),{},{className:a.a.apply(void 0,[t,x].concat(v))}))}));d.displayName="Row",s.a=d},529:function(e,s,c){"use strict";var A=c(14),i=c(3),t=c(113),a=c(178),n=c.n(a),r=c(1),l=c(522),j=c(0),o=["as","bsPrefix","className"],d=["className"],b=["xxl","xl","lg","md","sm","xs"];var x=r.forwardRef((function(e,s){var c=function(e){var s=e.as,c=e.bsPrefix,A=e.className,a=Object(t.a)(e,o);c=Object(l.a)(c,"col");var r=[],j=[];return b.forEach((function(e){var s,A,i,t=a[e];delete a[e],"object"===typeof t&&null!=t?(s=t.span,A=t.offset,i=t.order):s=t;var n="xs"!==e?"-".concat(e):"";s&&r.push(!0===s?"".concat(c).concat(n):"".concat(c).concat(n,"-").concat(s)),null!=i&&j.push("order".concat(n,"-").concat(i)),null!=A&&j.push("offset".concat(n,"-").concat(A))})),[Object(i.a)(Object(i.a)({},a),{},{className:n.a.apply(void 0,[A].concat(r,j))}),{as:s,bsPrefix:c,spans:r}]}(e),a=Object(A.a)(c,2),r=a[0],x=r.className,u=Object(t.a)(r,d),v=a[1],g=v.as,h=void 0===g?"div":g,O=v.bsPrefix,m=v.spans;return Object(j.jsx)(h,Object(i.a)(Object(i.a)({},u),{},{ref:s,className:n()(x,!m.length&&O)}))}));x.displayName="Col",s.a=x},740:function(e,s,c){},858:function(e,s,c){"use strict";c.r(s);var A=c(1),i=c(28),t=c(25),a=c(34),n=c(115),r=c(528),l=c(529),j=c(179),o=(c(740),c(0));s.default=function(){var e,s=Object(a.b)(),c=Object(i.i)().id,d=Object(a.c)((function(e){return e.coursesReducer})).course;return Object(A.useEffect)((function(){s(Object(n.l)(c)),window.scrollTo({top:0,left:0,behavior:"smooth"})}),[s,c]),Object(A.useEffect)((function(){(null===d||void 0===d?void 0:d.category_id)&&s(Object(n.e)(null===d||void 0===d?void 0:d.category_id))}),[s,d]),Object(o.jsxs)("div",{children:[Object(o.jsx)(j.h,{title:"She\u0915\u0941\u0902\u091c - Course Detail"}),Object(o.jsx)(j.g,{loginPage:!0,page:"courses"}),Object(o.jsx)("section",{className:"CouDtl_ban",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("div",{className:"col-md-7",children:Object(o.jsxs)("div",{className:"CouDtl_con",children:[Object(o.jsx)("h2",{children:null===d||void 0===d?void 0:d.category_name}),Object(o.jsx)("h5",{children:null===d||void 0===d?void 0:d.name}),Object(o.jsx)("div",{className:"ban_rat"}),Object(o.jsxs)("h4",{children:["Created by ",Object(o.jsx)("span",{children:"SheKunj"})]})]})}),Object(o.jsx)("div",{className:"col-md-5",children:Object(o.jsx)("div",{className:"CouDtl",children:Object(o.jsx)("img",{src:null===d||void 0===d?void 0:d.image,alt:"",srcSet:""})})})]})})}),Object(o.jsx)("section",{className:"Coutl_sec1 mb-5",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"row",children:[Object(o.jsxs)("div",{className:"col-md-7",children:[Object(o.jsxs)("div",{className:"sec1_des",children:[Object(o.jsx)("h2",{children:"Description"}),Object(o.jsx)("p",{children:null===d||void 0===d?void 0:d.description})]}),Object(o.jsx)("div",{className:"mt-2 mb-2"}),Object(o.jsxs)("div",{className:"sec1_con2 con_setSec1",children:[Object(o.jsx)("h2",{children:"What you\u2019ll learn"}),Object(o.jsx)(r.a,{children:null===d||void 0===d||null===(e=d.What_you_will_learn)||void 0===e?void 0:e.map((function(e){return Object(o.jsx)(l.a,{md:6,xs:12,children:Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADkSURBVHgB7dI9DoIwFMDxV+KgJhoHY+LmETyCbnXjBnAFJ8MkTgYvId6CTW8im4lyAhWefC4NVZDH1v9GWvqDlwKoVCqiGLTUdWGPBt2+/oLwMvUsX1zXoIUSdNjrn+PfOnZAM8v2kMMFigBzBui/IXLL9pGOWkSfGC3LxkwK10HJ4LooCfwPKoXv/GBq8Y0ERHPsbU5AjCZJbnWYfxZzA+4Y1KgUnniWi4g7Gd4UTY/9tvjgjs0Y26YP+dgp0J+wiCPgWgNmNEUrwSKevdQMzc6oWIFToLULVo5+4/sZqFQqVdwHZi2qooYfGpMAAAAASUVORK5CYII=",alt:"",srcSet:""})}),Object(o.jsx)("div",{children:Object(o.jsx)("p",{children:null===e||void 0===e?void 0:e.name})})]})},e.id)}))})]}),Object(o.jsxs)("div",{className:"sec1_con2",children:[Object(o.jsx)("h2",{children:"Features:"}),Object(o.jsxs)(r.a,{children:[Object(o.jsxs)(l.a,{md:6,xs:12,children:[Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFASURBVHgB7dc/TsMwFAbw7zkVMDBUgg5s5QY5QrqVLnADxAk6AeqWTohM5QicoLDQbuQIvQHdkPgjdWAA1PgRD0jIsaVUxEor+SdFkfIs+7NiKw7geRuMbIWnKG7u7myHqNgSmB9MB3OUDfPeS/pgxAyaoWIEDkE02ns4HxZrmpdeEgbM42+WHdsM/uO5e9XeouBRcnbWmg7SvzWhNybJJ5Jx6yKIovpl4D4fOtJrAjVg5oXpeS1hbHwYGx/Gxoex8WFsfBgbYxgibqIGhjAyJYhj9amHA6pfQXTK2fJOrxkPV6/d61iQ6DPYweGKQgk5bE0uR8WahZpBA2ijzAD5YYk565Rp+/H5NTtM4wVceTtKGBXwW9uGVmyvXsk4v+lbP8qvVG+7P7kotY5+NbCifKHeGB4XfjtYBO4Wqeetox9/Ol7jajQB+gAAAABJRU5ErkJggg==",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"100% Online"}),Object(o.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsum netus semper feugiat."})]})]}),Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ5SURBVHgB7VfNchpHEO6eBSE5P4KKpVROxk9g9ARGN+SL8RMIPYHkg+UoOYBPKqGDzRNIegKhE1TlYPwEJk9gfEqVZJWI4xgk2Jn0B2y0rAdpWXx0V1HLzvbMfNP9dU830TexC9OM8lduNz3Hzusr467+Ut9p0QyiaAZ5ly0lAcQQt+R5fCHvNINEBgMgPy7cea2NObpbe7YqzxMt77AURZRIYM5yu1kB8hYAlurPSxjDE++wFL5TBJmKM9iEOVZk0mlt9MZSfacR1DnN7RYcdoqGqaF7vcryH783w65vBQMXzM8nBv6Ps8oYooeKOCuvAsJUPnU7r+43Su2bFvZAyd+2JtOQjd7ofr/lOqrd7V62bfOtYM5yeyXFvImFBEjTGPMnkW7YLHGbDF2mxKL8gInTRGZwIM+9folNWmTShGlldIDGNbi90iTdiWBuk9NcuSDWWxfTihtNUk4tVjRNbehoub59SBFk6mhC6J6vld8CiNiv8rHz7/27tW3GU1xQwbh8fxclxK2WEf8m5ZQtGxCErhCyslTbfuX/NiJkFb+ztb0t6In+l1mZqc3CGwoLRvgikcRfsP0ayPP/gXgENW6/6oUxvgsg6B/L68oYFoN1edG2b2g3gSMSWS0/EIwxqQIiTcXiRX+yg55cE23ohNzCDkb8vqi0aQfG1sk1lXFNk3W6nS1EjJOIbwjY9Ph3LRyi9bEhNkJ0nbLuS1YRzigdcJPJOFedhveGxKhY3evPJzKwSL/bzUhktfzEdRJz0M+MrWJ0m1nN5iaRZGqUNS/yLweXpCz8Bnzx/+LsHHi3d6r6FPqhb/IJBNbv5VzpwHAbmwBQt9tNxslp2pLiaW7v0Lnz/eJAX0C7l70xC4tVknKIv237TmEZbrpzC1maQtzLK+iPX5SGJUGqC5u+Pc+I75n1mK+16R8px8F9VR0qmaStVJCT36PPn0YnV5uYN4ZlmGPe2/a1WoYZp1EP/GPL9Z1DAZlEQkMiE1eeBPmCHzaHK88flTdRamBeAOxD1mQtK6yWQRSIrw88jnjjUuc+GRRPktD8+SYoACJhs3Vl9Kp/fMShrETlE9u8icXVh7V9qW31SXBT70pAAsRd9E+n08BVgFD/YQGcUmIRkwTw4FUwTJI6v1T/NT8VGPBBSZiqzueVlKUQQvGkOCa3tkHxJaRE7cNNuCnoGk9wgWrjbkSpi8Q65ePztf2X9BXk/NF+8UOufHCTzo2hjRQvrsiDtDQTEHBIF3rkvqCoYJBB0ZxJ/buJk1FkIEMy39bkheoOPNKKevWn2rOnYeYM+6rv5AA6HwYIJFQGxkIqEV9xjU6FqeK8vkrSfupjp7MStu2dutf290U97b7wb3RtDVPoU3/j59pv1WnWjtT4wzIxKaqkPC3KCodo1pz43GPhRgHtbpi+6quB8YNySJUc5sdhm7tvEkX+A0PNQ+0N80nlAAAAAElFTkSuQmCC",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"Lifetime Access"}),Object(o.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsum netus semper feugiat eget."})]})]}),Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIXSURBVHgB7ZZBbtNQEIb/eU5RhJBw1bSoO+cEwAna7pJsCCegnKBk0VRhQ1hVcReEExROQFZxdskN2pyAskJqG2EESlMSv+HZUVBEg+00eqit/G1e3mTG/j2eN2MgISHhDkLTm2/Fd6a8HB7h/+CKi/7WcqfqTgyp6X8Hg4G5RIbJ7D2HZgQZh7j/4KEvaqYYH5UqN9OqdKCZXt6+YhO4QaSgibPc/qZ61s3xTnZWY2Q7Usx5vlYEkxnqROxmnL3GZNsrHLwB8ysmNMAwCcaLXv6gseLslrCIGAYsEngc7hUcykDMac7eBsvtXyyfrjuVE9/2Nbdv3SOjfZavfVl19uq4rpiw4FkIwjMJvF9vjYX4+L9VhksE2lHbf15PQwGTag3k/m1llq7KnxUWqUEMd4XAxpUbidSGZNkNi4xRwPYntRSj/DJOOSicIXv1JRhHqohPVpq7b31br2DvMHN1BM5iETHqJnN143F92B/906TWamDkoMt2putoFlqanmQ2PUbpx0V/WWUqK2OOF20dmMBWVg1BPxtEwowTE/magvcNPInyyzTLL/9sBNWJ0T7P1T5LQV1iOvR4VFpYjJReV3XQ75iDtWb5+LRgbwlQ21Bt2Bey1qp8iIqLbnrXnOATQcxD61HrdSNOjLZBORGkluO4/jf/E2I8/vWiDoUZKiadTrvycuQGn4T6cdH/OdfBSEhIuJX8BmV70A/JFYBrAAAAAElFTkSuQmCC",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"Shareable Certificate"}),Object(o.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsum netus semper feugiat eget."})]})]})]}),Object(o.jsxs)(l.a,{md:6,xs:12,children:[Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFrSURBVHgB7ZcxTsMwFIbfC2UoIEgFCxPtCVBv0LHtFG5QbtAMIDGRrWo79AjNDWArY24AnKBlYmgqogoUQVI/HEREqGRHFs2A5E+KIlv/k/9nP0vPABqNGgiKTBuOuVfe7QAxU6aLgbnHd1czUMAARfbLO/dIdCrTEEB1G7fGUDR+a0Cb1GUp5QkW7eE1T7VLQCYokhpCwID/3MPJhS3TS49p0RqOiLHaMnyrHU0uMflAgTTmg+I6AavMm31HppfuDN+NTgSsXvOc4GcWPb89GBOjJ1EcGnjC62qWjpNCfrFG3dV7NOVDRxSXV8Dm+o2IKD6XGflKguhxGYb17Fzl1k4Skh51bs2s823OgQJQvtpFos2I0GZEaDMitBkR2owIbUaENiPiP5lBb97sNWAD+K2+xRvoB5lG2ukxJNsA44b3vF5eqykF4YC/EKwVwplclsNzs1ctoWHx7lz5qZJZJXgNQ/d3Y6/R/J1PiS19wDrw0vEAAAAASUVORK5CYII=",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"Assignments"}),Object(o.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsum netus semper."})]})]}),Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPsSURBVHgB7VdLThtBEK3qwfyUREYBpOzMCTAnwF5EstkEToBzAogUQVAWmAVyMAvwCTAnAG8AKQvMCfANMKtIBoQVwifY05WqMYMGe8YzNlE24UloPt09fv361QeAF7zgH+Iklg67va+8X416jbUDQhf4kchEerFnh4CimuDj6MFC3h47S2RiiMah3BOZ8ZGDpWLQ7yroEkJErgh62vkelTELXaIrMu8Olsosadn6cVTkHCNNpzKGQGWnKqKY/LX7bg/44GIqu8UyxMx6bWb0+9eS/V4D5RBxHAgjF8nsCTOKCAm+ljVgTkO97CRiH10lkX1yrE609UxlajWqKHT88FitkTkhNyHs2ULLL5RjWsU6ExC1xEu8uwiBShmIk4RQNG5uPumBwUMmaR2rJpPJLOU7JiM4T67ledosu3GbQOcVG1eTzv26u90cK6arXuuEmAEqLaSEgEJji9cXhve/zHutCRRNLG2K3VUyCA5NhPjo3kKpeY6Eshu5s+TavAKcE0J+kRXIwCaYRSbCipgzbkTEE28GBo/d1o7sL242/GUsgw8CkQkpY1kk9toZKV2lh+iy4Ux6QkgOwVK4DXyjSc6eoylVIxrzmjO6Z0VZ3H6+mFpfZo9J/pl4JEz1FQONDb7Ne33HVxkDjBiRLki0QAA0iOjUPR+p8/2DqmEpFV5rLWVEPg7ViNsERJgkwAK0gagXQhXlBDjeIKLjbuRNoiMwQkKm5ElGIVWJ3H8IJW+QLoEHKlPZqEQZEy4RUaxGesxLxUbWdt/0I5nh/cVdvuy6TThPrk9CG3AxSEnyGzlYSJ8ns9SvQo/bukiuX3IN4+8vDEEA+BqYE9wpOyfiNc6VeZfDdodLwgd+Kg/tfT61x37eXj8xPZePMJMrQ1AyvDsOQ5hrouSZacWYXDbiSoeiV3e3T9RtTYJSy8xd6BaS0JjgZSdrxEdWSnBAnv2+4xvajZDEEteoaQgIZCP3cpW+dCQ+SZxsn7aqeHpGMuir/r5GA8XVl1uFDf54ccil/jyE9gYHgpVbJONWEpnqfX+fkKnKuBC8Bx2Hbsi8HhiIsXCWdxphj2VpBZhQvJlQj9XLYMT5zm4TGi2qcWiSuSIhL5vsZ5JBk6gnzhJr6bPEN1epxSet8zMxabxk3eO8RCYl79zqVMcNuVer0ExCemE5Gk4NLa2DrRbfVqVs2Cq5khHWSkHbZOcKso4rKvmGE2Ghzs2YZVzv+RIUYc4/aXVznXP1jPQvShvQORdz++rud8mpHEdhgc0fbp1LEYWiBRPX5tFbXtPV/03PBTf5c8xmntXbdravvuXgb0MsQITTNarHnx1RL/jv8Qeo4gJPjUQ3FgAAAABJRU5ErkJggg==",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"Flexible Deadline"}),Object(o.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsum netus semper."})]})]}),Object(o.jsxs)("div",{className:"features_box",children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQiSURBVHgB7VdfaFtlFD/nu7ltGl2X2SRzvtgivgjTQZ+Gc3+Y25oIMU9zezLC1BddJ25Jg4i3A+lyo271SZ+sDgZWxDGlSRRhoj5UkfVFhswS8cHRtNmqbbJb0/sdz42rNNlNe+8aB4P+4OO797vnnPu759/3XYB13AVAuA1M70s/IBRxSILsrDNGymQgf/xssU+Pq0blvOFt93tAxG1eWgjkkh82rgtwS6QvHUUPTpKAbSjwweWDhNllyahEpkXEK1RCqJe5Od4oRdLfw1oxHdZ/nAnrL8MaMB1Nb5iJZC6XDpw6uHzdtWfYxb0KigsryZQiev/VvqHuZs+DF5JzUspxifjImsiAgzwjwpgHoBtcwgMtwFQ4HVMA+5fume02ROU0h3O2Ro4jE8wmDq5mpyVkJMkJBRSuDuzkkhomoueY0dM8b+IEHkGkWSd2WkJmSy71G08j7AEshTODHfR3/oZQ9/LaZCCbGHFq53ZypimwFhGYqAhPAgl2oAKjbvRb4pk6SJnkPjLO1LKBLxI/uFG9hUwhpvk7F3xHuVv12GoQNMVU9M3NVMUUu3uW8+gxqxOHcs7DVEfmeuy0Xy5ULwHiZQVo1JQ2GgjxxiWrp6joGaUqPYpA5ypSfagdF/cqCDpX1BAn8vvBXFIDN2SqRjXGBq52jZ2INFNg4+80rnm93tlFw0jMGwsTPRe1pcr5xBrFA/oTXFHlRh2BuJFJNifDX9XNDesXWAkEP5nCPE6a1o+aVvPdpvOvWAQu2omH8olvG9eK+0/tJKBdfDnQlIwz0Ocgcbg07nuJvbS6NMEfBPKZUG7gO+u+FNYLPPkl0CCHru7D3Zc2Ki+wcxfZJYeqZPbYDd6091ii1jU3wYxAMTYTSadq5HibQMJdwWzyTKNpV56ZCuuPs3s7uZ/oPJ4P5VIf28lxQoMK/zXDM8Xw0DeClM9KkUyblSdc+n/a6bnyjEJwBIm+VqXnbSa1/fpuze9EL5RNXWIv7eaYxVeSc0zmSvjddkR4kvtPqYqLUQFYlB2+I071LS95ZKWXT4fDUJm39YzjMG0k4zCX271cpr08W+N3zoAoP3rLsY28do2nY82eO/aMQDjM2ZsIZE/ssYZo8/CuDFuL+/SHoUVwTIZj/uJ9N8pnl+6t3oJS7gh9lbgCLUJ9mJDmOdUVO8GblVGHrvzAz3ayipB+IqUIayFjmtVPPYryWrEvc7RslD9a1trh1/1a6B7R7lvNoApqkEi+x/l0Dlyijsz9X75e4F+RZxU+Mm7o8J3kpVrpTofTr3LiOkpU7rZz3NQ+mDMqg+AStofrf3dhpcCnNCw9lTnJ58q4iRANjSUm4H/EiqXN/0ij3DG3cvLu3JK9NWfuKBne5jf/VSlvX547d5xMGxrXTNlxLJQfGIZ1rKMe/wAsgqv006AHwAAAAABJRU5ErkJggg==",alt:"",srcSet:""})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("h6",{children:"Language"}),Object(o.jsx)("p",{children:"Hindi, English"})]})]})]})]})]})]}),Object(o.jsx)("div",{className:"col-md-5",children:Object(o.jsxs)("div",{className:"sec2_right",children:[Object(o.jsx)(t.b,{to:"/CoursesModule/".concat(c),className:"btn btn_str_Cor",children:"Start Course"}),Object(o.jsx)("h3",{className:"similar-coursestext",children:"Similar Courses"}),Object(o.jsx)("div",{className:"cou_set_similer",children:Object(o.jsx)(j.c,{page:"courseDetail"})}),Object(o.jsx)(t.b,{to:"/courses",className:"btn_view",children:"View More Courses"})]})})]})})}),Object(o.jsx)(j.i,{}),Object(o.jsx)(j.e,{loginPage:!1})]})}}}]);
//# sourceMappingURL=28.d7bf86da.chunk.js.map