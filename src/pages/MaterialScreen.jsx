import React, { useState } from 'react';
import { Settings, ArrowLeft, Package, Layers, Home, Square, Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaterialScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lager'); // 'lager' or 'einsatz'

  const materials = [
    { title: 'Zargen', subtitle: '(DNM)', available: 12, icon: <Layers size={20} color="#ffaa00" />, iconBg: '#4a3b1e' },
    { title: 'Böden', subtitle: '', available: 4, icon: <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}><div style={{width: '20px', height: '4px', backgroundColor: '#ffaa00', borderRadius: '2px'}}></div><div style={{width: '20px', height: '4px', backgroundColor: '#ffaa00', borderRadius: '2px'}}></div><div style={{width: '20px', height: '4px', backgroundColor: '#ffaa00', borderRadius: '2px'}}></div></div>, iconBg: '#4a3b1e' },
    { title: 'Deckel', subtitle: '', available: 6, icon: <Home size={20} color="#ffaa00" />, iconBg: '#4a3b1e' },
  ];

  const frames = [
    { title: 'Rähmchen', subtitle: '(Leer)', subtext: 'Verdrahtet', available: 45, icon: <Square size={20} fill="var(--color-primary-green)" color="var(--color-primary-green)" />, iconBg: '#1a4a1c' },
    { title: 'Mittelwände', subtitle: '', subtext: 'Wachs', available: 120, icon: <div style={{width: '20px', height: '20px', backgroundColor: 'var(--color-primary-green)', borderRadius: '4px', opacity: 0.8}}></div>, iconBg: '#1a4a1c' },
  ];

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Materialverwaltung</h1>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <Settings size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
        <div 
          onClick={() => setActiveTab('lager')}
          style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
            backgroundColor: activeTab === 'lager' ? 'var(--color-primary-green)' : 'transparent',
            color: activeTab === 'lager' ? '#000' : 'var(--color-text-secondary)'
          }}
        >
          Im Lager
        </div>
        <div 
          onClick={() => setActiveTab('einsatz')}
          style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
            backgroundColor: activeTab === 'einsatz' ? 'var(--color-primary-green)' : 'transparent',
            color: activeTab === 'einsatz' ? '#000' : 'var(--color-text-secondary)'
          }}
        >
          Im Einsatz
        </div>
      </div>

      {/* Progress Card */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>WABEN ERNEUERT</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Ziel: 30% pro Jahr</div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary-green)' }}>18%</div>
        </div>

        <div style={{ height: '8px', backgroundColor: '#1e2b20', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ width: '18%', height: '100%', backgroundColor: 'var(--color-primary-green)', borderRadius: '4px' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          <span>0%</span>
          <span>150 / 830 Rähmchen</span>
          <span>30%</span>
        </div>
      </div>

      {/* Beuten & Zargen Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '32px' }}>
        <div style={{ color: '#ffaa00' }}><Package size={20} /></div>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Beuten & Zargen</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {materials.map((item, idx) => (
          <div key={idx} className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item.title} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{item.subtitle}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Verfügbar</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: '#2a3b2c', color: 'var(--color-text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</button>
              <span style={{ fontSize: '18px', fontWeight: 'bold', width: '28px', textAlign: 'center' }}>{item.available}</span>
              <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: '#000', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Rähmchen & Waben Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '32px' }}>
        <div style={{ color: '#ffaa00' }}><Hexagon size={20} /></div>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Rähmchen & Waben</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {frames.map((item, idx) => (
          <div key={idx} className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item.title} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{item.subtitle}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.subtext}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: '#2a3b2c', color: 'var(--color-text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</button>
              <span style={{ fontSize: '18px', fontWeight: 'bold', width: '28px', textAlign: 'center' }}>{item.available}</span>
              <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: '#000', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Fütterung Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '32px' }}>
        <div style={{ color: '#ffaa00' }}><Droplet size={20} /></div>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Fütterung</h2>
      </div>

      <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#66a3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ width: '4px', height: '4px', backgroundColor: '#1e3a5f', borderRadius: '50%', transform: 'translate(-2px, -2px)'}}></div>
             <div style={{ width: '3px', height: '3px', backgroundColor: '#1e3a5f', borderRadius: '50%', transform: 'translate(4px, 2px)'}}></div>
             <div style={{ width: '4px', height: '4px', backgroundColor: '#1e3a5f', borderRadius: '50%', transform: 'translate(-4px, 4px)'}}></div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Futterteig</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Kg</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: '#2a3b2c', color: 'var(--color-text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</button>
          <span style={{ fontSize: '18px', fontWeight: 'bold', width: '36px', textAlign: 'center' }}>2.5</span>
          <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-primary-green)', color: '#000', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
      </div>
      
      <button className="fab">
        <span style={{ fontSize: '32px', fontWeight: '400', marginTop: '-4px' }}>+</span>
      </button>

    </div>
  );
}

// Temporary icon component since Hexagon is needed here
function Hexagon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    </svg>
  );
}
