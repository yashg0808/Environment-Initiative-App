import fs from "fs";

export const getStaticFilePath = (req, fileName) => {
    return `${req.protocol}://${req.get("host")}/images/${fileName}`;
};
export const getLocalPath = (fileName) => {
    return `public/images/${fileName}`;
};

export const removeLocalFile = (localPath) => {
    fs.unlink(localPath, (err) => {
        if (err) console.log("Error while removing local files: ", err);
        else {
            console.log("Removed local: ", localPath);
        }
    });
};

export const removeUnusedMulterImageFilesOnError = (req) => {
    try {
        const multerFile = req.file;
        const multerFiles = req.files;

        if (multerFile) {
            // If there is file uploaded and there is validation error
            // We want to remove that file
            removeLocalFile(multerFile.path);
        }
        if (multerFiles) {
            const filesValueArray = Object.values(multerFiles);
            // If there are multiple files uploaded for more than one fields
            // We want to remove those files as well
            filesValueArray.map((fileFields) => {
                fileFields.map((fileObject) => {
                    removeLocalFile(fileObject.path);
                });
            });
        }
    } catch (error) {
        console.log("Error while removing image files: ", error);
    }
};

export const getMongoosePaginationOptions = ({
    page = 1,
    limit = 10,
    customLabels,
  }) => {
    return {
      page: Math.max(page, 1),
      limit: Math.max(limit, 1),
      pagination: true,
      customLabels: {
        pagingCounter: "serialNumberStartFrom",
        ...customLabels,
      },
    };
  };