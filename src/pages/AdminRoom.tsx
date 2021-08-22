// Images
import logoImg from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';

// Components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// Libraries
import { useHistory, useParams } from 'react-router-dom';

// Styles
import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
//import { useAuth } from '../hooks/useAuth';

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    // useParams captura os parametros da URL após a /
    const params = useParams<RoomParams>(); // <RoomParams> é chamado de Generic, uma tipagem default
    const roomId = params.id;
    //const user = useAuth<RoomParams>();
    const { questions, title } = useRoom(roomId);
    const history = useHistory();

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }
    
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm("Tem certeza que quer excluir essa pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined onClick={handleEndRoom}> Encerrar sala </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {questions.map(
                        question => {
                            return(
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImage} alt="Remover Pergunta" />
                                    </button>
                                </Question>
                            )
                        }
                    )}
                </div>

            </main>
        </div>
    );
}