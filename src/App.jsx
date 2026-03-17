import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, CheckSquare, Calendar, Settings, Map as MapIcon } from 'lucide-react';
import './index.css';

import Dashboard from './pages/Dashboard';
import HiveDetail from './pages/HiveDetail';
import NewInspection from './pages/NewInspection';
import StatsScreen from './pages/StatsScreen';
import MapScreen from './pages/MapScreen';

// Placeholder Screens
const TasksScreen = () => <div style={{padding: '16px'}}><h1>Aufgaben</h1></div>;
const CalendarScreen = () => <div style={{padding: '16px'}}><h1>Kalender</h1></div>;
const SettingsScreen = () => <div style={{padding: '16px'}}><h1>Einstellungen</h1></div>;

const BottomNav = () => (
  <nav className="bottom-nav">
    <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <LayoutGrid size={24} strokeWidth={1.5} />
      <span>Übersicht</span>
    </NavLink>
    <NavLink to="/tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <CheckSquare size={24} strokeWidth={1.5} />
      <span>Aufgaben</span>
    </NavLink>
    <NavLink to="/map" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <MapIcon size={24} strokeWidth={1.5} />
      <span>Karte</span>
    </NavLink>
    <NavLink to="/calendar" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <Calendar size={24} strokeWidth={1.5} />
      <span>Kalender</span>
    </NavLink>
    <NavLink to="/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
      <Settings size={24} strokeWidth={1.5} />
      <span>Einstellungen</span>
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
          <Route path="/inspection/new/:id" element={<NewInspection />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
        <BottomNavWrapper />
      </div>
    </Router>
  );
}

function BottomNavWrapper() {
  const location = useLocation();
  // Hide BottomNav on forms or specific details that have their own footer CTA
  if (location.pathname.includes('/inspection/new') || location.pathname.includes('/stats')) {
    return null;
  }
  return <BottomNav />;
}

export default App;
