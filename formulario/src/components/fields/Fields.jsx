import React from 'react'
import s from './Field.module.css'
import { BsExclamationCircle } from 'react-icons/bs'

export function InputField({name,value,ph,type,handleBlur,handleChange,errors,touched}) {
  return (
    <label className={s.inp_container}>
                    {name[0].toUpperCase()+name.slice(1)}:
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={ph}
                        className={errors && touched ? s.err + ' ' + s.inp : s.inp} />
                        {errors && touched?<span className={s.icon}><BsExclamationCircle size={'1.5rem'} color={'red'}/></span>:<></> }
                    {errors && touched
                        ? <p className={s.err_text}>{errors}</p>
                        : <></>
                    }
                </label>
  )
}



export function TextAreaField({handleChange,value}) {
  return (
    <label className={s.inp_container}>
                    Text Area:
                    <textarea
                        type="text"
                        name='textarea'
                        value={value}
                        onChange={handleChange}                        
                        className={s.inp} />
                </label>
  )
}

