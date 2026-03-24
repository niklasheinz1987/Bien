import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Info, Crown, BarChart2, BugOff, Hexagon, Trash2, MapPin, Image as ImageIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { subscribeToHive, updateHive, deleteHive } from '../services/db';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function EditHiveScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [hive, setHive] = useState(null);
  const [position, setPosition] = useState(null); // {lat, lng}
  
  const [formData, setFormData] = useState({
    name: '',
    displayId: '',
    location: '',
    origin: '',
    race: '',
    strength: 'Normal',
    status: 'Aktiv',
    imageUrl: '',
    
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
          imageUrl: data.imageUrl || '',
          
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
        
        if (data.lat && data.lng) {
          setPosition({ lat: data.lat, lng: data.lng });
        } else {
          // Default location: Center of Germany roughly
          setPosition({ lat: 51.1657, lng: 10.4515 }); 
        }
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
      const dataToSave = { ...formData };
      if (position) {
        dataToSave.lat = position.lat;
        dataToSave.lng = position.lng;
      }
      
      await updateHive(id, dataToSave);
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der Änderungen.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Sind Sie sicher, dass Sie dieses Volk unwiderruflich löschen möchten?")) {
      try {
        await deleteHive(id);
        navigate('/'); // Zurück zum Dashboard
      } catch (err) {
        console.error(err);
        alert('Fehler beim Löschen des Volks.');
      }
    }
  };

  if (!hive || !position) return <div style={{padding: '32px', textAlign: 'center'}}>Lade Daten...</div>;

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' };
  const labelStyle = { display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' };

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 100 }}>
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
          <div><label style={labelStyle}>Standort (Text)</label><input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} /></div>
          <div><label style={labelStyle}>Grundstärke</label><select name="strength" value={formData.strength} onChange={handleChange} style={inputStyle}><option value="Schwach">Schwach</option><option value="Normal">Normal</option><option value="Stark">Stark</option></select></div>
          <div><label style={labelStyle}>Status</label><select name="status" value={formData.status} onChange={handleChange} style={inputStyle}><option value="Aktiv">Aktiv</option><option value="Aufgelöst">Aufgelöst / Eingegangen</option><option value="Verkauft">Verkauft</option></select></div>
        </div>
        
        {/* BILD & KARTE */}
        <div className="card" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', marginBottom: '8px' }}>
            <ImageIcon size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Bild URL</h2>
          </div>
          <div>
            <label style={labelStyle}>Eigenes Bild hochladen oder Link eingeben</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://beispiel.de/bild.jpg" style={{...inputStyle, flex: 1}} />
              <label style={{
                cursor: 'pointer', backgroundColor: 'var(--color-primary-green)',
                color: '#000', padding: '12px 16px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', gap: '8px'
              }}>
                <ImageIcon size={20} /> Hochladen
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 10 * 1024 * 1024) return alert('Bilddatei ist zu groß (max. 10MB).');

                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const MAX_WIDTH = 800;
                      const MAX_HEIGHT = 800;
                      let width = img.width;
                      let height = img.height;
                      
                      if (width > height) {
                        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                      } else {
                        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                      }
                      
                      canvas.width = width;
                      canvas.height = height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0, width, height);
                      
                      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                      setFormData(prev => ({ ...prev, imageUrl: compressedBase64 }));
                    };
                    img.src = event.target.result;
                  };
                  reader.readAsDataURL(file);
                }} />
              </label>
            </div>
            {formData.imageUrl && formData.imageUrl.startsWith('data:image') && (
              <div style={{ fontSize: '11px', color: 'var(--color-primary-green)', marginTop: '4px' }}>✓ Bild erfolgreich komprimiert und geladen</div>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-green)', margin: '16px 0 8px 0' }}>
            <MapPin size={18} />
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Ort auf Karte wählen</h2>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Tippen Sie auf die Karte, um den Standort für dieses Volk zu setzen.</p>
          <div style={{ height: '240px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <MapContainer center={position} zoom={position.lat === 51.1657 ? 5 : 14} style={{ height: '100%', width: '100%', zIndex: 1 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }}>
            <Save size={20} /> Änderungen Speichern
          </button>
          
          <button type="button" onClick={handleDelete} style={{ 
            width: '100%', padding: '16px', backgroundColor: 'transparent', 
            border: '1px solid #ff4d4d', color: '#ff4d4d', borderRadius: '12px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            <Trash2 size={20} /> Volk unwiderruflich löschen
          </button>
        </div>
      </form>
    </div>
  );
}
