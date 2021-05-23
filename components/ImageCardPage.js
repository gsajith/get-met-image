import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import PageContainer from "../components/PageContainer";
import CardContainer from "../components/CardContainer";
import CardContent from "../components/CardContent";
import Image from "../components/Image";
import axios from "axios";
import ImageName from "../components/ImageName";
import ArtistName from "../components/ArtistName";
import ImageContainer from "../components/ImageContainer";
import ColorSwatch from "../components/ColorSwatch";
import Head from "next/head";

const ImageCardPage = ({ data, loading }) => {
  const [result, setResult] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [date, setDate] = useState(null);
  const [extractedColor, setExtractedColor] = useState(null);

  useEffect(() => {
    if (data && typeof data !== "undefined") {
      setImageUrl(data.primaryImage);
      setImageTitle(data.title);
      setArtist(data.artistDisplayName);
      setDate(data.objectDate);
      setExtractedColor(data.extractedColors);
    }
  }, [data]);

  return (
    <Page color={extractedColor?.lightMuted}>
      <PageContainer>
        <Head>
          <title>Get Random Metropolitan Museum Image</title>
          <meta
            name="description"
            content="Get a random image from the Metropolitan Museum of Art"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <CardContainer>
          <CardContent>
            {loading && <>Loading...</>}
            <ImageContainer>
              <Image src={imageUrl} />
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
    </Page>
  );
};

export default ImageCardPage;
