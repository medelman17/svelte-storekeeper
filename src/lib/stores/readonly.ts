import type { Writable } from 'svelte/store';

export default function readonly<T extends any>(store: Writable<T>): Writable<T> {
	return {
		subscribe: store.subscribe,
		set() {
			throw new Error('Unable to set value of a readonly store');
		},
		update: store.update
	};
}
