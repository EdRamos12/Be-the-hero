import React, {useState} from 'react';
import './style.css';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {title,description,value};
        try {
            const response = await api.post('incidents', data, {headers: {Authorization: ongId}});
            history.push('/profile');
        } catch (err) {
            alert('Error trying to register case, see console for details.');
            console.error(err);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="NGOs connection"/>
                    <h1>Register new case</h1>
                    <p>Describe your case in details, to find the perfect person to solve this.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Return to home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Case's title" value={title} onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input type="number" placeholder="Value in USD" value={value} onChange={e => setValue(e.target.value)}/>
                    <button className="button" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}