import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ControlsContainer from "../components/ControlsContainer";
import DepartmentsFilter from "../widgets/DepartmentsFilter";
import FilterDepartmentsButton from "../components/FilterDepartmentsButton";
import ImageCardPage from "../widgets/ImageCardPage";
import { downloadImage } from "../utils";

const HomePage = (props) => {
  const router = useRouter();

  const [data, setData] = useState(props);
  const [loading, setLoading] = useState(props.primaryImage ? false : true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentPickerShown, setDepartmentPickerShown] = useState(false);
  const imageCardRef = useRef(null);

  const fetchRandomImage = () => {
    setLoading(true);
    if (
      selectedDepartments.length === departments.length ||
      selectedDepartments.length === 0
    ) {
      axios.get("/api/getImage").then(({ data }) => {
        setLoading(false);
        setData(data);
      });
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

  useEffect(() => {
    if (!props) {
      fetchRandomImage();
    }
    fetchDepartments();
  }, []);

  const onDownloadClick = useCallback(() => {
    console.log("Downloading", data.title, data.artistDisplayName);
    downloadImage(imageCardRef.current, data.title, data.artistDisplayName);
  }, [data]);

  useEffect(() => {
    if (props) {
      setData(props);
      setLoading(props.primaryImage ? false : true);
    }
  }, [props]);

  return (
    <>
      <ImageCardPage
        data={data}
        loading={loading}
        imageCardRef={imageCardRef}
      />
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

HomePage.getInitialProps = async (ctx) => {
  // const {id} = params;
  const id = 436535; // Default to Wheat Field with Cypresses, 1889, Vincent van Gogh
  const url = process.browser ? "/api/getImage" : "/api/getImage?id=" + id;
  const result = await axios.get(
    `${
      process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:3000"
    }${url}`
  );
  return result.data;
};

export default HomePage;
