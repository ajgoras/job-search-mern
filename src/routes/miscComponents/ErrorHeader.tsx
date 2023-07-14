import "../../styles/style.css";
import "../../styles/Header.css";
import { useNavigate } from "react-router-dom";

function ErrorHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <div id="upperNavbar">
        <img
          className="jobSearchLogo"
          src="https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/job-search-logo-white.png"
          alt="logo"
          onClick={() => navigate("/")}
        ></img>
      </div>
      <div id="headerTextDiv">
        <h2>Find a job in IT</h2>
      </div>
    </div>
  );
}

export default ErrorHeader;
