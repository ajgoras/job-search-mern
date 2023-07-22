import "../styles/JobBarElement.css";
import Papa from "papaparse";
import { Fade } from "react-reveal";
import { renderSeniority } from "../functions/renderSeniority";
import { renderTime } from "../functions/renderTime";
import { DisplayOffer } from "../types/DisplayOffer";
import { ContextsType } from "../types/ContextsType";
import { useContext, useRef } from "react";
import { Contexts } from "../contexts/Contexts";
import { useNavigate } from "react-router-dom";
export default function JobBarElement({
  job,
  setapplymodalshow,
  setjobofferforapply,
  setremoveoffermodalshow,
}: any) {
  const { loggedUser }: ContextsType = useContext(Contexts);
  const loggedUserCompanyName = loggedUser.company_name;
  const { jobs }: ContextsType = useContext(Contexts);
  const navigate = useNavigate();
  const jobElementRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      key={job.id_}
      className="jobBarElement"
      ref={jobElementRef}
      onLoad={() => {
        setTimeout(() => {
          if (job.isDescriptionVisible) {
            jobElementRef.current?.scrollIntoView();
          }
        }, 500);
      }}
      onClick={() => {
        const newJobs = jobs;
        const newJob = newJobs.find(
          (el: DisplayOffer) => el.frontendId === job.frontendId
        );
        if (newJob) {
          navigate(`/job/${newJob._id}`);
          setTimeout(() => {
            jobElementRef.current?.scrollIntoView();
          }, 50);
        }
      }}
    >
      <Fade duration={1200}>
        <div className="jobHeaderInfo">
          <div className="iconDiv">
            <img className="icon" src={job.logo} alt="companyImage" />
          </div>
          <div className="description">
            <h2 className="companyName">{job.company_name}</h2>
            <p className="jobTitle">{job.ad_content}</p>
          </div>
        </div>
        <Fade bottom distance={"20px"}>
          <div className="jobSideInfoContainer">
            <hr></hr>
            <p className="seniority">
              {job.seniority}
              <span> {renderSeniority(job.seniority)}</span>
            </p>
            <div className="techStackInfo">
              <h4>Tech Stack ➼</h4>
              <p className="jobSideInfo">
                {job.technology_1} • {job.technology_2} • {job.technology_3}
              </p>
            </div>
            <div>
              <p className="salary" title="salary">
                💰💰 {job.salary}
              </p>
            </div>
            <p className="jobSideInfo">
              {renderTime(job.days_ago)} ago - {job.contract_types} -{" "}
              {job.job_type}
            </p>
            <span className="displayNone" title="days_ago">
              {job.days_ago}
            </span>
            <div className="jobCountry techStackInfo">
              <h4>Localization: </h4>
              <span className="jobSideInfo">{job.country}</span>
            </div>
            <div className="jobOfferDescription">
              {job.isDescriptionVisible ? (
                <Fade bottom distance={"20px"} duration={1000}>
                  <hr></hr>
                  <br></br>
                  {Papa.parse(job.description).data.map(
                    (line: any, index: number) => {
                      return <p key={index}>{line}</p>;
                    }
                  )}
                  {loggedUserCompanyName === "" ? (
                    <div className="applyButtonDiv">
                      <button
                        onClick={() => {
                          setapplymodalshow(true);
                          setjobofferforapply(job);
                        }}
                        className="applyButton"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="applyButtonDiv">
                      <button
                        className="applyButton"
                        onClick={() => {
                          setremoveoffermodalshow(true);
                          setjobofferforapply(job);
                        }}
                      >
                        Remove Offer
                      </button>
                      <button
                        onClick={() => {
                          setapplymodalshow(true);
                          setjobofferforapply(job);
                        }}
                        className="applyButton"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </Fade>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </Fade>
      </Fade>
    </div>
  );
}
