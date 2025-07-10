import { Link } from 'react-router-dom';

const ContactItem = ({ contact, onDelete }) => {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{contact.name}</h5>
          {contact.email && (
            <small className="text-muted me-2">
              <i className="bi bi-envelope me-1"></i>{contact.email}
            </small>
          )}
          {contact.phone && (
            <small className="text-muted">
              <i className="bi bi-telephone me-1"></i>{contact.phone}
            </small>
          )}
        </div>
        <div>
          <Link to={`/contacts/${contact.id}/edit`} className="btn btn-sm btn-outline-primary me-2">
            <i className="bi bi-pencil-square"></i>
          </Link>
          <button onClick={() => onDelete(contact.id)} className="btn btn-sm btn-outline-danger">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;