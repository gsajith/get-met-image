import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

export const Image = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => (props.url ? props.url : "")});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

let lazySizes = null;

if (canUseDOM) {
  lazySizes = require("lazysizes");
}

// TODO: Most of this is unused - just need an Image (or next/image) with onLoad
class LazyLoad extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    dataSizes: PropTypes.string,
    dataSrc: PropTypes.string,
    dataSrcSet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
    iframe: PropTypes.bool,
    setUrlDataResult: PropTypes.func,
  };

  static defaultProps = {
    src: "data:image/gif;base64,R0lGODdhEAAJAIAAAMLCwsLCwiwAAAAAEAAJAAACCoSPqcvtD6OclBUAOw==",
    dataSizes: "auto",
    iframe: false,
    setUrlDataResult: () => {},
  };

  componentWillUpdate = (nextProps) => {
    let propsChanged = false;
    for (let propName of [
      "src",
      "dataSizes",
      "dataSrc",
      "dataSrcSet",
      "className",
      "iframe",
    ]) {
      let prop =
        propName === "dataSrcSet"
          ? this.handleSrcSet(this.props[propName])
          : this.props[propName];
      let nextProp =
        propName === "dataSrcSet"
          ? this.handleSrcSet(nextProps[propName])
          : nextProps[propName];
      if (prop !== nextProp) {
        propsChanged = true;
        break;
      }
    }
    if (propsChanged && lazySizes) {
      let lazyElement = ReactDOM.findDOMNode(this);
      if (lazySizes.hC(lazyElement, "lazyloaded")) {
        lazySizes.rC(lazyElement, "lazyloaded");
      }
    }
  };

  componentDidUpdate = () => {
    if (!lazySizes) {
      return;
    }
    let lazyElement = ReactDOM.findDOMNode(this);
    if (
      !lazySizes.hC(lazyElement, "lazyloaded") &&
      !lazySizes.hC(lazyElement, "lazyload")
    ) {
      lazySizes.aC(lazyElement, "lazyload");
    }
  };

  handleSrcSet = (srcSet) => {
    let result = srcSet;
    if (typeof srcSet === "object") {
      if (!Array.isArray(srcSet)) {
        result = [];
        for (let variant in srcSet) {
          if (srcSet.hasOwnProperty(variant)) {
            result.push({
              variant: variant,
              src: srcSet[variant],
            });
          }
        }
      }
      result = result
        .map((item) => {
          return `${item.src} ${item.variant}`;
        })
        .join(", ");
    }
    return result;
  };

  render() {
    let {
      src,
      dataSizes,
      dataSrc,
      dataSrcSet,
      className,
      iframe,
      setUrlDataResult,
      ...other
    } = this.props;
    dataSrcSet = this.handleSrcSet(dataSrcSet);
    className = className + " lazyload";
    if (iframe) {
      return (
        <iframe
          {...other}
          src={dataSrc ? "" : src}
          data-src={dataSrc}
          className={className}></iframe>
      );
    }
    return (
      <Image
        {...other}
        src={src}
        data-src={dataSrc}
        data-sizes={dataSizes}
        data-srcset={dataSrcSet}
        className={className}
        onLoad={async () => {
          if (setUrlDataResult) {
            let result = await axios.get("/api/storeDataUrl?url=" + src);
            setUrlDataResult(result.data);
          }
        }}
      />
    );
  }
}

export default LazyLoad;
