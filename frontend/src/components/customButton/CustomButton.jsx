import "./CustomButton.scss";

const CustomButton = ({ _style, onclick, label }) => {
  return (
    <button onClick={onclick} className={`custom-button ${_style}`}>
      {label}
    </button>
  );
};

export default CustomButton;
