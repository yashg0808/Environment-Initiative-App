import React, { useEffect } from 'react'
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { useAppSelector } from '../../store';
import MyAccountContainer from '../../components/widgets/myaccount/MyAccountContainer';

const MyAccountPageContainer = () => {
    const navigate = useCustomNavigate();
    const isLoggedIn = useAppSelector((state) => {
        return state.auth.isLoggedIn;
    });

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/", false);
        }
        console.log("isLoggedIn from page:" , isLoggedIn)
    },  [navigate, isLoggedIn])
  return (
    <div>
        <MyAccountContainer/>
    </div>
  )
}

export default MyAccountPageContainer