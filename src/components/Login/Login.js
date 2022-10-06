import React, { useState } from 'react';

import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import { Route } from 'react-router-dom';

const Login = () => {
    const { onLogin } = useAuth();
    const [inputData, setInputData] = useState();

    const onChangeText = (event) => {
        const newInput = { ...inputData };
        newInput[event.target.name] = event.target.value;
        setInputData(newInput);
    }

    const onSubmit = async () => {
        const data = await onLogin(inputData.email, inputData.password);
        console.log(data);
    }

    return (

        <div className="flex h-screen justify-center">
            <div className="
                w-1/3 bg-[#FCD683] max-w-[800px] min-w-[350px]
                border-2 border-black   
                 shadow-xl self-center px-5 py-10 sm:py-14 sm:px-[5%]
                 translate-y-[-30%]
                ">
                <h1 className="font-light w-full text-center text-3xl  mb-7">LOGO</h1>
                <input placeholder='email' name='email' onChange={onChangeText} className="font-light w-full p-[8px] outline-none mt-4  text-gray-700 text-[14px] border-[1.5px] border-black" />
                <input placeholder='password' type="password" name='password' onChange={onChangeText} className="font-light w-full p-[8px] outline-none mt-4  text-gray-700 text-[14px] border-[1.5px] border-black" />
                <button onClick={onSubmit} className="
                    w-full bg-[#82AFB6] mt-[40px] shadow-md border-[1.5px] border-black rounded-[5px] h-10
                    hover:border-white hover:text-white
                    ">Login</button>
            </div>
        </div>

    )
}

export default Login