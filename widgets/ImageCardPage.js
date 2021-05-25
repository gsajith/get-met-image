import Head from "next/head";
import React, { useEffect, useState } from "react";
import ArtistName from "../components/ArtistName";
import CardContainer from "../components/CardContainer";
import CardContent from "../components/CardContent";
import ColorSwatch from "../components/ColorSwatch";
import ImageContainer from "../components/ImageContainer";
import ImageName from "../components/ImageName";
import Page from "../components/Page";
import PageContainer from "../components/PageContainer";
import CopiedNotification from "../components/CopiedNotification";
import CopyButton from "../components/CopyButton";
import LazyImage from "./LazyImage";
import LoadingPage from "./LoadingPage";
import PageWrapper from "../components/PageWrapper";

const ImageCardPage = ({ data, loading, setUrlDataResult }) => {
  const [imageUrl, setImageUrl] = useState(data.primaryImage);
  const [smallImageUrl, setSmallImageUrl] = useState(data.primaryImageSmall);
  const [imageTitle, setImageTitle] = useState(data.title);
  const [artist, setArtist] = useState(data.artistDisplayName);
  const [date, setDate] = useState(data.objectDate);
  const [extractedColor, setExtractedColor] = useState(data.extractedColors);
  const [objectID, setObjectID] = useState(data.objectID);
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (data && typeof data !== "undefined") {
      setImageUrl(data.primaryImage);
      setSmallImageUrl(data.primaryImageSmall);
      setImageTitle(data.title);
      setArtist(data.artistDisplayName);
      setDate(data.objectDate);
      setExtractedColor(data.extractedColors);
      setObjectID(data.objectID);
    }
  }, [data]);

  return (
    <Page>
      <PageWrapper color={extractedColor?.lightMuted}>
        <PageContainer>
          <Head>
            <title>
              {imageTitle
                ? imageTitle
                : "Get a random Metropolitan Museum image!"}
            </title>
            <meta
              name="description"
              content={
                artist
                  ? artist + " - generated by get-met-image"
                  : "Get a random image from the Metropolitan Museum of Art"
              }
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <CardContainer
            onMouseEnter={() => setHovering(!loading && true)}
            onMouseLeave={() => setHovering(false)}>
            <CardContent>
              <LoadingPage
                color={extractedColor?.lightMuted}
                opacity={loading ? 0.7 : 0}
              />
              <CopiedNotification opacity={copied ? 1 : 0}>
                copied
              </CopiedNotification>
              {hovering && (
                <CopyButton objectID={objectID} setCopied={setCopied} />
              )}
              <ImageContainer>
                <LazyImage
                  src={smallImageUrl}
                  dataSrc={imageUrl}
                  setUrlDataResult={setUrlDataResult}
                />
              </ImageContainer>
              <ImageName color={extractedColor?.muted}>
                {imageTitle ? imageTitle : "Title unknown"}
                {date ? <>, {date}</> : ", date unknown"}
              </ImageName>
              <ArtistName color={extractedColor?.darkMuted}>
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
                    <ColorSwatch style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </CardContent>
          </CardContainer>
        </PageContainer>
      </PageWrapper>
    </Page>
  );
};

export default ImageCardPage;
