import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { isMobile } from "react-device-detect";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {!isMobile && (
              <div
                id="canvas"
                style={{
                  position: "absolute",
                  left: "120%",
                  width: 888,
                  height: 1921,
                  background: "red",
                }}></div>
            )}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
