import { useEffect, useState } from "react";
import "../../styles/ErrorComponent.css";
import { useNavigate } from "react-router-dom";
export default function LoggedOutComponent() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 150);
    setTimeout(() => {
      navigate("/");
    }, 1350); //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="error-component-div">
        <h2 className={show ? "error-show-animation" : "error-opacity0"}>
          You have been successfully logged out!
        </h2>
      </div>
    </>
  );
}
