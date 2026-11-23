
import { useState } from 'react';
import type { JWTDecode} from '../../types/auth.types';
import AdminSideBar from './AdminSideBar';
import CamionList from './camions/CamionList';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type AdminView = 'dashboard' | 'camion' | 'user';

export type AdminDashboardProps = {
    admin: JWTDecode;
    onLogout: () => void;
    onNavigate: (view: AdminView) => void;

};

function AdminDashboard() {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');

    
    const renderContent = () => {
        switch (activeView) {
            case 'user':
                return <h2>Gestion des utilisateurs</h2>;

            case 'camion':
                return <CamionList />

            default:
                return <h2>Dashboard Admin</h2>;
        }
    };

    return (
        <div className="d-flex min-vh-100">
            <AdminSideBar
               
            />

            <main className="flex-grow-1 p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminDashboard;
