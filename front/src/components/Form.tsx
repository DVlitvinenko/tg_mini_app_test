import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import { useTelegram } from "../hooks/useTelegram";
import { FromData } from "../types/appTypes";

const Form = () => {
  const { tg } = useTelegram();
  const [formData, setFormData] = useState<FromData>({
    name: "",
    phone: "",
    face: "legal",
  });

  useEffect(() => {
    tg.MainButton.setParams({ text: "Отправить заказ" });
  }, []);

  useEffect(() => {
    if (formData.name && formData.phone && formData.phone.length === 17) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
    tg.MainButton.onClick(handleSendData);
    return () => tg.MainButton.offClick(handleSendData);
  }, [formData]);

  const handleSendData = useCallback(() => {
    tg.sendData(JSON.stringify(formData));
  }, [formData]);

  const handleChangeData = (value: string, key: keyof FromData) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className=" w-full  h-full flex items-center justify-center fixed p-4 left-0 top-0 ">
      <div className="mx-auto max-w-xs flex items-center justify-center flex-col gap-2 ">
        <Input
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => handleChangeData(e.target.value, "name")}
        />

        <Input
          type="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="phone"
          value={formData.phone}
          onChange={(e) => {
            handleChangeData(e.target.value, "phone");
          }}
        />
        <select
          className="p-2 border-2 h-10 w-full rounded-sm "
          name=""
          id=""
          defaultValue={formData.face}
          onChange={(e) => handleChangeData(e.target.value, "face")}
        >
          <option value="legal">Юр. лицо</option>
          <option value="physical">Физ. лицо</option>
        </select>
      </div>
    </div>
  );
};

export default Form;
