import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, ChevronRight, UserCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { subscribeToHives, addHive } from '../services/db';

export default function Dashboard() {
  const navigate = useNavigate();
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToHives((data) => {
      setHives(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddDummyHive = async () => {
    await addHive({
      name: "Testkönigin " + Math.floor(Math.random() * 100),
      displayId: "B" + Math.floor(Math.random() * 100).toString().padStart(2, '0'),
      location: "Hauptstand",
      strength: "Stark",
      status: "Aktiv",
    });
  };

  const currentCount = hives.length;

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>Meine Bienenstände</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0' }}>{currentCount} aktive Völker</p>
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
        <div style={{ backgroundColor: 'var(--color-primary-green)', color: '#000', padding: '8px 16px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap' }}>Alle ({currentCount})</div>
      </div>

      {/* Hive Cards list from DB */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading && <p style={{ color: 'var(--color-text-secondary)' }}>Lade Völker...</p>}
        {!loading && hives.length === 0 && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '32px' }}>
            Keine Völker vorhanden.<br/>
            Klicken Sie auf +, um ein Testvolk zu erstellen.
          </p>
        )}
        
        {hives.map((hive) => {
          let statusColor = hive.strength === 'Schwach' ? 'var(--status-critical)' : 'var(--status-stark)';
          let bgTrans = hive.strength === 'Schwach' ? '#ff4d4d22' : '#00cc2222';
          
          return (
            <div key={hive.id} className="card" onClick={() => navigate(`/hive/${hive.id}`)} style={{ cursor: 'pointer', margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: statusColor, fontWeight: 'bold', fontSize: '18px', backgroundColor: bgTrans, padding: '4px 8px', borderRadius: '8px' }}>{hive.displayId || 'Bxx'}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', margin: 0 }}>{hive.name || 'Unbenanntes Volk'}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Standort: {hive.location || 'Unbekannt'}</p>
                  </div>
                </div>
                <div style={{ backgroundColor: bgTrans, color: statusColor, padding: '4px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', height: '24px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor }}></div>
                  {hive.strength || 'Normal'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '120px', height: '76px', backgroundColor: '#2a3b2c', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=240&h=150&fit=crop" alt="Bee" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Zuletzt synchronisiert</div>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>Live</div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <Calendar size={16} /> Detailansicht öffnen
                </div>
                <div style={{ backgroundColor: '#223525', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="fab" onClick={handleAddDummyHive}>
        <span style={{ fontSize: '32px', fontWeight: '400', marginTop: '-4px' }}>+</span>
      </button>
    </div>
  );
}
