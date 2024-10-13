"use client"
import { useState } from 'react';

export default function FilesUploader() {


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('File uploaded successfully:', data);
    };

    return (
        <div className='mb-10'>
            <input
                type="file"
                onChange={handleFileChange}
                placeholder="Search File"
                draggable="true"
                className="hidden"
                id="file-upload"
            />

            <label
                htmlFor="file-upload"
                className="bg-[#a11bb5] text-white px-6 py-3 mr-10 cursor-pointer rounded hover:bg-[#c084fc]"
            >
                Select File
            </label>
            <button onClick={handleFileUpload} className='bg-[#a11bb5] px-4 py-2 rounded hover:bg-[#c084fc]'>Upload File</button>
        </div>
    );

}