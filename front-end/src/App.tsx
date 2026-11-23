  import Login from './components/Auth/Login';
  import AdminDashboard from './components/admin/AdminDashboard';
  import ChauffeurDashboard from './components/chauffeur/ChauffeurDashboard';
  import CamionList from './components/admin/camions/CamionList';
  import {Routes, Route, Navigate} from 'react-router-dom';
  import ProtectedRoute from '../src/routes/ProtectedRoute';
  import { AuthProvider } from './context/AuthContext';
  import {useAuth} from './hooks/useAuth';

  // import Register from './components/Auth/Register';


function AppRoutes() {

    const { user } = useAuth();

    return (
        <Routes>

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate
                            to={user.role === 'admin' ? '/admin' : '/chauffeur'}
                            replace
                        />
                        : <Login />
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        user={user}
                        allowedRoles={['admin']}
                    >
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            >
                  <Route index element={<h2>Dashboard-admin</h2>} />
                  <Route path="camions" element={<CamionList />} />
                  <Route path="users" element={<h2>Gestion utilisateurs </h2>} />

            </Route>

            <Route
                path="/chauffeur"
                element={
                    <ProtectedRoute
                        user={user}
                        allowedRoles={['chauffeur']}
                    >
                        <ChauffeurDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

           
        </Routes>
    );
}

  function App() {

    return (
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    )
  }

  export default App;
