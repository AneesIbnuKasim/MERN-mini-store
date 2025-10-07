import React, { useState } from 'react'
import {Form, Formik, Field, ErrorMessage, useField} from 'formik'
import * as Yup from 'yup'

const FILE_SIZE = 2*1024*1024
const FILE_FORMAT = ['image/jpeg','image/jpg','image/png','image/webp']

const addProductSchema = Yup.object().shape({
  title: Yup.string().min(3,'Title must be at least 3 characters ').required('Title required'),
  price: Yup.number('invalid type').required('price required'),
  description: Yup.string().min(10,'Description must be at least 10 characters ').required('Description required'),
  category: Yup.string().min(3,'category must be at least 3 characters ').required('category required'),
  image : Yup.mixed().required('image is required')
  .test('FileSize','Exceeded file size limit,max size:2mb',
    (value)=>!value || (value&& value.size<=FILE_SIZE)
  )
  .test('FILE_FORMAT','Invalid file format',
    (value)=>!value || (value && FILE_FORMAT.includes(value.type))
  )
}) 

const FileInput = ({label, ...props})=>{
  const [field, meta, helpers] = useField(props);
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file); // set in Formik state
    if (file) {
      setPreview(URL.createObjectURL(file)); // generate preview
    } else {
      setPreview(null);
    }
  };
  return (
    <>
      <label >{label}</label>
      <input 
      type='file'
      onChange={(e)=>handleChange(e)}
      className='border p-2 rounded'  />
       { preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 h-32 w-32 object-cover border rounded"
        />
      )}

    </>
  )
}



function AddProduct() {
  return (
    <>
      <Formik
      initialValues={{

        title:'',
        category: '',
        description: ''
      }}
      validationSchema={addProductSchema}
      // onSubmit={addProduct}
      >
        <Form >
          <div className='flex flex-col w-[60%] m-auto mt-20 border p-5 rounded-xl gap-5'>
              <div className='flex flex-col gap-3'>
            <label htmlFor="title">title</label>
            <Field name="title" className="border p-2 w-full" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>
         
          <div className='flex flex-col gap-3'>
            <label>Category</label>
             <Field as="select" name="category" className="border p-2">
      <option value="">Select category</option>
      <option value="electronics">Electronics</option>
      <option value="furniture">Furniture</option>
      <option value="grocery">Grocery</option>
      <option value="fashion">Fashion</option>
    </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="brand">Brand Name</label>
            <Field name="brand" className="border p-2 w-full" />
            <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="description">description</label>
            <Field as='textarea' name="description" className="border p-2 w-full" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <div className='flex flex-col gap-3'>
            <FileInput name="image" label="Image" />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            
          </div>
          <div className='m-auto'>
            <button type='submit' className='bg-blue-500 py-3 px-5 rounded-2xl text-white text-xl hover:bg-blue-400 hover:text-black' >Add Product</button>
          </div>

          </div>
        </Form>
      </Formik>
    </>
  )
}

export default AddProduct
