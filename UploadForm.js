import React, { useState } from 'react';

const UploadForm = () => {
    const [selectedFiles, setSelectedFile] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile([...selectedFiles, ...event.target.files]);
    };

    const postData = async () => {
        const url = 'http://localhost:5001/image';
        const formData = new FormData();

        selectedFiles.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            console.log(data); // Handle the response data
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit">Upload Images</button>
        </form>
    );
};

export default UploadForm;
