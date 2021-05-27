import NextCors from "nextjs-cors";
import { getImageColors } from "../../apiHelpers";

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
    let requestUrl = req.query.url;
    let response;
    if (!requestUrl) {
      response = {};
    } else {
      response = await getImageColors(requestUrl);
    }
    res.status(200).json(response);
  }
};
