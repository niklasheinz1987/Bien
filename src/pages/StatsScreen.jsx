import React from 'react';
import { ArrowLeft, MoreHorizontal, Hexagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function StatsScreen() {
  const navigate = useNavigate();

  const lineData = [
    { name: 'Apr', frames: 4 },
    { name: 'Mai', frames: 6 },
    { name: 'Jun', frames: 10 },
    { name: 'Jul', frames: 11 },
    { name: 'Aug', frames: 9 },
    { name: 'Sep', frames: 8.5 },
  ];

  const barData = [
    { name: 'Sirup', amount: 10, fill: 'var(--color-primary-green)' },
    { name: 'Teig', amount: 4.2, fill: '#ffcc00' },
  ];

  return (
    <div className="p-4" style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-dark)', paddingTop: '16px', zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Volk #12 Statistiken</h1>
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
              8.5 <span style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>Gassen</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '4px 8px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '4px' }}>
              ↗ +12%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>vs. Vormonat</div>
          </div>
        </div>

        <div style={{ height: '180px', width: '100%' }}>
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
        <span style={{ color: 'var(--color-primary-green)', fontSize: '14px', fontWeight: '500' }}>Alle anzeigen</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Item 1 */}
        <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#4a1e1e', color: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>AS</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Ameisensäure 60%</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Langzeitverdunster</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>15. Aug</div>
            <div style={{ fontSize: '11px', color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>Erledigt</div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#1e3a5f', color: '#66a3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>OS</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Oxalsäure Sprühen</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Blockbehandlung Tag 1</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>22. Jul</div>
            <div style={{ fontSize: '11px', color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>Erledigt</div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="card" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#3e1e4a', color: '#b366ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>TBE</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }}>Totale Brutentnahme</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Biotechnisch</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>10. Jun</div>
            <div style={{ fontSize: '11px', color: 'var(--color-primary-green)', backgroundColor: '#00cc2222', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>Erledigt</div>
          </div>
        </div>
      </div>
    </div>
  );
}
