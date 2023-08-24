export default function Page404() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "60vh" }}
    >
      <h2 className="display-4 py-5">Oops! This page is not available!</h2>
      <p>
        The route <b>{location.pathname}</b> is not available.
      </p>
      <p>
        There must be something wrong with the route. Please try again.
      </p>
    </div>
  );
}