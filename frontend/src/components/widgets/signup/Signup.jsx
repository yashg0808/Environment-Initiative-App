import {
  ButtonTypes,
  LinkTypes,
  MIN_USERNAME_LENGTH,
  REGEX_PATTERNS,
} from "../../../constants";
import Button from "../../basic/Button";
import ErrorMessage from "../../basic/ErrorMessage";
import Input from "../../basic/Input";
import Link from "../../basic/Link";
import Text from "../../basic/Text";
import { useForm } from "react-hook-form";

const Signup = (props) => {
  const {
    apiError = "",
    isLoading = false,
    loginClickHandler,
    signupClickHandler,
    isSignedUp = false,
  } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   const { t } = useTranslation();

  if (isSignedUp) {
    return (
      <div className={`flex flex-col p-4 lg:p-0`}>
        <Text className="capitalize text-2xl tracking-wider font-poppinsMedium self-center lg:self-auto">
          {"signup"}
        </Text>
        <Text className="capitalize mt-6 self-center lg:self-auto">
          {"Signup Successful"}
        </Text>
        <div className="self-center lg:self-auto">
          <Button
            className="capitalize w-fit px-4 py-2 mt-12"
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={loginClickHandler}
          >
            <Text>{"Proceed To Login"}</Text>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form
      className="flex flex-col p-4 lg:p-0"
      onSubmit={handleSubmit(signupClickHandler)}
    >
      <Text className="capitalize text-2xl tracking-wider font-poppinsMedium self-center lg:self-auto">
        {"Signup"}
      </Text>
      <Text className="capitalize mt-6 self-center lg:self-auto">
        {"Enter Your Details Below"}
      </Text>
      {apiError && (
        <ErrorMessage
          className="text-sm mt-1"
          errorIconClassName="w-4 h-4"
          message={apiError}
        />
      )}
      <Input
        placeholder={"email"}
        type="text"
        className="mt-12 placeholder:capitalize"
        autoComplete="username"
        errorMessage={errors.email?.message || ""}
        {...register("email", {
          required: "emailIsRequired",
          validate: {
            matchPattern: (value) =>
              REGEX_PATTERNS.emailPattern.test(value) || "invalidEmailAddress",
          },
        })}
      />

      <Input
        placeholder={"Username"}
        type="text"
        className="mt-10 placeholder:capitalize"
        autoComplete="username"
        errorMessage={errors.username?.message || ""}
        {...register("username", {
          required: "usernameIsRequired",
          validate: (value) => {
            if (value.length < MIN_USERNAME_LENGTH) {
              return "usernameMustBeThreeCharactersLong";
            }
          },
        })}
      />

      <Input
        placeholder={"Password"}
        type="password"
        className="mt-10 placeholder:capitalize"
        autoComplete="current-password"
        errorMessage={errors.password?.message || ""}
        {...register("password", { required: "passwordIsRequired" })}
      />

      <Input
        placeholder={"ConfirmPassword"}
        type="password"
        className="mt-10 placeholder:capitalize"
        autoComplete="current-password"
        errorMessage={errors.confirmPassword?.message || ""}
        {...register("confirmPassword", {
          required: "passwordIsRequired",
          validate: (confirmPasswordValue) => {
            if (watch("password") !== confirmPasswordValue) {
              return "passwordsDontMatch";
            }
          },
        })}
      />

      <div className={`flex justify-between items-center mt-10 `}>
        <Button
          className="px-4 py-2 capitalize"
          type="submit"
          buttonType={ButtonTypes.primaryButton}
          onClickHandler={() => {}}
          isLoading={isLoading}
        >
          <span>{"Sign Up"}</span>
        </Button>
      </div>

      <Link
        text={"Already have an account? Login here"}
        linkType={LinkTypes.red}
        onClick={loginClickHandler}
        className="capitalize mt-4"
      />
    </form>
  );
};

export default Signup;
