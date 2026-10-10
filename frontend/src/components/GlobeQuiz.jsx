import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';

const GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

/**
 * Calculates approximate centroid (lat, lng) of a GeoJSON Polygon or MultiPolygon.
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
 * Robust matching between GeoJSON feature properties and the quiz target country.
 */
export function isCountryMatch(featureProps, targetQuestion) {
  if (!featureProps || !targetQuestion) return false;

  const targetCode = targetQuestion.targetCountryCode?.toUpperCase();
  const targetIso3 = targetQuestion.iso3?.toUpperCase();
  const targetName = targetQuestion.targetCountryName?.toLowerCase().trim();

  const iso2 = (featureProps.ISO_A2 || featureProps.WB_A2 || '').toUpperCase();
  const iso3 = (featureProps.ISO_A3 || featureProps.ADM0_A3 || featureProps.SOV_A3 || '').toUpperCase();
  const name = (featureProps.ADMIN || featureProps.NAME || featureProps.SOVEREIGNT || '').toLowerCase().trim();

  if (targetCode && (iso2 === targetCode || iso3 === targetCode)) return true;
  if (targetIso3 && (iso2 === targetIso3 || iso3 === targetIso3)) return true;
  if (targetName && (name === targetName || name.includes(targetName) || targetName.includes(name))) return true;

  return false;
}

/**
 * GlobeQuiz Component
 * Interactive 3D globe configured for the Country Quiz game loop.
 */
export default function GlobeQuiz({ 
  currentQuestion, 
  feedback, 
  lastClickedFeature, 
  onCountryClick 
}) {
  const globeEl = useRef(null);
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Responsive window tracking
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

  // Fetch GeoJSON country boundaries
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
        console.error('Failed to load GeoJSON dataset:', err);
      });
  }, []);

  // Initialize globe controls
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 2.3 }, 0);
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
      }
    }
  }, []);

  // When answer is correct, smoothly fly camera to center on the target country
  useEffect(() => {
    if (feedback?.status === 'correct' && globeEl.current && countries.length > 0) {
      const targetFeature = countries.find(f => isCountryMatch(f.properties, currentQuestion));
      if (targetFeature) {
        const center = getFeatureCenter(targetFeature);
        globeEl.current.pointOfView(
          {
            lat: center.lat,
            lng: center.lng,
            altitude: 1.5,
          },
          1300
        );
      }
    }
  }, [feedback?.status, currentQuestion, countries]);

  // Click handler
  const handlePolygonClick = (feature) => {
    if (!feature || !feature.properties) return;

    // Pause auto-rotation on user click
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
    }

    if (onCountryClick) {
      onCountryClick(feature);
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

        // Polygon GeoJSON configuration
        polygonsData={countries}
        polygonGeoJsonGeometry={(d) => d.geometry}
        polygonAltitude={(d) => {
          const isTargetMatch = currentQuestion && isCountryMatch(d.properties, currentQuestion);
          if (feedback?.status === 'correct' && isTargetMatch) return 0.06;
          if (feedback?.status === 'incorrect' && d === lastClickedFeature) return 0.04;
          if (d === hoveredCountry) return 0.02;
          return 0.006;
        }}
        polygonCapColor={(d) => {
          const isTargetMatch = currentQuestion && isCountryMatch(d.properties, currentQuestion);
          
          // Correct answer: Glowing vibrant green
          if (feedback?.status === 'correct' && isTargetMatch) {
            return 'rgba(34, 197, 94, 0.85)';
          }

          // Incorrect click attempt: Vibrant warning red
          if (feedback?.status === 'incorrect' && d === lastClickedFeature) {
            return 'rgba(239, 68, 68, 0.85)';
          }

          // Hovered country: Cyan
          if (d === hoveredCountry) {
            return 'rgba(56, 189, 248, 0.6)';
          }

          // Default frosted glass look
          return 'rgba(255, 255, 255, 0.12)';
        }}
        polygonSideColor={(d) => {
          const isTargetMatch = currentQuestion && isCountryMatch(d.properties, currentQuestion);
          if (feedback?.status === 'correct' && isTargetMatch) return 'rgba(34, 197, 94, 0.4)';
          if (feedback?.status === 'incorrect' && d === lastClickedFeature) return 'rgba(239, 68, 68, 0.4)';
          return 'rgba(15, 23, 42, 0.2)';
        }}
        polygonStrokeColor={(d) => {
          const isTargetMatch = currentQuestion && isCountryMatch(d.properties, currentQuestion);
          if (feedback?.status === 'correct' && isTargetMatch) return '#bbf7d0';
          if (feedback?.status === 'incorrect' && d === lastClickedFeature) return '#fecaca';
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
              padding: 6px 12px;
              border-radius: 8px;
              font-family: system-ui, sans-serif;
              font-size: 13px;
              font-weight: 600;
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
              pointer-events: none;
            ">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span>🎯</span>
                <span>${name}</span>
              </div>
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
