import{B as e,C as o}from"./index-DIgI07t-.js";const t=e=>{const o=Date.now()-e;return o<6e4?"1分钟内":o<36e5?Math.floor(o/6e4)+"分钟":o<864e5?Math.floor(o/36e5)+"小时":o<2592e6?Math.floor(o/864e5)+"天":o<7776e6?Math.floor(o/2592e6)+"月":null},n=()=>{e({title:"提示",content:"页面有误，将跳转回首页",showCancel:!1,success:e=>{e.confirm&&o({url:"/pages/index/index"})}})};export{t as f,n as g};
