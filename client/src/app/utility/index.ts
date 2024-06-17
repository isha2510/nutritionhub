/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (cb: any, delay: number) => {
  let timer: any;
  return function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
