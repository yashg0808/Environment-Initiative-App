export const ROUTE_PATHS = {
    login: "/login",
    signup: "/signup",
    about: "/about",
    pageNotFound: "/pagenotfound",
    protected: "/protected"
}

export const REGEX_PATTERNS = {
    emailPattern : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    numberPattern: /^[0-9]*$/,
    countryCodePattern: /^\+[0-9]{1,3}$/,
    phoneNumberPattern: /^[0-9]{10}$/
}

export const TOAST_MESSAGE_TYPES = {
    success: "success",
    error: "error"
}

export const LinkTypes = {
    default: "default",
    red: "red"
}

export const ButtonTypes =  {
    noBackgroundAndBorder: "noBackgroundAndBorder",
    primaryButton: "primaryButton",
    secondaryButton: "secondaryButton"
  }
  
export const  MIN_USERNAME_LENGTH = 4;