import React, { useEffect, useState } from 'react'
import {homePage} from "../utils/ApiFunctions"

const Home = () => {

    const [variable, setVariable] = useState("")

    useEffect(()=>{
        homePage().then((data)=>{
            setVariable(data);
        });
    },[]);

  return (
    <div>
    
        <h2 className="mt-5">Welcome to {variable} - manage your expenses easily 💸💸💸</h2>

    </div>
  )
};

export default Home