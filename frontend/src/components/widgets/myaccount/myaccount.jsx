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
    <form className="flex flex-col p-4" onSubmit={handleSubmit(updateProfileClickHandler)}>

      <div className='mt-10 capitalize'>
        <label>
        {t("name")}:
          <Input
            type="text"
            errorMessage={errors.name?.message || ""}
            {...register("name", {
              required: "Name is Required",
            })}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
          {t("bio")}:
          <Input
            errorMessage={errors.bio?.message || ""}
            {...register("bio", {
              required: t("bioIsRequired"),
            })}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("interests")}:
          <Input
            type="text"
            name="interests"
            {...register("interests")}
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("phoneNumber")}:
          <Input
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
          />
        </label>
      </div>
      <div className='mt-10 capitalize'>
        <label>
        {t("location")}:
          <Input
            type="text"
            errorMessage={errors.location?.message || ""}
            {...register("location", {
              required: t("locationIsRequired")
            })}
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
          isLoading={isLoading}
        >
          <span>{t("updateProfile")}</span>
        </Button>
        <Button
            className="px-4 py-2 capitalize hover:bg-blue-400 text-white"
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={logOutClickHandler}
        >
          <span>{t("logOut")}</span>
        </Button>
        </div>
    </form>
    </>
  );
};

export default MyAccount;