// import imageToBase64 from 'image-to-base64/browser';

// const imgToBase64 = ()=>{

//      imageToBase64('./jean-woloszczyk-CcPE98IQJGo-unsplash.jpg') // Path to the image
//         .then(
//             (response) => {
//                 console.log("response===>",response); // "cGF0aC90by9maWxlLmpwZw=="
//             }
//         )
//         .catch(
//             (error) => {
//                 console.log(error); // Logs an error if there was one
//             }
//         )

//         console.log(imageToBase64)
// }

// export default imgToBase64

import React from "react";
import axios from "axios";
import { createRef, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
class ImageConverter extends React.Component {
  state = {
    file: null,
    base64URL: "",
    selectFilter: "",
  };

  //   const [selectFilter, setSelectFilter] = useState("original");
  //   const setSelectedFilter = useRef();
  //     Selecthandler = (e) => {
  //     setSelectFilter(e.target.className);
  //     setSelectedFilter.current.className = e.target.className;
  //   };
  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
    });
  };
  sendRequest = () => {
    // console.log("data===>", data);
    let { file } = this.state;

    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", result);
        axios
          .post("https://image-proce-api.herokuapp.com/upload/image", { base64image: result })
          .then(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
        this.setState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFileInputChange = (e) => {
    let { file } = this.state;

    file = e.target.files[0];
    console.log(file);

    this.setState({
      file: e.target.files[0],
    });
  };

  render() {
    return (
      <div>
        <div className="mt-5">
          <Container className="">
            <Row>
              <Col style={{ width: "100%" }}>
                <div className="text-center">Original Image</div>
                <img
                  src={`${this.state.base64URL}`}
                  height="400"
                  width="500"
                  alt="imagee1"
                />
              </Col>
              <Col>
                <div className="text-center">Filters</div>
                <div
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    height: "auto",
                  }}
                  className="d-flex justify-content-around align-items-center"
                >
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <div>Filter 1</div>
                    <img
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      height="100"
                      width="140"
                      alt="imagee1"
                      className="black-and-white-image"
                      //   onClick={}
                    />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <div>Filter 2</div>
                    <img
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      height="100"
                      width="140"
                      className="blur-image"
                      alt="imagee1"
                      //   onClick={}
                    />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <div>Filter 3</div>
                    <img
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      height="100"
                      width="140"
                      className="radiant-effect"
                      alt="imagee1"
                      //   onClick={}
                    />
                  </div>
                </div>
              </Col>
              <Col style={{ width: "100%" }}>
                <div className="text-center">Filtered Image</div>
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  height="400"
                  width="500"
                  alt="imagee1"
                  //   ref={setSelectedFilter}
                />
                <div className="mt-3 float-end">
                  {/* <Downloader /> */}
                  <Button onClick={this.sendRequest}>Send</Button>
                  {/* <Button onClick={}>get img</Button> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <input type="file" name="file" onChange={this.handleFileInputChange} />
      </div>
    );
  }
}

export default ImageConverter;
