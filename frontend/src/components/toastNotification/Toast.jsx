import "./Toast.scss";

const Toast = ({ message, messageType }) => {
  console.log(message, messageType);
  return (
    <div className={`toast ${messageType}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
