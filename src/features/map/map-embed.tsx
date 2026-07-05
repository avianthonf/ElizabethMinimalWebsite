"use client";

import { useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression, DivIcon } from "leaflet";
import { divIcon } from "leaflet";
import {
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT,
  SCHOOL_COORDINATES,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from "@/domains/contact/contact.data";
import styles from "./map-embed.module.css";

// ── Default school data ────────────────────────────────────────────────

const DEFAULT_SCHOOL_NAME = "St. Elizabeth's High School";

const DEFAULT_ADDRESS = [
  SCHOOL_ADDRESS.street,
  SCHOOL_ADDRESS.area,
  `${SCHOOL_ADDRESS.city} ${SCHOOL_ADDRESS.pinCode}`,
  SCHOOL_ADDRESS.country,
].join(", ");

const DEFAULT_DIRECTIONS_URL = GOOGLE_MAPS_DIRECTIONS_URL;

// ── Custom marker icon ─────────────────────────────────────────────────

/**
 * Creates a hand-drawn style pin marker using SVG.
 * Uses the school's royal blue brand colour with a chalk-white interior.
 */
function createSchoolMarkerIcon(): DivIcon {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44" fill="none">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28C32 7.163 24.837 0 16 0z"
            fill="#1B2A4A" stroke="#0F1D35" stroke-width="1.5"
            stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="16" cy="15" r="8" fill="white" opacity="0.95"/>
      <text x="16" y="19" text-anchor="middle" font-family="Georgia, serif"
            font-size="11" font-weight="700" fill="#1B2A4A">E</text>
    </svg>`;

  return divIcon({
    html: svg,
    className: styles.markerIcon,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -40],
  });
}

// ── Props ──────────────────────────────────────────────────────────────

export interface MapEmbedProps {
  /** Center latitude (default: Pomburpa, Goa) */
  lat?: number;
  /** Center longitude (default: Pomburpa, Goa) */
  lng?: number;
  /** Zoom level 1–20 (default: 14) */
  zoom?: number;
  /** School name shown in popup */
  schoolName?: string;
  /** School address shown in popup */
  address?: string;
  /** Phone number shown in popup */
  phone?: string;
  /** Office hours shown in popup */
  hours?: string;
  /** Google Maps directions URL */
  directionsUrl?: string;
  /** Custom className for the outer wrapper */
  className?: string;
}

// ── Component ──────────────────────────────────────────────────────────

/**
 * MapEmbed — interactive Leaflet map with styled marker and popup.
 *
 * Uses OpenStreetMap tiles (no API key required).
 * Scroll zoom is disabled by default for better UX; tap/click zoom is
 * still available. Touch pinch-to-zoom works on mobile.
 *
 * Lazy-loaded at consumer sites via `next/dynamic` with `{ ssr: false }`
 * because Leaflet requires `window`.
 */
export function MapEmbed({
  lat = SCHOOL_COORDINATES.lat,
  lng = SCHOOL_COORDINATES.lng,
  zoom = 14,
  schoolName = DEFAULT_SCHOOL_NAME,
  address = DEFAULT_ADDRESS,
  phone = SCHOOL_CONTACT.phone,
  hours = SCHOOL_CONTACT.hours,
  directionsUrl = DEFAULT_DIRECTIONS_URL,
  className,
}: MapEmbedProps) {
  const [mapReady, setMapReady] = useState(false);

  const center: LatLngExpression = useMemo(() => [lat, lng], [lat, lng]);

  const markerIcon = useMemo(() => createSchoolMarkerIcon(), []);

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, []);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {/* Loading skeleton */}
      {!mapReady && (
        <div className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonPulse} />
        </div>
      )}

      <MapContainer
        center={center}
        zoom={zoom}
        className={styles.map}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={true}
        whenReady={handleMapReady}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={markerIcon}>
          <Popup className={styles.popup}>
            <div className={styles.popupContent}>
              <h3 className={styles.popupTitle}>{schoolName}</h3>

              <address className={styles.popupAddress}>
                <span className={styles.popupIcon} aria-hidden="true">
                  &#9906;
                </span>
                {address}
              </address>

              <div className={styles.popupDetails}>
                <div className={styles.popupDetail}>
                  <span className={styles.popupIcon} aria-hidden="true">
                    &#9743;
                  </span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
                </div>

                {hours && (
                  <div className={styles.popupDetail}>
                    <span className={styles.popupIcon} aria-hidden="true">
                      &#128336;
                    </span>
                    <span>{hours}</span>
                  </div>
                )}
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                Get Directions
                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
