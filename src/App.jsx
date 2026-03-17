import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, CheckSquare, Calendar, Settings, Map as MapIcon, Package, User } from 'lucide-react';
import './index.css';

import Dashboard from './pages/Dashboard';
import HiveDetail from './pages/HiveDetail';
import NewInspection from './pages/NewInspection';
import StatsScreen from './pages/StatsScreen';
import MapScreen from './pages/MapScreen';
import MaterialScreen from './pages/MaterialScreen';
import TasksScreen from './pages/TasksScreen';
import BreedingScreen from './pages/BreedingScreen';
import EditHiveScreen from './pages/EditHiveScreen';

// Placeholder Screens
const CalendarScreen = () => <div style={{padding: '16px'}}><h1>Kalender</h1></div>;
const ProfileScreen = () => <div style={{padding: '16px'}}><h1>Profil</h1></div>;

const BottomNav = () => (
  <nav className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#1a1d1a', borderTop: '1px solid #2a2d2a', padding: '12px 0 16px 0' }}>
    <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', flex: 1, textDecoration: 'none' }}>
      <LayoutGrid size={24} strokeWidth={1.5} />
      <span style={{ fontSize: '10px' }}>Völker</span>
    </NavLink>
    <NavLink to="/tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', flex: 1, textDecoration: 'none' }}>
      <CheckSquare size={24} strokeWidth={1.5} />
      <span style={{ fontSize: '10px' }}>Aufgaben</span>
    </NavLink>
    
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <button style={{ 
        width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-primary-green)', 
        border: '4px solid #1a1d1a', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        transform: 'translateY(-16px)', color: '#000', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 204, 34, 0.3)' 
      }} onClick={() => alert("Hier könnten Sie ein neues Volk oder eine Durchsicht anlegen.")}>
        <span style={{ fontSize: '32px', fontWeight: '400', marginTop: '-4px' }}>+</span>
      </button>
    </div>

    <NavLink to="/calendar" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', flex: 1, textDecoration: 'none' }}>
      <Calendar size={24} strokeWidth={1.5} />
      <span style={{ fontSize: '10px' }}>Kalender</span>
    </NavLink>
    <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', flex: 1, textDecoration: 'none' }}>
      <Settings size={24} strokeWidth={1.5} />
      <span style={{ fontSize: '10px' }}>Einstellungen</span>
    </NavLink>
  </nav>
);

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '80px', minHeight: '100vh', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hive/:id" element={<HiveDetail />} />
          <Route path="/hive/:id/edit" element={<EditHiveScreen />} />
          <Route path="/hive/:id/stats" element={<StatsScreen />} />
          <Route path="/hive/:id/breeding" element={<BreedingScreen />} />
          <Route path="/inspection/new/:id" element={<NewInspection />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/material" element={<MaterialScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
        <BottomNavWrapper />
      </div>
    </Router>
  );
}

function BottomNavWrapper() {
  const location = useLocation();
  // Keep navigation active ONLY on main tabs, hide it on detail screens like Forms, Stats, Breeding, Maps
  const hideNav = location.pathname.includes('/inspection/new') || 
                  location.pathname.includes('/stats') ||
                  location.pathname.includes('/breeding') ||
                  location.pathname.includes('/edit') ||
                  location.pathname.includes('/map');

  // Modified bottom nav list according to material image bottom nav (Völker, Kalender, Material, Profil) -> Added Aufgaben too
  if (hideNav) {
    return null;
  }
  return <BottomNav />;
}

export default App;
