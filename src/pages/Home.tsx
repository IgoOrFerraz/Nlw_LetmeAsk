// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImage from '../assets/images/google-icon.svg';

// Styles
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

export function Home() {
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
                    <button className="create-room">
                        <img src={googleImage} alt="Logo do Google" />
                        Crie sua Sala com Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button  type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}