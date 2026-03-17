import React from 'react';
import { ArrowLeft, Edit2, Crown, BarChart2, BugOff, Hexagon, ChevronRight, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { subscribeToHive, subscribeToInspections, subscribeToTreatments } from '../services/db';

export default function HiveDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [hive, setHive] = React.useState(null);
  const [inspections, setInspections] = React.useState([]);
  const [treatments, setTreatments] = React.useState([]);

  React.useEffect(() => {
    const unsubHive = subscribeToHive(id, setHive);
    const unsubIns = subscribeToInspections(id, setInspections);
    const unsubTreat = subscribeToTreatments(id, setTreatments);
    
    return () => {
      unsubHive();
      unsubIns();
      unsubTreat();
    };
  }, [id]);

  if (!hive) return <div style={{padding: '32px', textAlign: 'center'}}>Lade Volk...</div>;

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Volk {hive.displayId || id.substring(0,4)}</h1>
        <button onClick={() => navigate(`/hive/${id}/edit`)} style={{ background: 'none', border: 'none', color: 'var(--color-primary-green)', cursor: 'pointer', padding: '8px' }}>
          <Edit2 size={24} />
        </button>
      </div>

      {/* Main Info Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ height: '120px', backgroundColor: '#4a3b2c', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Picture of comb */}
          <img src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=200&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Waben" />
          <div style={{ position: 'absolute', bottom: '-12px', padding: '4px 12px', backgroundColor: 'var(--color-primary-green)', color: '#000', fontWeight: 'bold', borderRadius: '4px', fontSize: '12px' }}>AKTIV</div>
        </div>
        <div style={{ padding: '24px 16px 16px' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 4px 0' }}>{hive.name || 'Unbenanntes Volk'}</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{color: 'var(--color-text-muted)'}}>📍</span> Standort: {hive.location || 'Unbekannt'}
          </p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, backgroundColor: 'var(--color-bg-dark)', borderRadius: '8px', padding: '10px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Herkunft</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{hive.origin || 'Zukauf/Schwarm'}</div>
            </div>
            <div style={{ flex: 1, backgroundColor: 'var(--color-bg-dark)', borderRadius: '8px', padding: '10px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Rasse</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{hive.race || 'Carnica'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button className="btn-primary" onClick={() => navigate(`/inspection/new/${id}`)} style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span> Neue Durchsicht starten
      </button>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ padding: '12px 16px', color: 'var(--color-primary-green)', borderBottom: '2px solid var(--color-primary-green)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Übersicht</div>
        <div style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>Kontrollen</div>
        <div style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>Behandlungen</div>
        <div style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>Statistik</div>
      </div>

      {/* Stats Cards */}
      {/* Königin */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.1 }}>
          <Crown size={48} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#1e3a5f', padding: '8px', borderRadius: '8px', color: '#66a3ff' }}><Crown size={20} /></div>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Königin</span>
        </div>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0' }}>Blau 2024</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: '4px 0 12px 0' }}>Gez. 15.05.2024</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ border: '1px solid #1e3a5f', color: '#66a3ff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>Markiert</span>
          <span style={{ border: '1px solid #1a4a1c', color: 'var(--color-primary-green)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>Standbegattet</span>
        </div>
      </div>

      {/* Aktuelle Stärke */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.1 }}>
          <BarChart2 size={48} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#1a4a1c', padding: '8px', borderRadius: '8px', color: 'var(--color-primary-green)' }}><BarChart2 size={20} /></div>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Aktuelle Stärke</span>
        </div>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0' }}>{hive.strength || 'Normal'}</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: '4px 0 16px 0' }}>Basiert auf {inspections.length} Inspektionen</p>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--color-border)' }}>
            <div style={{ width: hive.strength === 'Stark' ? '80%' : hive.strength === 'Schwach' ? '30%' : '50%', backgroundColor: hive.strength === 'Schwach' ? 'var(--status-critical)' : 'var(--color-primary-green)' }}></div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'right', marginTop: '6px' }}>Letzte Durchsicht: {inspections.length > 0 ? new Date(inspections[0].date?.seconds * 1000).toLocaleDateString() : 'Nie'}</div>
        </div>
      </div>

      {/* Letzte Varroa */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.1 }}>
          <BugOff size={48} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#4a1e1e', padding: '8px', borderRadius: '8px', color: '#ff4d4d' }}><BugOff size={20} /></div>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Letzte Varroa</span>
        </div>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0' }}>12.08.2023</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: '4px 0 16px 0' }}>Ameisensäure 60%</p>
        </div>
        <div style={{ color: '#ff4d4d', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={14} /> Behandlung fällig in 2 Wochen
        </div>
      </div>

      {/* Futterstatus */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#4a3b1e', padding: '8px', borderRadius: '8px', color: '#ffaa00' }}><Hexagon size={20} /></div>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Futterstatus & Honigraum</span>
          </div>
          <span style={{ color: 'var(--color-primary-green)', fontSize: '14px', fontWeight: '500' }}>Details</span>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Futtervorrat</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>12.5 kg</div>
            <div style={{ display: 'flex', gap: '4px', height: '6px', borderRadius: '3px', overflow: 'hidden', backgroundColor: 'var(--color-border)' }}>
              <div style={{ width: '40%', backgroundColor: '#ffaa00' }}></div>
              <div style={{ width: '20%', backgroundColor: '#ffaa00' }}></div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Honigräume</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>2 Aufgesetzt</div>
            <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
              <div style={{ flex: 1, backgroundColor: '#ffaa00', borderRadius: '3px' }}></div>
              <div style={{ flex: 1, backgroundColor: '#ffaa00', borderRadius: '3px' }}></div>
              <div style={{ flex: 1, backgroundColor: 'var(--color-border)', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
