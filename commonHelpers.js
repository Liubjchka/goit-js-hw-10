import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as l,i as s}from"./assets/vendor-4338649a.js";const e={btn:document.querySelector("button[data-start]"),input:document.querySelector("#datetime-picker"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};let r;e.btn.disabled=!0;const m={enableTime:!0,dateFormat:"Y-m-d H:i",altInput:!0,altFormat:"F j, Y",closeOnEscape:!0,timeout:1e3,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],r<=new Date?(s.warning({title:"Warning",message:"Please choose a date in the future"}),e.btn.disabled=!0):e.btn.disabled=!1}};l(e.input,m);e.btn.addEventListener("click",()=>{e.btn.disabled||(e.btn.disabled=!0,e.input.disabled=!0,f())});class h{constructor(n){this.intervalId=null,this.onTick=n}start(n){this.intervalId=setInterval(()=>{const o=Date.now(),a=n-o;a<=0?(clearInterval(this.intervalId),this.onTick(0),s.success({title:"Success",message:"Timer has ended!"})):this.onTick(a)},1e3)}}function f(){const t=r.getTime();new h(b).start(t)}function b(t){const n=p(t),o=S(n);e.days.textContent=o.days,e.hours.textContent=o.hours,e.minutes.textContent=o.minutes,e.seconds.textContent=o.seconds}function S({days:t,hours:n,minutes:o,seconds:a}){return t=t.toString().padStart(2,"0"),n=n.toString().padStart(2,"0"),o=o.toString().padStart(2,"0"),a=a.toString().padStart(2,"0"),{days:t,hours:n,minutes:o,seconds:a}}function p(t){const i=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),u=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:d,seconds:u}}
//# sourceMappingURL=commonHelpers.js.map
