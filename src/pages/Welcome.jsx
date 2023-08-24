import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"

export default function Welcome() {
  return <div className="frontPage p-5">
    <div className="innerFront p-5">
      <h2> Welcome to Feature Flicks Cinema</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam harum cupiditate placeat dicta veniam, assumenda atque modi fugiat, id reiciendis laudantium inventore provident minus voluptates quaerat quae. Tempore, quo recusandae!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, possimus maxime corporis adipisci excepturi qui aut voluptatem sunt earum, quaerat debitis dignissimos dolorum quasi voluptas asperiores, eos saepe magnam perferendis?</p>
      <NavLink to={'/movies'} >
        <Button className="mt-5 m-3 px-4 py-2" variant="outline-primary">
          Go to Movies
        </Button>
      </NavLink>
      <NavLink to={'/screen-list'} >
        <Button className="mt-5 m-3 px-4 py-2" variant="outline-primary" type='submit'>
          Go to Screenings
        </Button>
      </NavLink>
    </div>
  </div>
}