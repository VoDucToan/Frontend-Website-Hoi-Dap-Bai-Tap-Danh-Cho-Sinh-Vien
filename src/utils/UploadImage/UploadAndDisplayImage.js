import React, { useState } from "react";
import getBase64 from "../FileBase64/getBase64";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = (props) => {
    const { getImage } = props;
    const [imagePreview, setImagePreview] = useState("");

    const handleFileChange = async (e) => {
        if (e?.target?.files?.[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            const image = e.target.files[0];
            getImage(image);
        }
        else {
            setImagePreview("");
            getImage({});
        }
    }

    return (
        <div >
            <span className="fw-bold d-block">Đăng tải hình ảnh</span>
            {imagePreview && <img src={imagePreview} alt="Image" className="d-block img-thumbnail" />}
            <input type="file" name="image" accept="image/*" multiple={false} onChange={handleFileChange} />
        </div>
    );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;