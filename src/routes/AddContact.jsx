import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import EditForm from "../components/EditForm";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function AddContact() {

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {

        const c = collection(db, "contact");

        try {
            const docRef = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                bestFriend: formData.bestFriend
            });
            navigate(`/contacts/${docRef.id}`);
        }
        catch (error) {
            alert("There was an issue. Please try again later.");
            console.log(error);
        }
    }

    return (
        <>
            <PageHeader backBtn={true}>
                <h1 className='display-3 fw-bold text-center mb-4'>Add Contact</h1>
            </PageHeader>

            <main>
                <EditForm onFormSubmit={handleSubmit} />
            </main>
        </>
    )
}

export default AddContact