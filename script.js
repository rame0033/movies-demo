// Movie search and sorting application

// Variable containig an array of objects - movies data used in the app.
const data = [
  {
    index: 1,
    title: 'Dredd',
    year: 2013
  },
  {
    index: 2,
    title: 'Dark City',
    year: 1998
  },
  {
    index: 3,
    title: 'Elysium',
    year: 2013
  },
  {
    index: 4,
    title: 'Fifth Element',
    year: 2007
  },
  {
    index: 5,
    title: 'Aliens',
    year: 1986
  },
  {
    index: 6,
    title: 'Terminator 2: Judgment Day',
    year: 1991
  },
  {
    index: 7,
    title: 'Terminator, The',
    year: 1984
  },
  {
    index: 8,
    title: 'Dawn of the Planet of the Apes',
    year: 2014
  },
  {
    index: 9,
    title: 'Chappie',
    year: 2015
  },
  {
    index: 10,
    title: 'Matrix',
    year: 1999
  },
  {
    index: 11,
    title: 'Interstellar',
    year: 2015
  },
  {
    index: 12,
    title: 'Cloud Atlas',
    year: 2013
  },
  {
    index: 13,
    title: 'Children of Men',
    year: 2007
  },
  {
    index: 14,
    title: 'Total Recall',
    year: 1990
  },
  {
    index: 15,
    title: 'Rise of the Planet of the Apes',
    year: 2011
  },
  {
    index: 16,
    title: 'Robocop',
    year: 1987
  },
  {
    index: 17,
    title: 'Avatar',
    year: 2009
  },
  {
    index: 18,
    title: 'Akira',
    year: 1987
  },
  {
    index: 19,
    title: 'Alien',
    year: 1979
  },
  {
    index: 20,
    title: 'Starship Troopers',
    year: 1997
  },
  {
    index: 21,
    title: 'District 9',
    year: 2009
  },
  {
    index: 22,
    title: 'Blade Runner',
    year: 1992
  },
  {
    index: 23,
    title: 'Minority Report',
    year: 2002
  },
  {
    index: 24,
    title: 'Watchmen',
    year: 2009
  },
  {
    index: 25,
    title: 'War of the Worlds',
    year: 2005
  },
  {
    index: 26,
    title: 'Jurassic Park',
    year: 2014
  },
  {
    index: 27,
    title: 'Looper',
    year: 2012
  }
]

// Component representing a single movie. It takes a 'props' object as parameter, rgument, which contains a 'movie' object with the 'title' and 'year' properties (defined as attribute when the component is called).
function Movie (props) {

  // 'Destructuring assignment' that extracts the 'title' and 'year' properties from the 'props.movie' object and assigns them to the variables 'title' and 'year' respectively
  const {title, year} = props.movie
  // Represents whether the movie is selected or not.
  const [selected, setSelected] = React.useState(false)

  // Toggles the selected state when the movie is clicked.
  function clickHandler () {
    setSelected(!selected)
  }

  // The component renders a div element with the class name "movie"
  return (
  <div className="movie" onClick={clickHandler}>
    {/* {selected ? <span>x</span> : "" } */}
    { selected && <span>x</span> }  {title} ({year})
  </div>)
}

// Component representing a list of movies. It takes a props object as an argument, which contains a movies array
function Movies (props) {
  const movies = props.movies

  // map() over the movies array to get a 'Movie' component for each movie
  const moviesList = movies.map(movie => <Movie key={movie.index} movie={movie} />)

  // The component renders the 'moviesList'
  return (
    <div className="movies">
      {moviesList}    
    </div>
  )
}

// Main component
function App () {
  // state variables declaration
  // variable used for the array of movies. Is initialized with the data variable defined at the very beginig.
  const [movies, setMovies] = React.useState(data)
  // Variable used for the search query entered by the user
  const [query, setQuery] = React.useState('')
  // Variable used for the selected sort option.
  const [sortBy, setSortBy] = React.useState('index')

// Hook used to update the movies state/data whenever the query, or sortBy, state changes
  React.useEffect(() => {
    // Filters the data array based on the 'query' (case-insensitive) and sorts the filtered array based on the selected 'sortBy' option. The final array is saved in the 'movies' variable through the function 'setMovies'.
    setMovies(data.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1
      } else if (a[sortBy] > b[sortBy]) {
        return 1
      } else {
        return 0
      }
    }))
  }, [query, sortBy])

  // Event handler function. Prevents the default form submission behavior.
  function formHandler (e) {
    e.preventDefault();
  }

  // Event handler function. Updates the 'query' state based on the input text value.
  function textHandler (e) {
    setQuery(e.target.value)
  }

  // Event handler function. Updates the 'sortBy' state based on the selected option value
  function selectHandler (e) {
    setSortBy(e.target.value)
  }

  // The main component renders the 'Form' and the Movies component.
  return (
    <React.Fragment>
      <h1>Movies</h1>
      {/* Triggers the 'formHandler' function when the form is submitted. */}
      <form onSubmit={formHandler}>
        {/* 1. The 'value' attribute is set to the 'query' state variable, which is used to display the current value of the text input.
        2. The 'textHandler' function is called whenever the user types in the text input, and it updates the 'query' state with the new value. */}
        <input type="text" value={query} onChange={textHandler} />
        <select value={sortBy} onChange={selectHandler}>
          <option value="index">index</option>
          <option value="title">title</option>
          <option value="year">year</option>
        </select>
      </form>
      {/* Renders the 'Movies' component with the 'movies' prop(as attribute) set to the movies state */}
      <Movies movies={movies} />
    </React.Fragment>
  )
}

// Renders the App component inside the element with the id "root" in the HTML document.
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)