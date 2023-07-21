import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()

    const [start, setstart] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: start.name, email: start.email, password: start.password }),
        });

        const json = await response.json()
        console.log(json)
        if (json.success) {
            navigate('/')
        }
        else {
            navigate('/signup')
        }
    }


    const onChange = (e) => {
        setstart({ ...start, [e.target.name]: e.target.value })
    }




    return (
        <div className='text'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' onChange={onChange} />
                </div>
                <button disabled={start.password===start.confirmpassword?false:true}type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup