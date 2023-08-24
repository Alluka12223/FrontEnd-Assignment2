import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useParams, Link } from "react-router-dom";
import { useStates } from "../utilities/states";

export default function () {
  const { slug } = useParams();
  const s = useStates("screenings");
  const movie = s.movies.find((movie) => movie.slug == slug);
  console.log('mov0', movie);
  const { id, title, description } = movie;
  const { length, categories, posterImage } = description;
  const screenings = s.screenings
    .filter((sc) => sc.movieId === id)
    .sort(
      ({ time: aTime }, { time: bTime }) => new Date(aTime) - new Date(bTime)
    );

  return (
    <div className="bg-light">
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        fluid="lg"
      >
        <h1>{title}</h1>
        <h4>
          Length: {Math.floor(length / 60)}h {length % 60}m{" "}
        </h4>
        <h4>Categories: {categories.join(", ")}</h4>
        <Image
          className="my-3"
          fluid
          src={"https://cinema-rest.nodehill.se" + posterImage}
        />
        <h2>Book your tickets from the links below</h2>
        {screenings.map((sc) => (
          <Link className="fs-3" to={`/booking/${sc.id}`}>
            {new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(sc.time))}
          </Link>
        ))}
      </Container>
    </div>
  );
}