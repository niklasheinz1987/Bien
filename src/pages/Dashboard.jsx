import React from 'react';
import { Search, Filter, AlertTriangle, ChevronRight, UserCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4" style={{ padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>Meine Bienenstände</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0' }}>Hauptgarten • 12 aktive Völker</p>
        </div>
        <UserCircle size={32} color="var(--color-text-secondary)" strokeWidth={1.5} />
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Völker durchsuchen..." 
            className="search-bar"
            style={{ paddingLeft: '48px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '16px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)', cursor: 'pointer' }}>
          <Filter size={20} />
        </button>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        <div style={{ backgroundColor: 'var(--color-primary-green)', color: '#000', padding: '8px 16px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap' }}>Alle (12)</div>
        <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '8px 16px', borderRadius: '24px', fontSize: '14px', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)' }}>Kritisch (1)</div>
        <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '8px 16px', borderRadius: '24px', fontSize: '14px', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)' }}>Stark (8)</div>
        <div style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '8px 16px', borderRadius: '24px', fontSize: '14px', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)' }}>Mittel (3)</div>
      </div>

      {/* Hive Cards */}
      {/* Card 1 - Schwach */}
      <div className="card" onClick={() => navigate('/hive/B01')} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ color: 'var(--status-critical)', fontWeight: 'bold', fontSize: '18px' }}>B01</div>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Königin Silvia</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Standort: Obstwiese Nord</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#ff4d4d22', color: 'var(--status-critical)', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', height: '24px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--status-critical)' }}></div>
            Schwach
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '120px', height: '76px', backgroundColor: '#2a3b2c', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=240&h=150&fit=crop" alt="Bee" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Letzte Kontrolle</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>Heute, 09:30</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Honigraum</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>2/10 Rahmen</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--status-critical)' }}>
            <AlertTriangle size={16} /> Futter prüfen!
          </div>
          <div style={{ backgroundColor: '#223525', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* Card 2 - Stark */}
      <div className="card" onClick={() => navigate('/hive/B04')} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ color: 'var(--status-stark)', fontWeight: 'bold', fontSize: '18px', backgroundColor: '#00cc2222', padding: '4px 8px', borderRadius: '8px' }}>B04</div>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Königin Beatrix</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Standort: Waldrand</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#00cc2222', color: 'var(--status-stark)', padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', height: '24px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--status-stark)' }}></div>
            Stark
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '120px', height: '76px', backgroundColor: '#2a3b2c', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1574889505807-681e82810ce8?w=240&h=150&fit=crop" alt="Hive" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Letzte Kontrolle</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>Gestern</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Honigraum</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>8/10 Rahmen</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <Calendar size={16} /> Nächste: in 5 Tagen
          </div>
          <div style={{ backgroundColor: '#223525', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      <button className="fab">
        <span style={{ fontSize: '32px', fontWeight: '400', marginTop: '-4px' }}>+</span>
      </button>
    </div>
  );
}
