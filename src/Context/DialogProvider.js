import React, { createContext, useState, useEffect } from 'react';

const DialogContext = createContext();

export function useDialog() {
    return React.useContext(DialogContext);
}

const DialogProvider = ({ children }) => {
    const [isShow, setIsShow] = useState(false);
    const [whenSubmit, setWhenSubmit] = useState(null);
    const [whenCancel, setWhenCalcel] = useState(null);
    const [content, setContent] = useState('');

    const setShowDialog = ({whenSubmit = function(){},whenCancel = function(){},content = ''}) => {
        setWhenSubmit(()=> whenSubmit)
        setWhenCalcel(()=> whenCancel)
        setContent(()=>content);
        setIsShow(true);
    }

    const onCloseModal = () =>{
        whenCancel();
        setWhenSubmit(null);
        setWhenCalcel(null);
        setContent('');
        setIsShow(false);
    }


    return (
        <DialogContext.Provider value={{
            setShowDialog: setShowDialog
        }}>
            {children}
            {isShow &&
                <React.Fragment>
                    <div onClick={() => {
                        return setIsShow(false);
                    }} className='absolute left-0 top-0 bg-black bg-opacity-40 w-screen h-screen z-50 flex justify-center items-center'>
                    </div>
                    <div className="absolute  left-[50%] top-[50%] translate-x-[-50%]  rounded-lg shadow bg-white mt-[-300px] min-w-[400px] z-[60] border-[2px] border-black">
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-black " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-black">{content}</h3>
                            <button type="button" onClick={()=>whenSubmit(setIsShow.bind(null,false))} className="text-white bg-green-500  border-[2px] border-green-500   font-medium rounded-lg text-sm  items-center px-5 py-2.5 text-center mr-2">
                                ตกลง
                            </button>
                            <button type="button" onClick={onCloseModal} className="bg-white hover:bg-red-600   rounded-lg  border-red-600 border-[2px] text-sm font-medium px-5 py-2.5 hover:text-white ">ยกเลิก</button>
                        </div>
                    </div>
                </React.Fragment>
            }
        </DialogContext.Provider>
    )
}

export default DialogProvider

