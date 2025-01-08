import { writable } from 'svelte/store';

export const galleryImages = writable([
  { src: "/images/template1.png", text: "Artwork 1" },
  { src: "/images/template2.png", text: "Artwork 2" }
]);

export const positionedImages = writable([]);