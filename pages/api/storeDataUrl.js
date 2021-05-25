import axios from "axios";
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
    let url = req.query.url;
    let response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    let image = Buffer.from(response.data, "binary").toString("base64");
    let blob = `data:${response.headers[
      "content-type"
    ].toLowerCase()};base64,${image}`;

    // let dataUrl = await new Promise((resolve) => {
    //   let reader = new window.FileReader();
    //   reader.onload = () => resolve(reader.result);
    //   reader.readAsDataURL(blob);
    // });
    // console.log("DONE", dataUrl);
    res.status(200).send(blob);
  }
};
