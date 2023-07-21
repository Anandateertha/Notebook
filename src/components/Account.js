import React, { useEffect, useState ,useContext} from 'react';
import '../styles/Account.css';

const Account = () => {

    const [info, setinfo] = useState({
        name: "",
        email: "",
        date:""
    });

    const [leng, setleng] = useState(null)

    const getLength=async()=>{
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setleng(json.length)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/getuser', {
                    method: "GET",
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                });

                const json = await response.json();
                console.log(json);
                setinfo({ name: json.name, email: json.email ,date:new Date(json.date).toLocaleString()});
            } catch (error) {
                console.log(error, "Error fetching the data");
            }
        };

        fetchData();
        getLength()
    }, []);

    return (
        <div className='center'>
            This is all about Your Account details
            <div>
                <p>Username : {info.name}</p>
                <p>Email : {info.email}</p>
                <p>Created : {info.date}</p>
                <p>Total Notes : {leng} </p>
            </div>
        </div>
    );
};

export default Account;
