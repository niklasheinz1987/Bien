import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Info, Crown, BarChart2, BugOff, Hexagon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { subscribeToHive, updateHive } from '../services/db';

export default function EditHiveScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [hive, setHive] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    displayId: '',
    location: '',
    origin: '',
    race: '',
    strength: 'Normal',
    status: 'Aktiv',
    
    // Königin
    queenName: '',
    queenDate: '',
    queenMarked: false,
    queenMating: 'Standbegattet',
    
    // Stärke
    frames: 0,
    frameType: 'Zander Maß',
    trend: 'Gleichbleibend',
    
    // Varroa
    lastVarroaDate: '',
    lastVarroaTreatment: '',
    varroaAlert: '',
    
    // Futter & Honig
    feedKg: 0,
    supers: 0
  });

  useEffect(() => {
    const unsub = subscribeToHive(id, (data) => {
      if(data) {
        setHive(data);
        setFormData({
          name: data.name || '',
          displayId: data.displayId || '',
          location: data.location || '',
          origin: data.origin || '',
          race: data.race || '',
          strength: data.strength || 'Normal',
          status: data.status || 'Aktiv',
          
          queenName: data.queenName || '',
          queenDate: data.queenDate || '',
          queenMarked: data.queenMarked || false,
          queenMating: data.queenMating || 'Standbegattet',
          
          frames: data.frames || 0,
          frameType: data.frameType || 'Zander Maß',
          trend: data.trend || 'Gleichbleibend',
          
          lastVarroaDate: data.lastVarroaDate || '',
          lastVarroaTreatment: data.lastVarroaTreatment || '',
          varroaAlert: data.varroaAlert || '',
          
          feedKg: data.feedKg || 0,
          supers: data.supers || 0
        });
      }
    });
    return () => unsub();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value) 
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateHive(id, formData);
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der Änderungen.');
    }
  };

  if (!hive) return <div style={{padding: '32px', textAlign: 'center'}}>Lade Daten...</div>;

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' };
  const labelStyle = { display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' };

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button type="button" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Volk bearbeiten</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ALLGEMEIN */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', marginBottom: '8px' }}>
            <Info size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Allgemeine Daten</h2>
          </div>
          <div><label style={labelStyle}>Kürzel (z.B. B01)</label><input type="text" name="displayId" value={formData.displayId} onChange={handleChange} style={inputStyle} required /></div>
          <div><label style={labelStyle}>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required /></div>
          <div><label style={labelStyle}>Standort</label><input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Grundstärke</label><select name="strength" value={formData.strength} onChange={handleChange} style={inputStyle}><option value="Schwach">Schwach</option><option value="Normal">Normal</option><option value="Stark">Stark</option></select></div>
          <div><label style={labelStyle}>Status</label><select name="status" value={formData.status} onChange={handleChange} style={inputStyle}><option value="Aktiv">Aktiv</option><option value="Aufgelöst">Aufgelöst / Eingegangen</option><option value="Verkauft">Verkauft</option></select></div>
        </div>

        {/* GENETIK */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0, color: 'var(--color-primary-green)' }}>Herkunft & Genetik</h2>
          <div><label style={labelStyle}>Herkunft (z.B. Ableger A04)</label><input type="text" name="origin" value={formData.origin} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Rasse (z.B. Buckfast)</label><input type="text" name="race" value={formData.race} onChange={handleChange} style={inputStyle} /></div>
        </div>

        {/* KÖNIGIN */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#66a3ff', marginBottom: '8px' }}>
            <Crown size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Königin</h2>
          </div>
          <div><label style={labelStyle}>Königin Name / Jahr (z.B. Blau 2024)</label><input type="text" name="queenName" value={formData.queenName} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Schlupf- / Zeichnungsdatum (z.B. 15.05.2024)</label><input type="text" name="queenDate" value={formData.queenDate} onChange={handleChange} style={inputStyle} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><input type="checkbox" name="queenMarked" checked={formData.queenMarked} onChange={handleChange} style={{ width: '20px', height: '20px' }} /><label style={{ fontSize: '14px' }}>Markiert</label></div>
          <div><label style={labelStyle}>Begattung</label><select name="queenMating" value={formData.queenMating} onChange={handleChange} style={inputStyle}><option value="Standbegattet">Standbegattet</option><option value="Belegstelle">Belegstelle</option><option value="Künstlich besamt">Künstlich besamt</option></select></div>
        </div>

        {/* STÄRKE */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', marginBottom: '8px' }}>
            <BarChart2 size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Aktuelle Stärke (Manuell)</h2>
          </div>
          <div><label style={labelStyle}>Besetzte Gassen (Anzahl)</label><input type="number" name="frames" value={formData.frames} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Rähmchenmaß</label><input type="text" name="frameType" value={formData.frameType} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Trend</label><select name="trend" value={formData.trend} onChange={handleChange} style={inputStyle}><option value="Steigend">Steigend</option><option value="Gleichbleibend">Gleichbleibend</option><option value="Fallend">Fallend</option></select></div>
        </div>

        {/* VARROA */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', marginBottom: '8px' }}>
            <BugOff size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Letzte Varroa</h2>
          </div>
          <div><label style={labelStyle}>Datum (z.B. 12.08.2023)</label><input type="text" name="lastVarroaDate" value={formData.lastVarroaDate} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Behandlungsmittel (z.B. Ameisensäure 60%)</label><input type="text" name="lastVarroaTreatment" value={formData.lastVarroaTreatment} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Meldung / Alert (z.B. Behandlung fällig in 2 Wochen)</label><input type="text" name="varroaAlert" value={formData.varroaAlert} onChange={handleChange} style={inputStyle} /></div>
        </div>

        {/* FUTTER */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffaa00', marginBottom: '8px' }}>
            <Hexagon size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Futter & Honig</h2>
          </div>
          <div><label style={labelStyle}>Futtervorrat (kg)</label><input type="number" step="0.5" name="feedKg" value={formData.feedKg} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Aufgesetzte Honigräume</label><input type="number" name="supers" value={formData.supers} onChange={handleChange} style={inputStyle} /></div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
          <Save size={20} /> Änderungen Speichern
        </button>
      </form>
    </div>
  );
}
