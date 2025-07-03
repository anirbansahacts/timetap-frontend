import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoContext=useContext(null);

export const InfoProvider=({children})=>
{
  const [user,setUser] =useState();
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('token');

    if(token)
    {
        try{
            const decodedToken=JSON.parse(atob(token.split('.')[1]));
            setUser({
                email:decodedToken.sub,
                role:decodedToken.role,
                employeeId:decodedToken.employeeId
            });
        }
        catch(error)
        {
            console.error("Failed to decode token:", error);
            localStorage.removeItem('token');
        }
    }
    setLoading(false);
  },[])

  return (
    <InfoContext.Provider value={{ user, loading }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);