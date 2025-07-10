import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contactService from '../../services/contactService';
import AuthContext from '../../context/AuthContext';

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          const contact = await contactService.getContact(id);
          setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
          });
        } catch (err) {
          setError('Failed to load contact');
        }
      };
      fetchContact();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await contactService.updateContact(id, formData);
      } else {
        await contactService.createContact(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save contact');
    }
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white">
        <h3>{id ? 'Edit Contact' : 'Add New Contact'}</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange}/>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-success me-md-2" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;