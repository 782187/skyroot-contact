import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center mt-5">
      <h1 className="display-5 mb-4 fw-bold">
        <i className="bi bi-journal-bookmark-fill text-primary"></i>Skyroot Contacts Manager
      </h1>
      <p className="lead mb-4">
        Manage your contacts easily with our secure application
      </p>
      {user ? (
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Go to Dashboard
        </Link>
      ) : (
        <div>
          <Link to="/login" className="btn btn-primary btn-lg me-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;