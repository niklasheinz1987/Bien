import React, { useState } from 'react';
import { ArrowLeft, Calendar, Sun, Crown, Scissors, Save, ChevronDown } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { addInspection, updateHive } from '../services/db';

export default function NewInspection() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [queenSeen, setQueenSeen] = useState(true);
  const [broodStatus, setBroodStatus] = useState('Beides');
  const [droneCut, setDroneCut] = useState(false);
  const [behavior, setBehavior] = useState('Sanftmütig');
  const [notes, setNotes] = useState('');

  const broodOptions = ['Keine', 'Offen', 'Verdeckelt', 'Beides'];

  const handleSave = async () => {
    try {
      await addInspection(id, {
        queenSeen,
        broodStatus,
        frames,
        droneCut,
        behavior,
        notes
      });
      await updateHive(id, {
        frames: frames,
        strength: frames > 7 ? 'Stark' : frames < 4 ? 'Schwach' : 'Normal',
        trend: 'Zuletzt geprüft',
        lastNotes: notes
      });
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der Durchsicht.');
    }
  };

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Neue Durchsicht</h1>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-primary-green)', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Abbrechen
        </button>
      </div>

      {/* Date & Weather */}
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} /> Heute, 14:30
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sun size={18} /> 22°C
        </div>
      </div>

      {/* Königin gesehen */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#1a4a1c', padding: '10px', borderRadius: '8px', color: 'var(--color-primary-green)' }}><Crown size={24} /></div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }}>Königin gesehen</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Ist die Königin anwesend?</div>
          </div>
        </div>
        {/* Toggle */}
        <div 
          onClick={() => setQueenSeen(!queenSeen)}
          style={{ width: '52px', height: '32px', borderRadius: '16px', backgroundColor: queenSeen ? 'var(--color-primary-green)' : 'var(--color-border)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
        >
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '4px', left: queenSeen ? '24px' : '4px', transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>

      {/* BRUTSTATUS */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>BRUTSTATUS</div>
        <div className="card" style={{ padding: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {broodOptions.map(option => (
            <div 
              key={option}
              onClick={() => setBroodStatus(option)}
              style={{ padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: '500', fontSize: '15px', cursor: 'pointer', transition: '0.2s',
                backgroundColor: broodStatus === option ? '#1a4a1c' : 'transparent',
                color: broodStatus === option ? 'var(--color-primary-green)' : 'var(--color-text-secondary)'
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* BESETZTE WABENGASSEN */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)' }}>BESETZTE WABENGASSEN</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary-green)' }}>{frames}</div>
        </div>
        <div className="card" style={{ padding: '24px 16px' }}>
          {/* Custom Slider */}
          <div style={{ position: 'relative', height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '3px', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: 'var(--color-primary-green)', borderRadius: '3px', width: `${(frames / 12) * 100}%` }}></div>
            <div style={{ position: 'absolute', top: '50%', left: `${(frames / 12) * 100}%`, transform: 'translate(-50%, -50%)', width: '20px', height: '20px', backgroundColor: 'var(--color-primary-green)', borderRadius: '50%', border: '3px solid #1a2a1c', boxShadow: '0 0 0 2px var(--color-primary-green)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              <span>0</span><span>6</span><span>12</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => setFrames(Math.max(0, frames - 1))} style={{ flex: 1, backgroundColor: '#2a3b2c', border: 'none', borderRadius: '8px', padding: '16px', color: 'var(--color-text-main)', fontSize: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>—</button>
            <button onClick={() => setFrames(Math.min(12, frames + 1))} style={{ flex: 1, backgroundColor: 'var(--color-primary-green)', border: 'none', borderRadius: '8px', padding: '16px', color: '#000', fontSize: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>+</button>
          </div>
        </div>
      </div>

      {/* VERHALTEN */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>VERHALTEN</div>
        <div className="card" style={{ padding: '0', position: 'relative', marginBottom: '16px', cursor: 'pointer' }}>
          <select value={behavior} onChange={(e) => setBehavior(e.target.value)} style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: '500', appearance: 'none', backgroundColor: 'transparent', color: 'var(--color-text-main)', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 2, position: 'relative' }}>
            <option value="Sanftmütig">Sanftmütig</option>
            <option value="Nervös">Nervös</option>
            <option value="Aggressiv">Aggressiv</option>
            <option value="Stecher">Stecher</option>
          </select>
          <ChevronDown size={20} color="var(--color-primary-green)" style={{ position: 'absolute', right: '16px', top: '16px', pointerEvents: 'none', zIndex: 1 }} />
        </div>
        
        <div className="card" onClick={() => setDroneCut(!droneCut)} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', cursor: 'pointer' }}>
          <div style={{ width: '24px', height: '24px', border: `2px solid ${droneCut ? 'var(--color-primary-green)' : 'var(--color-text-secondary)'}`, borderRadius: '4px', backgroundColor: droneCut ? 'var(--color-primary-green)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {droneCut && <div style={{ width: '12px', height: '12px', backgroundColor: '#000', clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' }}></div>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Drohnenrahmen geschnitten</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Varroa-Reduktion durchgeführt</div>
          </div>
          <Scissors size={24} color="var(--color-text-secondary)" />
        </div>
      </div>

      {/* NOTIZEN */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>NOTIZEN</div>
        <textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Besonderheiten, Auffälligkeiten..."
          className="card"
          style={{ width: '100%', padding: '16px', minHeight: '100px', backgroundColor: 'transparent', color: 'var(--color-text-main)', border: 'none', outline: 'none', resize: 'vertical' }}
        />
      </div>

      <button className="btn-primary" onClick={handleSave}>
        <Save size={20} /> Speichern
      </button>
    </div>
  );
}
