import {useState} from 'react';
import type {camionFormProps, CamionFormData} from '../../../types/camion.types';




function CamionForm({mode, onClose, onSubmit, initialData}: camionFormProps){
    const [formData, setFormData] = useState<CamionFormData>(
        initialData ?? {kilometrage: 0,
        etat: 'disponible',
        archive: false}
    );
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement |  HTMLSelectElement>) => {
            const { name, value} = e.target;
            

            if(e.target  instanceof HTMLInputElement && e.target.type === 'checkbox'){
                const checked = e.target.checked;
                setFormData(prev => ({
                    ...prev,
                    [name]: checked  
                }));
            return 
            }

            setFormData(prev => ({
                ...prev,
                [name]: name === 'kilometrage'?(value === ''? 0 : Number(value))   :value
                }
                )
            );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('data form modal', formData);
        onSubmit(formData);
        onClose();
    }

   

     return (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">

             
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title fw-bold">
                                {mode === 'create' ? 'Ajouter un camion' : 'Modifier un camion'}
                            </h5>
                            <small className="text-muted">
                                Remplissez les informations du camion
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

      
                    <div className="modal-body p-4">
                        <form id="CamionForm" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="kilometrage" className="form-label fw-semibold">
                                    Kilométrage
                                </label>
                                <input
                                    type="number"
                                    id="kilometrage"
                                    name="kilometrage"
                                    value={formData.kilometrage}
                                    className="form-control"
                                    placeholder="Ex : 150000"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="etat" className="form-label fw-semibold">
                                    État du camion
                                </label>
                                <select
                                    id="etat"
                                    name="etat"
                                    value={formData.etat}
                                    className="form-select"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="disponible">Disponible</option>
                                    <option value="maintenance">En maintenance</option>
                                </select>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    id="archive"
                                    name="archive"
                                    checked={formData.archive}
                                    className="form-check-input"
                                    onChange={handleChange}
                                />
                                <label htmlFor="archive" className="form-check-label">
                                    Camion archivé
                                </label>
                            </div>

                        </form>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onClose}
                        >
                            Annuler
                        </button>

                        <button type="submit"  form="CamionForm"  className="btn btn-primary px-4">
                            Enregistrer
                        </button>
                   
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CamionForm;

