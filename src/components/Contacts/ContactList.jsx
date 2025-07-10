import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContactItem from './ContactItem';
import contactService from '../../services/contactService';
import AuthContext from '../../context/AuthContext';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getAllContacts();
        setContacts(data);
      } catch (err) {
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h3 className="mb-0">My Contacts</h3>
        <Link to="/contacts/new" className="btn btn-light">
          <i className="bi bi-plus-lg me-1"></i>Add Contact
        </Link>
      </div>
      <div className="card-body">
        {contacts.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No contacts found</p>
          </div>
        ) : (
          <div className="list-group">
            {contacts.map(contact => (
              <ContactItem 
                key={contact.id} 
                contact={contact} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;