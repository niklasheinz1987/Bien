import React, { useState } from 'react';
import { ArrowLeft, Save, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../services/db';

export default function NewTaskScreen() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    hiveId: '',
    type: 'today', // overdue, today, upcoming
    done: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Bitte einen Titel eingeben.");
    
    try {
      await addTask({
        ...formData,
        dueDate: new Date().toISOString() // Just a dummy sort criteria for now, actual sorting is done via text/types by user preference
      });
      navigate('/tasks');
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der Aufgabe.');
    }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' };
  const labelStyle = { display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' };

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button type="button" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Neue Aufgabe</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', marginBottom: '8px' }}>
            <CheckSquare size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Aufgabendetails</h2>
          </div>
          
          <div>
            <label style={labelStyle}>Titel (z.B. Fütterung kontrollieren)</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
          </div>
          
          <div>
            <label style={labelStyle}>Beschreibung / Untertitel</label>
            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Zugehöriges Volk (Optional, z.B. B01)</label>
            <input type="text" name="hiveId" value={formData.hiveId} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Fälligkeit</label>
            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
              <option value="today">Heute</option>
              <option value="upcoming">Demnächst</option>
              <option value="overdue">Überfällig</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
          <Save size={20} /> Speichern
        </button>
      </form>
    </div>
  );
}
