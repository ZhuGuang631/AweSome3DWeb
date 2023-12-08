export default (fn, delay) => {
    let timeId = null;
    return (...args) => {    // 这里用剩余参数替代了参数列表，本身就是一个数组，直接传入即可
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}