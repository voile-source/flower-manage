// 防抖
// export default function debounce(fn, t) {
//   let delay = t || 500;
//   let timer;
//   console.log(fn)
//   console.log(typeof fn)
//   return function () {
//       let args = arguments;
//       if(timer){
//           clearTimeout(timer);
//       }
//       timer = setTimeout(() => {
//           timer = null;
//           fn.apply(this, args);
//       }, delay);
//   }
// };

// 节流
export default function throttle(fn, time) {
  let timer = null
  time = time || 1000
  return function(...args) {
    if (timer) {
      return
    }
    const _this = this
    timer = setTimeout(() => {
      timer = null
    }, time)
    fn.apply(_this, args)
  }
}
