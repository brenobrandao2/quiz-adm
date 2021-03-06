import { useEffect, useState } from 'react'
import './css/App.css'
import Header from './components/Header'
import Login from './pages/Login'
import QuizList from './pages/QuizList'
import CreateQuiz from './pages/CreateQuiz'
import CreateQuestion from './pages/CreateQuestion'
import CreateFinalCard from './pages/CreateFinalCard'
import AnswersConfiguration from './pages/AnswersConfiguration'
import Configurations from './pages/Configurations'
import UsersList from './pages/UsersList'
import CreateUser from './pages/CreateUser'
import Dashboard from './pages/Dashboard'
import Logs from './pages/Logs'
import Logo from './pages/Logo'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useUser } from './contexts/AuthContext'

import { getImages } from './repository/quiz.repository'

function App() {
  const [user, ,] = useUser()
  const [favicon, setFavicon] = useState()

  useEffect(() => {
    const setImages = async () => {
      const allImages = await getImages()
      const faviconDoc = allImages && allImages.length > 0 ? allImages.find(image => image.tipo === 'favicon') : ''
      
      if (faviconDoc) {
        setFavicon(`data:${faviconDoc.favicon.mimetype};base64,${faviconDoc.favicon.buffer}`)
      }
  }

  setImages()
  },[])
  

  if (user) {
    console.log('Logged in')
    return (
      <HelmetProvider>
        <Router>
          <div className="App">
            <Helmet>
              <meta charSet="utf-8" />
              <link rel="icon" type="image/png" href={favicon} />
              <title>Life + Money Quiz</title>
            </Helmet>
            <Header />
            <Route path="/" exact component={QuizList} />
            <Route path="/create-quiz" exact component={CreateQuiz} />
            <Route path="/create-question" exact component={CreateQuestion} />
            <Route path="/create-final-card" exact component={CreateFinalCard} />
            <Route path="/answers-configuration" exact component={AnswersConfiguration} />
            <Route path="/configurations" exact component={Configurations} />
            <Route path="/users" exact component={UsersList} />
            <Route path="/create-user" exact component={CreateUser} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/logs" exact component={Logs} />
            <Route path="/logo" exact component={Logo} />
          </div>
        </Router>
      </HelmetProvider>
    );
  } else {
    console.log('Not logged in')
    return (
      <HelmetProvider>
        <Router>
          <div className="App">
            <Helmet>
              <meta charSet="utf-8" />
              <link rel="icon" type="image/png" href={favicon} />
              <title>Life + Money Quiz</title>
            </Helmet>
            <Header />
            <Route path="/" exact component={Login} />
          </div>
        </Router>
      </HelmetProvider>
    );
  }
}

export default App;
