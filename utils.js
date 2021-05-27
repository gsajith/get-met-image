import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

async function downloadImage(
  ref,
  canvasRef,
  title,
  artist,
  returnDataUrl = false
) {
  const canvas = canvasRef;
  const node = ref.cloneNode(true);
  canvas.innerHTML = "";
  canvas.appendChild(node);
  // htmlToImage.toPng(node).then(function (dataUrl) {
  //   let link = document.createElement("a");
  //   link.download =
  //     title
  //       .replace(/[^\w\s]/gi, "")
  //       .split(/[^A-Za-z]/)
  //       .join("-") +
  //     "-" +
  //     artist
  //       .replace(/[^\w\s]/gi, "")
  //       .split(/[^A-Za-z]/)
  //       .join("-") +
  //     ".png";
  //   link.href = dataUrl;
  //   link.click();
  // });
  if (returnDataUrl) {
    let renderedCanvas = await html2canvas(canvas);
    let dataURL = renderedCanvas.toDataURL("image/png");
    console.log("here", dataURL);
    return dataURL;
  }
  html2canvas(canvas, {}).then((canvas) => {
    let dataURL = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download =
      title
        .replace(/[^\w\s]/gi, "")
        .split(/[^A-Za-z]/)
        .join("-") +
      "-" +
      artist
        .replace(/[^\w\s]/gi, "")
        .split(/[^A-Za-z]/)
        .join("-") +
      ".png";
    link.href = dataURL;
    link.click();
  });
}

export { arrayCompare, downloadImage };
