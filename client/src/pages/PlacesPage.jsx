import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from './Perks';
import axios from 'axios';

const PlacesPage = () => {
 
    const {action} = useParams();
    const [title,setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState("");
    const [description,setDescription] = useState("");
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState("");
    const [checkIn,setCheckIn] = useState("");
    const [checkOut,setCheckOut] = useState("");
    const [maxGuests,setMaxGuests] = useState("");
    const [redirect,setRedirect] = useState("");

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header,descriptionn){
        return (
            <>
                {inputHeader(header)}
                {inputDescription(descriptionn)}
            </>
        )
    }

    async function addPhotoByLink(e){
       e.preventDefault();
       const {data:filenames} =  await axios.post("/upload-by-link",{link:photoLink})
       setAddedPhotos(prev => {
        return [...prev,filenames];
       })
       setPhotoLink('');
    }
    // console.log(addedPhotos);

     async function uploadPhoto(ev){
       ev.preventDefault();
       const files = ev.target.files;
       console.log(files);
       const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i])
        }

       axios.post('/upload',data,{
        headers : {"Content-Type":"multipart/form-data"}
       }).then(response =>{
        const {data:filename} = response;
             setAddedPhotos(prev => {
             return [...prev,...filename];
           })
       })
    }

     async function addNewPlace(ev){
        ev.preventDefault();
        const placeData = {title,address,addedPhotos,description,perks,
            extraInfo,checkIn,checkOut,maxGuests}

        const {data} = await axios.post("/places",{
            title,address,addedPhotos,description,perks,
            extraInfo,checkIn,checkOut,maxGuests
         });
         setRedirect('/account/places')  
    }

    if(redirect){
            return <Navigate to={redirect} />
    }    

  return (
    <div>
    { action !== "new" && (
        <div className="text-center">
            list of added places 
            <br />
            <Link className=' inline-flex gap-1 bg-red-500 text-white py-2 px-4 rounded-full' to={"/account/places/new"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new places
            </Link>
        </div>
    )}
    { action === "new" && (
        <div>
            <form onSubmit={addNewPlace}>
                {preInput("Title","title for your place,   should be short and catchy as in advertisement")}
                <input type="text" 
                value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder='title for example: my lovely apt' />
                
                
                {preInput("Address","Address to this place")}
                <input type="text" 
                value={address} onChange={(e) =>setAddress(e.target.value) }
                placeholder='address' />
                
                {preInput("Photos","more = better")}
                <div className="flex gap-2">
                    <input type="text" 
                    value={photoLink} onChange={(e)=> setPhotoLink(e.target.value)}
                    placeholder='add using a link ...jpg' />
                    <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photos</button>
                </div>

                <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {addedPhotos.length > 0 && addedPhotos.map(function(link,index){
                        return <div key={index} className='h-32 flex'>
                            <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/"+link} alt="" />
                        </div>
                    })}
                    <label className='h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-500'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                     Upload
                    </label>
                </div>
                
                {preInput("Description","description of the places")}
                <textarea value={description} 
                onChange={(e)=>setDescription(e.target.value)} className='w-full border my-1 py-4 px-3 rounded-2xl'></textarea>


                {preInput("Perks","select perks")}
                <div className='mt-2 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-5'>
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                
                {preInput("Extra Info","house rules")}
                <textarea value={extraInfo} 
                onChange={(e)=> setExtraInfo(e.target.value)}
                className='w-full border my-1 py-4 px-3 rounded-2xl'></textarea>


                {preInput("Check in & out","add check in & out times, remember to have some time for cleaning room between guest.")}
                <div className='grid grid-cols-3 sm:grid-cols-3 gap-2'>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Check In</h3>
                        <input type="text" value={checkIn} 
                        onChange={e => setCheckIn(e.target.value)}
                        placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Check Out</h3>
                        <input type="text" value={checkOut} 
                        onChange={e => setCheckOut(e.target.value)}
                        placeholder='16:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Guests</h3>
                        <input type="number" value={maxGuests} 
                        onChange={e => setMaxGuests(e.target.value)}
                        placeholder='2' />
                    </div>
                </div>
                <button className='bg-red-500 my-4 p-1 text-xl w-full flex mx-auto justify-center text-white rounded-full'>Save</button>

            </form>
        </div>
    )}    
    </div>
  )
}

export default PlacesPage