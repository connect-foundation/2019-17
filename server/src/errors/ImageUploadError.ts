import { createError } from 'apollo-errors';

const ImageUploadError = createError('ImageUploadError', {
  message: 'An error occurred while the image was uploading.'
});

export default ImageUploadError;
