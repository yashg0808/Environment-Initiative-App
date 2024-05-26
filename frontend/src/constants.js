export const ROUTE_PATHS = {
    login: "/login",
    signup: "/signup",
    about: "/about",
    pageNotFound: "/pagenotfound",
    protected: "/protected",
    profile: "/u",
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

export const LOCAL_STORAGE_KEYS = {
    selectedLanguage: "lang",
    accessToken: "accessToken",
}

export const SUPPORTED_LANGUAGES = {
    english: "en",
    arabic: "ar",
    hindi: "hn"
}

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.english;

export const BREAKPOINTS = {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px",
}

export const ARROW_BUTTONS = {
    UP : "UP",
    RIGHT: "RIGHT",
    DOWN:  "DOWN", 
    LEFT: "LEFT"
}
  
export const QUERY_PARAMS = {
    ProfileSearch : "profile",
}
  
export const DropdownTypes = {
    noBorderDarkBg : "noBorderDarkBg",
    borderedLightBg : "borderedLightBg"
  }
  