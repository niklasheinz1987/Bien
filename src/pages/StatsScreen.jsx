import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Hexagon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { subscribeToInspections, subscribeToTreatments, subscribeToHive } from '../services/db';

export default function StatsScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [hive, setHive] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const unsubHive = subscribeToHive(id, setHive);
    const unsubIns = subscribeToInspections(id, setInspections);
    const unsubTreat = subscribeToTreatments(id, setTreatments);
    return () => {
      unsubHive();
      unsubIns();
      unsubTreat();
    };
  }, [id]);

  // Transform data
  const lineData = inspections.slice().reverse().map(ins => {
    const dateObj = ins.date?.seconds ? new Date(ins.date.seconds * 1000) : new Date();
    return {
      name: dateObj.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' }),
      frames: ins.frames || 0
    };
  });

  const barData = [
    { name: 'Sirup', amount: 10, fill: 'var(--color-primary-green)' },
    { name: 'Teig', amount: 4.2, fill: '#ffcc00' },
  ];

  if (!hive) return <div style={{padding: '32px', textAlign: 'center'}}>Lade Statistiken...</div>;

  const currentFrames = inspections.length > 0 ? (inspections[0].frames || 0) : 0;

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>{hive.name || 'Volk'} Statistiken</h1>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Besetzte Wabengassen */}
      <div className="card" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Besetzte Wabengassen</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {currentFrames} <span style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>Gassen</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '4px 8px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '4px' }}>
              Live
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>aus {inspections.length} Inspektionen</div>
          </div>
        </div>

        <div style={{ height: '180px', width: '100%' }}>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-main)' }}
                  itemStyle={{ color: 'var(--color-primary-green)' }}
                />
                <Line type="monotone" dataKey="frames" stroke="var(--color-primary-green)" strokeWidth={4} dot={{ r: 6, fill: 'var(--color-bg-dark)', stroke: 'var(--color-primary-green)', strokeWidth: 3 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>Keine Inspektionen gefunden</div>
          )}
        </div>
      </div>

      {/* Fütterungsmenge */}
      <div className="card" style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Fütterungsmenge (kg)</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              14.2 <span style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>kg Gesamt</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#2a2000', padding: '10px', borderRadius: '50%', color: '#ffaa00' }}>
            <Hexagon size={24} />
          </div>
        </div>

        <div style={{ height: '160px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 30, bottom: 0 }} barSize={50}>
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={14} tickLine={false} axisLine={false} dy={10} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }} 
                contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Varroa-Behandlungen */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0 16px 0' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>Varroa-Behandlungen</h3>
        <span style={{ color: 'var(--color-primary-green)', fontSize: '14px', fontWeight: '500' }}>Live Daten</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {treatments.length === 0 && <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Keine Behandlungen protokolliert.</p>}
        {treatments.map((t, idx) => (
          <div key={t.id || idx} className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#4a1e1e', color: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              {t.type || 'MIX'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>{t.product || 'Unbekannt'}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{t.method || 'Standard'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                {t.date?.seconds ? new Date(t.date.seconds * 1000).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' }) : 'Neu'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>Erledigt</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
