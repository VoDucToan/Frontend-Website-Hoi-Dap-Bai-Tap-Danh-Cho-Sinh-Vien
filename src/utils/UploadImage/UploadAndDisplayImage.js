import React, { useState } from "react";
import getBase64 from "../FileBase64/getBase64";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = (props) => {
    const { getImage, id } = props;
    const [imagePreview, setImagePreview] = useState("");

    const handleFileChange = async (e) => {
        if (e?.target?.files?.[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            const base64 = await getBase64(e.target.files[0]);
            getImage(base64, id);
        }
        else {
            setImagePreview("");
            getImage("", id);
        }
    }

    return (
        <div className='App'>
            <h1>Đăng tải hình ảnh</h1>
            {imagePreview && <img src={imagePreview} alt="Image" />}
            <hr></hr>
            <input type='file' name='file' onChange={handleFileChange}></input>
        </div>
    );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;