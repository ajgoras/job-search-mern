const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://readwrite:<password>@cluster0.viapohm.mongodb.net/job-search?retryWrites=true&w=majority";
const port = process.env.PORT || 8888;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const csvtojson = require("csvtojson");
mongoose.connect(url);
//const bcrypt = require("bcryptjs");
const dbSchemas = require("./schemas/schemas");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "wedddrftwefe3425gtwvr31f254gvtweqr23d41f2g4v";

const dbModel = mongoose.model("dbModel", dbSchemas.dbSchema, "offers");
const userModel = mongoose.model("userModel", dbSchemas.userSchema, "users");
const Offer = mongoose.model("Offer", dbSchemas.offerSchema, "offers");
const registrationRequestModel = mongoose.model(
  "registrationRequestModel",
  dbSchemas.registrationRequestSchema,
  "registrationRequests"
);
const ApplicationModel = mongoose.model(
  "Application",
  dbSchemas.applicationSchema,
  "applications"
);

const clearDatabase = () => {
  const offersCsvFilePath = "csv/offersv3Format.csv";
  const applicationsCsvFilePath = "csv/applications.csv";
  const usersCsvFilePath = "csv/usersV2Format.csv";
  dbModel.deleteMany({}).then(() => {
    console.log("deleted all offers");
    csvtojson()
      .fromFile(offersCsvFilePath)
      .then((jsonObj) => {
        jsonObj.forEach((el) => {
          const offerToAdd = new dbModel({
            id_: el.id,
            company_name: el.company_name,
            days_ago: el.days_ago,
            contract_types: el.contract_types,
            country: el.country,
            ad_content: el.ad_content,
            job_type: el.job_type,
            seniority: el.seniority,
            technology_1: el.technology_1,
            technology_2: el.technology_2,
            technology_3: el.technology_3,
            salary: el.salary,
            description: el.description,
            about_us: el.about_us,
            logo: el.logo,
          });
          offerToAdd.save().catch((err) => console.log(err));
        });
      })
      .then(() => console.log("offers has been renewed"));
  });
  userModel.deleteMany({}).then(() => {
    console.log("deleted all users");
    csvtojson()
      .fromFile(usersCsvFilePath)
      .then((jsonObj) => {
        jsonObj.forEach((el) => {
          const userToAdd = new userModel({
            id_: el.id_,
            email: el.email,
            password: el.password,
            company_name: el.company_name,
            logo: el.logo,
          });
          userToAdd.save().catch((err) => console.log(err));
        });
      })
      .then(() => console.log("users has been renewed"));
  });
  ApplicationModel.deleteMany({})
    .then(() => {
      console.log("deleted all applications");
      csvtojson()
        .fromFile(applicationsCsvFilePath)
        .then((jsonObj) => {
          jsonObj.forEach((el) => {
            const applicationToAdd = new ApplicationModel({
              id_: el.id_,
              firstName: el.firstName,
              lastName: el.lastName,
              email: el.email,
              cv: el.cv,
              company_name: el.company_name,
              ad_content: el.ad_content,
              logo: el.logo,
              seniority: el.seniority,
              technologies: el.technologies,
            });
            applicationToAdd.save().catch((err) => console.log(err));
          });
        });
    })
    .then(() => console.log("applications has been renewed"))
    .then(() => {
      console.log("Database has been renewed!");
    });
};

app.listen(port, () => {
  console.log(`server started at ${port}!`);
  clearDatabase();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/read", (req, res) => {
  dbModel.find({}, (err, data) => {
    res.render("read", {
      dataList: data,
    });
  });
});

app.get("/sendToFront", (req, res) => {
  dbModel
    .find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get("/getApplications", (req, res) => {
  ApplicationModel.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const user = await userModel.findOne({ email: email }).exec();
  console.log(email);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if ((await password) === user.password) {
    if ((await email) === Object.values(user)[2].email) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({
          status: "ok",
          data: token,
          company_name: user.company_name,
          logo: user.logo,
        });
      } else {
        return res.json({ error: "error" });
      }
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password, companyName, logo } = req.body;
  console.log(email);
  console.log(password);
  console.log(companyName);
  console.log(logo);
  const newRegistrationRequest = new userModel({
    email: req.body.email,
    password: req.body.password,
    company_name: req.body.companyName,
    logo: req.body.logo,
  });
  const emailAccount = await userModel.findOne({ email: email }).exec();
  const companyNameAccount = await userModel
    .findOne({ company_name: companyName })
    .exec();
  if (!emailAccount && !companyNameAccount) {
    newRegistrationRequest
      .save()
      .then((doc) => {
        console.log(doc);
        if (res.status(201)) {
          return res.json({
            status: "ok",
            doc: "The company account has been successfully created!",
          });
        } else {
          return res.json({ error: "error" });
        }
      })
      .catch((err) => console.log(err));
  } else if (!companyNameAccount) {
    res.json({
      status: "error",
      error: "An account with this email address already exists!",
    });
  } else if (!emailAccount) {
    res.json({
      status: "error",
      error: "An account with this company name already exists!",
    });
  } else if (emailAccount && companyNameAccount) {
    res.json({
      status: "error",
      error:
        "An account with this email address and company name already exists!",
    });
  } else {
    res.json({
      status: "error",
      error: "You can't create this account!",
    });
  }
});

app.post("/create", (req, res) => {
  const newOffer = new Offer({
    company_name: req.body.company_name,
    days_ago: req.body.days_ago,
    contract_types: req.body.contract_types,
    country: req.body.country,
    ad_content: req.body.ad_content,
    job_type: req.body.job_type,
    seniority: req.body.seniority,
    technology_1: req.body.technology_1,
    technology_2: req.body.technology_2,
    technology_3: req.body.technology_3,
    salary: req.body.salary,
    description: req.body.description,
    about_us: req.body.about_us,
    logo: req.body.logo,
  });
  newOffer
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.post("/sendApplication", (req, res) => {
  const newApplication = new ApplicationModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cv: req.body.cv,
    company_name: req.body.company_name,
    ad_content: req.body.ad_content,
    logo: req.body.logo,
    seniority: req.body.seniority,
    technologies: req.body.technologies,
  });
  newApplication
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.delete("/removeOffer/:id", (req, res) => {
  console.log(req.params);
  dbModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.get("/removeOffer/:id", (req, res) => {
  console.log(req.params);
  dbModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
