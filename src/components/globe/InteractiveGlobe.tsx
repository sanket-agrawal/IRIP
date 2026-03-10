"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import * as topojson from "topojson-client";
import type { Topology, GeometryObject } from "topojson-specification";
import { useGlobeStore } from "@/store/useGlobeStore";
import {
  mockCountryData,
  numericToAlpha3,
  getRiskColor,
} from "@/lib/mock-data";

interface CountryFeature {
  type: "Feature";
  id: string;
  properties: { name: string };
  geometry: GeoJSON.Geometry;
}

export default function InteractiveGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    isAutoRotating,
    setAutoRotating,
    setSelectedCountry,
    setHoveredCountryIso,
    hoveredCountryIso,
  } = useGlobeStore();

  useEffect(() => {
    fetch("/globe/countries-110m.json")
      .then((res) => res.json())
      .then((data: Topology<{ countries: GeometryObject }>) => {
        const geojson = topojson.feature(data, data.objects.countries);
        if (geojson.type === "FeatureCollection") {
          setCountries(geojson.features as unknown as CountryFeature[]);
        }
      });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setDimensions({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = isAutoRotating;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.rotateSpeed = 0.8;
        controls.minDistance = 150;
        controls.maxDistance = 500;
      }
    }
  }, [isAutoRotating]);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 25, lng: 30, altitude: 2.2 }, 0);
    }
  }, []);

  // On mobile, prevent globe canvas from stealing scroll.
  // Allow two-finger gestures for rotation but let single-finger scroll the page.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    const handler = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        e.stopPropagation();
      }
    };

    const canvas = el.querySelector("canvas");
    if (canvas) {
      canvas.style.touchAction = "pan-y";
    }

    return () => {
      if (canvas) {
        canvas.style.touchAction = "";
      }
    };
  }, [countries]);

  const polygonColor = useCallback(
    (feat: object) => {
      const f = feat as CountryFeature;
      const alpha3 = numericToAlpha3[f.id];
      const data = alpha3 ? mockCountryData[alpha3] : null;

      if (hoveredCountryIso && alpha3 === hoveredCountryIso) {
        return "rgba(6, 182, 212, 0.5)";
      }

      if (data) {
        return getRiskColor(data.riskScores.overall);
      }

      return "rgba(255, 255, 255, 0.06)";
    },
    [hoveredCountryIso]
  );

  const polygonSideColor = useCallback(() => "rgba(255, 255, 255, 0.03)", []);
  const polygonStrokeColor = useCallback(() => "rgba(255, 255, 255, 0.08)", []);

  const handlePolygonHover = useCallback(
    (feat: object | null) => {
      if (!feat) {
        setHoveredCountryIso(null);
        return;
      }
      const f = feat as CountryFeature;
      const alpha3 = numericToAlpha3[f.id];
      setHoveredCountryIso(alpha3 || null);
    },
    [setHoveredCountryIso]
  );

  const handlePolygonClick = useCallback(
    (feat: object) => {
      const f = feat as CountryFeature;
      const alpha3 = numericToAlpha3[f.id];
      if (alpha3 && mockCountryData[alpha3]) {
        setAutoRotating(false);
        setSelectedCountry(mockCountryData[alpha3]);

        if (globeRef.current) {
          const geom = f.geometry;
          let lat = 0;
          let lng = 0;

          if (geom.type === "Polygon") {
            const coords = geom.coordinates[0];
            lat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
            lng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
          } else if (geom.type === "MultiPolygon") {
            const allCoords = geom.coordinates.flat(2) as number[][];
            lat = allCoords.reduce((s, c) => s + c[1], 0) / allCoords.length;
            lng = allCoords.reduce((s, c) => s + c[0], 0) / allCoords.length;
          }

          globeRef.current.pointOfView({ lat, lng, altitude: 1.8 }, 1000);
        }
      }
    },
    [setAutoRotating, setSelectedCountry]
  );

  const polygonLabel = useCallback((feat: object) => {
    const f = feat as CountryFeature;
    const alpha3 = numericToAlpha3[f.id];
    const data = alpha3 ? mockCountryData[alpha3] : null;
    if (!data) return f.properties.name || "";
    return `
      <div style="
        background: rgba(10,10,15,0.95);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 10px;
        padding: 10px 14px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #e8edf8;
        min-width: 160px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      ">
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">
          ${data.flag} ${data.name}
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="
            font-size: 10px;
            font-family: 'JetBrains Mono', monospace;
            padding: 2px 6px;
            border-radius: 4px;
            background: ${data.riskScores.overall <= 2.5 ? 'rgba(16,185,129,0.15)' : data.riskScores.overall <= 5 ? 'rgba(245,158,11,0.15)' : data.riskScores.overall <= 7.5 ? 'rgba(249,115,22,0.15)' : 'rgba(239,68,68,0.15)'};
            color: ${data.riskScores.overall <= 2.5 ? '#10b981' : data.riskScores.overall <= 5 ? '#f59e0b' : data.riskScores.overall <= 7.5 ? '#f97316' : '#ef4444'};
          ">
            Risk: ${data.riskScores.overall.toFixed(1)}
          </span>
          <span style="font-size: 10px; color: #6b7a9a; font-family: 'JetBrains Mono', monospace;">
            ${data.trackedCompanies} companies
          </span>
        </div>
      </div>
    `;
  }, []);

  const polygonAltitude = useCallback(
    (feat: object) => {
      const f = feat as CountryFeature;
      const alpha3 = numericToAlpha3[f.id];
      if (hoveredCountryIso && alpha3 === hoveredCountryIso) return 0.02;
      return 0.006;
    },
    [hoveredCountryIso]
  );

  const globeImageUrl = useMemo(
    () => "//unpkg.com/three-globe/example/img/earth-dark.jpg",
    []
  );

  const atmosphereColor = useMemo(() => "#06b6d4", []);

  if (countries.length === 0) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="text-cyan-accent font-mono text-sm animate-pulse">
          Loading globe...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={() => setAutoRotating(false)}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width || undefined}
        height={dimensions.height || undefined}
        globeImageUrl={globeImageUrl}
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor={atmosphereColor}
        atmosphereAltitude={0.25}
        polygonsData={countries}
        polygonAltitude={polygonAltitude}
        polygonCapColor={polygonColor}
        polygonSideColor={polygonSideColor}
        polygonStrokeColor={polygonStrokeColor}
        polygonLabel={polygonLabel}
        onPolygonHover={handlePolygonHover}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={200}
        animateIn={true}
      />
    </div>
  );
}
