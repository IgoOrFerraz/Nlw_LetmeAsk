// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImage from '../assets/images/google-icon.svg';

// Styles
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';
import { database } from '../services/firebase';

// Libaries
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

export function Home() {
    /* Qualquer function começada com "use..." se refere à um Hook, portanto utiliza informações do contexto em questão */
    const history = useHistory();

    /* Captura de um valor de Context com o propósito de conferir se existe uma session em aberto */
    const { user, signInWithGoogle } = useAuth();

    /* Redirecionamento de página simulando um link */
    async function handleCreateRoom(){
        
        if(!user){ await signInWithGoogle() }

        // Redirecionamento após conclusão do login (PopUp)
        history.push('/rooms/new');
    }

    // no hook useState, entre parenteses é esperado um valor inicial, onde podemos definir um type default, por isso, caso string, adicionar aspas
    const [roomCode, setRoomCode] = useState('');

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){ return; }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImage} alt="Logo do Google" />
                        Crie sua Sala com Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button  type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}