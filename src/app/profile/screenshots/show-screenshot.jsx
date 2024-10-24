
"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Page() {
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/screenshots");
                console.log("Fetching data: ", response.data);
                setImages(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    const handleImageClick = (image, fileName) => {
        const base64Image = Buffer.from(image).toString("base64");
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setSelectedImage(imageUrl);
        setOpenImage(true);
    };

    return (
        <>
            <div className="my-7 w-full flex justify-center">
                <div className="w-[85%] p-2 flex flex-col gap-3 md:gap-1">
                    <h1 className="text-3xl text-green-500">Project Screenshots</h1>
                    <p className="text-gray-400">
                    Screenshots will be captured only if you are on the project page, otherwise blank will appear in the screenshot</p>
                   
                </div>

            </div>
            <p className="ml-20 md:px-4">Total Screenshots : <span className="font-extrabold">{images.length}</span></p>
            <div
                className={`relative w-full py-4 md:p-4 flex-wrap gap-6 flex items-center justify-center  ${openImage ? "blur-md" : ""}`}
            >
                {images.map((ImageData, index) => {
                    const { fileName, image } = ImageData;
                    const base64Image = Buffer.from(image).toString("base64");
                    const imageUrl = `data:image/png;base64,${base64Image}`;
                    const indexOfImage = (index + 1).toString() // Convert to string if needed

                    return (
                        <div key={fileName} className="bg-gray-800 text-white flex justify-center items-center p-4 rounded-md">
                            <div className="flex justify-center items-center flex-col gap-2 ">
                                {/* <h1>{fileName}</h1> */}
                                <Image
                                    src={imageUrl}
                                    alt={fileName}
                                    width={300}
                                    height={300}
                                    className="rounded-md cursor-pointer"
                                    onClick={() => handleImageClick(image, fileName)}
                                />
                                <p className="text-[13px]">{indexOfImage}) {fileName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {openImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <Image
                        src={selectedImage}
                        alt="Selected Image"
                        height={200}
                        width={600}
                        className="rounded-md"
                    />
                    <button
                        className="absolute px-4 top-12 right-24 text-4xl font-bold cursor-pointer rounded-sm bg-red-700 border-2 border-none"
                        onClick={() => setOpenImage(false)}
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
}
