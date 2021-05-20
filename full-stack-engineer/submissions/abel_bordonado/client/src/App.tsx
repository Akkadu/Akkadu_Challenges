import * as React from "react";
import UploadImage from "./pages/UploadImage/UploadImage";

export default class App extends React.Component {
  public async componentWillMount() {}

  public render() {
    return (
      <React.Fragment>
        <UploadImage />
      </React.Fragment>
    );
  }
}
