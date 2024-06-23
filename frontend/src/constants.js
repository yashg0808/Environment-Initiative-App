export const ROUTE_PATHS = {
    login: "/login",
    signup: "/signup",
    about: "/about",
    pageNotFound: "/pagenotfound",
    protected: "/protected",
    profile: "/u",
    myAccount:"/my-account",
    notemailverified: "/notemailverified",
    post: "/post/:postId",
    initiatives: "/initiatives",
    initiative: "/initiative/:initiativeId",
    support: "/support/:initiativeId"
}

export const REGEX_PATTERNS = {
    emailPattern : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    numberPattern: /^[0-9]*$/,
    countryCodePattern: /^\+[0-9]{1,3}$/,
    phoneNumberPattern: /^[0-9]{10}$/,
    usernamePattern: /^[a-z0-9_]{3,}$/
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

  export const contractAddress = "0x4Abc6CFe0EA35AaA8576E67e301fBc76006387b2"

  export const providerUrl = "wss://eth-sepolia.g.alchemy.com/v2/jmBFJ1eJ4ndLMh_6FOm9d9p_1j2zlh9t";
  
  export const abi = [
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "initiativeId",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "userId",
                  "type": "string"
              }
          ],
          "name": "donate",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "initiativeId",
                  "type": "string"
              },
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "userId",
                  "type": "string"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "FundsReceived",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "FundsWithdrawn",
          "type": "event"
      },
      {
          "stateMutability": "payable",
          "type": "fallback"
      },
      {
          "inputs": [
              {
                  "internalType": "address payable",
                  "name": "receiver",
                  "type": "address"
              }
          ],
          "name": "withdrawFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "stateMutability": "payable",
          "type": "receive"
      },
      {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ]