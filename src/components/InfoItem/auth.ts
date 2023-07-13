/**
 * 防抖
 * @param fun 
 * @param wait 
 */
export function debounce(fun: Function, wait: number = 1000) {
	let timer: any;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		let isNow = !timer;
		timer = setTimeout(() => {
			timer = null;
		}, wait);
		if (isNow) fun();
	};
}

/**
 * 节流
 * @param fun 
 * @param wait 
 */
export function throttle(fun: Function, wait: number = 1000) {
	let timers: any;
	return function () {
		if (!timers) {
			timers = setTimeout(() => {
				fun();
				timers = null;
			}, wait);
		}
	};
}
