// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(401).json({ error: "POST not allowed" });
  } else {
    let requestId = req.query.id;
    if (!requestId) {
      const response = await axios.get(
        "http://localhost:3000/api/getRandomImage"
      );
      res.status(200).json(response.data);
    } else {
      res.status(200).json({ name: "John Doe" });
    }
    // res.status(200).json({ name: "John Doe" });
  }
};
