// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// Styles
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

// Libraries
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

    const { user } = useAuth();

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
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button  type="submit">Criar Sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}