/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import CheckBox from "@/app/components/settings/checkbox";
import { Button } from "@/components/ui/button";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import FroalaEditorComponent from "react-froala-wysiwyg";

const page = () => {
  const [model, setModel] = React.useState("");

  const handleModelChange = (model: any) => {
    setModel(model);
  };
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Gittigidiyor Ayarlari</h2>
      <div className="box max-w-[750px] mt-5 flex flex-col gap-2">
        <TextInput
          label="Magaza Adi"
          name="storeName"
          placeholder="Magaza"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Api Key"
          name="api_key"
          placeholder="API Key"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Api Secret"
          name="api_secret"
          placeholder="Api Secret"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Role Name"
          name="role_name"
          placeholder="Api Secret"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <TextInput
          label="Role Password"
          name="role_password"
          placeholder="Api Secret"
          value=""
          onChange={() => {}}
          type="text"
          required={false}
          error={false}
          vertical={false}
        />
        <div className="flex flex-col gap-2 mt-2 max-w-sm">
          <label htmlFor="" className="text-sm uppercase font-semibold">
            Mağaza Durumu
          </label>
          <div className="w-full text-center bg-secondary py-2 text-xs uppercase rounded">
            Pasif
          </div>
        </div>
      </div>
      <div className="box  max-w-[750px] mt-5">
        <h2 className="font-semibold">Listeleme Özellikleri</h2>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <SelectInput
            options={[]}
            label="Ürün Kaç Gün Satışta Kalsın?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={["Alıcı", "Satıcı"]}
            label="Kargo Ücretini Kim Ödeyecek?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargo Firması?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Nereden Kargolayacaksınız?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargoya Teslim Tarihi?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
          <SelectInput
            options={[]}
            label="Kargoya Teslim Saati?"
            name=""
            onChange={() => {}}
            required={false}
            vertical={true}
          />
        </div>
      </div>
      <div className="box  max-w-[750px] mt-5">
        <h2 className="font-semibold">Ekstra Özellikleri</h2>
        <div className="flex gap-5 mt-3">
          <CheckBox
            label="Alt Baslik"
            name="sub_title"
            onChange={() => {}}
            value={""}
            required={false}
          />
          <CheckBox
            label="Alt Baslik"
            name="sub_title2"
            onChange={() => {}}
            value={""}
            required={false}
          />
          <CheckBox
            label="Alt Baslik"
            name="sub_title3"
            onChange={() => {}}
            value={""}
            required={false}
          />
          <CheckBox
            label="Alt Baslik"
            name="sub_title4"
            onChange={() => {}}
            value={""}
            required={false}
          />
          <CheckBox
            label="Alt Baslik"
            name="sub_title5"
            onChange={() => {}}
            value={""}
            required={false}
          />
        </div>
      </div>
      <div className="box  max-w-[750px] mt-5">
        <div className="">
          <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
            Sabit Aciklama
          </h5>
          <FroalaEditorComponent
            tag="textarea"
            config={{
              placeholderText: "Edit Your Content Here!",
              charCounterCount: false,
            }}
            model={model}
            onModelChange={handleModelChange}
          />
        </div>
        <div className="mt-4">
          <h5 className="uppercase text-[10px] pb-2 font-semibold text-card-foreground">
            Sabit Aciklama
          </h5>
          <FroalaEditorComponent
            tag="textarea"
            config={{
              placeholderText: "Edit Your Content Here!",
              charCounterCount: false,
            }}
            model={model}
            onModelChange={handleModelChange}
          />
        </div>
      </div>

      <div className="text-right max-w-[750px] mt-4 pb-5">
        <Button>Kaydet</Button>
      </div>
    </>
  );
};

export default page;
