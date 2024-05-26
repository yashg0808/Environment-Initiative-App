import { SUPPORTED_LANGUAGES } from "../constants";

//  To check if the language passed is from right to left.
export const isRTL = (language) => {
    switch(language){
        case SUPPORTED_LANGUAGES.english: return false;
        case SUPPORTED_LANGUAGES.arabic: return true;
        default: return false;
    }
}