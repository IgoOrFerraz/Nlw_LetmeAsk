// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImage from '../assets/images/google-icon.svg';

// Styles
import '../styles/auth.scss';

// Components
import { Button } from '../components/Button';

// Libaries
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button  type="submit">Entrar na Sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}