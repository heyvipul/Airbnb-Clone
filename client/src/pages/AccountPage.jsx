import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
  const { ready, user ,setUser} = useContext(UserContext);
  const { subpage } = useParams();
  const navigate = useNavigate();

  // if(subpage === undefined){
  //   subpage = 'profile';
  // }

  async function Logout(){
    await axios.post("/logout")
    setUser(null);
    navigate("/")
  }

  

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = 'py-2 px-6';
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += ' bg-red-500 text-white rounded-full';
    }
    return classes;
  }

  return (
    <div>
      <nav className='w-full justify-center flex gap-2 mt-10 mb-8'>
        <Link className={linkClasses('profile')} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses('bookings')} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses('places')} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {(subpage === undefined || subpage ==='profile') && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} && ({user.email}) <br />
          <button onClick={Logout} className='py-2 px-10 bg-red-500 text-white rounded-full mt-2 '>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
