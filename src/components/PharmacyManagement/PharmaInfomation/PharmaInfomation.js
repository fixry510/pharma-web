import React, { useEffect, useRef, useState } from 'react'
import { BsShop } from 'react-icons/bs'
import { FormControlLabel, Switch, FormControl, FormGroup, FormLabel, Typography } from '@mui/material';

import '../../../App.css';
import CustomInput from '../../../UI/CustomInput';
import compareChange from '../../../util/compare-change';
import apiUrl from '../../../config/api-url';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import showToast from '../../../util/showToast';

const PharmaInfomation = ({ phamacy, fetchPhamacies }) => {

    const [isLoad, setIsLoad] = useState(false);
    const [img, setImg] = useState();
    const [file, setFile] = useState(undefined);
    const [storeNamePharmacy, setStoreNamePharmacy] = useState('');
    const [fullNamePharmacy, setFullNamePharmacy] = useState('');
    const [emailPharmacy, setEmailPharmacy] = useState('');
    const [addressPharmacy, setAddressPharmacy] = useState('');
    const [phonePharmacy, setPhonePharmacy] = useState('');
    const [pharmacyStatus, setPharmacyStatus] = useState(false);

    const onSaveChanges = async () => {
        try {
            setIsLoad(true);
            const formData = new FormData()
            formData.append('image', file)
            formData.append('pharmacyId', phamacy.pharmacy_id)
            formData.append('storeNamePharmacy', storeNamePharmacy)
            formData.append('fullNamePharmacy', fullNamePharmacy)
            formData.append('emailPharmacy', emailPharmacy)
            formData.append('addressPharmacy', addressPharmacy)
            formData.append('phonePharmacy', phonePharmacy)
            formData.append('pharmacyStatus', pharmacyStatus == 1 ? 1 : 0)
            const response = await axios({
                method: "patch",
                url: apiUrl + "/edit-pharmacy",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchPhamacies(true);
            setTimeout(() => {
                setIsLoad(false);
                showToast({ text: 'อัพเดตสำเร็จ', type: 'success' })
            }, [1000])
        } catch (e) {
            setIsLoad(false);
            showToast({ text: 'เกิดข้อผิดพลาด', type: 'error' })
        }
    }

    useEffect(() => {
        setImg(phamacy.pharmacy_image);
        setStoreNamePharmacy(phamacy.pharmacy_store_name);
        setFullNamePharmacy(phamacy.pharmacy_fullName);
        setEmailPharmacy(phamacy.pharmacy_email);
        setAddressPharmacy(phamacy.pharmacy_address);
        setPhonePharmacy(phamacy.pharmacy_phone);
        setFile(undefined);
        if (phamacy.pharmacy_status == 1) {
            setPharmacyStatus(true);
        } else {
            setPharmacyStatus(false);
        }
    }, [phamacy]);

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            return;
        }
        const [file] = e.target.files;
        setFile(file);
        setImg(URL.createObjectURL(file));
    }

    const handleToggle = (event) => {
        setPharmacyStatus(event.target.checked);
    }

    let isChange = false;

    let st = 0;
    if (pharmacyStatus) {
        st = 1;
    } else {
        st = 0;
    }

    isChange = compareChange(
        [
            phamacy.pharmacy_image,
            phamacy.pharmacy_store_name,
            phamacy.pharmacy_fullName,
            phamacy.pharmacy_email,
            phamacy.pharmacy_address,
            phamacy.pharmacy_phone,
            phamacy.pharmacy_status,
        ],
        [
            img,
            storeNamePharmacy,
            fullNamePharmacy,
            emailPharmacy,
            addressPharmacy,
            phonePharmacy,
            st,
        ]
    );

    return (
        <React.Fragment>
            <div className=' w-full h-12 border-2 flex justify-start items-center pl-5 bg-gray-50'>
                <h1>Profile Pharmacy Infomation</h1>
            </div>
            <div className=' w-full mt-5 border-2 flex flex-col  items-center p-5 relative'>
                <label for="file-upload" className='cursor-pointer'>
                    {img ? <img src={img} alt='' className='w-[120px] h-[120px] rounded-[99rem]   object-cover' /> : <p className='text-[120px]'>
                        <BsShop className='scale-[0.7]' />
                    </p>}
                    <input className='hidden' id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={onSelectImage} />
                </label>
                <div className='flex w-full mt-4'>
                    <CustomInput className='flex flex-col w-6/12 mr-4' title='Pharmacy Name' value={storeNamePharmacy} onChangeText={setStoreNamePharmacy} />
                    <CustomInput className='flex flex-col w-6/12' title='Full Name Pharmacist' value={fullNamePharmacy} onChangeText={setFullNamePharmacy} />
                </div>
                <div className='flex  w-full mt-3'>
                    <CustomInput className='flex flex-col w-6/12 mr-4' title='Email' value={emailPharmacy} onChangeText={setEmailPharmacy} />
                    <CustomInput className='flex flex-col w-6/12' title='Phone' value={phonePharmacy} onChangeText={setPhonePharmacy} />
                </div>
                <div className='mt-3 w-full'>
                    <CustomInput disabled textArea title='Address' value={addressPharmacy} onChangeText={setAddressPharmacy} />
                </div>
                <div className='ml-8 mt-2 w-full'>
                    <FormControl className='w-full text-start'>
                        <FormLabel id='kanit' color='grey'>สถานะการอนุมัติ</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                id='kanit'
                                className='pl-3'
                                control={<Switch checked={pharmacyStatus} onChange={handleToggle} />}
                                label={<Typography id='kanit' style={{ fontSize: '14px', color: pharmacyStatus ? 'green' : 'grey' }}>{pharmacyStatus ? 'อนุมัติแล้ว' : 'ยังไม่อนุมัติ'}</Typography>}
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <button onClick={onSaveChanges} className={`
                    transition-all  min-w-[150px] w-[90%] md:w-[80%] lg:w-[40%]   border  ${isChange ? 'bg-[#FCD683] text-gray-700  border-black' : 'bg-gray-300 border-gray-300 text-white'}   py-1 px-4 mt-5  rounded
                    `}>
                    Save Changes
                </button>
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
        </React.Fragment>
    )
}

export default PharmaInfomation