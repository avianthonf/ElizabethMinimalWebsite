"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const heroParticles: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true } },
    color: { value: ["#c9a96e", "#ffffff", "#5DADE2"] },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 1, sync: false },
    },
    move: {
      enable: true,
      speed: { min: 0.3, max: 1 },
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: { default: "bounce" as const },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#c9a96e",
      opacity: 0.15,
      width: 1,
    },
  },
  detectRetina: true,
  background: { color: "transparent" },
};

/**
 * Hero particle background in the hero section.
 * Initialised ONCE via ParticlesProvider; lazy-loaded via next/dynamic
 * in the hero carousel component to avoid SSR overhead.
 */
function HeroParticlesInner() {
  return (
    <Particles
      id="hero-particles"
      options={heroParticles}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

async function engineInit(engine: import("@tsparticles/engine").Engine) {
  const { loadBasic } = await import("@tsparticles/basic");
  await loadBasic(engine);
}

/**
 * HeroParticleBackground — subtle particle animation behind the hero carousel.
 *
 * Uses tsParticles v4 with a light network of gold/white/blue particles
 * that drift gently within the hero section bounds. FullScreen is disabled
 * so particles stay within the parent container.
 *
 * Lazy-loaded via next/dynamic in the parent to avoid SSR bundle.
 */
export function HeroParticleBackground() {
  return (
    <ParticlesProvider init={engineInit}>
      <HeroParticlesInner />
    </ParticlesProvider>
  );
}
