import axios from "axios";
import React, { useEffect, useState } from "react";
import ArtistName from "../components/ArtistName";
import CardContainer from "../components/CardContainer";
import CardContent from "../components/CardContent";
import ColorSwatch from "../components/ColorSwatch";
import ImageContainer from "../components/ImageContainer";
import ImageName from "../components/ImageName";
import PageContainer from "../components/PageContainer";
import PageWrapper from "../components/PageWrapper";
import { BackgroundImage } from "./LazyImage";

const ImageCardPageOffscreen = ({ data, urlDataResult, downloadRef }) => {
  const [imageTitle, setImageTitle] = useState(data.title);
  const [artist, setArtist] = useState(data.artistDisplayName);
  const [date, setDate] = useState(data.objectDate);
  const [extractedColors, setExtractedColors] = useState(data.extractedColors);

  useEffect(() => {
    if (data && typeof data !== "undefined") {
      setImageTitle(data.title);
      setArtist(data.artistDisplayName);
      setDate(data.objectDate);
      setExtractedColors(data.extractedColors);
      if (
        data.primaryImage &&
        typeof data.primaryImage !== "undefined" &&
        data.primaryImage.length > 0
      ) {
        axios
          .get("/api/getImageColors?url=" + data.primaryImage)
          .then((result) => {
            setExtractedColors(result.data);
          });
      }
    }
  }, [data]);

  return (
    <div
      style={{
        position: "absolute",
        left: "120%",
        width: 888,
        height: 1921,
        background: "red",
        top: 0,
      }}>
      <PageWrapper
        style={{ background: extractedColors?.lightVibrant }}
        ref={downloadRef}
        color={extractedColors?.lightVibrant}>
        <PageContainer>
          <CardContainer>
            <CardContent>
              <ImageContainer>
                {urlDataResult && (
                  <BackgroundImage url={urlDataResult} src={urlDataResult} />
                )}
              </ImageContainer>
              <ImageName offscreen={true} color={extractedColors?.vibrant}>
                {imageTitle ? imageTitle : "Title unknown"}
                {date ? <>, {date}</> : ", date unknown"}
              </ImageName>
              <ArtistName offscreen={true} color={extractedColors?.darkMuted}>
                {artist ? artist : "Artist unknown"}
              </ArtistName>
              {extractedColors && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    display: "flex",
                    flexDirection: "row",
                  }}>
                  {Object.values(extractedColors).map((color, index) => (
                    <ColorSwatch
                      key={"offscreenswatch" + index}
                      offscreen={true}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </CardContainer>
        </PageContainer>
      </PageWrapper>
    </div>
  );
};

export default ImageCardPageOffscreen;
