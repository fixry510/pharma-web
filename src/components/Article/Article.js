import React, { useEffect, useState } from 'react'
import ArticleTable from './ArticleTable/ArticleTable'
import { IoMdAddCircle } from 'react-icons/io';
import ArticleInfomation from './ArticleInfomation/ArticleInfomation';

import url from '../../config/api-url';
import axios from 'axios';
import showToast from '../../util/showToast';
import { Oval } from 'react-loader-spinner';
import moment from 'moment-timezone';

const Article = () => {

    const [isLoad, setIsLoad] = useState(true);
    const [isAdd, setIsAdd] = useState(true);
    const [currentArticle, setCurrentArticle] = useState({});

    const [articleData, setArticleData] = useState([]);

    const onAddArticleHandler = () => {
        setIsAdd(true);
        setCurrentArticle({});
    }

    const onSetArticleHandler = (article) => {
        setCurrentArticle(article);
        setIsAdd(false);
    }


    const fetchArticle = async (reset = false) => {
        try {
            const res = await axios.get(url + "/article");
            setArticleData((val) => {
                return res.data.map(article => {
                    const article_date = moment(article.article_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
                    return {
                        ...article,
                        article_date
                    }
                })
            });
            if (reset) {
                onAddArticleHandler();
            }
        } catch (e) {
            showToast({ text: 'เกิดข้อผิดพลาด', type: 'error' })
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoad(false);
        }, 250)
    }, [articleData]);


    useEffect(() => {
        if (!isLoad) {
            if (articleData.length > 0) {
                onSetArticleHandler(articleData[0]);
            }
        }
    }, [isLoad])

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
        <div className='w-full flex flex-col px-10 md:flex-row md:px-[5%] lg:px-[15%] pt-6'>
            <div className='w-12/12 md:w-7/12'>
                <ArticleTable
                    currentArticle={currentArticle}
                    articleData={articleData}
                    fetchArticle={fetchArticle}
                    onSetArticleHandler={onSetArticleHandler} />
                <div onClick={onAddArticleHandler} className='w-full h-12 border-2 flex justify-center items-center pl-5 mt-6 bg-gray-50 hover:bg-gray-200 cursor-pointer'>
                    <h1>เพิ่มบทความ </h1>
                    <IoMdAddCircle size={25} className="mt-1 ml-2" />
                </div>
            </div>
            <div className=' w-12/12 pt-5  md:pt-0 md:ml-5  md:w-5/12 '>
                <ArticleInfomation currentArticle={currentArticle} isAdd={isAdd} fetchArticle={fetchArticle} />
            </div>
        </div>
    )
}

export default Article