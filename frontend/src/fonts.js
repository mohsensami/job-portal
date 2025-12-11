// Import fonts for Vite to handle correctly
import LightWoff from "./assets/fonts/Woff/IRANSansXFaNum-Light.woff?url";
import LightWoff2 from "./assets/fonts/Woff2/IRANSansXFaNum-Light.woff2?url";
import MediumWoff from "./assets/fonts/Woff/IRANSansXFaNum-Medium.woff?url";
import MediumWoff2 from "./assets/fonts/Woff2/IRANSansXFaNum-Medium.woff2?url";
import ExtraBoldWoff from "./assets/fonts/Woff/IRANSansXFaNum-ExtraBold.woff?url";
import ExtraBoldWoff2 from "./assets/fonts/Woff2/IRANSansXFaNum-ExtraBold.woff2?url";
import BoldWoff from "./assets/fonts/Woff/IRANSansXFaNum-Bold.woff?url";
import BoldWoff2 from "./assets/fonts/Woff2/IRANSansXFaNum-Bold.woff2?url";
import RegularWoff from "./assets/fonts/Woff/IRANSansXFaNum-Regular.woff?url";
import RegularWoff2 from "./assets/fonts/Woff2/IRANSansXFaNum-Regular.woff2?url";

// Create style element and inject font-face rules
const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 300;
    src: url("${LightWoff}") format("woff"), url("${LightWoff2}") format("woff2");
    font-display: swap;
  }
  
  @font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 500;
    src: url("${MediumWoff}") format("woff"), url("${MediumWoff2}") format("woff2");
    font-display: swap;
  }
  
  @font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 800;
    src: url("${ExtraBoldWoff}") format("woff"), url("${ExtraBoldWoff2}") format("woff2");
    font-display: swap;
  }
  
  @font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 700;
    src: url("${BoldWoff}") format("woff"), url("${BoldWoff2}") format("woff2");
    font-display: swap;
  }
  
  @font-face {
    font-family: IRANSansX;
    font-style: normal;
    font-weight: 400;
    src: url("${RegularWoff}") format("woff"), url("${RegularWoff2}") format("woff2");
    font-display: swap;
  }
`;

document.head.appendChild(style);
