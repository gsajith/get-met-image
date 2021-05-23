import { getImage, getRandomImage } from "../../apiHelpers";
import NextCors from "nextjs-cors";

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(401).json({ error: "POST not allowed" });
  } else {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    let requestId = req.query.id;
    let departments = req.query.departments
      ? req.query.departments.split(",")
      : null;
    let response;
    if (!requestId) {
      response = await getRandomImage(departments);
    } else {
      response = await getImage(requestId, departments);
    }
    res.status(200).json(response);
  }
};
