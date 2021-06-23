import { Icon, message, Progress, Tag } from 'antd';

import * as React from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import { RcFile } from 'antd/lib/upload';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import moment from 'moment';
import { Service } from '../../../services/Service';
import { FILTERS } from '../../../models/Filters';

interface InternalProps {
  dragAreaHeight?: number;
  effectName: string;
  value?: number;
  onLoad?: (image: ImageInfo) => void;
}

type ImageInfo = {
  id: string;
  original: string;
  url: string;
  loading?: boolean;
  failed?: boolean;
};

interface InternalState {
  images: ImageInfo[];
  uploadingCount: number;
}
class DragImage extends React.Component<InternalProps, InternalState> {
  private uploadingCounter = 0;
  private images: ImageInfo[] = [];

  constructor(props: InternalProps) {
    super(props);
    this.state = {
      images: [],
      uploadingCount: 0,
    };
    this.images = this.state.images;
    // TODO if props change generate on PropsWillChange
  }

  render() {
    const percentage = this.state.uploadingCount
      ? this.state.images.filter((images) => images.loading === false).length /
        this.state.uploadingCount
      : -1;
    return (
      <React.Fragment>
        <Dragger
          height={this.props.dragAreaHeight}
          name={'image'}
          multiple={true}
          beforeUpload={async (file: RcFile, fileList: RcFile[]) =>
            this.beforeUpload(file, fileList)
          }
          customRequest={(options: RcCustomRequestOptions) =>
            this.uploadImage(options)
          }
          onChange={(info: any) => {
            // console.log(info);
            const { status } = info.file;
            if (status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag to upload</p>
          <p className="ant-upload-text">
            <Tag color="blue">{this.filterName}</Tag>
          </p>

          <div style={{ padding: '12px' }}>
            {percentage > -1 && (
              <Progress percent={+(percentage * 100).toFixed()} />
            )}
          </div>
        </Dragger>
      </React.Fragment>
    );
  }

  private get filterName() {
    const filter = FILTERS.find(
      (filter) => filter.effect === this.props.effectName
    );
    if (!filter) {
      return '';
    }
    return filter.title;
  }

  private async beforeUpload(file: RcFile, fileList: RcFile[]) {
    // This function is called once per file, but second parameter has all files already

    const ids = this.images.map((image) => image.id);
    // Avoid duplicate
    if (ids.includes(file.uid)) {
      return;
    }

    this.images.push({
      id: file.uid,
      original: URL.createObjectURL(file),
      url: '',
      loading: true,
    });

    this.setState({ images: [...this.images] });
    this.uploadingCounter++;
    this.setState({ uploadingCount: this.uploadingCounter });
    return;
  }

  private async uploadImage(options: RcCustomRequestOptions) {
    console.log({ options });
    const key = await Service.media.addEffectToImage(options.file, {
      effect: this.props.effectName,
      value: this.props.value,
    });

    console.log(
      options.file.name,
      moment().format('HH:mm:ss'),
      'Upload File',
      key
    );

    const fileIndex = this.images.findIndex(
      (image) => image.id === (options.file as any).uid
    );

    if (fileIndex < 0) {
      return;
    }

    if (key === '') {
      this.images[fileIndex].failed = true;
    } else {
      this.images[fileIndex].url = key;
    }

    this.images[fileIndex].loading = false;

    this.setState({ images: [...this.images] });
    this.props.onLoad && this.props.onLoad(this.images[fileIndex]);
    this.endLoadingPics();
    console.log('Uploaded ', key, this.images);
    return;
  }

  private endLoadingPics() {
    if (this.images.some((image) => image.loading === true)) {
      return;
    }
    this.images.forEach((image) => {
      if (image.loading === false) {
        delete image.loading;
      }
    });
    this.uploadingCounter = 0;
    this.setState({
      images: [...this.images],
      uploadingCount: this.uploadingCounter,
    });
  }
}

export default DragImage;
