import "../styles/style.css";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Fade } from "react-reveal";
import ApplyModal from "./ApplyModal";
import RemoveOfferModal from "./RemoveOfferModal";
import { DisplayOffer } from "../types/DisplayOffer";
import axios from "axios";
import JobBarElement from "./JobBarElement";
import { axiosUrls } from "../axiosUrls/axiosUrls";
import { Contexts } from "../contexts/Contexts";
import { ContextsType } from "../types/ContextsType";
import { useParams } from "react-router-dom";

export default function JobBar({ searchText, searchTags }: any) {
  //dbSchema
  const { jobs, overwriteJobs }: ContextsType = useContext(Contexts);

  //applyModalState
  const [applyModalShow, setApplyModalShow] = useState(false);

  //removeOfferModalState
  const [removeOfferModalShow, setRemoveOfferModalShow] = useState(false);

  //job offer applied for
  const [jobOfferForApply, setJobOfferForApply] = useState<DisplayOffer>({
    _id: "string",
    company_name: "string",
    days_ago: "string",
    contract_types: "string",
    country: "string",
    ad_content: "string",
    job_type: "string",
    seniority: "string",
    technology_1: "string",
    technology_2: "string",
    technology_3: "string",
    salary: "string",
    description: "string",
    about_us: "string",
    logo: "",
    isDescriptionVisible: false,
    frontendId: 0,
  });

  //dynamic job searching
  //filtering by search text function
  const filterJobs = (searchValue: string, searchTags: string[]) => {
    const filteredByInput = jobs.filter(
      (job) =>
        job.ad_content.toLowerCase().match(searchValue.toLowerCase()) ||
        job.company_name.toLowerCase().match(searchValue.toLowerCase()) ||
        job.contract_types.toLowerCase().match(searchValue.toLowerCase()) ||
        job.country.toLowerCase().match(searchValue.toLowerCase()) ||
        job.job_type.toLowerCase().match(searchValue.toLowerCase()) ||
        job.seniority.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_1.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_2.toLowerCase().match(searchValue.toLowerCase()) ||
        job.technology_3.toLowerCase().match(searchValue.toLowerCase())
    );

    const filteredByTags =
      searchTags.length > 0
        ? jobs.filter((job) =>
            searchTags.every(
              (tag: string) =>
                job.ad_content.toLowerCase().match(tag.toLowerCase()) ||
                job.company_name.toLowerCase().match(tag.toLowerCase()) ||
                job.contract_types.toLowerCase().match(tag.toLowerCase()) ||
                job.country.toLowerCase().match(tag.toLowerCase()) ||
                job.job_type.toLowerCase().match(tag.toLowerCase()) ||
                job.seniority.toLowerCase().match(tag.toLowerCase()) ||
                job.technology_1.toLowerCase().match(tag.toLowerCase()) ||
                job.technology_2.toLowerCase().match(tag.toLowerCase()) ||
                job.technology_3.toLowerCase().match(tag.toLowerCase())
            )
          )
        : [];

    const result: DisplayOffer[] = [];
    filteredByInput.forEach(
      (val) => filteredByTags.includes(val) && result.push(val)
    );

    if (searchTags.length === 0) {
      return filteredByInput;
    }
    if (searchValue === "") {
      return filteredByTags;
    }
    return result;
  };

  const filteredJobs: DisplayOffer[] = filterJobs(searchText, searchTags);

  //loadingState for displaying loading spinner
  const [loading, setLoading] = useState(false);
  const [loadingLongerThan5sec, setLoadingLongerThan5sec] = useState(false);
  const [isBackendError, setIsBackendError] = useState(false);

  //getting job offers from db
  useEffect(() => {
    axios
      .get(axiosUrls.getOffersUrl)
      .then((res) => {
        overwriteJobs(
          res.data.sort((a: any, b: any) => {
            return Number(b.days_ago) - Number(a.days_ago);
          })
        );
        setLoading(false);
        //setting description visibility to false on every offer
        const newJobss = res.data.sort((a: any, b: any) => {
          return Number(b.days_ago) - Number(a.days_ago);
        });
        newJobss.forEach((job: DisplayOffer, index: number) => {
          job.isDescriptionVisible = false;
          job.frontendId = index;
        });
        overwriteJobs(newJobss);
        //if job offer link is active, offer description will open
        const newJobs = res.data.sort((a: any, b: any) => {
          return Number(b.days_ago) - Number(a.days_ago);
        });
        const newJob = newJobs.find(
          (el: DisplayOffer) => el._id === params._id
        );
        if (newJob) {
          newJob.isDescriptionVisible = true;
          overwriteJobs([...newJobs]);
        }
      })
      .catch(() => {
        setIsBackendError(true);
      });
    setTimeout(() => {
      setLoadingLongerThan5sec(true);
    }, 5000);
    setLoading(true); // eslint-disable-next-line
  }, []);

  const params = useParams();
  //runs every time offer clicked
  useEffect(() => {
    const newJobs = jobs;
    newJobs.forEach((job: DisplayOffer, index: number) => {
      job.isDescriptionVisible = false;
      job.frontendId = index;
    });
    const newJob = newJobs.find((el: DisplayOffer) => el._id === params._id);
    if (newJob) {
      newJob.isDescriptionVisible = true;
      overwriteJobs([...newJobs]);
    } // eslint-disable-next-line
  }, [params._id]);

  return (
    <div id="jobBarContainer" title="jobBarContainer">
      <div className="jobBar">
        {!isBackendError ? (
          <div>
            {loading ? (
              <div id="loadingDiv" title="loadingDiv">
                <Spinner animation="border" variant="light" />
                <p className="loadingParagraph">Loading job offers...</p>
                {loadingLongerThan5sec && (
                  <Fade bottom distance={"10px"} duration={1000}>
                    <p className="loadingParagraph2">
                      You have to wait for the backend server to start up,
                      because it runs on free hosting and shuts down after not
                      being used for a while.
                    </p>
                  </Fade>
                )}
              </div>
            ) : (
              filteredJobs.map((job, index) => {
                return (
                  <div key={index} title="jobBarElement">
                    <Fade key={index} duration={700}>
                      <JobBarElement
                        job={job}
                        setapplymodalshow={setApplyModalShow}
                        setjobofferforapply={setJobOfferForApply}
                        setremoveoffermodalshow={setRemoveOfferModalShow}
                      ></JobBarElement>
                    </Fade>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div id="backendServerErrorDiv">
            <p className="backendServerErrorParagraph">
              Backend server error..{" "}
              <span className="backendServerErrorSpan">:(</span>
            </p>
            <p className="loadingParagraph">Try to reload the page.</p>
          </div>
        )}
      </div>
      <ApplyModal
        jobofferforapply={jobOfferForApply}
        show={applyModalShow}
        onHide={() => setApplyModalShow(false)}
      ></ApplyModal>
      <RemoveOfferModal
        show={removeOfferModalShow}
        onHide={() => setRemoveOfferModalShow(false)}
        removingjoboffer={jobOfferForApply}
      ></RemoveOfferModal>
    </div>
  );
}
