import axios from "axios";
import React, { createRef, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Downloader from "./imageDownloader";
import img from './jean-woloszczyk-CcPE98IQJGo-unsplash.jpg'
import "./imageViewer.css";
// import imgToBase64 from "./ImgConverter";
function ImageViewer() {
  const [selectFilter, setSelectFilter] = useState("original");
  const setSelectedFilter = useRef();
  const Selecthandler = (e) => {
    setSelectFilter(e.target.className);
    setSelectedFilter.current.className = e.target.className;
  };

  // var data = base64Img.base64Sync('./jean-woloszczyk-CcPE98IQJGo-unsplash.jpg');
  // console.log(data)

  const sendImage = () => {


  //   const base64image = imgToBase64()
  //   console.log("base64image==>",base64image)
    // axios
    //   .post("http://localhost:9000/upload/image", {base64image:`${`data:image/png;base64`},${base64image}`})
    //   .then(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  };
  console.log(selectFilter);
  return (
    <div className="mt-5">
      <Container className="">
        <Row>
          <Col style={{ width: "100%" }}>
            <div className="text-center">Original Image</div>
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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
                  onClick={Selecthandler}
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
                  onClick={Selecthandler}
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
                  onClick={Selecthandler}
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
              ref={setSelectedFilter}
            />
            <div className="mt-3 float-end">
              {/* <Downloader /> */}
              <Button onClick={sendImage}>Send</Button>
              {/* <Button onClick={}>get img</Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImageViewer;
