import { useForm } from "react-hook-form";
import Input from "../../basic/Input";
import { ButtonTypes, REGEX_PATTERNS } from "../../../constants";
import Button from "../../basic/Button";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ProfileService from "../../../services/profile/ProfileService";

const MyAccount = (props) => {
  const {
    updateProfileClickHandler,
    logOutClickHandler,
    isLoading = false,
  } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }, reset,
  } = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProfileService.getProfile();
      const f = {
        name: response.name || '',
        bio: response.bio || '',
        interests: response.interests || '',
        phoneNumber: response.phoneNumber || '',
        location: response.location || '',
      };
      reset(f);
    };

    fetchData();
  }, [reset]);

  useEffect((
  ) => {
    console.log(errors)
  },[errors])

  return (
    <>
    <form className="max-w-xl mx-auto p-4 space-y-6" onSubmit={handleSubmit(updateProfileClickHandler)}>
      <div className="mt-6">
        <label htmlFor="name" className="capitalize block text-sm font-medium text-gray-700">
          {t("name")}:
        </label>
        <Input
          id="name"
          type="text"
          errorMessage={errors.name?.message || ""}
          {...register("name", {
            required: t("nameIsRequired"),
          })}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="bio" className="capitalize block text-sm font-medium text-gray-700">
          {t("bio")}:
        </label>
        <Input
          id="bio"
          errorMessage={errors.bio?.message || ""}
          {...register("bio", {
            required: t("bioIsRequired"),
          })}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="interests" className="capitalize block text-sm font-medium text-gray-700">
          {t("interests")}:
        </label>
        <Input
          id="interests"
          type="text"
          name="interests"
          {...register("interests")}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="phoneNumber" className="capitalize block text-sm font-medium text-gray-700">
          {t("phoneNumber")}:
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          errorMessage={errors.phoneNumber?.message || ""}
          {...register("phoneNumber", {
            required: t("phoneNumberIsRequired"),
            validate: {
              matchPattern: (value) =>
                REGEX_PATTERNS.phoneNumberPattern.test(value) ||
                t("InvalidphoneNumber"),
            },
          })}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="location" className="capitalize block text-sm font-medium text-gray-700">
          {t("location")}:
        </label>
        <Input
          id="location"
          type="text"
          errorMessage={errors.location?.message || ""}
          {...register("location", {
            required: t("locationIsRequired"),
          })}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <Button
            type="submit"
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={() => {}}
            isLoading={isLoading}
            className="capitalize px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <span>{t("updateProfile")}</span>
          </Button>
          <Button
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={logOutClickHandler}
            className="capitalize px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            <span>{t("logOut")}</span>
          </Button>
        </div>
      </div>
    </form>
    </>
  );
};

export default MyAccount;