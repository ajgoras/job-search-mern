import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import SearchBarWithJobBar from "../components/SearchBarWithJobBar";
import ShowApplicationsModal from "../components/ShowApplicationsModal";
import ErrorComponent from "./miscComponents/ErrorComponent";
import ErrorHeader from "./miscComponents/ErrorHeader";
import AddOfferModal from "../components/AddOfferModal";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import LoggedOutComponent from "./miscComponents/LoggedOutInfoComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div id="Index">
        <div id="upperBackground">
          <Header></Header>
        </div>
        <SearchBarWithJobBar></SearchBarWithJobBar>
      </div>
    ),
    errorElement: (
      <div id="Index">
        <div id="upperBackground">
          <ErrorHeader></ErrorHeader>
        </div>
        <ErrorComponent></ErrorComponent>
      </div>
    ),
  },
  {
    path: "/job/:_id",
    element: (
      <div id="Index">
        <div id="upperBackground">
          <Header></Header>
        </div>
        <SearchBarWithJobBar></SearchBarWithJobBar>
      </div>
    ),
    errorElement: (
      <div id="Index">
        <div id="upperBackground">
          <ErrorHeader></ErrorHeader>
        </div>
        <ErrorComponent></ErrorComponent>
      </div>
    ),
  },
  {
    path: "applications",
    element: (
      <>
        <div id="Index">
          <div id="upperBackground">
            <Header></Header>
          </div>
          <SearchBarWithJobBar></SearchBarWithJobBar>
        </div>
        <ShowApplicationsModal></ShowApplicationsModal>
      </>
    ),
  },
  {
    path: "addOffer",
    element: (
      <>
        <div id="Index">
          <div id="upperBackground">
            <Header></Header>
          </div>
          <SearchBarWithJobBar></SearchBarWithJobBar>
        </div>
        <AddOfferModal></AddOfferModal>
      </>
    ),
  },
  {
    path: "login",
    element: (
      <>
        <div id="Index">
          <div id="upperBackground">
            <Header></Header>
          </div>
          <SearchBarWithJobBar></SearchBarWithJobBar>
        </div>
        <LoginModal></LoginModal>
      </>
    ),
  },
  {
    path: "register",
    element: (
      <>
        <div id="Index">
          <div id="upperBackground">
            <Header></Header>
          </div>
          <SearchBarWithJobBar></SearchBarWithJobBar>
        </div>
        <RegisterModal></RegisterModal>
      </>
    ),
  },
  {
    path: "successfullyloggedout",
    element: (
      <div id="Index">
        <div id="upperBackground">
          <ErrorHeader></ErrorHeader>
        </div>
        <LoggedOutComponent></LoggedOutComponent>
      </div>
    ),
  },
]);
