import React, { useState, useEffect } from 'react';
import { RotateCcw, Scissors, Beaker, Bug, ArrowRightSquare, Crown, CheckCircle2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { subscribeToTasks, addDummyTasksIfEmpty, updateTaskStatus, deleteTask } from '../services/db';

export default function TasksScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heute');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    addDummyTasksIfEmpty();
    const unsub = subscribeToTasks(setTasks);
    return () => unsub();
  }, []);

  const handleToggle = (id, currentStatus) => {
    updateTaskStatus(id, !currentStatus);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm("Aufgabe endgültig löschen?")) {
       deleteTask(id);
    }
  };

  const getIconForTitle = (title) => {
    if (title.includes('Drohnen')) return <Scissors size={24} />;
    if (title.includes('Fütterung')) return <Beaker size={24} />;
    if (title.includes('Varroa')) return <Bug size={24} />;
    if (title.includes('Königin')) return <Crown size={24} />;
    return <ArrowRightSquare size={24} />;
  };

  const getStyleForType = (type) => {
    switch(type) {
      case 'overdue': return { bg: '#4a1e1e', color: '#ff4d4d' };
      case 'today': return { bg: '#1a4a1c', color: 'var(--color-primary-green)' }; // or #4a3b1e/#ffaa00 for varroa
      case 'upcoming': return { bg: '#1e2b3c', color: '#66a3ff' };
      default: return { bg: '#2a2a3c', color: '#b366ff' };
    }
  };

  const openTasks = tasks.filter(t => !t.done);
  const overdueTasks = openTasks.filter(t => t.type === 'overdue');
  const todayTasks = openTasks.filter(t => t.type === 'today');
  const upcomingTasks = openTasks.filter(t => t.type === 'upcoming');

  const renderTaskList = (list) => {
    if (list.length === 0) return <p style={{color: 'var(--color-text-secondary)', fontSize: '14px', fontStyle: 'italic'}}>Keine Aufgaben</p>;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {list.map(task => {
          const style = getStyleForType(task.type);
          // Override a bit for variety if title matches
          if (task.title.includes('Varroa') && task.type === 'today') {
            style.bg = '#4a3b1e'; style.color = '#ffaa00';
          }
          if (task.title.includes('Königin') && task.type === 'upcoming') {
            style.bg = '#2a2a3c'; style.color = '#b366ff';
          }

          return (
            <div key={task.id} className="card" onClick={() => handleToggle(task.id, task.done)} style={{ margin: 0, padding: '16px', borderLeft: task.type === 'overdue' ? '4px solid #ff4d4d' : 'none', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: '0.2s', opacity: task.done ? 0.5 : 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: style.bg, color: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getIconForTitle(task.title)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ backgroundColor: '#2a3b2c', color: 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{task.hiveId}</span>
                  <span style={{ color: task.type==='overdue' ? '#ff4d4d' : 'var(--color-text-secondary)', fontSize: '12px' }}>
                    {task.type === 'overdue' ? 'Gestern fällig' : task.type === 'today' ? 'Heute' : 'Demnächst'}
                  </span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '2px', textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{task.subtitle}</div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div onClick={(e) => handleDelete(e, task.id)} style={{ padding: '8px', color: '#ff4d4d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={20} />
                </div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: task.done ? 'none' : '2px solid var(--color-border)', color: 'var(--color-primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {task.done && <CheckCircle2 size={28} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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

      {activeTab === 'alle' ? (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Alle Aufgaben ({tasks.length})</h2>
          {renderTaskList(tasks)}
        </div>
      ) : (
        <>
          {/* Überfällig */}
          {overdueTasks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>⚠️</span> Überfällig
              </div>
              {renderTaskList(overdueTasks)}
            </div>
          )}

          {/* Heute */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Heute</h2>
            {renderTaskList(todayTasks)}
          </div>

          {/* Demnächst */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Demnächst</h2>
            {renderTaskList(upcomingTasks)}
          </div>
        </>
      )}

      {/* removed FAB */}
    </div>
  );
}
