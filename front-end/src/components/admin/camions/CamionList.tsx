
import { useState, useEffect } from 'react';
import CamionForm from './CamionForm';
import CamionCard from './CamionCard';
import type { Camion, CamionFormMode } from '../../../types/camion.types';
import * as service from '../../../services/camionService';

function CamionList() {
    const [showModal, setShowModal] = useState(false);
    const [camions, setCamions] = useState<Camion[]>([]);
    const [selectedCamion, setSelectedCamion] = useState<Camion | null>(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<CamionFormMode>('create');

    const handleOpenModalCreate = () => {
        setMode('create');
        setSelectedCamion(null);
        setShowModal(true);
    }

    const handleOpenModalEdit = async(id: string) =>{
        try{
            const res = await service.getCamionById(id);
            setSelectedCamion(res.data);
            setMode("edit");
            setShowModal(true);
        }catch(err){
            console.log(err);
        }
    }

    const handleGetCamions = async () => {
        try {
            setLoading(true);

            const res = await service.getAll();
            setCamions(res.data);

        } catch (err) {
            console.error('Erreur lors de la récupération des camions :', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetCamions();
    }, [])

    const handleSubmit = async (data: Camion) => {
        try {
            if(mode === 'create'){
                 const res = await service.createCamion(data);
                setCamions(prev => [...prev, res.data]);
               
            }else if(mode === 'edit' && selectedCamion){
                const res = await service.updateCamion(selectedCamion._id, data);

                setCamions(prev => prev.map(c => c._id === selectedCamion._id ? res.data : c));
            }

            setShowModal(false);
             setSelectedCamion(null);
           

        } catch (err) {
            console.error('Erreur lors de la création du camion :', err);
        }
    };

    const handleDelete = async(id: string) => {
        try{
            console.log('handle delete ');
               const  res = await service.deleteCamion(id);
                console.log(res);
              setCamions(prev => prev.filter(c => c._id !== id));
            //   handleGetCamions();
        }catch(err){ console.error(err)}
      
    }

    return (
        <div className="container-fluid py-4 px-md-4">

            {/* Header */}
            <div className="bg-white rounded-4 shadow-sm p-4 mb-4 border">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                    <div>
                        <h2 className="fw-bold text-dark mb-2">
                            Gestion des camions
                        </h2>

                        <p className="text-secondary mb-0">
                            Gérez et suivez facilement votre flotte de camions.
                        </p>
                    </div>

                    <div className="d-flex flex-wrap gap-2">

                        <button
                            type="button"
                            className="btn btn-primary px-3 py-2"
                            onClick={handleOpenModalCreate}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Ajouter un camion
                        </button>

                    </div>
                </div>

                <hr className="my-4" />

               

            </div>

            {/* Modal */}
            {showModal && (
                <CamionForm
                    key={selectedCamion?._id ?? 'create'}
                    mode={mode}
                    initialData={selectedCamion ?? undefined}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            )}

            {/* Camions list */}
            <div className="mb-3">
                <h5 className="fw-bold text-dark">
                    Liste des camions
                </h5>

                <p className="text-secondary small">
                    Consultez les informations de votre flotte.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="text-secondary mt-3">
                        Récupération des camions...
                    </p>
                </div>
            ) : camions.length === 0 ? (

                <div className="bg-white border rounded-4 shadow-sm text-center py-5 px-3">

                    <div
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: '75px', height: '75px' }}
                    >
                        <i className="bi bi-truck fs-1 text-secondary"></i>
                    </div>

                    <h5 className="fw-bold">
                        Aucun camion à afficher
                    </h5>

                    <p className="text-secondary mb-4">
                        Chargez votre flotte ou ajoutez votre premier camion.
                    </p>

                    <button
                        className="btn btn-primary px-4"
                        onClick={handleGetCamions}
                    >
                        Charger les camions
                    </button>

                </div>

            ) : (

                <div className="row g-4">

                    {camions.map(camion => (
                        <div
                            className="col-12 col-md-6 col-xl-4"
                            key={camion._id}
                        >
                            <CamionCard camion={camion} onDelete={handleDelete} onEdit={handleOpenModalEdit} />
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default CamionList;
