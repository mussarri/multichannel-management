/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TextInput from "@/app/components/settings/text-input";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>, // İsteğe bağlı
});

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import dynamic from "next/dynamic";
const SubtitleDescription = ({
  formValues,
  setFormValues,
  errors,
  setErrors,
}) => {
  const handleModelChange = (event: InputEvent) => {
    setFormValues((prev: any) => {
      return { ...prev, description: event };
    });
  };

  return (
    <>
      <div className="flex gap-4 items-end my-4 ">
        <div className=" flex-1">
          <TextInput
            label={"Ürün Alt Başlığı(Maksımum 60 karakter)"}
            name={"sub_title"}
            required={true}
            onChange={(value: string) => {
              setErrors((prev) => {
                return { ...prev, sub_title: "" };
              });
              setFormValues({ ...formValues, sub_title: value });
            }}
            vertical={true}
            error={errors.sub_title}
            type={"text"}
            placeholder="1"
            value={formValues.sub_title}
          />
        </div>
      </div>
      <div>
        <label htmlFor="" className="pb-1">
          Aciklama
        </label>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: "Edit Your Content Here!",
            charCounterCount: false,
          }}
          model={formValues.decsription}
          onModelChange={handleModelChange}
        />
      </div>
    </>
  );
};

export default SubtitleDescription;
