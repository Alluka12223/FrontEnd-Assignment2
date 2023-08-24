import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Welcome from "./pages/Welcome"

export default function App() {
  const s = useStates('screenings', {
    movies: [],
    screenings: [],
    screeningsXmovies: [],
    sortingOrders: 1,
    categories: [],
    selectedCategory: "All",
    searchText: "",
  })

  useEffect(() => {
    (async () => {
      const fetchScreenings = await (await fetch('/api/screenings')).json();
      const fetchMovies = await (await fetch('/api/movies')).json();

      for (let movie of fetchMovies) {
        movie.slug = kebabify(movie.title);
      }
      s.movies = fetchMovies;

      fetchScreenings.sort(({ time: aTime }, { time: bTime }) => {
        return aTime < bTime ? s.sortingOrders : -s.sortingOrders;
      });
      s.screenings = fetchScreenings;

      let screeningsXmovies = s.screenings.map((sc) => {
        let movie = s.movies.find((m) => m.id === sc.movieId);
        return { ...movie, ...sc };
      });
      s.screeningsXmovies = screeningsXmovies;

      let categories = await (await fetch("/api/categories")).json();
      s.categories = categories;
    })();
  }, []);

  return <>
    <header>
      <Header />
    </header>

    <main>
      <div className="container mt-4 mb-3">
        <Routes>
          <Route path="/" element={< Welcome />} />
        </Routes>
      </div>
    </main>

    <footer className="container-fluid text-light bg-primary bg-gradient">
      <Footer />
    </footer>
  </>
}