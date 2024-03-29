import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import "../styles/LoginModal.css";
import axios from "axios";
import { checkFormValidity } from "../functions/checkFormValidity";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";
import { useNavigate } from "react-router-dom";
import { defaultLoggedUserState } from "../types/LoggedUser";
import { Button } from "react-bootstrap";

function LoginModal(props: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [placeHoldersVisibility, setPlaceHoldersVisibility] = useState<
    boolean[]
  >([]);
  const { handleLogin, loggedUser }: ContextsType = useContext(Contexts);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 20);
  }, []);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  const loginSubmit = (e: HTMLFormElement | FormEvent) => {
    e.preventDefault();
    axios.post(axiosUrls.loginUrl, { email, password }).then((res) => {
      if (res.data.status === "ok") {
        setHeaderMessage("Logged in!");
        setMessage(`Successfully logged as ${email}`);
        setAlertModalShow(true);
        handleLogin({
          email: email,
          password: password,
          company_name: res.data.company_name,
          logo: res.data.logo,
        });
        setEmail("");
        setPassword("");
        window.localStorage.setItem("token", res.data.data);
      } else {
        setMessage("Bad login or password!");
        setHeaderMessage("Can't Login!");
        setAlertModalShow(true);
      }
    });
  };

  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Header
        closeButton
        onHide={() => {
          setShow(false);
          setTimeout(() => {
            navigate("/");
          }, 100);
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {loggedUser === defaultLoggedUserState ? (
            <div>Login</div>
          ) : (
            <div>Already logged as {loggedUser.company_name}</div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loggedUser === defaultLoggedUserState ? (
          <form id="login-form" onSubmit={loginSubmit} title="login-form">
            <div className="form-section">
              <input
                required
                type="email"
                className={
                  email === "" ? "form-input" : "form-input form-input-filled"
                }
                name="EmailInput"
                title="EmailInput"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder={
                  placeHoldersVisibility[0]
                    ? "Enter your company email address"
                    : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[0] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="EmailInput" className="input-label">
                <span className="label-name">Email Address</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="password"
                name="PasswordInput"
                title="PasswordInput"
                className="form-input"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                placeholder={
                  placeHoldersVisibility[1] ? "Enter your password" : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[1] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="PasswordInput" className="input-label">
                <span className="label-name">Password</span>
              </label>
            </div>
            <div className="form-group form-check"></div>
            <button
              title="submitButton"
              type="submit"
              className={
                shake
                  ? "shake"
                  : "gradient-button submit-button btn btn-primary"
              }
              onClick={() => {
                if (!checkFormValidity({ email, password })) {
                  startShake();
                }
              }}
            >
              Login
            </button>
          </form>
        ) : (
          <div>
            <div className="warning-info-div">
              <p>You are already logged into your account</p>
            </div>
            <div className="warning-info-div">
              <Button
                onClick={() => {
                  setShow(false);
                  setTimeout(() => {
                    navigate("/");
                  }, 100);
                }}
              >
                OK
              </Button>
            </div>
          </div>
        )}

        <AlertModal
          show={alertModalShow}
          onHide={() => {
            setAlertModalShow(false);
            if (headerMessage === "Logged in!") {
              setShow(false);
              setTimeout(() => {
                navigate("/");
              }, 100);
            }
          }}
          message={message}
          headermessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
