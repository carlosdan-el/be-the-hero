import React, {Component, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash, FiEdit} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Profile() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {

        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then(response => {

            setIncidents(response.data);

        })

    }, [ongId]);

    async function handleDeleteIncident(id) {

        try {

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id))


        } catch(err) {

            alert("Erro ao deletar caso, tente novamente.");

        }

    }

    function handleLogout() {

        localStorage.clear();
        history.push('/');

    }

    return (

        <div className="profile-container">
            <header>
                <Link to="/">
                    <img src={logoImg} alt="Be The Hero"/>
                </Link>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}</p>
                    <button onClick={() => handleDeleteIncident(incident.id)} type="submit">
                        <FiTrash size={20} color="#A8A8B3"/>
                    </button>
                    </li>
                ))}
            </ul>
        </div>

    );

}