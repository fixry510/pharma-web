import React from 'react'
import { useDialog } from '../../../Context/DialogProvider';

const PharmaItem = ({name,id,handleClick,onRemovePharmacy}) => {

    const { setShowDialog } = useDialog();


    const onDelete = (e) =>{
        e.stopPropagation();
        setShowDialog({
            whenSubmit:function (close){
                onRemovePharmacy();
                close();
            },
            content:`ต้องการลบ ${name} ใช่หรือไม่ ?`
        });
    }

    return (
        <tr  onClick={handleClick} className="border-b hover:bg-gray-100 cursor-pointer" key={id}>
            <td className="text-start font-light px-6 py-4 text-sm  text-gray-900">
                {name}
            </td>
            <td className="border-l text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button  onClick={onDelete} className='w-[50%] min-w-[100px]  bg-red-600 hover:bg-red-500   text-white py-2 px-4 border rounded'>
                    Delete
                </button>
            </td>
        </tr >
    )
}

export default PharmaItem