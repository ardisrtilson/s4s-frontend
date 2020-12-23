import React, { useRef } from "react"
import "./Login.css"

export const Register = (props) => {
    const username = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    // const existingUserCheck = () => {
    //     return fetch(`http://localhost:8000/customers?email=${email.current.value}`)
    //         .then(_ => _.json())
    //         .then(user => !!user.length)
    // }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            // existingUserCheck()
                    fetch("http://localhost:8000/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username.current.value,
                            password: password.current.value,
                            first_name: firstName.current.value,
                            last_name: lastName.current.value,
                            sex_id: 1
                        })
                    })
                        .then(_ => _.json())
                        .then(
                                props.history.push("/login"))
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up 4 Samples 4 Singles</h1>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}