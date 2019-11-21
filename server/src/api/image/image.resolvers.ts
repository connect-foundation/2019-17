import uploadToObjStorage from "../../middleware/uploadToObjStorage";

export default {
  Mutation: {
    uploadImage: async (_, { file }) => {
      const { filename, mimetype, encoding, createReadStream } = await file;

      await uploadToObjStorage(createReadStream(), filename);

      const returnFile = { filename, mimetype, encoding };

      return returnFile;
    }
  }
};
