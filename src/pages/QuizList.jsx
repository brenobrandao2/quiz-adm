import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as copy from 'copy-to-clipboard'

import '../css/QuizList.css'
import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import COPY_IMG from '../assets/copy.png'
import { deleteById, getAll } from '../repository/quiz.repository.js'
import dayjs from 'dayjs'

const BASE_URL_CLIENT_QUIZ = 'http://192.168.25.10:3001/'

const QuizList = (props) => {
    const [searchQuizText, setSearchQuizText] = useState('')
    const [completeListQuiz, setCompleteListQuiz] = useState([])
    const [listShowQuiz, setListShowQuiz] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        reloadQuizList()
    }, []);

    const reloadQuizList = async () => {
        setLoading(true)
        const res = await getAll()
        console.log(res)
        setCompleteListQuiz(res)
        setLoading(false)
    }

    const deleteQuiz = async (id) => {
        await deleteById(id)
        setListShowQuiz([])
        reloadQuizList()
    }
      
    useEffect(() => {
        if(searchQuizText){
            setListShowQuiz(completeListQuiz.filter(quiz => (quiz.nome.toLowerCase()).includes(searchQuizText.toLowerCase())))}
        else
        setListShowQuiz(completeListQuiz)
    },[searchQuizText, completeListQuiz])

    return (
        <div className="QuizList-container">
            <div className="QuizList-options">
                <input className="QuizList-searchQuizField" placeholder="Pesquisar Quiz pelo nome" onChange={(event) => setSearchQuizText(event.target.value)} />
                <Link to='create-quiz' className="QuizList-newQuizButton">Criar um novo Quiz</Link>
            </div>
            <div className="QuizList-listQuizArea">
                {!loading ?
                    listShowQuiz.map((quiz, index) => {
                        return(
                            <div key={index} className="QuizList-quizArea">
                                <h4 className="QuizList-nome">{quiz.nome}</h4>
                                <p className="QuizList-quizDate">{dayjs(quiz.lastModified).format('DD/MM/YYYY HH:mm:ss')}</p>
                                <div className="QuizList-iconsArea">
                                    <button type="button" className="QuizList-copyQuizUrl" onClick={() => copy(BASE_URL_CLIENT_QUIZ+quiz._id)}>
                                        <p>copiar endereço</p>
                                        <img src={COPY_IMG} alt="copy_img" className="QuizList-iconCopy" />
                                    </button>
                                    <img src={PEN_IMG} alt="pen_img" className="QuizList-icon" onClick={() => props.history.push('create-quiz', { id_quiz: quiz._id })}/>
                                    <img src={DELETE_IMG} alt="delete_img" className="QuizList-icon" onClick={() => deleteQuiz(quiz._id)}/> 
                                </div>
                            </div>
                        )
                    })
                :
                    <div className="QuizList-LoaderArea">
                        <div className="QuizList-loader" />
                    </div>
                }
            </div>
        </div>
    );
};

export default QuizList;