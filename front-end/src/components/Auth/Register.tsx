import {useState, type ChangeEvent,type FormEvent } from 'react';
import type {RegisterCredentials} from '../../types/auth.types';




function Register (){

    const [formData, setFormData] = useState<RegisterCredentials>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleChange =(e: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formData);
        
    }   

    return (
        <>
            <h2>Register</h2>
            <div className="form">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname">First name</label>
                        <input value={formData.firstname} name="firstname" type="text"  placeholder="first name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="firstname">Last name</label>
                        <input value={formData.lastname} name="lastname" type="text" placeholder="last name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">email : </label>
                        <input  value={formData.email} type="email" name="email" id="email" placeholder="email" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password : </label>
                        <input value={formData.password} type="password" name="password" id="password" placeholder="password" onChange={handleChange}/> 
                    </div>
                    <button type="submit">Register</button>
                 
                </form>
            </div>
        
        </>
    )
}

export default Register;