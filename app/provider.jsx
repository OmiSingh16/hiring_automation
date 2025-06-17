"use client"
import { UserDetailContext } from '@/context/userDetailContext';
import { supabase } from '@/services/supabaseClient';
import React ,{useContext, useEffect, useState} from 'react'

function Provider({children}) {

    const [user , setUser]= useState();  

    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser = async () => {
  const { data: { user: authUser }, error } = await supabase.auth.getUser();
  if (!authUser) return;

  const { data: Users, error: userError } = await supabase
    .from("Users")
    .select("*")
    .eq("email", authUser.email);

  if (Users?.length === 0) {
    const { data: insertData, error: insertError } = await supabase
      .from("Users")
      .insert([
        {
          name: authUser.user_metadata?.name,
          email: authUser.email,
          picture: authUser.user_metadata?.picture,
        }
      ])
      .select(); // ✅ important to get back the inserted data

    if (insertData && insertData.length > 0) {
      setUser(insertData[0]); // ✅ Set actual user object
    }
  } else {
    setUser(Users[0]); // ✅ Use existing user
  }
};




  return (
    <UserDetailContext.Provider value={{user,setUser}}>
    <div>
      {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser=()=>{
  const context = useContext(UserDetailContext);
  return context;
}
