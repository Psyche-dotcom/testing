import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import imageToBase64 from "image-to-base64";
import vCardsJS from "vcards-js";
const enterPriseSchema = `
query User($username: String!) {
  username(username: $username) {
    id
    title
    profilePicture
    first_name
    last_name
    v_email
    email
    account_type
    companyName
    username
    middle_initial
    prefix
    suffix
    home_phone
    cell_phone
    work_phone
    business_address
    home_address
    website
    landing_page
    job_title
    note
  }
}
  `;

const userSchema = `
  query user($id: String!,$metadata: DetailedRequest! ) {
    user(id: $id, metadata: $metadata ) {
      id
      title
      profilePicture
      first_name
      last_name
      email
      v_email
      account_type
      companyName
      username
      middle_initial
      prefix
      suffix
      home_phone
      cell_phone
      work_phone
      business_address
      home_address
      website
      landing_page
      job_title
      note
    }
  }
`

const employeeSchema = `
query enterprise($enterpriseName: String!,$employeeId:String!) {
  enterpiseEmployee(enterpriseName: $enterpriseName,employeeId:$employeeId){
    employee{
      id
      title
      profilePicture
      first_name
      last_name
      email
      v_email
      account_type
      companyName
      username
      middle_initial
      prefix
      suffix
      home_phone
      cell_phone
      work_phone
      business_address
      home_address
      website
      landing_page
      job_title
      note
    }
  }}
`;
export default async function handler(req: Request, res: Response) {
  const vCard = vCardsJS();

  const { username, employee, id } = req.query;

  let user = null;
  if (username && employee) {
    user = await employeeVcard(username, employee);
  } else if (username) {
    user = await enterpriseVcard(username);
  } else if (id) {
    user = await userVcard(id.toString(), req?.cookies?.userAuthToken || "")
  }
  else {
    user = await enterpriseVcard("vreel");
  }

  // if (user.first_name || user?.last_name) {
  const filename =
    username && employee
      ? `${username}_${user.first_name}`
      : `${username ? username : "vreel"}`;
  try {
    const vcard = await generateVcard(vCard, user);
    res.setHeader("Content-Type", `text/vcard; name="${filename}.vcf"`);
    res.setHeader("Content-Disposition", `inline; filename="${filename}.vcf"`);

    return res.send(vcard.getFormattedString());
  } catch (e) {

    return res.status(500).json(e);
  }
  // }
  // return res.send("Not Found");
}

async function enterpriseVcard(username) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: enterPriseSchema,
      variables: {
        username,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result?.data?.username;
    });
}

async function userVcard(id: string, token: string) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: userSchema,
      variables: {
        id,
        metadata: { presentation: false }
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result?.data?.user
    });
}

async function employeeVcard(username, employee) {
  return fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: employeeSchema,
      variables: {
        enterpriseName: username,
        employeeId: employee,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result?.data?.enterpiseEmployee?.employee;
    });
}
function vreelVcard() {
  return {
    id: "cafb25q23akj9g4qk1f0",
    title: "CEO Vreel Inc.",
    profilePicture: "",
    first_name: "Donta'",
    last_name: "Bell",
    email: "vrgucci@vreel.page",
    // account_type: "employee",
    companyName: "",
    // username: "cafb22q23akj9g4qk1b0",
    middle_initial: "",
    prefix: "",
    suffix: "",
    home_phone: "",
    cell_phone: "(856) 625-0364",
    // work_phone: "7138581131",
    // business_address: "18314 Mathis Rd., Waller, TX 77484",
    // home_address: "920 Memorial City Way Ste 715, Houston TX 77024",
    website: "https://vreel.page/vreel",
    landing_page: "",
    job_title: "CEO Vreel Inc.",
    note: "We make you look better!",
  };
}

