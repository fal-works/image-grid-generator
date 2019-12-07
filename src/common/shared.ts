import p5 from "p5";

export let p: p5;

export const setP5Instance = (p5Instance: p5) => (p = p5Instance);
