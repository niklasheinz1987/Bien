import React, { useState } from 'react';
import { ArrowLeft, BugOff, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { addTreatment, updateHive } from '../services/db';

export default function NewTreatment() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [product, setProduct] = useState('Ameisensäure 60%');
  const [method, setMethod] = useState('Langzeitverdunster');
  const [amount, setAmount] = useState('120 ml');

  const handleSave = async () => {
    try {
      await addTreatment(id, {
        product,
        method,
        amount
      });
      
      // Update the main Hive info so the dashboard/overview card immediately reflects the latest treatment
      await updateHive(id, {
        lastVarroaDate: new Date().toLocaleDateString('de-DE'),
        lastVarroaTreatment: product,
        varroaAlert: 'Zuletzt behandelt'
      });
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern der Behandlung.');
    }
  };

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Neue Behandlung</h1>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-primary-green)', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Abbrechen
        </button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', marginBottom: '8px' }}>
          <BugOff size={18} />
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Behandlungsdetails</h2>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Präparat / Produkt</label>
          <input type="text" value={product} onChange={e => setProduct(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }} required />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Methode</label>
          <input type="text" value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }} required />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Menge / Dosierung</label>
          <input type="text" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-main)' }} />
        </div>
      </div>

      <button className="btn-primary" onClick={handleSave} style={{ marginTop: '24px' }}>
        <Save size={20} /> Speichern
      </button>
    </div>
  );
}
