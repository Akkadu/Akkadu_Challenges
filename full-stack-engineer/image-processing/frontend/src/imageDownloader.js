import { saveAs } from 'file-saver'
import { Button } from 'react-bootstrap'

  const Downloader = () => {
    const downloadImage = () => {
      saveAs('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', 'image.jpg') // Put your image url here.
    }

    return <Button variant="primary" onClick={downloadImage}>Download!</Button>
  }

  export default Downloader