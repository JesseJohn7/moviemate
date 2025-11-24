import { useEffect, useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movielist, setMovieList] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  const fetchMovies = async () => {
    setisLoading(true);
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return
      }
      setMovieList(data.results || []);
    } catch (error) {
      setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally{
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero banner" className="w-64 h-auto mx-auto" />
          <h1>Find <span className='text-gradient'>Movies</span> Yoou'll Enjoy without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>
            
        </section>
      </div>
    </main>
  )
}

export default App