/**
 * Emotion-optimised easing curves, duration presets, and spring configurations.
 *
 * Every curve was chosen for a specific feel — not pulled from a library.
 * Framer Motion accepts these directly on `transition.ease`.
 */

export const easings = {
  /** Buttery, luxurious deceleration. Use for: card entrances, content reveals. */
  silk: [0.16, 1, 0.3, 1] as const,

  /** Quick initiation, gentle arrival. Use for: hover states, micro-interactions. */
  snap: [0.22, 1, 0.36, 1] as const,

  /** Playful overshoot. Use for: scale transforms, icon bounces. */
  bounce: [0.34, 1.56, 0.64, 1] as const,

  /** High-contrast editorial. Use for: expanded-view transitions, major state changes. */
  dramatic: [0.76, 0, 0.24, 1] as const,

  /** Subtle, ambient. Use for: background shifts, particle movement. */
  gentle: [0.25, 0.1, 0.25, 1] as const,

  /** Springy, organic. Use for: cursor followers, magnetic effects. */
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const durations = {
  instant: 0.15,
  quick: 0.3,
  normal: 0.5,
  slow: 0.8,
  deliberate: 1.2,
  cinematic: 1.8,
} as const;

export const springPresets = {
  heavy: { stiffness: 100, damping: 20, mass: 1.2 },
  medium: { stiffness: 200, damping: 25, mass: 0.8 },
  light: { stiffness: 350, damping: 20, mass: 0.5 },
  feather: { stiffness: 500, damping: 15, mass: 0.3 },
  tilt: { stiffness: 150, damping: 15, mass: 0.6 },
} as const;
