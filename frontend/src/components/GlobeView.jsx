import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

// Standard 110m Admin-0 Countries GeoJSON
const GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

/**
 * Calculates approximate centroid (lat, lng) of a GeoJSON Polygon or MultiPolygon.
 * For MultiPolygon, prioritizes the largest polygon (mainland).
 */
function getFeatureCenter(feature) {
  const geom = feature?.geometry;
  if (!geom) return { lat: 0, lng: 0 };

  let coords = [];
  if (geom.type === 'Polygon') {
    coords = geom.coordinates[0] || [];
  } else if (geom.type === 'MultiPolygon') {
    let maxPoints = 0;
    for (const poly of geom.coordinates) {
      if (poly[0] && poly[0].length > maxPoints) {
        maxPoints = poly[0].length;
        coords = poly[0];
      }
    }
  }

  if (!coords || coords.length === 0) return { lat: 0, lng: 0 };

  let sumLng = 0;
  let sumLat = 0;
  for (const [lng, lat] of coords) {
    sumLng += lng;
    sumLat += lat;
  }

  return {
    lat: sumLat / coords.length,
    lng: sumLng / coords.length,
  };
}

/**
 * GlobeView Component
 * Renders the 3D interactive Earth globe with clickable country boundaries.
 */
export default function GlobeView({ selectedCountryName, onSelectCountry }) {
  const globeEl = useRef(null);
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track window resizing
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch standard GeoJSON country dataset
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCountries(data.features || []);
      })
      .catch((err) => {
        console.error('Failed to load GeoJSON countries data:', err);
      });
  }, []);

  // Sync selected feature if external selectedCountryName is cleared
  useEffect(() => {
    if (!selectedCountryName) {
      setSelectedFeature(null);
    }
  }, [selectedCountryName]);

  // Configure initial globe camera and auto-rotation
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 2.2 }, 0);
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
      }
    }
  }, []);

  // Handle country polygon selection
  const handlePolygonClick = (feature) => {
    if (!feature || !feature.properties) return;

    const countryName =
      feature.properties.ADMIN ||
      feature.properties.NAME ||
      feature.properties.name ||
      feature.properties.sovereignt ||
      'Unknown';

    setSelectedFeature(feature);

    // Stop auto-rotation when user explores a specific country
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }

      // Smoothly animate camera to center on the selected country
      const center = getFeatureCenter(feature);
      globeEl.current.pointOfView(
        {
          lat: center.lat,
          lng: center.lng,
          altitude: 1.6, // Zoom in for a closer look
        },
        1200 // 1.2 second smooth transition
      );
    }

    // Trigger parent callback to fetch trivia
    if (onSelectCountry) {
      onSelectCountry(countryName);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.2}
        
        // Polygons setup
        polygonsData={countries}
        polygonGeoJsonGeometry={(d) => d.geometry}
        polygonAltitude={(d) => {
          if (d === selectedFeature) return 0.05;
          if (d === hoveredCountry) return 0.025;
          return 0.008;
        }}
        polygonCapColor={(d) => {
          if (d === selectedFeature) {
            // Bright coral/amber highlight for selected country
            return 'rgba(244, 63, 94, 0.75)';
          }
          if (d === hoveredCountry) {
            // Subtle cyan/indigo highlight on hover
            return 'rgba(56, 189, 248, 0.55)';
          }
          // Translucent frosted glass look over the blue marble texture
          return 'rgba(255, 255, 255, 0.12)';
        }}
        polygonSideColor={(d) => {
          if (d === selectedFeature) return 'rgba(244, 63, 94, 0.4)';
          return 'rgba(15, 23, 42, 0.2)';
        }}
        polygonStrokeColor={(d) => {
          if (d === selectedFeature) return '#ffe4e6';
          if (d === hoveredCountry) return '#bae6fd';
          return 'rgba(255, 255, 255, 0.35)';
        }}
        polygonLabel={({ properties: d }) => {
          const name = d.ADMIN || d.NAME || d.name || 'Country';
          return `
            <div style="
              background: rgba(15, 23, 42, 0.88);
              backdrop-filter: blur(8px);
              color: #f8fafc;
              padding: 8px 14px;
              border-radius: 10px;
              font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
              font-size: 13px;
              font-weight: 600;
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
              pointer-events: none;
            ">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 14px;">📍</span>
                <span>${name}</span>
              </div>
              <span style="display: block; font-size: 11px; font-weight: 400; color: #94a3b8; margin-top: 2px;">
                Click to explore trivia
              </span>
            </div>
          `;
        }}
        onPolygonHover={setHoveredCountry}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}
