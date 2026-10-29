import gsap from "gsap";
import type { WeatherCondition } from "@/lib/weather/weather-code-to-condition";

// Plays forward and back once, so the icon ends where it started
const THERE_AND_BACK = { repeat: 1, yoyo: true, ease: "sine.inOut" } as const;

// Short animations for the current weather icon, one per condition.
// Each one stops within 5s (WCAG 2.2.2 Pause, Stop, Hide)
export const ICON_ANIMATIONS: Record<
  WeatherCondition,
  (target: string) => void
> = {
  clear: (target) => {
    gsap.to(target, {
      scale: 1.08,
      rotate: 15,
      duration: 2,
      ...THERE_AND_BACK,
    });
  },
  cloudy: (target) => {
    gsap.to(target, {
      keyframes: { x: [0, -4, 4, -4, 0] },
      duration: 4,
      ease: "sine.inOut",
    });
  },
  fog: (target) => {
    gsap.to(target, { opacity: 0.5, duration: 2, ...THERE_AND_BACK });
  },
  rain: (target) => {
    gsap.to(target, { y: 3, duration: 0.6, ...THERE_AND_BACK, repeat: 5 });
  },
  snow: (target) => {
    gsap.to(target, {
      keyframes: { y: [0, 3, 0, 3, 0], rotate: [0, -5, 5, -5, 0] },
      duration: 4,
      ease: "sine.inOut",
    });
  },
  storm: (target) => {
    gsap
      .timeline({ repeat: 1, repeatDelay: 2.5 })
      .to(target, { opacity: 0.4, x: -2, duration: 0.08 })
      .to(target, { opacity: 1, x: 2, duration: 0.08 })
      .to(target, { opacity: 0.6, x: -1, duration: 0.06 })
      .to(target, { opacity: 1, x: 0, duration: 0.1 });
  },
};
