import React, { createContext, useState, useEffect } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Audio, Oval } from 'react-loader-spinner'
import axios from 'axios';
import apiUrl from '../config/api-url';
import showToast from '../util/showToast';

const AuthContext = createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [isLoadAuth, setIsLoadAuth] = useState(true);

    const onLogin = async (email, password) => {
        try {
            // const res = await axios.post(apiUrl + '/login-admin', {
            //     email: email,
            // });
            const data = await signInWithEmailAndPassword(auth, email, password).catch(err => {
                switch (err.code) {
                    case "auth/Invalid-email":
                        showToast({
                            text: 'อีเมล์ไม่ถูกต้อง',
                            type: 'error'
                        })
                        break;
                    case "auth/user-disabled":
                        showToast({
                            text: 'user-disabled',
                            type: 'error'
                        })
                        break;
                    case "auth/user-not-found":
                        showToast({
                            text: 'ไม่พบผู้ใช้',
                            type: 'error'
                        })
                        break;
                    case "auth/wrong-password":
                        showToast({
                            text: 'รหัสผ่านไม่ถูกต้อง',
                            type: 'error'
                        })
                        break;
                    default:
                        showToast({
                            text: 'เกิดข้อผิดพลาด',
                            type: 'error'
                        })
                }
            });
            return data;
        } catch (e) {
            showToast({
                text: e?.response.data?.message || 'เกิดข้อผิดพลาด',
                type: 'error'
            })
        }
    }

    const onLogout = async () => {
        await auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((us) => {
            setCurrentUser(us);
            setIsLoadAuth(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser: currentUser,
            onLogin: onLogin,
            onLogout: onLogout,
        }}>
            {
            !isLoadAuth ? 
            <div className='animate-fade'>{children}</div> : <div className='w-full h-screen flex justify-center items-center translate-y-[-15%]'>
                <Oval
                    height="80"
                    width="80"
                    radius="9"
                    strokeWidth={5}
                    color="#FCD683"
                    secondaryColor="#82AFB6"
                    ariaLabel="loading"
                />
            </div>
        }
            {/* {children} */}

        </AuthContext.Provider>
    )
}

export default AuthProvider

