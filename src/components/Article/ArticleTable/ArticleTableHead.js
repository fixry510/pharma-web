import React from 'react'

const ArticleTableHead = () => {
    return (
        <thead className="sticky top-0 border-b bg-gray-50">
            <tr>
                <th width="60%" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Article
                </th>
                <th className="border-l  text-sm font-medium text-gray-900 px-6 py-4">
                    Delete
                </th>
            </tr>
        </thead >
    )
}

export default ArticleTableHead