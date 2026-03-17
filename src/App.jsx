import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
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

// Placeholder Screens
const CalendarScreen = () => <div style={{padding: '16px'}}><h1>Kalender</h1></div>;
const ProfileScreen = () => <div style={{padding: '16px'}}><h1>Profil</h1></div>;

const BottomNav = () => (
  <nav className="bottom-nav">
    <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <LayoutGrid size={24} strokeWidth={1.5} />
      <span>Völker</span>
    </NavLink>
    <NavLink to="/tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <CheckSquare size={24} strokeWidth={1.5} />
      <span>Aufgaben</span>
    </NavLink>
    <NavLink to="/material" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <Package size={24} strokeWidth={1.5} />
      <span>Material</span>
    </NavLink>
    <NavLink to="/calendar" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <Calendar size={24} strokeWidth={1.5} />
      <span>Kalender</span>
    </NavLink>
    <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <User size={24} strokeWidth={1.5} />
      <span>Profil</span>
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
                  location.pathname.includes('/map') ||
                  (location.pathname.includes('/hive/') && !location.pathname.includes('/stats') && !location.pathname.includes('/breeding') && location.pathname !== '/');

  // Modified bottom nav list according to material image bottom nav (Völker, Kalender, Material, Profil) -> Added Aufgaben too
  if (hideNav) {
    return null;
  }
  return <BottomNav />;
}

export default App;
