import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import FilterDepartmentsButton from "../components/FilterDepartmentsButton";
import { downloadImage } from "../utils";
import DepartmentsFilter from "../widgets/DepartmentsFilter";
import ImageCardPage from "../widgets/ImageCardPage";
import ImageCardPageOffscreen from "../widgets/ImageCardPageOffscreen";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";

const NoSSRControlsContainer = dynamic(
  () => import("../components/ControlsContainer"),
  { ssr: false }
);

const ImagePage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(props);
  const [extractedColors, setExtractedColors] = useState(data?.extractedColors);
  const [loading, setLoading] = useState(props.primaryImage ? false : true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentPickerShown, setDepartmentPickerShown] = useState(false);
  const [urlDataResult, setUrlDataResult] = useState(null);
  const downloadRef = useRef(null);
  const canvasRef = useRef(null);

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
    if (isMobile) {
      router.push("/duck.png");
    } else {
      console.log("Downloading", data.title, data.artistDisplayName);
      downloadImage(
        downloadRef.current,
        canvasRef.current,
        data.title,
        data.artistDisplayName
      );
    }
  }, [data]);

  useEffect(() => {
    if (
      (!props || !props.primaryImage) &&
      id !== null &&
      typeof id !== "undefined" &&
      !id.includes(".png")
    ) {
      setLoading(true);
      axios.get("/api/getImage?id=" + id).then(({ data }) => {
        setLoading(false);
        setData(data);
      });
    }
    fetchDepartments();
  }, [id]);

  if (id.includes(".png")) {
    return <img src="https://i.imgur.com/06rJufm.png" />;
  }

  return (
    <div style={{ position: "relative" }}>
      <ImageCardPage
        data={data}
        loading={loading}
        setUrlDataResult={setUrlDataResult}
        canvasRef={canvasRef}
        setExtractedColors={setExtractedColors}
        extractedColors={extractedColors}
      />
      <NoSSRControlsContainer>
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
        <Button
          disabled={loading}
          onClick={() => {
            if (!loading) {
              fetchRandomImage();
            }
          }}>
          Random
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            if (!loading) {
              onDownloadClick();
            }
          }}
          style={{ marginLeft: "auto" }}>
          <img
            src="./Download.svg"
            style={{ width: 16, height: 16, marginRight: 6 }}
          />
          Download
        </Button>
      </NoSSRControlsContainer>
      {!isMobile && (
        <ImageCardPageOffscreen
          data={data}
          urlDataResult={urlDataResult}
          downloadRef={downloadRef}
          extractedColors={extractedColors}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const { id } = params;
  const result = !id.includes(".png")
    ? await axios.get(
        `${
          process.env.VERCEL_URL
            ? "https://" + process.env.VERCEL_URL
            : process.env.NEXT_PUBLIC_API_URL
            ? process.env.NEXT_PUBLIC_API_URL
            : "http://localhost:3000"
        }/api/getImage?id=${id}`
      )
    : { data: {} };
  return {
    props: result.data,
  };
};

export default ImagePage;
