import './App.css';
import { useEffect, useState } from 'react';
import CharacterBody from './components/Body'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [characters, setCharacters] = useState([])
  const [current_URL, setCurrent_URL] = useState('https://rickandmortyapi.com/api/character')
  const [nextURL, setNextURL] = useState('')
  const [prevURL, setPrevURL] = useState('')
  const [flipped, setFlipped] = useState(false)

  useEffect(() =>{
    fetch(current_URL)
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res.results)
        setNextURL(res.info.next)
        setPrevURL(res.info.prev)
    })
  }, [current_URL, flipped])

  return (
    <div className="App">
      <CharacterBody 
        characters={characters} 
        setCurrent_URL={setCurrent_URL}
        nextURL={nextURL} 
        prevURL={prevURL} 
        flipped={flipped} 
        setFlipped={setFlipped}/>
    </div>
  );
}

export default App;
