import React from 'react'
import {Formik,Form,Field,ErrorMessage,FieldArray} from 'formik'
import * as Yup from 'yup'
import { Button } from 'bootstrap'
import { TextError } from './TextError'
import { useNavigate } from 'react-router-dom'

const initialValues={
    name:'Vishwas',
    email:'',
    channel:'',
    comments:'',
    address:'',
    social:{
        facebook:'',
        twitter:''
    },
    phoneNumbers:['']
}
const validationSchema=Yup.object({
  name:Yup.string().required("Required"),
  email:Yup.string().email("not in proper format").required("Required")
})
const validateComments=(value)=>{
    let error
    if(!error)
    {
        error="Required"
    }
    return error
}
const onSubmit=(values,submitProps)=>{
    submitProps.setSubmitting(false)
}
export const FormikForm = () => {
    const navigate=useNavigate()
  return (
    <>
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      //validateOnMount

      >
        {
            formik=>{
                return (
                    <Form>
                    <div className='form-control'>
                     <label htmlFor='name'>Name</label>
                     <Field type='text' id='name' name='name'></Field>
                     <ErrorMessage name='name' component={TextError}></ErrorMessage>
                    </div>
                    <div className='form-control'>
                     <label htmlFor='email'>Email</label>
                     <Field type='text' id='email' name='email'></Field>
                     <ErrorMessage name='email'>
                        {
                            (errorMsg)=>{
                                
                                return (
                                    <div className='error'>{errorMsg}</div>
                                )
                            }
                        }
                     </ErrorMessage>
                    </div>
                    <div className='form-control'>
                     <label htmlFor='channel'>Channel</label>
                     <Field type='text' id='channel' name='channel'></Field>
                     <ErrorMessage name='channel'></ErrorMessage>
                    </div>
                    <div className='form-control'>
                     <label htmlFor='comments'>Comments</label>
                     <Field as='textarea' id='comments' name='comments' validate={validateComments}></Field>
                     <ErrorMessage name='comments'component={TextError}></ErrorMessage>
                    </div>
                    <div className='form-control'>
                     <label htmlFor='address'>address</label>
                     <Field  name='address'>
                        {
                            (props)=>{
                               const {field,form,meta}=props
                                return (
                                <div>
                                <input  type='text' id="address" {...field}></input>
                                {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                                </div>
                                )
                            }
                        }
                     </Field>
                     
                    </div>
                    <div className='form-control'>
                     <label htmlFor='facebook'>Facebook profile</label>
                     <Field type="text" id="facebook" name='social.facebook'></Field>
                     </div>
                     <div className='form-control'>
                     <label htmlFor='twitter'>Facebook profile</label>
                     <Field type="text" id="twitter" name='social.twitter'></Field>
                     </div>
                     <div className='form-control'>
                        <label htmlFor=''></label>
                        <FieldArray name="phoneNumbers">
                            {
                                (props)=>{
                                    const {push,remove,form}=props
                                   const {values}=form
                                   const {phoneNumbers}=values
        
                                    return(
                                      phoneNumbers.map((ph,index)=>(
                                        <div key={index}>
                                            <Field name={`phoneNumbers[${index}]`}></Field>
                                            {
                                                index>0 && (<button type='button' onClick={()=>remove(index)}>-</button>)
                                            }
                                            <button type='button' onClick={()=>push('')}>+</button>
                                        </div>
                                      ))
                                    )
                                }
                            }
                        </FieldArray>
                     </div>
                     <button type='button' onClick={()=>formik.validateField('comments')}>Validate field</button>
                     <button type='button' onClick={()=>formik.validateForm()}>Validate all</button>
                     <button type='submit' disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>Submit</button>
                </Form>
                )
            }
        }
       
    </Formik>
    <button onClick={()=>navigate("/materialTable")}>Table</button>
    </>
  )
}
