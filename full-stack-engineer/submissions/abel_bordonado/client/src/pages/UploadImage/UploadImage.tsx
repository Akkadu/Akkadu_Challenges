import * as _ from "lodash";
import * as React from "react";
import { Card, Row, Col, Empty, Slider } from "antd";
import "./UploadImage.css";
import DragImage from "./partial/DragImage";
import { FILTERS } from "../../models/Filters";

interface InternalProps {
  _v?: false;
}

interface InternalState {
  images: Array<{ original: string; url: string }>;
  selectedEffect: string;
  value: number;
  maxValue: number;
}

export default class UploadImage extends React.PureComponent<
  InternalProps,
  InternalState
> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      maxValue: 0,
      value: 0,
      images: [],
      selectedEffect: "",
    };
  }

  componentWillMount() {
    // console.log(this.permissions);
  }

  public render() {
    return (
      <>
        <div style={{ margin: "40px" }} />
        <div className="flex-row justify-content-center">
          <h3>Upload Media With Effect Demo</h3>
        </div>
        <div style={{ margin: "12px" }} />

        <div className="horizontal_scroll flex-row" style={{ padding: "4px" }}>
          {FILTERS.map((filter, index) => {
            return (
              <div
                key={index}
                style={{ padding: "8px" }}
                onClick={() =>
                  this.setState({
                    selectedEffect: filter.effect,
                    maxValue: filter.opts || 0,
                    value: filter.opts ? filter.opts / 2 : 0,
                  })
                }
              >
                <img
                  src={filter.image}
                  style={{ width: "150px", height: "150px" }}
                />
                <div style={{ margin: "2px" }} />
                <div className="text-align-center width-100">
                  {filter.title}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ margin: "12px" }} />

        {this.state.maxValue > 0 && (
          <>
            <h3>Strength:</h3>
            <Slider
              defaultValue={this.state.value}
              onAfterChange={(value: number) => this.setState({ value })}
              max={this.state.maxValue}
            />{" "}
            <div style={{ margin: "12px" }} />
          </>
        )}

        {this.state.selectedEffect ? (
          <>
            <DragImage
              effectName={this.state.selectedEffect}
              value={this.state.value}
              onLoad={(image) =>
                this.setState({
                  images: [
                    { original: image.original, url: image.url },
                    ...this.state.images,
                  ],
                })
              }
            />
          </>
        ) : (
          <Card>
            {" "}
            <Empty description="Select a filter before upload" />
          </Card>
        )}

        <div style={{ margin: "12px" }} />

        <Row gutter={[10, 10]}>
          {this.state.images.map((image, index) => (
            <Col lg={8} sm={24} key={index}>
              <Card>
                <Row type="flex" justify="space-between" align="middle">
                  <img
                    src={image.original}
                    onClick={() => this.downloadImage(image.original)}
                    alt="original"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                  VS
                  <img
                    src={image.url}
                    onClick={() => this.downloadImage(image.url)}
                    alt="afterEffect"
                    style={{ height: "100px", width: "100px" }}
                  />
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }

  private async downloadImage(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
