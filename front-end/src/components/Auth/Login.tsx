import {useState} from 'react';
import type {LoginCredentials,} from '../../types/auth.types';
import {login as  loginRequest} from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';


function Login(){
    const { login } = useAuth();
    
    const [formData, setFormData] = useState<LoginCredentials>({email: '', password: ''});
    const [error, setError]  = useState<string | null>(null);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try{
            const user =  await loginRequest(formData);    
            console.log("teste ", user);
            login(user);
           
            console.log('connexion reussie');
            setFormData({email: '', password: ''});
        }catch(err){
            if(err instanceof  Error){
                setError(err.message);
            }else{
                setError("autre erreur")
            }
            
        }
    }

    return(
        <>
            <h2>Login</h2>
            {error && (
                <span>{error}</span>
            )}
            <div className="formLogin">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />  
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" value={formData.password} name="password" id="password" onChange={handleChange} />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        </>
    )
}

export default Login;