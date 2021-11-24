import { derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

export default function throttle<T extends any = any>(store: Writable<T>, period = 100) {
	let lastUpdate: number;
	return derived(store, (value, set) => {
		let now = Date.now();
		if (!lastUpdate || now - lastUpdate > period) {
			set(value);
			lastUpdate = now;
		} else {
			const timeoutId = setTimeout(() => {
				set(value);
			}, period);

			return () => clearTimeout(timeoutId);
		}
	});
}
