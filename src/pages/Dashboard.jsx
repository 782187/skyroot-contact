import { useContext } from 'react';
import ContactList from '../components/Contacts/ContactList';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div className="text-danger">Unauthorized. Please log in.</div>;
  }

  return (
    <div>
      <h2 className="text-primary mb-4" style={{ WebkitTextStroke: '1px black' }}>
        Welcome, {user.username}!
      </h2>
      <ContactList />
    </div>
  );
};

export default Dashboard;
