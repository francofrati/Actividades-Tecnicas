import React from 'react'
import s from './Form.module.css'
import { useFormik } from 'formik'
import { schema } from '../../schemas/index'
import swal from 'sweetalert'
import { InputField, TextAreaField } from '../fields/Fields'

function Form() {

    const onSubmit = (values, actions) => {
        swal('Info:', JSON.stringify(values), "success", { button: 'Close' })
            .then((r) => actions.resetForm())
    }
    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            textarea: '',
        },
        validationSchema: schema,
        onSubmit
    })
    
    const inputSettings = [
        {
            name: 'name',
            type: 'text',
            ph: 'Woody Allen',
            value: values.name,
            errors: errors.name,
            touched: touched.name
        },
        {
            name: 'email',
            type: 'text',
            ph: 'contoso@domain.com',
            value: values.email,
            errors: errors.email,
            touched: touched.email
        },
        {
            name: 'password',
            type: 'password',
            ph: 'Provide a password',
            value: values.password,
            errors: errors.password,
            touched: touched.password
        }
    ]

    return (
        <div className={s.container}>
            <h1 className={s.title}>Form</h1>
            <form onSubmit={handleSubmit} className={s.form_container}>
                {inputSettings.map((e, i) => (
                    <InputField
                        key={i}
                        value={e.value}
                        errors={e.errors}
                        ph={e.ph}
                        type={e.type}
                        touched={e.touched}
                        name={e.name}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />))}
                <TextAreaField
                    handleChange={handleChange}
                    value={values.textarea}
                />
                <button type='submit' disabled={isSubmitting} className={s.btn}>Submit</button>
            </form>
        </div>
    )
}

export default Form