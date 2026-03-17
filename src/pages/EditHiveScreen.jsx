import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Info } from 'lucide-react';
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
    status: 'Aktiv'
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
          status: data.status || 'Aktiv'
        });
      }
    });
    return () => unsub();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Volk {hive.displayId || id.substring(0,4)} bearbeiten</h1>
        <div style={{ width: '40px' }}></div> {/* Spacer for centering */}
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', marginBottom: '8px' }}>
            <Info size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Allgemeine Daten</h2>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Kürzel / Display ID (z.B. B01)</label>
            <input 
              type="text" 
              name="displayId" 
              value={formData.displayId} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Name (z.B. Königin Silvia)</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Standort (z.B. Obstwiese Nord)</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
            />
          </div>
        </div>

        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0, marginBottom: '8px', color: 'var(--color-primary-green)' }}>Herkunft & Genetik</h2>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Herkunft (z.B. Ableger A04)</label>
            <input 
              type="text" 
              name="origin" 
              value={formData.origin} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Rasse (z.B. Buckfast)</label>
            <input 
              type="text" 
              name="race" 
              value={formData.race} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
            />
          </div>
        </div>

        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0, marginBottom: '8px', color: 'var(--color-primary-green)' }}>Status</h2>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Grundstärke</label>
            <select 
              name="strength" 
              value={formData.strength} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
            >
              <option value="Schwach">Schwach</option>
              <option value="Normal">Normal</option>
              <option value="Stark">Stark</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Volk-Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }}
            >
              <option value="Aktiv">Aktiv</option>
              <option value="Aufgelöst">Aufgelöst / Eingegangen</option>
              <option value="Verkauft">Verkauft</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
          <Save size={20} /> Änderungen Speichern
        </button>
      </form>
    </div>
  );
}
