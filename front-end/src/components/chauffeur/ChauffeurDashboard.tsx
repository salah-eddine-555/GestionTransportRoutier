import type {JWTDecode} from '../../types/auth.types';


type ChauffeurDashboardProps = {
    chauffeur: JWTDecode;
}

function AdminDashboard({chauffeur}: ChauffeurDashboardProps){

    return(
        <>
            <h2>DashBoard chauffeur {chauffeur.firstname}</h2>
            <p>{chauffeur.lastname}</p>
            <p>email: {chauffeur.email}</p>
        </>
    )
}

export default AdminDashboard;