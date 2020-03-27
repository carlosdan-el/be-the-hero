import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function NewIncident() {

    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleCreateIncident(e) {

        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try{

            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            });

            history.push('/profile');

        }
        catch(err) {

            alert("erro ao tentar cadastrar incidente!");

        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <Link to="/">
                        <img src={logoImg} alt="Be The Hero"/>
                    </Link>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft/>
                        Voltar para o home
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );

}