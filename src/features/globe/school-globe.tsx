"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

// react-globe.gl requires Three.js + browser APIs — lazy-load with ssr:false.
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

/**
 * School location marker — Goa, India.
 * Appears as a glowing gold cylinder rising from the globe surface.
 */
const SCHOOL_MARKER = {
  lat: 15.5449,
  lng: 73.9723,
  label: "St. Elizabeth's High School<br/>Pomburpa, Goa",
  color: "#D4AF37", // School gold
  radius: 0.4,
  altitude: 0.12,
};

/**
 * Glowing atmosphere colour — school navy with slight cyan tint.
 * Rendered as a bright halo surrounding the globe.
 */
const ATMOSPHERE_COLOR = "#2a4a7f";

/**
 * Fallback dimensions — used until the container mounts and real
 * measurements are available.  The globe auto-resizes on mount.
 */
const FALLBACK_SIZE = 500;

export function SchoolGlobe() {
  const globeRef = useRef<GlobeMethods>(undefined);

  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Point the camera at Goa on mount
    globe.pointOfView({ lat: SCHOOL_MARKER.lat, lng: SCHOOL_MARKER.lng, altitude: 2.5 }, 1000);

    // Start gentle auto-rotation
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  }, []);

  return (
    <div style={{ width: "100%", aspectRatio: "1 / 1", maxWidth: 640, margin: "0 auto" }}>
      <Globe
        ref={globeRef}
        width={FALLBACK_SIZE}
        height={FALLBACK_SIZE}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor={ATMOSPHERE_COLOR}
        atmosphereAltitude={0.25}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={[SCHOOL_MARKER]}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#D4AF37"}
        pointAltitude={() => 0.12}
        pointRadius={() => 0.4}
        pointLabel={() => "St. Elizabeth's High School<br/>Pomburpa, Goa"}
        pointsTransitionDuration={0}
        onGlobeReady={handleGlobeReady}
      />
    </div>
  );
}
