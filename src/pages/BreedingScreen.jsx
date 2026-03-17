import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Star, Hexagon, Smile, Activity, BugOff } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEvaluation, subscribeToEvaluations } from '../services/db';

export default function BreedingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [ratings, setRatings] = useState({
    yield: 0,
    gentleness: 0,
    swarming: 0,
    varroa: 0
  });

  useEffect(() => {
    const unsub = subscribeToEvaluations(id, (data) => {
      setEvaluations(data);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  const handleSave = async () => {
    try {
      await addEvaluation(id, {
        scores: ratings,
        tags: [] // Simplified for now
      });
      navigate(-1);
    } catch (e) {
      console.error("Error saving evaluation: ", e);
      alert("Fehler beim Speichern");
    }
  };

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

  // Calculate averages from previous evaluations
  let avgScore = 0;
  if (evaluations.length > 0) {
    let total = 0;
    evaluations.forEach(ev => {
      if(ev.scores) {
        let evAvg = (ev.scores.yield + ev.scores.gentleness + ev.scores.swarming + ev.scores.varroa) / 4;
        total += evAvg;
      }
    });
    avgScore = (total / evaluations.length).toFixed(1);
  }

  return (
    <div style={{ paddingBottom: '90px', minHeight: '100vh', backgroundColor: '#f5f7f5', color: '#1a1a1a' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #e0e0e0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#000' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 0 8px' }}>Zuchtbewertung: Volk {id.substring(0, 5)}</h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Score Card */}
        <div style={{ backgroundColor: '#e8eed5', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: '#4a5b4a', marginBottom: '8px' }}>GESAMT-SCORE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: '900', color: '#1a2a1c' }}>{evaluations.length > 0 ? avgScore : '--'}</span>
            <span style={{ fontSize: '20px', color: '#6e8471' }}>/ 5</span>
          </div>
          <p style={{ margin: 0, color: '#6e8471', fontSize: '12px' }}>Achtung: Dies ist der Live-Schnitt aus der DB</p>
        </div>

        <p style={{ textAlign: 'center', color: '#6e8471', fontSize: '13px', marginBottom: '24px', lineHeight: '1.5' }}>
          Basierend auf {evaluations.length} Inspektionen.<br/>Aktualisieren Sie die Bewertung unten.
        </p>

        {/* Honigertrag */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold' }}>
              <div style={{ color: '#ffaa00' }}><Hexagon size={24} fill="#ffaa00" color="#ffaa00" /></div>
              Honigertrag
            </div>
          </div>
          {renderStars('yield', ratings.yield, '#ffaa00', '#f0f0f0')}
        </div>

        {/* Sanftmut */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#408040' }}><Smile size={24} fill="#408040" color="#408040" /></div>
            Sanftmut
          </div>
          {renderStars('gentleness', ratings.gentleness, '#509050', '#f0f0f0')}
        </div>

        {/* Schwarmtrieb */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#ff4d4d' }}><Activity size={24} color="#ff4d4d" /></div>
            Schwarmtrieb
          </div>
          {renderStars('swarming', ratings.swarming, '#ff4d4d', '#f0f0f0')}
        </div>

        {/* Varroatoleranz */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            <div style={{ color: '#b366ff' }}><BugOff size={24} color="#b366ff" /></div>
            Varroatoleranz
          </div>
          {renderStars('varroa', ratings.varroa, '#b366ff', '#f0f0f0')}
        </div>

        <button onClick={handleSave} style={{ backgroundColor: '#408040', color: '#fff', border: 'none', borderRadius: '16px', padding: '16px', width: '100%', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(64,128,64,0.3)' }}>
          <Save size={20} /> Bewertung Speichern
        </button>
      </div>
    </div>
  );
}
