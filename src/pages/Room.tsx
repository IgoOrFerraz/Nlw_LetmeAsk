// Images
import logoImg from '../assets/images/logo.svg';

// Components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// Libraries
import { useParams } from 'react-router-dom';

// Styles
import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function Room(){
    // useParams captura os parametros da URL após a /
    const params = useParams<RoomParams>(); // <RoomParams> é chamado de Generic, uma tipagem default

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={params.id}/>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea placeholder="O que você quer perguntar?" />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button> </span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}