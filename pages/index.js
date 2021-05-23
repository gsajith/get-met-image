import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/getImage").then(({ data }) => {
      setLoading(false);
      setData(data);
    });
  }, []);

  return <ImageCardPage data={data} loading={loading} />;
};

export default HomePage;
