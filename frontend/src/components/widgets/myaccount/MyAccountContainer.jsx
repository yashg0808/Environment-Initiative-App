import React, { useEffect, useState } from 'react'
import useCustomNavigate from '../../../hooks/useCustomNavigate';
import { useDispatch } from 'react-redux';
import ProfileService from '../../../services/profile/ProfileService';
import ApiError from '../../../services/ApiError';
import AuthService from '../../../services/auth/AuthService';
import Text from '../../basic/Text';
import ErrorMessage from '../../basic/ErrorMessage';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../../store/AuthSlice';
import Avatar from './Avatar1';
import MyAccount from './MyAccount1';
import CoverPic from '../coverimage/CoverPic';

function MyAccountContainer() {
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState("");
    const [selectedCoverPic, setSelectedCoverPic] = useState(null);
    const [coverPic, setCoverPic] = useState("");


    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setErrorMessage("Please select a file");
            return;
        }
        setIsLoading(true);
        setErrorMessage(null);
        const response = await AuthService.updateAvatar(selectedFile);
        const image = await AuthService.getAvatar();
        setImage(image);
        setIsLoading(false);
        if (response instanceof ApiError) {
            setErrorMessage(response.errorResponse?.message || response.errorMessage);
        } else {
            alert('Avatar updated successfully!');
        }
    }

    const handleCoverPicSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCoverPic) {
            setErrorMessage("Please select a file");
            return;
        }
        setIsLoading(true);
        const response = await ProfileService.updateCoverPic(selectedCoverPic);
        const profileData = await ProfileService.getProfile();
        const coverPic = profileData.coverImage;
        setCoverPic(coverPic);
        setIsLoading(false);
        if (response instanceof ApiError) {
            setErrorMessage(response.errorResponse?.message || response.errorMessage);
        } else {
            alert('CoverPic updated successfully!');
        }
    }
    
    const updateProfileClickHandler = async (inputData) => {
        setIsLoading(true);
        setErrorMessage("");
        const response = await ProfileService.updateService(
            inputData.name,
            inputData.bio,
            inputData.interests,
            inputData.phoneNumber,
            inputData.location
        );
        setIsLoading(false);
        if (response instanceof ApiError) {
            setErrorMessage(response.errorResponse?.message || response.errorMessage);
        } else {
            alert('Profile updated');
        }
        
    }

    const logOutClickHandler = async () => {
        setIsLoading(true);
        const response = await AuthService.logoutService();
        setIsLoading(false);
        if (response instanceof ApiError) {
            setErrorMessage(response.errorResponse?.message || response.errorMessage)
          } else {
            dispatch(logOut());
          }

    }

    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            const response = await AuthService.getAvatar();
            setImage(response);
            const profileData = await ProfileService.getProfile();
            setCoverPic(profileData.coverImage);
        }
        fetchData();
    },[]);

    return (
        <div className="mx-auto max-w-lg p-4">
            <Text className="capitalize text-3xl font-bold text-gray-800 mb-6 text-center">
                {t("myAccount")}
            </Text>
            {errorMessage && (
                <ErrorMessage
                    className="text-sm mt-1"
                    errorIconClassName="w-4 h-4"
                    message={errorMessage}
                />
            )}
            <div className='block relative mx-auto'>
                <h1 className="text-2xl font-bold text-gray-800 mt-6 text-center">Cover Picture</h1>
                <CoverPic className="block relative h-[437px] overflow-hidden"  coverPic={coverPic} handleCoverPicSubmit={handleCoverPicSubmit} isLoading={isLoading} selectedCoverPic={selectedCoverPic} setSelectedCoverPic={setSelectedCoverPic} />
                <h1 className="text-2xl font-bold text-gray-800 mt-6 text-center">Avatar</h1>
                <Avatar className="block relative border-[3px] border-[#d0efff] rounded-[5px] w-[200px] h-[200px] mt-[-100px] mb-[10px] ml-[20px]" image={image} handleAvatarSubmit={handleAvatarSubmit} isLoading={isLoading} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            </div>
            <MyAccount
                updateProfileClickHandler={updateProfileClickHandler}
                logOutClickHandler={logOutClickHandler}
                isLoading={isLoading}
                apiError={errorMessage}
                handleAvatarSubmit={handleAvatarSubmit}
                selectedFile={selectedFile}  
                setSelectedFile={setSelectedFile}
            />
        </div>
    )
}

export default MyAccountContainer