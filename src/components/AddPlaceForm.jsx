import { Form, Link, useNavigation } from "react-router-dom";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import PerksContainer from "./PerksContainer";

import { perkOptions } from "../utilits/perkOptions";
import { envOptions } from "../utilits/SurroundingEnv";
import { cities, roomTypes } from "../utilits/options";
import { MdOutlineClose } from "react-icons/md";

const AddPlaceForm = ({ errorArr }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="relative border p-6 rounded-lg shadow-lg shadow-grey-300 gap-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center"
    >
      <FormInput
        des="房源標題，請提供簡短且吸引人的標題，以利房源廣告。"
        type="text"
        labelText="標題"
        name="title"
        placeHolder="房源標題"
      />

      <div>
        <FormSelect labelText="縣市" name="city" list={cities} />
        <FormInput
          des="請提供確切房源地址以利查詢。"
          type="text"
          name="address"
          placeHolder="請提供確切房源地址"
          labelText="地址"
        />
      </div>
      <FormFileInput />
      <div>
        <FormSelect labelText="房源類型" name="roomType" list={roomTypes} />
        <FormTextarea
          name="description"
          labelText="房源描述"
          des="新增您房源的描述。"
        />
      </div>
      <div className="lg:col-span-2">
        <PerksContainer
          labelText="公共設施"
          title="perks"
          des="請選擇房源所提供的設施。"
          options={perkOptions}
        />
      </div>
      <div className="lg:col-span-2">
        <PerksContainer
          title="surroundingEnv"
          labelText="周邊環境"
          des="請選擇房源周邊環境。"
          options={envOptions}
        />
      </div>
      <FormTextarea
        required={false}
        name="extraInfo"
        labelText="更多資訊"
        des="住宿規則，注意事項等等。"
      />

      <div>
        <h2 className="text-2xl">入住時間 / 退房時間</h2>
        <p className="text-sm text-gray-400">
          填寫入住及退房時間，記得預留時間在退房後整理房間。
        </p>
        <div className="grid sm:grid-cols-2 gap-1 items-end">
          <FormInput
            inputError={errorArr?.includes("checkInTime should be 0 to 24.")}
            des="請輸入 0 至 24 表示時間"
            classValue="text-md"
            type="number"
            name="checkInTime"
            labelText="入住時間"
          />
          <FormInput
            inputError={errorArr?.includes("checkOutTime should be 0 to 24.")}
            des="請輸入 0 至 24 表示時間"
            classValue="text-md"
            type="number"
            name="checkOutTime"
            labelText="退房時間"
          />
          <FormInput
            classValue="text-md"
            type="number"
            name="maxGuests"
            labelText="最多可訂房人數"
          />
          <FormInput
            classValue="text-md"
            type="number"
            name="price"
            labelText="每晚價格"
            placeHolder="TWD"
          />
        </div>
      </div>
      <Link
        to="../places"
        className="absolute top-0 right-0 p-3 hover:text-primary text-gray-500"
      >
        <MdOutlineClose className="text-2xl" />
      </Link>
      <button
        disabled={isSubmitting ? true : false}
        type="submit"
        className="primary self-end"
      >
        {isSubmitting ? "處理中..." : "確認"}
      </button>
    </Form>
  );
};
export default AddPlaceForm;
