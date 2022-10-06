import React, { useEffect, useState } from 'react'
import { IoMdImage } from 'react-icons/io'
import CustomInput from '../../../UI/CustomInput'
import axios from 'axios'
import apiUrl from '../../../config/api-url'
import { useAuth } from '../../../Context/AuthProvider'
import showToast from '../../../util/showToast'
import { Oval } from 'react-loader-spinner'
import compareChange from '../../../util/compare-change'


const ArticleInfomation = ({ currentArticle, isAdd, fetchArticle }) => {

    const [isLoad, setIsLoad] = useState(false);
    const [img, setImg] = useState();
    const [file, setFile] = useState(undefined);

    const { currentUser: { uid } } = useAuth();
    const [articleDate, setArticleDate] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');


    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            return;
        }
        const [file] = e.target.files;
        setFile(file);
        setImg(URL.createObjectURL(file));
    }


    const onSubmit = async () => {
        try {
            if (!file || !articleTitle || !articleDate || !articleDescription) {
                throw {
                    message: "กรุณาใส่ข้อมูลให้ครบ"
                }
            }
            setIsLoad(true);
            const formData = new FormData();
            formData.append('image', file);
            formData.append('articleTitle', articleTitle);
            formData.append('articleDate', articleDate);
            formData.append('articleDescription', articleDescription);
            formData.append('userId', uid);
            const response = await axios({
                method: "post",
                url: apiUrl + "/article",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchArticle();
            showToast({ text: isAdd ? 'เพิ่มบทความสำเร็จ' : 'อัพเดตสำเร็จ', type: 'success' })
        } catch (e) {
            showToast({ text: e.message || 'เกิดข้อผิดพลาด', type: 'error' })
        } finally {
            setIsLoad(false);
        }
    }


    useEffect(() => {
        if (Object.keys(currentArticle).length > 0) {
            setArticleTitle(currentArticle.article_title);
            setArticleDescription(currentArticle.article_description);
            setImg(currentArticle.article_image);
            setArticleDate(currentArticle.article_date);
            setFile(undefined);
        } else {
            setArticleTitle('');
            setArticleDescription('');
            setArticleDate('')
            setImg(undefined);
            setFile(undefined);
        }
    }, [currentArticle])


    let isChange = isAdd ? true : compareChange(
        [
            currentArticle.article_image,
            currentArticle.article_title,
            currentArticle.article_description,
            currentArticle.article_date,
        ],
        [
            img,
            articleTitle,
            articleDescription,
            articleDate
        ]
    );


    return (
        <React.Fragment>
            <div className=' w-full h-12 border-2 flex justify-start items-center pl-5 bg-gray-50'>
                <h1>Article Infomation</h1>
            </div>
            <div className='w-full mt-5 border-2 flex flex-col items-center p-5 relative'>
                <label for="file-upload" className='cursor-pointer'>
                    {img ?
                        <img src={img} alt='' className='w-[120px] h-[120px] rounded-[99rem]   object-cover' /> : <p className='text-[120px]'>
                            <IoMdImage className='scale-[0.7]' />
                        </p>}
                    <input className='hidden' id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={onSelectImage} />
                </label>
                <div className='flex  w-full mt-3'>
                    <CustomInput title={'Title'} value={articleTitle} onChangeText={setArticleTitle} className='flex flex-col w-6/12 mr-4' />
                    <CustomInput title={'Date'} value={articleDate} onChangeText={setArticleDate} className='flex flex-col w-6/12' type='date' />
                </div>
                <CustomInput
                    textArea
                    title={'Description'}
                    value={articleDescription}
                    onChangeText={setArticleDescription}
                    className='mt-3 w-full'
                />
                {/* <div className='mt-3 w-full'>
                    <p className='text-sm text-gray-400 mb-1'>Description</p>
                    <textarea name="Text1" rows="5" className='bg-gray-100 rounded border outline-none p-[5px] text-sm w-full ' />
                </div> */}
                <button onClick={onSubmit} className=
                    {`w-[80%] sm:w-[25%] min-w-[150px] bg-[#FCD683]  
                    py-1 px-4 mt-5 border border-black rounded
                    ${isChange ? 'bg-[#FCD683] text-gray-700  border-black' : 'bg-gray-300 border-gray-300 text-white'}
                    `}>
                    {isAdd ? 'Add' : 'Save Changes'}
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

export default ArticleInfomation



