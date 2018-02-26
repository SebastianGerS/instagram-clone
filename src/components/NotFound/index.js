import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <section>
      <h2>Not Found</h2>
      <p>Try this link instead <Link to="/">Home</Link></p>
    </section>
  )
}

export default NotFound;