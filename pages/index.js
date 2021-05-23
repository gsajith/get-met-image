import axios from "axios";
import { useEffect, useState } from "react";
import ImageCardPage from "../components/ImageCardPage";

const HomePage = (props) => {
  const [data, setData] = useState(props);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props) {
      setLoading(true);
      axios.get("/api/getImage").then(({ data }) => {
        setLoading(false);
        setData(data);
      });
    }
  }, []);

  return <ImageCardPage data={data} loading={loading} />;
};

export const getServerSideProps = async ({ params, res }) => {
  // const {id} = params;
  const id = 436535; // Default to Wheat Field with Cypresses, 1889, Vincent van Gogh
  const result = await axios.get(
    `${
      process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:3000"
    }/api/getImage?id=${id}`
  );
  return {
    props: result,
  };
};

export default HomePage;
