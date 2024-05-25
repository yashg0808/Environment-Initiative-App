import ErrorIcon from "../icons/ErrorIcon";

const ErrorMessage = (props) => {
    const {message, className, errorIconClassName = 'w-8 h-8', isErrorIconShown = true} = props;

    // const isRTL = useAppSelector((state) => state.language.isRTL);
    return (
        <div className={`flex items-center text-darkRed ${className}`}>
            {
                isErrorIconShown &&
                <ErrorIcon className={errorIconClassName} />
            }
            <span className={`capitalize ${isErrorIconShown ? 'mr-4': 'ml-4'}`}>{message}</span>
        </div>
    )
}

export default ErrorMessage;