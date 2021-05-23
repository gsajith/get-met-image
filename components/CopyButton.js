import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  padding: 8px 10px 8px 12px;
  z-index: 2;
  border-radius: 8px;
  transition: all 150ms ease-in-out;
  img {
    pointer-events: none;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const CopyButton = ({ objectID, setCopied }) => {
  const copyText =
    (typeof window !== "undefined"
      ? window.location.origin + "/"
      : "http://localhost:3000/") + objectID;

  const copyTimeout = useRef(0);

  return (
    <>
      <CopyToClipboard
        text={copyText}
        onCopy={() => {
          setCopied(true);
          clearTimeout(copyTimeout.current);
          copyTimeout.current = setTimeout(() => setCopied(false), 2000);
        }}>
        <CopyButtonContainer>
          <img src={"/Copy.svg"} />
        </CopyButtonContainer>
      </CopyToClipboard>
    </>
  );
};

export default CopyButton;
