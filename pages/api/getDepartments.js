import { fetchAllDepartments } from "../../apiHelpers";

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(401).json({ error: "POST not allowed" });
  } else {
    let response = await fetchAllDepartments();
    res.status(200).json(response);
  }
};
