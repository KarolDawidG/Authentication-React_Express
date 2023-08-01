import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UsersListProps } from "./UsersListProps";
import { UserTable } from "./UserTable";
import { RedirectBtn } from "../Others/RedirectBtn";
import axios from 'axios';
import { INTERNET_DISCONNECTED, ENDPOINT_USERS } from "../Utils/links";
import { BeLogin } from "../Authentication/Login/BeLogin";
import { Loader } from "../Utils/Loader";
import { Title } from "../Others/Title";
import { notify } from "../Others/Notify";


export const UsersList: React.FC = () => {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState<UsersListProps[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get(ENDPOINT_USERS, config);
        const data = res.data;
        
        setUsersList(data.usersList);
      } catch (error: any) {
        if (error.response) {
          notify(error.response.data);
        } else {
          notify(INTERNET_DISCONNECTED);
        }
      } 
    };

    fetchUsers(); 
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');    
    if (!token) {                                   
      redirect('/be-login');                        
    }else{
      setIsLoading(false);
    }
  }, [redirect]);

    if (isLoading) {
      return <>
          <Loader/>
      </>
    }

    if (usersList === null) {   
      return <>
        <BeLogin/>
      </>;
    }

  return (
    <>
      <Title props="Lista użytkowników"/>
      <UserTable users={usersList} />
      <RedirectBtn to="/">Menu</RedirectBtn>
    </>
  );
};
