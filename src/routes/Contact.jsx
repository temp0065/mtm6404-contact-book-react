import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../utils/db";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function Contact() {

    const [contact, setContact] = useState({});

    const { id } = useParams();

    // create a functon to fetch student
    async function fetchContactById(contactId) {
        const docRef = doc(db, "contact", contactId);
        const docSnapshot = await getDoc(docRef);

        // check if the doc exists in firestore
        if (docSnapshot.exists()) {
            setContact({
                id: docSnapshot.id,
                ...docSnapshot.data(),
                fullName: docSnapshot.data().firstName + " " + docSnapshot.data().lastName
            });
        }
        else {
            alert("Contact could not be found in records. Please provide a valid contact id.");
            return null;
        }
    }

    // When Contact loads fetch the contact
    useEffect(() => {
        fetchContactById(id);
    }, [id])

    return (
        <>
            <PageHeader backBtn={true}>
                <h1 className="display-3 fw-bold text-center mb-4">Contact Overview</h1>
            </PageHeader>

            <div className="container-lg">
                <main>
                    <section className="w-100">
                        <div className="card contact-overview-card m-auto">
                            {contact.bestFriend ? <h3 className="card-header">Best Friend</h3> : <h3 className="card-header">Contact</h3>}
                            <div className="card-body">
                                <h3 className="card-title">{ contact.fullName }</h3>
                                <p className="card-text"><strong>First Name: </strong> { contact.firstName }</p>
                                <p className="card-text"><strong>Last Name: </strong> { contact.lastName }</p>
                                <p>
                                    <strong>Email: </strong> 
                                    <a href={`mailto:${contact.email}`} aria-label={`Send email to ${contact.firstName}`}> { contact.email }</a>
                                </p>
                                <Link to={`/edit-contact/${id}`}><button type="button" className="btn btn-primary" aria-label="Go to the edit contact page.">Edit Contact</button></Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Contact