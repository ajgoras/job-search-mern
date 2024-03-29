import { render, screen } from "@testing-library/react";
import JobBar from "../components/JobBar";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("should render default job offers", async () => {
  render(
    <ContextsProvider>
      <BrowserRouter>
        <JobBar searchTags={[]} searchText=""></JobBar>
      </BrowserRouter>
    </ContextsProvider>
  );
  const jobsCompanies = [
    "Sutton Builders",
    "Yorke Cycles",
    "Diamond Photography",
    "Lear Finishing Ltd",
    "Dimbleby Refrigeration",
    "O'Grady Exhibitions",
    "Fine Hire Cars Ltd",
    "Expert Technologies",
    "Silver Fabrics",
    "Anderton Lab Equipment Ltd",
    "Ingram Automotive Ltd",
    "Ingeman Workshops",
    "Saddlemore Office Furniture",
    "Leonard Kitchens Ltd",
    "Riverside Transport",
  ];

  const jobBarContainer = screen.getByTitle("jobBarContainer");
  expect(jobBarContainer).toBeInTheDocument();

  for (const el of jobsCompanies) {
    const jobBarElements = await screen.findAllByText(el);
    jobBarElements.forEach((jobOffer) => {
      expect(jobOffer).toBeInTheDocument();
    });
  }
});
