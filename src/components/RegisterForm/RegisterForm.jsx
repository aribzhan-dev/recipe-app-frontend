import { useState } from "react";

function RegisterForm(){
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handlerSubmit = (e) => {
        e.preventDefault();

        
    }
}