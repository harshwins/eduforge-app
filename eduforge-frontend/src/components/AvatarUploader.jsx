import React, { useRef } from 'react';

export default function AvatarUploader({ initialUrl, onUpload, className = '' }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      onUpload?.(url);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${className} bg-gray-200 flex items-center justify-center cursor-pointer`}
      >
        {initialUrl
          ? <img src={initialUrl} alt="Avatar" className="w-full h-full object-cover" />
          : <span className="text-xl text-gray-500">+</span>
        }
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    </>
  );
}
