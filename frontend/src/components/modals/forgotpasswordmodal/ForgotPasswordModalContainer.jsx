// import { useState } from "react";
// import ForgotPasswordModal from "../presentation/ForgotPasswordModal";
// import { ForgotPasswordFields } from "../../../../constants";
// import AuthService from "../../../../services/auth/AuthService";
// import ApiResponse from "../../../../services/ApiResponse";
// import FeedbackModal from "../../feedbackmodal/presentation/FeedbackModal";
// import { useTranslation } from "react-i18next";

import { useState } from "react";
import AuthService from "../../../services/auth/AuthService";
import ApiResponse from "../../../services/ApiResponse";
import ForgotPasswordModal from "./ForgotPasswordModal";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

const ForgotPasswordModalContainer = (
  props
) => {
  const { hideModal } = props;

//   const { t } = useTranslation();

  /* API Request Loader */
  const [isLoading, setIsLoading] = useState(false);

  /* If there is any error from the API */
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  /* email sent modal visbility */
  const [isEmailSentModalShown, setIsEmailSentModalShown] = useState(false);

  const forgotPasswordSubmitHandler = async (fields) => {
    setIsLoading(true);
    setApiErrorMessage("");

    const response = await AuthService.forgotPassword(fields);

    setIsLoading(false);
    if (response instanceof ApiResponse) {
      setIsEmailSentModalShown(true);
    } else {
      setApiErrorMessage(
        response.errorResponse?.message || response.errorMessage
      );
    }
  };

  return (
    <>
      {isEmailSentModalShown ? (
        <FeedbackModal
          messageType="SUCCESS"
          message={("passwordResetEmailSent")}
          hideModal={hideModal}
        />
      ) : (
        <ForgotPasswordModal
          hideModal={hideModal}
          isLoading={isLoading}
          apiErrorMessage={apiErrorMessage}
          forgotPasswordSubmitHandler={forgotPasswordSubmitHandler}
        />
      )}
    </>
  );
};

export default ForgotPasswordModalContainer;