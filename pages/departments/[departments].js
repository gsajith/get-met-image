import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageCardPage from "../../components/ImageCardPage";

const DepartmentPage = () => {
  const router = useRouter();
  const { departments } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (departments !== null && typeof departments !== "undefined") {
      setLoading(true);
      axios.get("/api/getImage?departments=" + departments).then(({ data }) => {
        setLoading(false);
        setData(data);
      });
    }
  }, [departments]);

  return <ImageCardPage data={data} loading={loading} />;
};

export default DepartmentPage;
