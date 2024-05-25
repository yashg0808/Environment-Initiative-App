const Image = (props) => {

    const {src, alt, backupImageSrc, className = ''} = props

    const imgLoadErrorHandler = (event) => {
        const target = event.currentTarget;
        target.onerror = null;
        target.src = backupImageSrc;
    }   

    return (
        <img src={src} alt={alt} className={className} onError={imgLoadErrorHandler}  />
    )
}

export default Image;