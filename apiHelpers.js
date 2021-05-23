import axios from "axios";
import * as Vibrant from "node-vibrant";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getImage = async (id, departments) => {
  if (id === null || typeof id === "undefined" || id < 0) {
    let result = await getRandomImage(departments);
    return result;
  } else {
    let imageData = await getImageDataForId(id);
    if (
      imageData.primaryImage &&
      typeof imageData.primaryImage !== "undefined" &&
      imageData.primaryImage.length > 0
    ) {
      let v = new Vibrant(imageData.primaryImage, {});
      let palette = await v.getPalette();
      let extractedColors = {};
      extractedColors.vibrant = palette.Vibrant?.getHex();
      extractedColors.lightVibrant = palette.LightVibrant?.getHex();
      extractedColors.darkVibrant = palette.DarkVibrant?.getHex();
      extractedColors.muted = palette.Muted?.getHex();
      extractedColors.lightMuted = palette.LightMuted?.getHex();
      extractedColors.darkMuted = palette.DarkMuted?.getHex();
      imageData.extractedColors = extractedColors;
    }
    return imageData;
  }
};

const getRandomImage = async (departments) => {
  if (
    departments === null ||
    typeof departments === "undefined" ||
    departments.length === 0
  ) {
    departments = await fetchAllDepartments();
  }
  let data = await fetchIdsByDepartment(departments);
  if (!data.objectIDs || data.objectIDs.length <= 0) {
    return { error: "Invalid department ID" };
  }
  let randomId =
    data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
  let imageData = await getImageDataForId(randomId);
  while (!imageData.primaryImage || imageData.primaryImage === "") {
    await sleep(2000);
    randomId =
      data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
    imageData = await getImageDataForId(randomId);
  }
  if (
    imageData.primaryImage &&
    typeof imageData.primaryImage !== "undefined" &&
    imageData.primaryImage.length > 0
  ) {
    let v = new Vibrant(imageData.primaryImage, {});
    let palette = await v.getPalette();
    let extractedColors = {};
    extractedColors.vibrant = palette.Vibrant?.getHex();
    extractedColors.lightVibrant = palette.LightVibrant?.getHex();
    extractedColors.darkVibrant = palette.DarkVibrant?.getHex();
    extractedColors.muted = palette.Muted?.getHex();
    extractedColors.lightMuted = palette.LightMuted?.getHex();
    extractedColors.darkMuted = palette.DarkMuted?.getHex();
    imageData.extractedColors = extractedColors;
  }
  return imageData;
};

const getImageDataForId = async (id) => {
  const imageData =
    await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}
`);
  return imageData.data;
};

const fetchIdsByDepartment = async (departments) => {
  const allData = await axios.get(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departments.join(
      "|"
    )}`
  );
  return allData.data;
};

const fetchAllDepartments = async () => {
  const allDepartments =
    await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/departments
`);
  let departmentIds = allDepartments.data.departments.map(
    (department) => department.departmentId
  );
  return departmentIds;
};

export { getImage, getRandomImage };
