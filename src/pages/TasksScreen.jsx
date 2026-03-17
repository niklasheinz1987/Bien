import React, { useState } from 'react';
import { RotateCcw, Scissors, Beaker, Bug, ArrowRightSquare, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TasksScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heute');

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>Aufgaben</h1>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-primary-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          <RotateCcw size={18} /> Verlauf
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
        <div 
          onClick={() => setActiveTab('heute')}
          style={{ padding: '10px 20px', borderRadius: '24px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap',
            backgroundColor: activeTab === 'heute' ? 'var(--color-primary-green)' : 'transparent',
            color: activeTab === 'heute' ? '#000' : 'var(--color-text-secondary)',
            border: activeTab === 'heute' ? 'none' : '1px solid var(--color-border)'
          }}
        >
          Heute
        </div>
        <div 
          onClick={() => setActiveTab('woche')}
          style={{ padding: '10px 20px', borderRadius: '24px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap',
            backgroundColor: activeTab === 'woche' ? 'var(--color-primary-green)' : 'transparent',
            color: activeTab === 'woche' ? '#000' : 'var(--color-text-secondary)',
            border: activeTab === 'woche' ? 'none' : '1px solid var(--color-border)'
          }}
        >
          Diese Woche
        </div>
        <div 
          onClick={() => setActiveTab('alle')}
          style={{ padding: '10px 20px', borderRadius: '24px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap',
            backgroundColor: activeTab === 'alle' ? 'var(--color-primary-green)' : 'transparent',
            color: activeTab === 'alle' ? '#000' : 'var(--color-text-secondary)',
            border: activeTab === 'alle' ? 'none' : '1px solid var(--color-border)'
          }}
        >
          Alle
        </div>
      </div>

      {/* Überfällig */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px' }}>⚠️</span> Überfällig
        </div>
        
        <div className="card" style={{ padding: '16px', borderLeft: '4px solid #ff4d4d', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#4a1e1e', color: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>B02</span>
              <span style={{ color: '#ff4d4d', fontSize: '12px' }}>Gestern fällig</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Drohnenrahmen schnei...</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Kontrolle auf Varroa Milben</div>
          </div>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-border)', cursor: 'pointer' }}></div>
        </div>
      </div>

      {/* Heute */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Heute</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1a4a1c', color: 'var(--color-primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Beaker size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>B05</span>
                <span style={{ color: 'var(--color-primary-green)', fontSize: '12px' }}>Heute, 14:00</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Fütterung prüfen</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Sirupstand kontrollieren</div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-border)', cursor: 'pointer' }}></div>
          </div>

          <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#4a3b1e', color: '#ffaa00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bug size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>B08</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Heute</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Varroabehandlung</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Ameisensäure Langzeitverd...</div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-border)', cursor: 'pointer' }}></div>
          </div>
        </div>
      </div>

      {/* Demnächst */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Demnächst</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#1e2b3c', color: '#66a3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRightSquare size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>B01</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Morgen</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Volk erweitern</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Honigraum aufsetzen</div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-border)', cursor: 'pointer' }}></div>
          </div>

          <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#2a2a3c', color: '#b366ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crown size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>B03</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Freitag</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Königin zeichnen</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Jahresfarbe Grün</div>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--color-border)', cursor: 'pointer' }}></div>
          </div>
        </div>
      </div>

      <button className="fab">
        <span style={{ fontSize: '32px', fontWeight: '400', marginTop: '-4px' }}>+</span>
      </button>
    </div>
  );
}
