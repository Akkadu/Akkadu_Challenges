import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "ant-typescript-pro/dist/ant-design-pro.css";
import "antd/dist/antd.css";
import "./global.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
