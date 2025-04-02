import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './App.css'
import db from './utils/db'


function Contact({ name, email, id, }) {
  return (
    <article>
      <h2>{ name }</h2>
      <h3><em>Email:</em> { email }</h3>
    </article>
  )
}

function App() {
  
  const [contacts, setContacts] = useState([]);
  
  // Fetch the contact data from firestore
  async function getContacts(db) {
    const contactsCol = query(collection(db, "contact"), orderBy("lastName", "asc"));
    const contactsSnapshot = await getDocs(contactsCol);
    const contacts = contactsSnapshot.docs.map(doc => doc.data());
    setContacts(contacts);
  }

  // When the page loads and components mounts, this will run
  useEffect(() => {
    getContacts(db);
  }, []);

  return (
    <>
      <h1>Contact List</h1>

      <main>
        {contacts.map(contact => <Contact name={contacts.firstName + " " + contacts.lastName} />)}
      </main>
    </>
  )
}

export default App
