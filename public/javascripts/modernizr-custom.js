/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-ambientlight-batteryapi-getusermedia-localstorage-notification-pagevisibility-speechrecognition-webaudio-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,a;for(var f in y)if(y.hasOwnProperty(f)){if(e=[],t=y[f],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?Modernizr[a[0]]=i:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=i),h.push((i?"":"no-")+a.join("-"))}}function o(e){var t=b.className,n=Modernizr._config.classPrefix||"";if(w&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),w?b.className.baseVal=t:b.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):w?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function f(e,t){return!!~(""+e).indexOf(t)}function u(e,t){return function(){return e.apply(t,arguments)}}function l(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?u(i,n||t):i);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(){var e=t.body;return e||(e=s(w?"svg":"body"),e.fake=!0),e}function p(e,n,r,i){var o,a,f,u,l="modernizr",d=s("div"),p=c();if(parseInt(r,10))for(;r--;)f=s("div"),f.id=i?i[r]:l+(r+1),d.appendChild(f);return o=s("style"),o.type="text/css",o.id="s"+l,(p.fake?p:d).appendChild(o),p.appendChild(d),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),d.id=l,p.fake&&(p.style.background="",p.style.overflow="hidden",u=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=u,b.offsetHeight):d.parentNode.removeChild(d),!!a}function m(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(d(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+d(t[i])+":"+r+")");return o=o.join(" or "),p("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function v(e,t,i,o){function u(){d&&(delete P.style,delete P.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var l=m(e,i);if(!r(l,"undefined"))return l}for(var d,c,p,v,g,h=["modernizr","tspan"];!P.style;)d=!0,P.modElem=s(h.shift()),P.style=P.modElem.style;for(p=e.length,c=0;p>c;c++)if(v=e[c],g=P.style[v],f(v,"-")&&(v=a(v)),P.style[v]!==n){if(o||r(i,"undefined"))return u(),"pfx"==t?v:!0;try{P.style[v]=i}catch(y){}if(P.style[v]!=g)return u(),"pfx"==t?v:!0}return u(),!1}function g(e,t,n,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?v(a,t,i,o):(a=(e+" "+E.join(s+" ")+s).split(" "),l(a,t,n))}var h=[],y=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){y.push({name:e,fn:t,options:n})},addAsyncTest:function(e){y.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr,Modernizr.addTest("notification",function(){if(!e.Notification||!e.Notification.requestPermission)return!1;if("granted"===e.Notification.permission)return!0;try{new e.Notification("")}catch(t){if("TypeError"===t.name)return!1}return!0}),Modernizr.addTest("webaudio",function(){var t="webkitAudioContext"in e,n="AudioContext"in e;return Modernizr._config.usePrefixes?t||n:n}),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}});var b=t.documentElement,w="svg"===b.nodeName.toLowerCase(),x=function(){function e(e,t){var i;return e?(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,i=e in t,!i&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),i="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),i):!1}var r=!("onblur"in t.documentElement);return e}();C.hasEvent=x,Modernizr.addTest("ambientlight",x("devicelight",e));var _="Moz O ms Webkit",S=C._config.usePrefixes?_.split(" "):[];C._cssomPrefixes=S;var T=function(t){var r,i=prefixes.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var s=0;i>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in o)return"@-"+a.toLowerCase()+"-"+t}return!1};C.atRule=T;var E=C._config.usePrefixes?_.toLowerCase().split(" "):[];C._domPrefixes=E;var N={elem:s("modernizr")};Modernizr._q.push(function(){delete N.elem});var P={style:N.elem.style};Modernizr._q.unshift(function(){delete P.style}),C.testAllProps=g;var z=C.prefixed=function(e,t,n){return 0===e.indexOf("@")?T(e):(-1!=e.indexOf("-")&&(e=a(e)),t?g(e,t,n):g(e,"pfx"))};Modernizr.addTest("batteryapi",!!z("battery",navigator),{aliases:["battery-api"]}),Modernizr.addTest("pagevisibility",!!z("hidden",t,!1)),Modernizr.addTest("speechrecognition",!!z("SpeechRecognition",e)),Modernizr.addTest("getusermedia",!!z("getUserMedia",navigator)),i(),o(h),delete C.addTest,delete C.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);