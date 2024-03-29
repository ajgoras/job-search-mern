import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AlertModal from "./AlertModal";
import "../styles/style.css";
import "../styles/RegisterModal.css";
import axios from "axios";
import { checkFormValidity } from "../functions/checkFormValidity";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { useNavigate } from "react-router-dom";
import { ContextsType } from "../types/ContextsType";
import { Contexts } from "../contexts/Contexts";
import { defaultLoggedUserState } from "../types/LoggedUser";
import { Button } from "react-bootstrap";

function RegisterModal(props: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  const [headerMessage, setHeaderMessage] = useState("");
  const [alertModalShow, setAlertModalShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [placeHoldersVisibility, setPlaceHoldersVisibility] = useState<
    boolean[]
  >([]);

  const { loggedUser }: ContextsType = useContext(Contexts);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 20);
  }, []);

  const registerSubmit = (e: HTMLFormElement | FormEvent) => {
    e.preventDefault();
    if (checkFormValidity({ email, password, companyName, logo })) {
      axios
        .post(axiosUrls.registerUrl, {
          email,
          password,
          companyName,
          logo,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            setHeaderMessage("Registration successful!");
            setMessage(`${res.data.doc}`);
            setEmail("");
            setPassword("");
            setCompanyName("");
            setLogo("");
            setAlertModalShow(true);
            window.localStorage.setItem("token", res.data.data);
          } else {
            setMessage(`${res.data.error}`);
            setHeaderMessage("Can't create account");
            setAlertModalShow(true);
            setPassword("");
          }
        })
        .catch(() => {
          setMessage("Try to reload the page.");
          setHeaderMessage("Backend server error..");
          setAlertModalShow(true);
        });
    }
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
            <div>Create company account</div>
          ) : (
            <div>Already logged as {loggedUser.company_name}</div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loggedUser === defaultLoggedUserState ? (
          <form id="register-form" onSubmit={registerSubmit}>
            <div className="form-section">
              <input
                required
                type="email"
                title="EmailInput"
                className={
                  email === "" ? "form-input" : "form-input form-input-filled"
                }
                name="EmailInput"
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
            <div className="form-section">
              <input
                required
                type="text"
                name="CompanyNameInput"
                title="CompanyNameInput"
                className="form-input"
                onChange={(event) => setCompanyName(event.target.value)}
                value={companyName}
                placeholder={
                  placeHoldersVisibility[2]
                    ? "Enter your full company name"
                    : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[2] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="CompanyNameInput" className="input-label">
                <span className="label-name">Full Company Name</span>
              </label>
            </div>
            <div className="form-section">
              <input
                required
                type="url"
                name="LogoInput"
                title="LogoInput"
                className={
                  logo === "" ? "form-input" : "form-input form-input-filled"
                }
                onChange={(event) => setLogo(event.target.value)}
                value={logo}
                placeholder={
                  placeHoldersVisibility[3]
                    ? "Paste your company logo link"
                    : ""
                }
                onFocus={() => {
                  const newArr = [...placeHoldersVisibility];
                  newArr[3] = true;
                  setPlaceHoldersVisibility(newArr);
                }}
                onBlur={() => {
                  setPlaceHoldersVisibility([]);
                }}
              />
              <label htmlFor="LogoInput" className="input-label">
                <span className="label-name">Company Logo Link</span>
              </label>
            </div>
            <div className="form-group form-check"></div>
            <button
              type="submit"
              title="submitButton"
              className={
                shake
                  ? "shake"
                  : "gradient-button submit-button btn btn-primary"
              }
              onClick={() => {
                if (
                  !checkFormValidity({ email, password, companyName, logo })
                ) {
                  startShake();
                }
              }}
            >
              Create Account
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
            if (headerMessage === "Registration successful!") {
              setShow(false);
              setTimeout(() => {
                navigate("/");
              }, 110);
            }
          }}
          message={message}
          headermessage={headerMessage}
        ></AlertModal>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
