import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                       */import{f as l,i as a}from"./assets/vendor-77e16229.js";const e={btn:document.querySelector("button[data-start]"),input:document.querySelector("#datetime-picker"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};let s;e.btn.disabled=!0;const m={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,closeOnEscape:!0,timeout:1e3,onClose(t){s=t[0],s<=new Date?(a.error({title:"Error",position:"topRight",message:"Please choose a date in the future"}),e.btn.disabled=!0):e.btn.disabled=!1}};l(e.input,m);e.btn.addEventListener("click",()=>{e.btn.disabled||(e.btn.disabled=!0,e.input.disabled=!0,f())});class h{constructor(n){this.intervalId=null,this.onTick=n}start(n){this.intervalId=setInterval(()=>{const o=Date.now(),r=n-o;r<=0?(clearInterval(this.intervalId),this.onTick(0),a.success({title:"Success",message:"Timer has ended!"})):this.onTick(r)},1e3)}}function f(){const t=s.getTime();new h(b).start(t)}function b(t){const n=S(t),o=p(n);e.days.textContent=o.days,e.hours.textContent=o.hours,e.minutes.textContent=o.minutes,e.seconds.textContent=o.seconds}function p({days:t,hours:n,minutes:o,seconds:r}){return t=t.toString().padStart(2,"0"),n=n.toString().padStart(2,"0"),o=o.toString().padStart(2,"0"),r=r.toString().padStart(2,"0"),{days:t,hours:n,minutes:o,seconds:r}}function S(t){const i=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),u=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:d,seconds:u}}
//# sourceMappingURL=commonHelpers.js.map
