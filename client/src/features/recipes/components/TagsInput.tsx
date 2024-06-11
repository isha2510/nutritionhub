/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useCreateTagMutation, useGetAllTagsQuery } from "../api/tagsApi";
import { debounce } from "../../../app/utility";
import ReactSelectCreatable from "react-select/creatable";
import { InputRecipeTag, Tag } from "../types/state";

interface tagsInputProps {
  setTag: (tags: Tag[]) => void;
}

const TagsInput = ({ setTag }: tagsInputProps) => {
  const { data } = useGetAllTagsQuery();
  const [inputValue, setInputValue] = useState<InputRecipeTag[]>([]);
  const [createTag] = useCreateTagMutation();
  const availableTags = data?.map((res) => ({
    value: res._id,
    label: res.tag,
  }));
  const handleInputChange = debounce((newValue: []) => {
    setInputValue(newValue);
  }, 1000);

  const newTag = () => {
    for (const tag of inputValue) {
      if (tag?.__isNew__) {
        createTag({ tag: tag?.label });
      }
    }
  };

  useEffect(() => {
    newTag();
  }, [inputValue]);

  const handleBlur = () => {
    const arr = inputValue.map((val: { value: string }) => ({
      tag: val.value,
    }));
    setTag(arr);
  };
  return (
    <div className="tags-input">
      <ReactSelectCreatable
        options={availableTags?.map((val) => ({
          value: val.value,
          label: val.label,
        }))}
        onChange={handleInputChange}
        isMulti
        onBlur={handleBlur}
      />
    </div>
  );
};

export default TagsInput;
