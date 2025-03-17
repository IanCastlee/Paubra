import "./TokenModal.scss";

const TokenModal = ({ closeTokenModal }) => {
  const handleRedirectToLogin = () => {
    window.localStorage.removeItem("userInfo");
    window.location.href = "/auth/signin-client";
    closeTokenModal();
  };

  return (
    <>
      <div className="token">
        <p>Session expired. Login again</p>
        <button onClick={handleRedirectToLogin}>OK</button>
      </div>
      <div className="token-overlay"></div>
    </>
  );
};

export default TokenModal;
