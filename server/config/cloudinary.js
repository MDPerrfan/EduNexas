import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async(req, res) => {


    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET

    })
}

export default connectCloudinary