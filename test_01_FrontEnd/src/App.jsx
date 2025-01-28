import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import TaskView from './pages/Taskview.jsx';
import PrivateRoute from "./component/PrivateRoute.jsx"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route
        path="/taskview"
        element={
          <PrivateRoute>
            <TaskView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
