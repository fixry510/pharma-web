import React from 'react'

const CustomInput = ({ title, value, onChangeText, className, textArea = false,disabled=false,type = 'text' }) => {
    return (
        <div className={className}>
            <p className='text-sm text-gray-400 mb-1'>{title}</p>
            {textArea ?
                <textarea name="Text1" rows="4" 
                disabled = {disabled}
                value={value} onChange={(event) => onChangeText(event.target.value)}
                className={'bg-gray-100 rounded border outline-none p-[5px] text-sm w-full'}
                 />
                : <input value={value} onChange={(event) => onChangeText(event.target.value)}
                    className='bg-gray-100 rounded border outline-none p-[5px] text-sm'
                    type={type}
                />}

        </div>
    )
}

export default CustomInput