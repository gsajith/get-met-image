import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import ControlsContainer from "../components/ControlsContainer";
import DepartmentsFilter from "../widgets/DepartmentsFilter";
import FilterDepartmentsButton from "../components/FilterDepartmentsButton";
import ImageCardPage from "../widgets/ImageCardPage";
import { downloadImage } from "../utils";
import ImageCardPageOffscreen from "../widgets/ImageCardPageOffscreen";

const ImagePage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(props);
  const [loading, setLoading] = useState(props.primaryImage ? false : true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentPickerShown, setDepartmentPickerShown] = useState(false);

  const fetchRandomImage = () => {
    setLoading(true);
    if (
      selectedDepartments.length === departments.length ||
      selectedDepartments.length === 0
    ) {
      router.push("/");
    } else {
      router.push("/departments/" + selectedDepartments.join(","));
    }
  };

  const fetchDepartments = () => {
    axios.get("/api/getDepartments").then(({ data }) => {
      setDepartments(data);
      setSelectedDepartments(data.map((department) => department.departmentId));
    });
  };

  const onDownloadClick = useCallback(() => {
    console.log("Downloading", data.title, data.artistDisplayName);
    downloadImage(data.title, data.artistDisplayName);
  }, [data]);

  useEffect(() => {
    if (
      (!props || !props.primaryImage) &&
      id !== null &&
      typeof id !== "undefined"
    ) {
      setLoading(true);
      axios.get("/api/getImage?id=" + id).then(({ data }) => {
        setLoading(false);
        setData(data);
      });
    }
    fetchDepartments();
  }, [id]);

  return (
    <>
      <ImageCardPage data={data} loading={loading} />
      <ControlsContainer>
        {departmentPickerShown && (
          <DepartmentsFilter
            departments={departments}
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
          />
        )}
        <FilterDepartmentsButton
          shown={departmentPickerShown}
          onClick={() =>
            setDepartmentPickerShown(
              (departmentPickerShown) => !departmentPickerShown
            )
          }
        />
        <Button onClick={fetchRandomImage}>Random</Button>
        <Button onClick={onDownloadClick} style={{ marginLeft: "auto" }}>
          <img
            src="./Download.svg"
            style={{ width: 16, height: 16, marginRight: 6 }}
          />
          Download
        </Button>
      </ControlsContainer>
    </>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const { id } = params;
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
    props: result.data,
  };
};

export default ImagePage;
