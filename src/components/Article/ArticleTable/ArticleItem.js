import React from 'react'
import { useDialog } from '../../../Context/DialogProvider'

const ArticleItem = ({ name, id,onSetArticleHandler,onRemoveArticle }) => {

    const { setShowDialog } = useDialog();

    const onDelete = (e) => {
        e.stopPropagation();
        setShowDialog({
            whenSubmit: function (close) {
                onRemoveArticle();
                close();
            },
            content: `ต้องการลบบทความ ${name} นี้หรือไม่ ?`
        });
    }


    return (
        <tr className={"border-b hover:bg-gray-100 cursor-pointer" } onClick={onSetArticleHandler}  key={id}>
            <td className="text-start px-6 py-4 text-sm font-light text-gray-900">
                {name}
            </td>
            <td className="border-l text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button onClick={onDelete} className='w-[50%] min-w-[100px]  bg-red-600 hover:bg-red-500   text-white py-2 px-4 border rounded'>
                    Delete
                </button>
            </td>
        </tr >
    )
}

export default ArticleItem