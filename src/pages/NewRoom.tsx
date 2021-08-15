// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// Styles
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

// Libraries
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase'; // useAuth ja possui acesso à database, porém por n estar sendo utilizado no objeto denominado, não é possível o acesso
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault(); // Intercepta o evento antes de acontecer, retomando o valor "default", ou seja, não faz nada

        if(newRoom.trim() === ''){ return; }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                <div className="main-container">
                    <img src={logoImg} alt="LetmeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type = "text" 
                            placeholder = "Nome da sala" 
                            onChange = { event => setNewRoom(event.target.value) }
                            value = { newRoom }
                        />
                        <Button  type="submit">Criar Sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}