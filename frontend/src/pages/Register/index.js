import React, {useState} from 'react';
import './style.css';
import api from '../../services/api'
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {name,email,whatsapp,city,uf};
        try {
            const response = await api.post('ongs', data);
            const ID = response.data.id;
            const NGO_NAME = response.data.name;
            alert('Your account was made successfully! \nID: '+ID+' \nLogin Name: '+NGO_NAME);
            localStorage.setItem('ongId', ID);
            localStorage.setItem('ongName', NGO_NAME);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro. ERR: '+err);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="NGOs connection"/>
                    <h1>Register</h1>
                    <p>Make your account, enter the platform and help people find your NGO's cases</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        I don't have an account
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="NGO's name" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-Mail to contact" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)}/>
                        <input type="text" placeholder="State" style={{width: 100}} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">
                        Make account!
                    </button>
                </form>
            </div>
        </div>
    );
}