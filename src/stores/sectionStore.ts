import { writable } from 'svelte/store';

// Init a store with the value of 'hero' (default section)
export const currentSection = writable('hero');