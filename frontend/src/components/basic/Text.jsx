const Text = (props) => {
  const { className, children } = props;

  return (
    <span className={`${className}`}>
      {children}
    </span>
  );
};

export default Text;