async function generateVcard(vCard, user) {
  vCard.version = "3.0";
  // profile pickture
  if (user.profilePicture)
    await imageToBase64(user.profilePicture)
      .then((response) => {
        vCard.photo.embedFromString(response, "image/png");
      })
      .catch((error) => { });

  // name
  vCard.namePrefix = user?.prefix;
  vCard.firstName = user?.first_name;
  vCard.middleName = user?.middle_initial;
  vCard.lastName = user?.last_name;
  vCard.nameSuffix = user.suffix;
  vCard.website = user?.landing_page;
  vCard.workEmail = user.v_email || user.email;

  // phone
  vCard.homePhone = user.home_phone;
  vCard.cellPhone = user.cell_phone;
  vCard.workPhone = user.work_phone;

  // address
  vCard.homeAddress.street = user.home_address;
  vCard.workAddress.street = user.business_address;

  vCard.organization = user.companyName;
  vCard.title = user.job_title;
  vCard.url = user.landing_page;
  vCard.note = user.note;
  return vCard;
}

/*   const user = {
    id: "cafb25q23akj9g4qk1f0",
    title: "",
    profilePicture: "",
    first_name: "Jon",
    last_name: "Stephens",
    email: "jstephens@avaicg.com",
    account_type: "employee",
    companyName: "",
    username: "cafb22q23akj9g4qk1b0",
    middle_initial: "",
    prefix: "",
    suffix: "",
    home_phone: "",
    cell_phone: "2815820793",
    work_phone: "7138581131",
    business_address: "18314 Mathis Rd., Waller, TX 77484",
    home_address: "920 Memorial City Way Ste 715, Houston TX 77024",
    website: "",
    landing_page: "",
    job_title: "President",
  }; */

/* 
vCard.firstName = "Eric";
  vCard.middleName = "J";
  vCard.lastName = "Nesser";
  vCard.uid = "69531f4a-c34d-4a1e-8922-bd38a9476a53";
  vCard.organization = "ACME Corporation";

  //link to image
  vCard.photo.attachFromUrl(
    "https://avatars2.githubusercontent.com/u/5659221?v=3&s=460",
    "JPEG"
  );

  //or embed image
  vCard.photo.attachFromUrl("/path/to/file.jpeg");

  vCard.workPhone = "312-555-1212";
  vCard.birthday = new Date(1985, 0, 1);
  vCard.title = "Software Developer";
  vCard.url = "https://github.com/enesser";
  vCard.workUrl = "https://acme-corporation/enesser";
  vCard.note = "Notes on Eric";

  //set other vitals
  vCard.nickname = "Scarface";
  vCard.namePrefix = "Mr.";
  vCard.nameSuffix = "JR";
  vCard.gender = "M";
  vCard.anniversary = new Date(2004, 0, 1);
  vCard.role = "Software Development";

  //set other phone numbers
  vCard.homePhone = "312-555-1313";
  vCard.cellPhone = "312-555-1414";
  vCard.pagerPhone = "312-555-1515";

  //set fax/facsimile numbers
  vCard.homeFax = "312-555-1616";
  vCard.workFax = "312-555-1717";

  //set email addresses
  vCard.email = "e.nesser@emailhost.tld";
  vCard.workEmail = "e.nesser@acme-corporation.tld";

  //set logo of organization or personal logo (also supports embedding, see above)
  vCard.logo.attachFromUrl(
    "https://avatars2.githubusercontent.com/u/5659221?v=3&s=460",
    "JPEG"
  );

  //set URL where the vCard can be found
  vCard.source = "http://mywebpage/myvcard.vcf";

  //set address information
  vCard.homeAddress.label = "Home Address";
  vCard.homeAddress.street = "123 Main Street";
  vCard.homeAddress.city = "Chicago";
  vCard.homeAddress.stateProvince = "IL";
  vCard.homeAddress.postalCode = "12345";
  vCard.homeAddress.countryRegion = "United States of America";

  vCard.workAddress.label = "Work Address";
  vCard.workAddress.street = "123 Corporate Loop\nSuite 500";
  vCard.workAddress.city = "Los Angeles";
  vCard.workAddress.stateProvince = "CA";
  vCard.workAddress.postalCode = "54321";
  vCard.workAddress.countryRegion = "United States of America";

  //set social media URLs
  vCard.socialUrls["facebook"] = "https://...";
  vCard.socialUrls["linkedIn"] = "https://...";
  vCard.socialUrls["twitter"] = "https://...";
  vCard.socialUrls["flickr"] = "https://...";
  vCard.socialUrls["custom"] = "https://...";


*/
