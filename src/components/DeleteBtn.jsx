function DeleteBtn({ children, callbackFnc, isOutline }) {
    return (
        <button type="button" className={`btn btn-${isOutline ? "outline-" : ""}danger`} onClick={callbackFnc}>{ children }</button>
    )
}

export default DeleteBtn;