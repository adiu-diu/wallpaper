import{a0 as a,a1 as s,a2 as t,a3 as e,a4 as r,a5 as l,a6 as d,a7 as i,a8 as n,B as o,N as u}from"./index-DIgI07t-.js";function c(a,s){return"string"==typeof a?s:a}const h=e=>(r,l=t())=>{!a&&s(e,r,l)},m=h(e),f=h(r),p=h(l),w=h(d),g=h(i),W=(a={})=>{let{url:s,data:t={},method:e="GET",header:r={}}=a;return s="https://tea.qingnian8.com/api/bizhi"+s,r["access-key"]="adiu666",new Promise(((a,l)=>{n({url:s,data:t,method:e,header:r,success:s=>{0===s.data.errCode?a(s.data):400===s.data.errCode?(o({title:"错误提示",content:s.data.errMsg,showCancel:!1}),l(s.data)):(u({title:s.data.errMsg,icon:"none"}),s.reject(s.data))},fail:a=>{l(a)}})}))},j=()=>W({url:"/homeBanner"}),y=()=>W({url:"/randomWall"}),C=(a={})=>W({url:"/wallNewsList",data:a}),L=(a={})=>W({url:"/classify",data:a}),N=(a={})=>W({url:"/wallList",data:a}),b=(a={})=>W({url:"/setupScore",data:a}),k=(a={})=>W({url:"/detailWall",data:a}),x=(a={})=>W({url:"/userInfo",data:a}),B=(a={})=>W({url:"/userWallList",data:a}),M=(a={})=>W({url:"/wallNewsDetail",data:a}),q=(a={})=>W({url:"/searchWall",data:a});export{w as a,j as b,y as c,C as d,L as e,x as f,m as g,p as h,f as i,B as j,N as k,k as l,b as m,M as n,g as o,q as p,c as r};
