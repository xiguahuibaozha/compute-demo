import{r as ref,o as openBlock,c as createBlock,w as withCtx,i as index$i,a as createVNode,b as createTextVNode,t as toDisplayString,u as unref,d as createElementBlock,e as renderList,F as Fragment,n as normalizeClass,f as normalizeStyle}from"./index.b529708b.js";var dist={};(function(exports){Object.defineProperty(exports,"__esModule",{value:!0}),exports.toFixed=exports.calculate=exports.compute=void 0;const keep=8,floatToInt=e=>{let t=0;return{nums:e.map((e=>{var l,a;const n=String(e).split(".");return(null===(l=n[1])||void 0===l?void 0:l.length)>t&&(t=null===(a=n[1])||void 0===a?void 0:a.length),n})).map((e=>{var l;if(t&&((null===(l=e[1])||void 0===l?void 0:l.length)<t||!e[1])){e[1]||(e[1]="0");const l=t-e[1].length;for(let t=0;t<l;t++)e[1]+=0}return e.join("").startsWith("-")?e.join("").replace(/(^-0+)/,"-")||0:e.join("").replace(/(^0+)/,"")||0})),decimalPlaces:t}},intToFloat=(e,t)=>{var l,a;const n=e<0,o=String(Math.abs(e)).split(".");if(o[0].length<t){const e=t-o[0].length;for(let t=0;t<=e;t++)o[0]="0"+o[0]}const s=o[0].split(""),u=s.splice(s.length-t);return n?-Number([...s,".",...u,null!==(l=o[1])&&void 0!==l?l:""].join("")):Number([...s,".",...u,null!==(a=o[1])&&void 0!==a?a:""].join(""))},compute=(num1,num2,symbol)=>{var _a;const{nums:nums,decimalPlaces:decimalPlaces}=floatToInt([num1,num2]);let num=eval(nums.join(symbol));return(null===(_a=String(num).split(".")[1])||void 0===_a?void 0:_a.length)>keep&&(num=Number(num.toFixed(keep))),"*"===symbol?intToFloat(num,2*decimalPlaces):"/"===symbol?num:intToFloat(num,decimalPlaces)};exports.compute=compute;const calculate=(e,...t)=>{try{e=e.filter(Boolean).map((e=>e.trim())),t=t.map((e=>e||0));const l=(e,t)=>{if(1===t.length)return t[0];{let a=e.findIndex((e=>"*"===e||"/"===e));return-1===a&&(a=0),t.splice(a,2,(0,exports.compute)(t[a],t[a+1],e[a])),e.splice(a,1),l(e,t)}};return l(e,t)}catch(l){return console.error("计算出错了：",e,t),0}};exports.calculate=calculate;const toFixed=(e,t)=>{const l=String(e).split(".");return l[1]&&l[1].length>t?(l[1]=l[1].substring(0,t),Number(l.join("."))):e};exports.toFixed=toFixed})(dist);var index_vue_vue_type_style_index_0_scoped_true_lang="",_export_sfc=(e,t)=>{const l=e.__vccOpts||e;for(const[a,n]of t)l[a]=n;return l};const _sfc_main={__name:"index",setup(e){const t=["x^y","lg","ln","√x","x/y"],l=ref("btns4x4"),a=ref(["C","D","%","÷",7,8,9,"×",4,5,6,"-",1,2,3,"+","SW",0,".","="].map((e=>{const t={text:e,color:"black",backgroundColor:"#fbfbfb"};return isNaN(e)&&(t.color="#fb7434"),"."===e&&(t.color="black"),"="===e&&(t.color="white",t.backgroundColor="#fb7434"),"SW"===e&&(t.disabled=!0),t})));const n=ref(""),o=ref([]);let s=ref([]);const u=()=>!isNaN(o.value.at(-1)),r=e=>{if(isNaN(e)){if(t.includes(e)){switch(e){case"x^y":s.value.length||s.value.push("1"),s.value.push("^");break;case"x/y":s.value.length||s.value.push("1"),s.value.push("/");break;default:s.value.push(e)}return null}switch(e){case"-":s.value.length||s.value.push("-");case"SW":break;case"=":s.value.length&&(o.value.push(s.value.join("")),s.value=[]),n.value=dist.calculate(o.value.filter((e=>isNaN(e))).map((e=>"×"===e?"*":"÷"===e?"/":e)),...o.value.filter((e=>!isNaN(e))));break;case"C":o.value=[],s.value=[],n.value="";break;case".":s.value.includes(".")||!s.value.length&&(isNaN(o.value.at(-1))||-1!==o.value.at(-1).indexOf("."))||s.value.push(e);break;case"D":if(s.value.length)s.value.pop();else if(o.value.length){const e=o.value[o.value.length-1];o.value[o.value.length-1]=e.substring(0,e.length-1),o.value[o.value.length-1].length||o.value.pop()}break;case"%":s.value.length?s.value=String(dist.compute(parseFloat(s.value.join("")),100,"/")).split(""):u()&&(o.value[o.value.length-1]=String(dist.compute(o.value[o.value.length-1],100,"/")));break;default:s.value.length?(s.value.join("").startsWith(".")?(o.value.push(s.value.join("")),o.value.push(e)):isNaN(parseFloat(s.value.join("")))||(o.value.push(String(parseFloat(s.value.join("")))),o.value.push(e)),s.value=[]):u()&&(o.value[o.value.length-1]=String(parseFloat(o.value[o.value.length-1])),o.value.push(e))}}else s.value.push(e)};return(e,t)=>{const u=index$i;return openBlock(),createBlock(u,{class:"content"},{default:withCtx((()=>[createVNode(u,{class:"show-box"},{default:withCtx((()=>[createVNode(u,{class:"formula"},{default:withCtx((()=>[createTextVNode(toDisplayString(o.value.join(""))+toDisplayString(unref(s).join("")),1)])),_:1}),createVNode(u,{class:"result"},{default:withCtx((()=>[createTextVNode("= "+toDisplayString(n.value),1)])),_:1})])),_:1}),createVNode(u,{class:"btn-box"},{default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(a.value,(e=>(openBlock(),createBlock(u,{class:normalizeClass(["btn-box-item",{btns4x4:"btns4x4"===l.value,btns5x5:"btns5x5"===l.value,disabled:e.disabled}]),key:e,style:normalizeStyle({color:e.color,backgroundColor:e.backgroundColor}),onClick:t=>r(e.text)},{default:withCtx((()=>[createTextVNode(toDisplayString(e.text),1)])),_:2},1032,["class","style","onClick"])))),128))])),_:1})])),_:1})}}};var index=_export_sfc(_sfc_main,[["__scopeId","data-v-54de9d80"]]);export{index as default};
