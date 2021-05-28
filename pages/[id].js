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

// TODO: loading random image when extracted colors not loaded yet messes up loadingswatch animation
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
  const isLoadingImage = id.includes(".png");
  const [dataURL, setDataURL] = useState(null);

  const fetchRandomImage = () => {
    setLoading(true);
    setExtractedColors(null);
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
      router.push("/" + data.objectID + ".png");
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

  useEffect(async () => {
    if (isLoadingImage && urlDataResult && extractedColors && !dataURL) {
      let fetchedDataURL = await downloadImage(
        downloadRef.current,
        canvasRef.current,
        data.title,
        data.artistDisplayName,
        true
      );
      setDataURL(fetchedDataURL);
    }
  }, [id, urlDataResult, extractedColors]);

  if (isLoadingImage && urlDataResult && extractedColors && dataURL) {
    return (
      <>
        <style jsx global>{`
          body {
            overflow: visible;
            background: black;
          }
        `}</style>
        <img
          style={{ width: "100vw", height: "100vh", objectFit: "contain" }}
          src={dataURL}
        />
        <div
          style={{
            position: "absolute",
            top: "80%",
            width: "100%",
            padding: "0px 30px",
            color: "white",
            pointerEvents: "none",
          }}>
          <div
            style={{
              padding: 20,
              textAlign: "center",
              background: "rgba(0,0,0,.3)",
            }}>
            Your image has been generated. <br />
            Press and hold to save.
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <ImageCardPage
        data={data}
        loading={loading || isLoadingImage}
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
          disabled={loading || isLoadingImage}
          onClick={() => {
            if (!loading && !isLoadingImage) {
              fetchRandomImage();
            }
          }}>
          Random
        </Button>
        <Button
          disabled={loading || isLoadingImage}
          onClick={() => {
            if (!loading && !isLoadingImage) {
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
      <ImageCardPageOffscreen
        data={data}
        urlDataResult={urlDataResult}
        downloadRef={downloadRef}
        extractedColors={extractedColors}
      />
    </div>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  const { id } = params;
  let parsedId = id;
  if (parsedId.includes(".png")) {
    parsedId = parsedId.substring(0, parsedId.indexOf(".png"));
  }
  const result = await axios.get(
    `${
      process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:3000"
    }/api/getImage?id=${parsedId}`
  );
  return {
    props: result.data,
  };
};

export default ImagePage;
