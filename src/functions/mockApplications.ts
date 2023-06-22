import { Application } from "../types/Application";

export const mockApplications = () => {
  const defaultApplications: Application[] = [
    {
      _id: "6494af54810ea7c74c097d64",
      firstName: "John",
      lastName: "Tester",
      email: "johntester@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985122/cjjybgrh9ez0rkbysbpm.pdf",
      company_name: "Ingram Automotive Ltd",
      ad_content: "Fullstack Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Ingram%20Automotive%20Ltd.png",
      seniority: "Midweight",
      technologies: "React Python TypeScript",
    },
    {
      _id: "6494af54810ea7c74c097d63",
      firstName: "John",
      lastName: "Tester",
      email: "johntester@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985104/jzgeyachiqzjvj0cxa0t.pdf",
      company_name: "Sutton Builders",
      ad_content: "Junior Frontend Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Sutton%20Builders.png",
      seniority: "Junior",
      technologies: "JavaScript React CSS",
    },
    {
      _id: "6494af54810ea7c74c097d66",
      firstName: "Emily",
      lastName: "Test",
      email: "emilytest@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985176/fdod2w4sckzapobrrq7y.pdf",
      company_name: "Yorke Cycles",
      ad_content: "Senior Frontend Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Yorke%20Cycles.png",
      seniority: "Senior",
      technologies: "Knockout JavaScript TypeScript",
    },
    {
      _id: "6494af54810ea7c74c097d65",
      firstName: "John",
      lastName: "Tester",
      email: "johntester@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985134/jfjlimktbcvq66f5t6b9.pdf",
      company_name: "Expert Technologies",
      ad_content: "Software Engineer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Expert%20Technologies.png",
      seniority: "Senior",
      technologies: "C# React JavaScript",
    },
    {
      _id: "6494af54810ea7c74c097d67",
      firstName: "Emily",
      lastName: "Test",
      email: "emilytest@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985186/pwhl3klwuei0h7vsfz7g.pdf",
      company_name: "O'Grady Exhibitions",
      ad_content: "Senior Frontend Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/O'Grady%20Exhibitions.png",
      seniority: "Senior",
      technologies: "React Bootstrap TypeScript",
    },
    {
      _id: "6494af54810ea7c74c097d68",
      firstName: "Emily",
      lastName: "Test",
      email: "emilytest@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985198/mwp1t7bqcb4fbmqtco5b.pdf",
      company_name: "Saddlemore Office Furniture",
      ad_content: "Middle Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Saddlemore%20Office%20Furniture.png",
      seniority: "Midweight",
      technologies: "C# Node.js TypeScript",
    },
    {
      _id: "6494af54810ea7c74c097d69",
      firstName: "Sophia",
      lastName: "Test",
      email: "sophiatest@eg.com",
      cv: "http://res.cloudinary.com/dyqgdjrr1/raw/upload/v1685985303/ihpd9p5wp3v50lkkz5ia.pdf",
      company_name: "Dimbleby Refrigeration",
      ad_content: "Middle Developer",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Dimbleby%20Refrigeration.png",
      seniority: "Midweight",
      technologies: "C# HTML5 JavaScript",
    },
  ];
  return defaultApplications;
};
