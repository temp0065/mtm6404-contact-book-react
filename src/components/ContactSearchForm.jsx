function ContactSearchForm({ handleFormChange }) {
    // Prevent the form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the form from submitting
    };

    return (
        <form className="main-search-bar w-100" onSubmit={handleSubmit}>
            <label htmlFor="contactSearch" className="form-label visually-hidden">Contact Name</label>
            <div className="input-group-text gap-2">
                <span className="input-group-text border-0" id="search-icon"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" id="contactSearch" name='contactSearch' onChange={handleFormChange} placeholder="Search contacts" aria-describedby="search-icon" />
            </div>
        </form>
    )
}

export default ContactSearchForm