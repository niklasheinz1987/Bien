import React, { useState } from 'react';
import { ArrowLeft, Save, Star, Hexagon, Smile, Activity, BugOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BreedingScreen() {
  const navigate = useNavigate();
  
  const [ratings, setRatings] = useState({
    yield: 4,
    gentleness: 3,
    swarming: 5,
    varroa: 2
  });

  const renderStars = (category, currentRating, activeColor, inactiveColor = 'var(--color-border)') => {
    return (
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={32} 
            fill={star <= currentRating ? activeColor : inactiveColor} 
            color={star <= currentRating ? activeColor : inactiveColor}
            onClick={() => setRatings({...ratings, [category]: star})}
            style={{ cursor: 'pointer', transition: '0.2s' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: '90px', minHeight: '100vh', backgroundColor: '#f5f7f5', color: '#1a1a1a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #e0e0e0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#000' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 0 8px' }}>Zuchtbewertung: Volk B01</h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Score Card */}
        <div style={{ backgroundColor: '#e8eed5', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: '#4a5b4a', marginBottom: '8px' }}>GESAMT-SCORE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: '900', color: '#1a2a1c' }}>4.2</span>
            <span style={{ fontSize: '20px', color: '#6e8471' }}>/ 5</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {[1, 2, 3, 4].map(star => <Star key={star} size={20} fill="#ffaa00" color="#ffaa00" />)}
            <Star size={20} fill="#d0d0d0" color="#d0d0d0" />
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#6e8471', fontSize: '13px', marginBottom: '24px', lineHeight: '1.5' }}>
          Basierend auf den letzten 3 Inspektionen.<br/>Aktualisieren Sie die Bewertung unten.
        </p>

        {/* Honigertrag */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold' }}>
              <div style={{ color: '#ffaa00' }}><Hexagon size={24} fill="#ffaa00" color="#ffaa00" /></div>
              Honigertrag
            </div>
            <div style={{ backgroundColor: '#fff3d6', color: '#cc8800', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Wichtig</div>
          </div>
          
          {renderStars('yield', ratings.yield, '#ffaa00', '#f0f0f0')}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Sammelt fleißig</span>
            <span style={{ border: '1px solid #1a4a1c', color: '#1a4a1c', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Volle Waben</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Wenig Vorrat</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Verdeckelt</span>
          </div>
        </div>

        {/* Sanftmut */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#408040' }}><Smile size={24} fill="#408040" color="#408040" /></div>
            Sanftmut
          </div>
          
          {renderStars('gentleness', ratings.gentleness, '#509050', '#f0f0f0')}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ border: '1px solid #1a4a1c', color: '#1a4a1c', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Sehr ruhig</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Wabensitz fest</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Auffliegend</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Stechlustig</span>
          </div>
        </div>

        {/* Schwarmtrieb */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#ff4d4d' }}><Activity size={24} color="#ff4d4d" /></div>
            Schwarmtrieb
          </div>
          
          {renderStars('swarming', ratings.swarming, '#ff4d4d', '#f0f0f0')}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ border: '1px solid #1a4a1c', color: '#1a4a1c', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Keine Weiselzellen</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Spielnäpfchen</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Bestiftet</span>
          </div>
        </div>

        {/* Varroatoleranz */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#b366ff' }}><BugOff size={24} color="#b366ff" /></div>
            Varroatoleranz
          </div>
          
          {renderStars('varroa', ratings.varroa, '#b366ff', '#f0f0f0')}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Hygieneverhalten hoch</span>
            <span style={{ border: '1px solid #1a4a1c', color: '#1a4a1c', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Mittlerer Befall</span>
            <span style={{ backgroundColor: '#f0f5f0', color: '#4a5b4a', padding: '6px 12px', borderRadius: '16px', fontSize: '12px' }}>Lochbrut</span>
          </div>
        </div>

        <button style={{ backgroundColor: '#408040', color: '#fff', border: 'none', borderRadius: '16px', padding: '16px', width: '100%', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(64,128,64,0.3)' }}>
          <Save size={20} /> Bewertung Speichern
        </button>
      </div>
    </div>
  );
}
