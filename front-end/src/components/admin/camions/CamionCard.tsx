
import type { CamionCardProps } from '../../../types/camion.types';

function CamionCard({ camion, onDelete, onEdit}: CamionCardProps) {

    const isAvailable = camion.etat === 'disponible';

    return (
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

            {/* Top border */}
            <div
                className={`border-top border-4 ${
                    isAvailable ? 'border-success' : 'border-warning'
                }`}
            />

            <div className="d-body p-4">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-4">

                    <div className="d-flex align-items-center gap-3">

                        <div
                            className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: '55px', height: '55px' }}
                        >
                            <i className="bi bi-truck-front-fill fs-3 text-primary"></i>
                        </div>

                        <div>
                            <h5 className="fw-bold mb-1">
                                Camion
                            </h5>

                        
                        </div>

                    </div>

                    <span className={`badge rounded-pill px-3 py-2 ${
                        isAvailable
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning-emphasis'
                    }`}>
                        <i className={`bi ${
                            isAvailable ? 'bi-check-circle-fill' : 'bi-tools'
                        } me-1`}></i>

                        {camion.etat === 'disponible'
                            ? 'Disponible'
                            : 'Maintenance'}
                    </span>

                </div>

                {/* Kilométrage */}
                <div className="bg-light rounded-3 p-3 mb-3">

                    <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-speedometer2 text-primary fs-5"></i>

                        <small className="text-secondary fw-semibold">
                            KILOMÉTRAGE
                        </small>
                    </div>

                    <h3 className="fw-bold mb-0 text-dark">
                        {(camion.kilometrage ?? 0).toLocaleString('fr-FR')}
                        <small className="fs-6 text-secondary ms-1">km</small>
                    </h3>

                </div>

                {/* Archive status */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <span className="text-secondary">
                        <i className="bi bi-archive me-2"></i>
                        Statut d'archivage
                    </span>

                    <span className={`badge rounded-pill ${
                        camion.archive
                            ? 'bg-secondary'
                            : 'bg-success-subtle text-success'
                    }`}>
                        {camion.archive ? 'Archivé' : 'Actif'}
                    </span>

                </div>

                <hr className="text-secondary opacity-25" />

                {/* Actions */}
                <div className="d-flex justify-content-between gap-2">

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm flex-fill"
                        title="Voir les détails"
                        onClick={() => console.log('Détails :', camion._id)}
                    >
                        <i className="bi bi-eye me-1"></i>
                        Détails
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm flex-fill"
                        title="Modifier le camion"
                        onClick={() => onEdit(camion._id)}
                    >
                        <i className="bi bi-pencil-square me-1"></i>
                        Modifier
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        title="Supprimer le camion"
                        onClick={() => onDelete(camion._id)}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>

                </div>

            </div>
        </div>
    );
}

export default CamionCard;
