const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) =>{
    
    const options = {folder};
    if(height)
    {
        options.height = height;
    }
    if(quality)
    {
        options.quality = quality;
    }
   
   
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}
