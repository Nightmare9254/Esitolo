import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const Pond = () => {
  const [images, setImages] = useState([]);

  const sendFile = () => {
    fetch('/api/image', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.parse(images.map((image) => image)),
    })
      .then((res) => res.json())
      .then((json) => console.log('yet'));
  };
  // console.log(images.file.name);

  return (
    <div>
      <FilePond
        files={images}
        allowReorder={true}
        allowMultiple={true}
        onupdatefiles={setImages}
        allowFileEncode={true}
        allowFileSizeValidation={true}
        maxFileSize="1MB"
        maxTotalFileSize="5MB"
        imageResizeTargetHeight="100"
        imageResizeTargetWidth="100"
        imageTransformOutputMimeType="image/jpeg"
        imageTransformOutputQuality="60"
      />

      <button onClick={sendFile}>Send image</button>
    </div>
  );
};

export default Pond;
