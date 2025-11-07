"use client";
import { SetFalseDeliveryState } from "@/app/icons/setFalseDeliveryState-icon";
import { useState } from "react";

export const AddImage = (props) => {
  const { wh } = props;
  const [image, setImage] = useState(null);
  const imageUpload = (event) => {
    const imageDisplay = event.target.files[0];
    if (imageDisplay) {
      setImage(URL.createObjectURL(imageDisplay));
    }
  };

  return (
    <label htmlFor="image-upload" className={`${wh}`}>
      {!image && (
        <div>
          <input
            className={`${wh} border-dashed border bg-blue-50
              border-blue-300 rounded-xl`}
            type="file"
            id="image-upload"
            onChange={imageUpload}
          />
        </div>
      )}
      {image && (
        <div className={`${wh} relative flex justify-end items-start`}>
          <img
            src={image}
            className="w-full h-full object-cover z-0 absolute rounded-xl"
          />
          <button
            className="w-9 h-9 bg-zinc-200 rounded-full flex justify-center
            items-center cursor-pointer mr-[5px] mt-[5px] z-10"
            onClick={() => setImage(null)}
          >
            <SetFalseDeliveryState />
          </button>
        </div>
      )}
    </label>
  );
};
