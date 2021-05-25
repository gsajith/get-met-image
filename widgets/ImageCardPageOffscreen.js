import React, { useEffect, useState } from "react";
import ArtistName from "../components/ArtistName";
import CardContainer from "../components/CardContainer";
import CardContent from "../components/CardContent";
import ColorSwatch from "../components/ColorSwatch";
import ImageContainer from "../components/ImageContainer";
import ImageName from "../components/ImageName";
import PageContainer from "../components/PageContainer";
import PageWrapper from "../components/PageWrapper";
import { Image } from "./LazyImage";

const ImageCardPageOffscreen = ({ data, urlDataResult, downloadRef }) => {
  const [imageTitle, setImageTitle] = useState(data.title);
  const [artist, setArtist] = useState(data.artistDisplayName);
  const [date, setDate] = useState(data.objectDate);
  const [extractedColor, setExtractedColor] = useState(data.extractedColors);

  useEffect(() => {
    if (data && typeof data !== "undefined") {
      setImageTitle(data.title);
      setArtist(data.artistDisplayName);
      setDate(data.objectDate);
      setExtractedColor(data.extractedColors);
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
        style={{ background: extractedColor?.lightMuted }}
        ref={downloadRef}
        color={extractedColor?.lightMuted}>
        <PageContainer>
          <CardContainer>
            <CardContent>
              <ImageContainer>
                {urlDataResult && <Image src={urlDataResult} />}
              </ImageContainer>
              <ImageName offscreen={true} color={extractedColor?.muted}>
                {imageTitle ? imageTitle : "Title unknown"}
                {date ? <>, {date}</> : ", date unknown"}
              </ImageName>
              <ArtistName offscreen={true} color={extractedColor?.darkMuted}>
                {artist ? artist : "Artist unknown"}
              </ArtistName>
              {extractedColor && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    display: "flex",
                    flexDirection: "row",
                  }}>
                  {Object.values(extractedColor).map((color) => (
                    <ColorSwatch
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
