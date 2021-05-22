import { getImage, getRandomImage } from "../../helpers";

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(401).json({ error: "POST not allowed" });
  } else {
    let requestId = req.query.id;
    let response;
    if (!requestId) {
      response = await getRandomImage();
    } else {
      response = await getImage(req.query.id);
    }
    res.status(200).json(response);
  }
};
