import React, { useState } from 'react'
import PharmaItem from './PharmaItem';
import PharmaTableHead from './PharmaTableHead';

import apiUrl from '../../../config/api-url';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import showToast from '../../../util/showToast';

const PharmaTable = ({ pharmacies, handleClick, fetchPhamacies }) => {
    const [isLoad, setIsLoad] = useState(false);

    const onRemovePharmacy = async (pharmacyId) => {
        try {
            setIsLoad(true);
            const res = await axios.delete(apiUrl + "/pharma/" + pharmacyId)
            await fetchPhamacies(pharmacyId);
            setTimeout(() => {
                setIsLoad(false);
            }, 500)
        } catch (e) {
            setIsLoad(false);
            showToast({ text: 'เกิดข้อผิดพลาด', type: 'error' })
        }
    }


    return (
        <div className='w-full'>
            <div className='w-full h-12 border-2 flex justify-start items-center pl-5 bg-gray-50'>
                <h1>Pharmacy Management</h1>
            </div>
            <div className='h-[65vh] mt-5 border-2  overflow-y-auto relative'>
                <table className="w-full relative ">
                    <PharmaTableHead />
                    <tbody  >
                        {
                            pharmacies.map((pharmacy) => {
                                return <PharmaItem onRemovePharmacy={onRemovePharmacy.bind(null, pharmacy.pharmacy_id)} handleClick={() => handleClick(pharmacy)} name={pharmacy.pharmacy_store_name} key={pharmacy.pharmacy_id} />
                            })
                        }
                    </tbody>
                </table>
                {
                    isLoad && <div className='
                absolute
                h-full
                left-0
                right-0
                top-0
                bg-black
                bg-opacity-10
                 border-2 flex flex-col  justify-center items-center '>
                        <Oval
                            wrapperClass='translate-y-[-30%]'
                            height="40"
                            width="40"
                            radius="9"
                            strokeWidth={5}
                            color="#FCD683"
                            secondaryColor="#82AFB6"
                            ariaLabel="loading"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default PharmaTable