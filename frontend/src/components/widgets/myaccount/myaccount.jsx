import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Text from "../../basic/Text";
import ErrorMessage from "../../basic/ErrorMessage";
import Input from "../../basic/Input";
import { ButtonTypes, LinkTypes, REGEX_PATTERNS } from "../../../constants";
import Button from "../../basic/Button";
import Link from "../../basic/Link";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { logOut } from '../../../store/AuthSlice';
import { useDispatch } from "react-redux";
import AvatarUpload from "./avatar";

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    interests:[],
    phoneNumber: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/profile/')
      .then((response) => {
        setFormData({
          name: response.data.data.name || '',
          bio: response.data.data.bio || '',
          interests: response.data.data.interests || '',
          phoneNumber: response.data.data.phoneNumber || '',
          location: response.data.data.location || '',
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/v1/profile/', formData)
      .then((response) => {
        console.log('Profile updated:', response.data);
      })
      .catch((error) => {
        console.error('There was an error updating the profile:', error);
      });
  };

  const dispatch = useDispatch();
  const logoutClickHandler = () => {
    dispatch(logOut());
  };

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Text className="capitalize text-2xl tracking-wider font-poppinsMedium self-center self-auto">
        {t("myAccount")}
    </Text>
    <AvatarUpload />
    <form className="flex flex-col p-4 p-4" onSubmit={handleSubmit}>

      <div className='mt-10 capitalize'>
        <label>
        {t("name")}:
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
          {t("bio")}:
          <Input
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("interests")}:
          <Input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("phoneNumber")}:
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("location")}:
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <div
        className='flex justify-between items-center mt-10'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
      <Button
          className="px-4 py-2 capitalize hover:bg-blue-400 text-white"
          type="submit"
          buttonType={ButtonTypes.primaryButton}
          onClickHandler={() => {}}
        >
          <span>{t("updateProfile")}</span>
        </Button>
        <Button
            className="px-4 py-2 capitalize hover:bg-blue-400 text-white"
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={() => {logoutClickHandler}}
        >
          <span>{t("logOut")}</span>
        </Button>
        </div>
    </form>
    </>
  );
};

export default UpdateProfileForm;
