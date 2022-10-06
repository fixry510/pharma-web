import axios from 'axios';
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner';
import apiUrl from '../../../config/api-url';
import showToast from '../../../util/showToast';
import ArticleItem from './ArticleItem'
import ArticleTableHead from './ArticleTableHead'

const ArticleTable = ({ articleData, onSetArticleHandler, fetchArticle,currentArticle }) => {

    const [isLoad, setIsLoad] = useState(false);

    const onRemoveArticle = async (articleId) => {
        try {
            setIsLoad(true);
            const res = await axios.delete(apiUrl + "/article/" + articleId)
            await fetchArticle(currentArticle.article_id == articleId);
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
                <h1>Article</h1>
            </div>
            <div className='h-[60vh] mt-5 border-2  overflow-y-auto relative'>
                <table className="w-full relative ">
                    <ArticleTableHead />
                    <tbody  >
                        {
                            articleData.map((article) => {
                                return <ArticleItem
                                    name={article.article_title}
                                    key={article.article_id}
                                    onSetArticleHandler={onSetArticleHandler.bind(null, article)}
                                    onRemoveArticle={onRemoveArticle.bind(null, article.article_id)}
                                />
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

export default ArticleTable