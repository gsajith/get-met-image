import { getRandomImage } from "../../helpers";

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(401).json({ error: "POST not allowed" });
  } else {
    const response = await getRandomImage();
    res.status(200).json(response);
  }
};
