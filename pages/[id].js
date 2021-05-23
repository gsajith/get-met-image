import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageCardPage from "../components/ImageCardPage";

const ImagePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== null && typeof id !== "undefined") {
      setLoading(true);
      axios.get("/api/getImage?id=" + id).then(({ data }) => {
        setLoading(false);
        setData(data);
      });
    }
  }, [id]);

  return <ImageCardPage data={data} loading={loading} />;
};

export default ImagePage;
