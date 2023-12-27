import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacesPage = () => {
 
    const {action} = useParams();
    

  return (
    <div>
    { action !== "new" && (
        <div className="text-center">
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
            <form action="">
                <h2 className="text-2xl mt-4">Title</h2>
                <p className='text-gray-500 text-sm'>title for your place,   should be short and catchy as in advertisement</p>
                <input type="text" placeholder='title for example: my lovely apt' />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input type="text" placeholder='address' />
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more = better</p>

                <div className="flex gap-2">
                    <input type="text" placeholder='add using a link ...jpg' />
                    <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photos</button>
                </div>

                <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    <button className='flex justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    </button>
                </div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">description of the places</p>
                <textarea className='w-full border my-1 py-4 px-3 rounded-2xl'></textarea>

                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">select perks</p>
                <div className='mt-2 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-5'>
                    <label className='flex gap-1 items-center'>
                        <input type="checkbox"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                        <span>Wifi</span>
                    </label>
                    <label className='flex gap-1 items-center'>
                        <input type="checkbox"/>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>

                        <span>TV</span>
                    </label>
                    <label className='flex gap-1 items-center'>
                        <input type="checkbox"/>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>

                        <span>Private entrance</span>
                    </label>
                    <label className='flex gap-1 items-center'>
                        <input type="checkbox"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <span>Free parking spot</span>
                    </label>
                </div>
                <h2 className="text-2xl mt-4">Extra Info</h2>
                <p className="text-gray-500 text-sm">house rules</p>
                <textarea className='w-full border my-1 py-4 px-3 rounded-2xl'></textarea>

                <h2 className="text-2xl mt-4">Check in & out</h2>
                <p className="text-gray-500 text-sm">add check in & out times, remember to have some time for cleaning room between guest.</p>
                <div className='grid grid-cols-3 sm:grid-cols-3 gap-2'>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Check In</h3>
                        <input type="text" placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Check Out</h3>
                        <input type="text" placeholder='16:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1 px-1'>Guests</h3>
                        <input type="text" placeholder='2' />
                    </div>
                </div>
                <button className='bg-red-500'>Save</button>

            </form>
        </div>
    )}    
    </div>
  )
}

export default PlacesPage