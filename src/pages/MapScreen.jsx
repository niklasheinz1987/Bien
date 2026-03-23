import React from 'react';
import { Layers, Crosshair, Search, Map as MapIcon, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// Fix for default Leaflet icons in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Icon for Beehives
const customIcon = new L.DivIcon({
  className: 'custom-map-marker',
  html: `<div style="background-color: var(--color-primary-green); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative;">
          <div style="background-color: rgba(0,255,34,0.3); width: 64px; height: 64px; border-radius: 50%; position: absolute; z-index: -1;"></div>
          <span style="font-size: 18px;">🐝</span>
         </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const warningIcon = new L.DivIcon({
  className: 'custom-map-marker-warning',
  html: `<div style="background-color: #ffaa00; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fff;">
          <span style="font-size: 16px;">🐝</span>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function MapScreen() {
  const navigate = useNavigate();
  // Example coordinates around a generic location
  const position = [48.137, 11.575]; // Munich coordinates as placeholder
  
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: '#e5e3df' }}>
      
      {/* Search Header Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapIcon size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', color: '#000', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>Bienenstandorte</h1>
          <div style={{ flex: 1 }}></div>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-dark)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Layers size={20} />
          </div>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-bg-dark)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-green)' }}>
            <Crosshair size={20} />
          </div>
        </div>
        
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Standort suchen..." 
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '24px', border: 'none', backgroundColor: 'rgba(26, 42, 28, 0.95)', color: '#fff', fontSize: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Map Leaflet */}
      <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[48.137, 11.575]} icon={customIcon} />
          <Marker position={[48.145, 11.565]} icon={warningIcon} />
          <Marker position={[48.125, 11.585]} icon={warningIcon} />
        </MapContainer>
      </div>
      
      {/* Bottom Sheet Card */}
      <div style={{ position: 'absolute', bottom: '80px', left: 0, right: 0, backgroundColor: 'var(--color-bg-dark)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', zIndex: 1000, padding: '24px' }}>
        <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--color-border)', borderRadius: '2px', margin: '0 auto 20px auto' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0' }}>Kirschgarten Süd</h2>
          <div style={{ backgroundColor: '#1a4a1c', color: 'var(--color-primary-green)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>AKTIV</div>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>📍</span> 48.137, 11.575
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, backgroundColor: 'var(--color-bg-card)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4a3b1e', color: '#ffaa00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <MapIcon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Völker</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>4</div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: 'var(--color-bg-card)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#4a1e1e', color: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{fontSize: '18px'}}>❤️</span>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Stärke</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Stark</div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
          Letzte Inspektion vor 3 Tagen. Futtervorräte sind ausreichend. Honigraum wurde aufgesetzt.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', flex: 1, color: 'var(--color-text-main)', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <span>^</span> Route
          </button>
          <button className="btn-primary" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/hive/B01')}>
            Details ansehen <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
