import React from 'react';
import { Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { UnitItem } from '../../types/unit';

interface UnitMasterplanCanvasProps {
  unit: UnitItem | null;
  zoomLevel: number;
}

export const UnitMasterplanCanvas: React.FC<UnitMasterplanCanvasProps> = ({ unit, zoomLevel }) => {
  // Derive stable pseudo coordinates from unitCode
  const codeStr = String(unit?.unitCode || 'UNIT');
  const hash = codeStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pinX = 35 + (hash % 35); // 35% to 70%
  const pinY = 30 + ((hash * 7) % 40); // 30% to 70%

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0f172a',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(#334155 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          bgcolor: '#0f172a',
          transform: `scale(${zoomLevel})`,
          transformOrigin: `${pinX}% ${pinY}%`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* SVG Masterplan Blueprint Artwork - Unified exact layout */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 700"
          style={{ width: '100%', height: '100%', opacity: 0.85 }}
        >
          {/* Lake / Canal curves */}
          <path
            d="M 50,350 Q 250,200 500,320 T 950,300"
            fill="none"
            stroke="#0284c7"
            strokeWidth="45"
            opacity="0.4"
          />
          <path
            d="M 200,600 Q 400,450 650,550 T 900,450"
            fill="none"
            stroke="#0284c7"
            strokeWidth="35"
            opacity="0.3"
          />

          {/* Sub-divisions / Phases blocks */}
          <rect x="150" y="120" width="180" height="140" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
          <text x="240" y="200" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 1</text>

          <rect x="380" y="100" width="220" height="160" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
          <text x="490" y="190" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 2</text>

          <rect x="650" y="140" width="200" height="130" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
          <text x="750" y="215" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 3</text>

          <rect x="250" y="380" width="240" height="160" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
          <text x="370" y="470" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU ÁNH DƯƠNG</text>

          <rect x="540" y="370" width="260" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
          <text x="670" y="465" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU VỊNH TÂY</text>
        </svg>

        {/* Glowing Pulsing Pin Target on Specific Unit Coordinates */}
        {unit && (
          <Box
            sx={{
              position: 'absolute',
              top: `${pinY}%`,
              left: `${pinX}%`,
              transform: 'translate(-50%, -100%)',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Unit Badge on Map */}
            <Box
              sx={{
                bgcolor: '#dc2626',
                color: '#ffffff',
                px: 1.2,
                py: 0.3,
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '11px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)',
                mb: 0.3,
                animation: 'pulse 1.8s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              {unit.unitCode}
            </Box>

            {/* Pin Icon */}
            <LocationOnIcon
              sx={{
                color: '#ef4444',
                fontSize: 32,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
              }}
            />

            {/* Ground ripple circle effect */}
            <Box
              sx={{
                width: 14,
                height: 6,
                bgcolor: 'rgba(239, 68, 68, 0.6)',
                borderRadius: '50%',
                mt: -0.5,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
