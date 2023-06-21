import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import LoginModal from "../components/LoginModal";

test("should login as admin", async () => {
  let showLoginModal = true;
  render(
    <ContextsProvider>
      <LoginModal
        show={showLoginModal}
        onHide={() => {
          showLoginModal = false;
        }}
      ></LoginModal>
    </ContextsProvider>
  );

  const loginData = {
    email: "admin@admin.com",
    password: "admin",
  };

  //const loginForm = screen.getByTitle("login-form");
  //console.log(prettyDOM(loginForm));

  const loginInput = screen.getByTitle("EmailInput");
  const passwordInput = screen.getByTitle("PasswordInput");
  fireEvent.change(loginInput, { target: { value: loginData.email } });
  fireEvent.change(passwordInput, { target: { value: loginData.password } });
  const submitButton = screen.getByTitle("submitButton");
  fireEvent.click(submitButton);
  const successInfo = await screen.findByText(
    "Successfully logged as admin@admin.com"
  );
  expect(successInfo).toBeInTheDocument();
});