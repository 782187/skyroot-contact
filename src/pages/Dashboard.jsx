import { useContext } from 'react';
import ContactList from '../components/Contacts/ContactList';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-primary mb-4" style={{WebkitTextStroke: "1px black"}}>Welcome, {user?.username}!</h2>
      <ContactList />
    </div>
  );
};

export default Dashboard;