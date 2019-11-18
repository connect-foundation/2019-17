const UPLOAD_IMAGE = `mutation($file: Upload!) {
    uploadImage(file: $file){
      filename
      mimetype
      encoding
    }
  }`;

export { UPLOAD_IMAGE };
