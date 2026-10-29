import gsap from "gsap";
import type { WeatherCondition } from "@/lib/weather/weather-code-to-condition";

const LOOP = { repeat: -1, yoyo: true, ease: "sine.inOut" } as const;

// Endless idle animations for the current weather icon, one per condition
export const ICON_ANIMATIONS: Record<
  WeatherCondition,
  (target: string) => void
> = {
  clear: (target) => {
    gsap.to(target, { scale: 1.08, rotate: 15, duration: 3, ...LOOP });
  },
  cloudy: (target) => {
    gsap.fromTo(target, { x: -4 }, { x: 4, duration: 3, ...LOOP });
  },
  fog: (target) => {
    gsap.to(target, { opacity: 0.5, duration: 2.5, ...LOOP });
  },
  rain: (target) => {
    gsap.to(target, { y: 3, duration: 0.8, ...LOOP });
  },
  snow: (target) => {
    gsap.fromTo(
      target,
      { y: 0, rotate: -5 },
      { y: 3, rotate: 5, duration: 3, ...LOOP },
    );
  },
  storm: (target) => {
    gsap
      .timeline({ repeat: -1, repeatDelay: 2.5 })
      .to(target, { opacity: 0.4, x: -2, duration: 0.08 })
      .to(target, { opacity: 1, x: 2, duration: 0.08 })
      .to(target, { opacity: 0.6, x: -1, duration: 0.06 })
      .to(target, { opacity: 1, x: 0, duration: 0.1 });
  },
};
