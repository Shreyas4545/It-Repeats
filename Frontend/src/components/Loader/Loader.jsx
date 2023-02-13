import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
  return (
    <div className='backdrop-opacity-10 fixed h-[100vh] w-[100vw] flex items-center justify-center'><SyncLoader color="#36d7b7"  size={20}/></div>
  )
}

export default Loader