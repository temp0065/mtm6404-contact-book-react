import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import db from "../utils/db";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import EditForm from "../components/EditForm";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function EditContact() {

    const [contact, setContact] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

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

    const handleSave = async (updatedContact) => {
        try {
            const docRef = doc(db, "contact", id);
            await updateDoc(docRef, updatedContact);
            navigate(`/contacts/${updatedContact.id}`);
        }
        catch (error) {
            alert("There was an issue. Please try again later.");
            console.log(error);
        }
    }

    const handleContactDelete = async () => {
        try {
            const docRef = doc(db, "contact", id);
            await deleteDoc(docRef);
            navigate("/");
        }
        catch (error) {
            alert("There was an issue. Please try again later.");
            console.log(error);
        }
    }

    // When Contact loads fetch the contact
    useEffect(() => {
        fetchContactById(id);
    }, []);

    return (
        <>
            <PageHeader backBtn={true}>
                <h1 className="display-3 fw-bold">Edit Contact</h1>
                <h2 className="display-6 fw-semibold">{ contact.fullName }</h2>
            </PageHeader>

            <div className="container-xl">
                <main>
                    <EditForm contact={contact} onFormSubmit={handleSave} contactId={id} onContactDelete={handleContactDelete} />
                </main>
            </div>
        </>
    )
}

export default EditContact