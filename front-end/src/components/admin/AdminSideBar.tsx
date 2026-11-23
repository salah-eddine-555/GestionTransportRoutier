
import './css/AdminSideBar.css';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';




function AdminSideBar() {
    const {user, logout} = useAuth();

    return (
        <aside
            className="d-flex flex-column text-white bg-dark min-vh-100 p-3"
            style={{ width: '260px' }}
        >
            {/* Logo */}
            <div className="d-flex align-items-center gap-2 mb-4 px-2">
                <i className="bi bi-truck fs-2 text-info"></i>
                <div>
                    <h5 className="mb-0 fw-bold">FleetTrack</h5>
                    <small className="text-secondary">Administration</small>
                </div>
            </div>

            <hr className="border-secondary" />

            {/* Admin Information */}
            <div className="d-flex align-items-center gap-3 mb-4 px-2">
                <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: '42px', height: '42px' }}
                >
                    {user?.firstname.charAt(0).toUpperCase()}
                </div>

                <div className="overflow-hidden">
                    <h6 className="mb-0 text-truncate">
                        {user?.firstname} {user?.lastname}
                    </h6>
                    <small className="text-secondary text-truncate d-block">
                        {user?.email}
                    </small>
                </div>
            </div>

            {/* Navigation */}
            <small className="text-uppercase text-secondary fw-semibold mb-2 px-2">
                Menu principal
            </small>

            <nav className="nav nav-pills flex-column gap-2">

                <NavLink to ="/admin"  className="nav-link text-white text-start"><i className="bi bi-speedometer2 me-2"></i>Dashboard</NavLink>
                <NavLink to ="camions" className="nav-link text-white text-start" ><i className="bi bi-truck me-2"></i>Gestion des camions</NavLink>
                <NavLink to="users" className="nav-link text-white text-start">  
                        <i className="bi bi-people me-2"></i>Gestion des utilisateurs
                </NavLink>
                  

            </nav>

            {/* Logout */}
            <div className="mt-auto pt-4">
                <hr className="border-secondary" />

                <button
                    className="btn btn-outline-danger w-100"
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Déconnexion
                </button>
            </div>

        </aside>
    );
}

export default AdminSideBar;
