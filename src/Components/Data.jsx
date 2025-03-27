import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
const Data = () => {
    const [inputData, setInputData] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [tag,setTag] = useState('');
  const [description,setDescription] = useState('');
  const [ category , setCategory] = useState('')


  const handleSubmit = async () => {
    if (!inputData.trim()) {
      setMessage(alert('Please enter some data before submitting.'));
      return;
    }

    try {
        const formdata = new FormData();
        formdata.append('text', inputData);

        if (selectedImage) {
            formdata.append('image', selectedImage);
        }

        const response = await fetch('http://localhost:8000/analyse/social', {
            method: 'POST',
            body: formdata,
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Tag:",result.tag, "Category:",result.category,"Desc:", result.description);
            setMessage( console.log('Data submitted successfully!'));
            setTag( result.tag);
            setCategory(result.category);
            setDescription(result.description);
            setInputData('');
            setSelectedImage(null);
        } else {
            setMessage(result.error || 'Failed to submit data.');
        }
    } catch (error) {
        setMessage('Error connecting to server: ' + error.message);
    }
};

  return (
    <div className="bg-[url('Data.jpeg')] bg-cover h-[800px] ">
      <div className='text-white flex pl-7 gap-2 '>
        <img className='w-[50px] h-auto hover:scale-105 hover:cursor-pointer' src="Arrow.png " alt="" /> 
        <h1 className='mt-1 shadow-md p-3 rounded-lg shadow-gray-100 hover:cursor-pointer hover:shadow-md hover:p-3 hover:rounded-lg hover:scale-105 hover:shadow-slate-300'> 
        <Link to="/">Back to Home</Link></h1></div>
        <div className='flex place-content-center mt-16'>
        <div className='w-[50%] h-[30vh] bg-red-100  rounded-lg shadow-lg border-b-4 border-b-slate-200 shadow-orange-300 '>
           <div className='text-wrap '>
           <textarea className='pl-2   w-[100%] h-[30vh] placeholder:text-xl placeholder:text-black placeholder:mt-2 placeholder:font-mono  placeholder:font-bold placehold:text-wrap' type="text" placeholder='Enter your data '
           value={inputData}
            onChange={(e) => setInputData(e.target.value)}></textarea>
           </div>
           <div className='w-[50%] mt-4'>
                    <input 
                        type="file" 
                        accept="image/*"
                        className="text-white"
                        onChange={(e) => setSelectedImage(e.target.files[0])} 
                    />
                </div>
          </div>
        </div>
        <div className='flex place-content-center text-white mt-8'>
        <button onClick={handleSubmit} className='p-4 border-b-4 border-t-4 border-t-emerald-200 shadow-lg border-b-emerald-200 m-4 rounded-lg hover:shadow-orange-300 hover:scale-105  text-xl font-mono font-semibold  '>Submit</button>
      </div>
      <div className='flex place-content-center mt-6 '>
                <div className='bg-[#2d1f1fae] text-white rounded-md  shadow-inner shadow-red-300  hover:shadow-stone-300  hover:shadow-lg   hover:scale-105' > 
                {tag && (
                <div className="text-center mt-4   font-mono ">
                    <div className='border-b-2 text-md  border-b-slate-300 shadow-md shadow-gray-300 '>
                    Tag: {tag}
                    </div>
                </div>
            )}
            {category && (
                <div className="text-center text-md mt-4 font-mono border-b-2 shadow-md shadow-gray-300 border-b-slate-300">
                    Category: {category}
                </div>
            )}
            {description && (
                <div className="text-center text-md mt-4 font-mono mb-4 px-2 ">
                    Description: {description}
                </div>
            )}
                </div>
            </div>

    </div>
  );
}

export default Data;
