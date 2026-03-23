import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Search, ChevronRight, CheckCircle2, Trash2 } from 'lucide-react';
import { subscribeToEvents, addEvent, deleteEvent } from '../services/db';

export default function CalendarScreen() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    type: 'Termin', // Termin, Arbeiten, Kontrolle
  });

  useEffect(() => {
    const unsub = subscribeToEvents(setEvents);
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return alert("Bitte Titel und Datum angeben.");
    try {
      await addEvent(formData);
      setShowForm(false);
      setFormData({ ...formData, title: '' });
    } catch (error) {
      console.error(error);
      alert('Fehler beim Speichern des Termins.');
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm("Termin wirklich löschen?")) {
      deleteEvent(id);
    }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' };
  const labelStyle = { display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' };

  // Group events by date
  events.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>Kalender</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px', width: 'auto' }}>
          {showForm ? 'Abbrechen' : '+ Termin'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: 'var(--color-primary-green)' }}>Neuer Termin / Aktion</h2>
          
          <div>
            <label style={labelStyle}>Titel</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
             <div style={{ flex: 1 }}>
               <label style={labelStyle}>Datum</label>
               <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
             </div>
             <div style={{ width: '100px' }}>
               <label style={labelStyle}>Uhrzeit</label>
               <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
             </div>
          </div>
          
          <div>
            <label style={labelStyle}>Kategorie</label>
            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
              <option value="Termin">Allgemeiner Termin</option>
              <option value="Arbeiten">Standarbeiten</option>
              <option value="Kontrolle">Völkerkontrolle geplant</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Speichern</button>
        </form>
      )}

      {events.length === 0 && !showForm && (
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '32px' }}>
           Keine anstehenden Termine vorhanden.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
         {events.map((ev) => {
           let typeColor = 'var(--color-primary-green)';
           let typeBg = '#00cc2222';
           if (ev.type === 'Arbeiten') { typeColor = '#ffaa00'; typeBg = '#4a3b1e'; }
           if (ev.type === 'Termin') { typeColor = '#66a3ff'; typeBg = '#1e2b3c'; }
           
           return (
              <div key={ev.id} className="card" style={{ padding: '16px', display: 'flex', margin: 0, gap: '16px', alignItems: 'center' }}>
                <div style={{ minWidth: '60px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                     {new Date(ev.date).toLocaleDateString('de-DE', { weekday: 'short' })}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                     {new Date(ev.date).getDate()}
                  </div>
                </div>
                
                <div style={{ flex: 1, borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <CalendarIcon size={12} color="var(--color-text-secondary)" />
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{ev.time} Uhr</span>
                      <span style={{ color: typeColor, backgroundColor: typeBg, padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginLeft: 'auto' }}>{ev.type}</span>
                   </div>
                   <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{ev.title}</div>
                </div>

                <div onClick={(e) => handleDelete(e, ev.id)} style={{ padding: '8px', color: '#ff4d4d', cursor: 'pointer' }}>
                   <Trash2 size={20} />
                </div>
              </div>
           );
         })}
      </div>
    </div>
  );
}
