import React, { useState, useEffect } from "react";
import { UsersListProps } from "./UsersListProps";
import { UserTable } from "./UserTable";
import { RedirectBtn } from "../Others/RedirectBtn";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { users } from "../Utils/links";

export const UsersList: React.FC = () => {
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState<UsersListProps[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Odczytanie tokena z localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get(users, config);
        const data = res.data;
        setUsersList(data.usersList);
      } catch (error) {
        console.error(error);
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
    return <div>Loading...</div>;
  }

  if (usersList === null) {   
    return <p>Nic nie ma</p>;
  }

  return (
    <>
      <h1>Lista użytkowników</h1>
      <UserTable users={usersList} />
      <RedirectBtn to="/">Menu</RedirectBtn>
    </>
  );
};
