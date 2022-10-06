import React, { useState, useEffect } from 'react'
import PharmaInfomation from './PharmaInfomation/PharmaInfomation'
import PharmaTable from './PharmaTable/PharmaTable'
import { Oval } from 'react-loader-spinner';

import url from '../../config/api-url';
import axios from 'axios';

import showToast from '../../util/showToast';



const PharmacyManagement = () => {

    const [pharmacies, setPharmacies] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [currentPhamacy, setCurrentPhamacy] = useState({
        pharmacy_id: '-999',
        pharmacy_image: '',
        pharmacy_store_name: '',
        pharmacy_fullName: '',
        pharmacy_email: '',
        pharmacy_address: '',
        pharmacy_phone: '',
    });

    const handleClick = (phamacy) => {
        setCurrentPhamacy(phamacy);
    }

    const fetchPhamacies = async (reset = false) => {
        try {
            const res = await axios.get(url + "/pharmacies");
            setPharmacies(res.data);
            if (res.data && currentPhamacy.pharmacy_id === '-999') {
                setCurrentPhamacy(res.data[0]);
            }
            if (reset) {
                const pharmacy = res.data.find((pharma) => pharma.pharmacy_id == currentPhamacy.pharmacy_id);
                setCurrentPhamacy(pharmacy);
            }
        } catch (e) {
            showToast({ text: 'เกิดข้อผิดพลาด', type: 'error' })
        }
    }

    useEffect(() => {
        fetchPhamacies();
    }, []);



    useEffect(() => {
        // if (pharmacies.length > 0) {
        setTimeout(() => {
            setIsLoad(false);
        }, 250)
        // }
    }, [pharmacies]);


    if (isLoad) {
        return <div className='w-full h-screen flex justify-center items-center translate-y-[-15%]'>
            <Oval
                height="50"
                width="50"
                radius="9"
                strokeWidth={5}
                color="#FCD683"
                secondaryColor="#82AFB6"
                ariaLabel="loading"
            />
        </div>
    }

    return (
        <div className='animate-fade  w-full flex flex-col px-10 md:flex-row md:px-[5%] lg:px-[15%] pt-6'>
            <div className='w-12/12 md:w-7/12'>
                <PharmaTable
                    fetchPhamacies={async (pharmacyId) => {
                        await fetchPhamacies(pharmacyId)
                        if (pharmacyId == currentPhamacy.pharmacy_id) {
                            setCurrentPhamacy({
                                pharmacy_id: '-999',
                                pharmacy_image: '',
                                pharmacy_store_name: '',
                                pharmacy_fullName: '',
                                pharmacy_email: '',
                                pharmacy_address: '',
                                pharmacy_phone: '',
                            });
                        }
                    }}
                    handleClick={handleClick}
                    pharmacies={pharmacies} />
            </div>
            <div className=' w-12/12 pt-5  md:pt-0 md:ml-5  md:w-5/12 '>
                <PharmaInfomation fetchPhamacies={fetchPhamacies} phamacy={currentPhamacy} />
            </div>
        </div>
    )
}

export default PharmacyManagement