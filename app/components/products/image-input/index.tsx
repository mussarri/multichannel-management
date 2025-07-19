/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./drop-file-input.css";
import Image from "next/image";
import { Image as ImageIcon, Trash } from "lucide-react";

const DropFileInput = (props: { onFileChange: (files: any[]) => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [fileList, setFileList] = useState<any[]>([]);

  const onDragEnter = () =>
    (wrapperRef.current as HTMLElement)?.classList?.add("dragover");

  const onDragLeave = () =>
    (wrapperRef.current as HTMLElement)?.classList.remove("dragover");

  const onDrop = () =>
    (wrapperRef.current as HTMLElement)?.classList.remove("dragover");

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newFile = target?.files?.[0];
    const url = await readFileAsDataURL(newFile as File);
    if (newFile) {
      const updatedList = [...fileList, { ...newFile, url }];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file: any) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label flex flex-col items-center gap-3">
          <ImageIcon size={100} />
          <p className="text-xs">
            Ürün Görsellerini Buraya Sürükle ve Bırakın ya da Tıklayın
          </p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      <p className="drop-file-preview__title text-xs">Ready to upload</p>
      {fileList.length > 0 ? (
        <div className="grid grid-cols-5 gap-3 w-full">
          {fileList.map((item, index) => (
            <div key={index}>
              <div
                className="relative bg-card rounded border"
                style={{
                  aspectRatio: 1,
                }}
              >
                <Image src={item.url} alt="" fill objectFit="contain" />
                {/* <div className="drop-file-preview__item__info">
                <p>{item?.name}</p>
                <p>{item?.size}B</p>
              </div> */}
              </div>
              <span
                className="text-xs flex items-center justify-center gap-2 py-1 mx-auto cursor-pointer hover:text-red-800"
                onClick={() => fileRemove(item)}
              >
                <Trash size={11} /> Remove File
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
