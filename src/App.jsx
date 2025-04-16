import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './App.css'
import db from './utils/db'
import { Link, useNavigate } from 'react-router-dom';
import ContactSearchForm from './components/ContactSearchForm';
import PageHeader from "./components/PageHeader";


function AddContactBtn() {
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/add-contact");
  }

  return <button onClick={goToAdd} type='button' aria-label='Add a new contact' className='btn btn-primary'>Create New Contact</button>
}

function EditContactBtn({ id }) {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(`/edit-contact/${id}`);
  }

  return <button type='button' aria-label='Edit contact.' className="btn btn-primary" onClick={handleBtnClick}><i className="bi bi-pencil-square"></i></button>
}

function Contact({ name, email, id, bestFriend }) {

  return (
    <article className='card contact-overview-card p-2 bg-body-tertiary'>
      <div className='card-body'>
        <div className="d-flex justify-content-between mb-2">
          <div className='d-flex align-items-center gapmd--2'>
            <Link to={`/contacts/${id}`} className='text-decoration-none'><h3 className='card-title'>{name}</h3></Link>
            {bestFriend && <h4 className='card-subtitle text-body-secondary fs-6'>- Best friend</h4>}
          </div>
          <EditContactBtn id={id} />
        </div>
        <p><strong>Email: <a href={`mailto:${email}`} className="card-link">{email}</a></strong></p>
      </div>
    </article>
  )
}

function App() {

  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the contact data from firestore
  async function getContacts(db) {
    const contactsCol = query(collection(db, "contact"), orderBy("lastName", "asc"));
    const contactsSnapshot = await getDocs(contactsCol);
    const contacts = contactsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setContacts(contacts);
  }

  function onSearch(e) {
    setSearchQuery(e.target.value);
  }

  let filteredContacts;

  if (searchQuery) {
    filteredContacts = contacts.filter(contact => {
      const fullName = contact.firstName + " " + contact.lastName;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
  }

  else {
    filteredContacts = contacts;
  }

  // When the page loads and components mounts, this will run
  useEffect(() => {
    getContacts(db);
  }, []);

  return (
    <>
      <PageHeader>
        <h1 className='display-3 fw-bold text-center mb-4'>Minimal Contacts</h1>

        <ContactSearchForm handleFormChange={onSearch} />
      </PageHeader>

      <div className="container-xl">
        <main>
          <section className='px-2 px-md-5 pb-5'>
            <div className='d-flex align-items-center justify-content-between mb-4'>
              <div>
                <h2 className='display-5 fw-bold'>My Contacts</h2>
                <AddContactBtn />
              </div>
              <p className='mb-2'>{filteredContacts.length} Contacts</p>
            </div>

            <section className='d-flex flex-column gap-4'>
              {filteredContacts.map(contact => (
                <Contact name={contact.firstName + " " + contact.lastName} email={contact.email} id={contact.id} bestFriend={contact.bestFriend} key={contact.id} />
              ))}
            </section>

          </section>
        </main>
      </div>
    </>
  )
}

export default App
