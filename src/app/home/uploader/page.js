"use client"
import { useState } from 'react';
import { constantVariables } from '../constants/constants';


export default function FilesUploader({ selectedCategory }) {


    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSubmitted, setFileSubmitted] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(null);
        setFileSubmitted(null);
        event.preventDefault();
        const files = event.target.files;
        if (files.length > 0) {
            console.log('Selected file:', files[0].name); // Logging file name
            setSelectedFile(files[0]);
            setFileSubmitted(null)
        }
    };
    
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('categories', selectedCategory);
            formData.append('collection_name', constantVariables.COLLECTION_NAME);
    
            const response = await fetch(`${constantVariables.CHROMA_DOMAIN}${constantVariables.CHROMA_UPLOAD_FILE_ENDPOINT}`,
                {
                method: 'POST',
                body: formData,
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            
            let { done, value } = await reader.read();
            while (!done) {
                const chunk = decoder.decode(value, { stream: true });
                const events = chunk.split("\n\n");

                events.forEach(event => {
                if (event.startsWith("data:")) {
                    const jsonData = event.replace("data: ", "");
                    const parsedData = JSON.parse(jsonData);
                    console.log('File uploaded successfully:', parsedData.result.DESCRIPTION);
                    setFileSubmitted(true)
                }
                });
                
                ({ done, value } = await reader.read());
            }
            
        } catch (e) {
            console.error(`Something went wrong: ${e}`)
            setFileSubmitted(false)

        } finally {
            setSelectedFile(null)
        }
    };

    return (
        <div className='mb-10'>
            <div>
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
            {selectedFile && (
                <div className="w-1/2 rounded-full h-1.5 mt-4">
                    <div className="bg-blue-600 h-4 rounded-full dark:bg-blue-500 text-center text-xs pb-1 pl-1 font-medium truncate" style={{"width": "100%", "marginLeft": "-10px"}}>
                        {selectedFile.name} loaded
                    </div>
                </div>
            )}

            {fileSubmitted && (
                <>
                    <p className='text-[#16a34a] ml-6 mt-5'>Successfully submitted your file!</p>
                </>
            )}

            {(fileSubmitted !== null && fileSubmitted === false) && (
                <>
                    <p className='text-[#f59e0b] ml-20 mt-5'>Please try again!</p>
                </>
            )}

        </div>
    );

}