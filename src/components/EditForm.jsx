import { useEffect, useState } from "react";
import SaveBtn from "./SaveBtn";
import DeleteBtn from "./DeleteBtn";

function EditForm({ contactId, contact, onFormSubmit, onContactDelete }) {

    const contactFallback = {
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        id: contact ? contactId : null,
        bestFriend: false
    }

    const [contactFormData, setContactFormData] = useState(contactFallback);

    const [contactExists, setContactExists] = useState(false);

    useEffect(() => {
        // If contact exists then set the Form data to it
        if (contact) {
            setContactFormData({
                ...contactFallback,
                ...contact,
                id: contactId
            });
            setContactExists(true);
        }
    }, [contact])

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setContactFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        onFormSubmit(contactFormData);
    }

    return (
        <>
            <div className="container border rounded-2 p-5">
                <h3>Enter Contact Details</h3>
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="form-control" value={contactFormData.firstName} onChange={handleChange} />
                        </div>

                        <div className="col">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="form-control" value={contactFormData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" value={contactFormData.email} onChange={handleChange} />
                        </div>

                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" name="bestFriend" id="bestFriend" checked={contactFormData.bestFriend} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="bestFriend">Best Friend</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
                                <SaveBtn>Save Contact</SaveBtn>
                                {contactExists && <DeleteBtn callbackFnc={onContactDelete} isOutline={true}>Delete Contact</DeleteBtn>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditForm;