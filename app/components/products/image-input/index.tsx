/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./drop-file-input.css";
import { Image as ImageIcon } from "lucide-react";

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

  // const fileRemove = (file: any) => {
  //   const updatedList = [...fileList];
  //   updatedList.splice(fileList.indexOf(file), 1);
  //   setFileList(updatedList);
  //   props.onFileChange(updatedList);
  // };

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
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
