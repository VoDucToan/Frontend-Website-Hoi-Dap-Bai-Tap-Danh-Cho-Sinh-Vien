import React, { useEffect, useState } from "react";
import getBase64 from "../FileBase64/getBase64";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = (props) => {
    const { getImage, resetPage, initialImage, isMultiple } = props;

    const [imagePreview, setImagePreview] = useState([]);
    // const [isFirstRender, setIsFirstRender] = useState(true);

    // useEffect(() => {
    //     setIsFirstRender(true);
    // }, [resetPage])

    // useEffect(() => {
    //     if ((initialImage && initialImage.length === 0) || !isFirstRender) return;
    //     setIsFirstRender(false);
    //     setImagePreview(initialImage);
    //     document.getElementById('img_id').value = "";
    // }, [initialImage, isFirstRender])

    useEffect(() => {
        setImagePreview(initialImage);
        document.getElementById('img_id').value = "";
    }, [initialImage, resetPage])

    const handleFileChange = async (e) => {
        if (e?.target?.files && e?.target?.files.length > 0) {
            const arrayUrlImg = [...e.target.files].map((file) => {
                return URL.createObjectURL(file);
            })
            setImagePreview(arrayUrlImg);
            const images = [...e.target.files];
            getImage(images);
        }
        else {
            setImagePreview([]);
            getImage([]);
        }
    }

    return (
        <div >
            <span className="fw-bold d-block">Đăng tải hình ảnh</span>
            {imagePreview && imagePreview.length > 0 && imagePreview.map((FileUrl, index) => {
                return (
                    <img src={FileUrl} alt="Image" className="d-block img-thumbnail" key={index} />
                )
            })}
            <input type="file" id="img_id" name="images" accept="image/*" multiple={isMultiple} onChange={handleFileChange} />
        </div>
    );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;