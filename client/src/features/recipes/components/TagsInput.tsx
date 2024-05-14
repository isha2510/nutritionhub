/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useRef } from "react";
import Select from "react-select";
import { useCreateTagMutation, useGetAllTagsQuery } from "../api/tagsApi";
import { debounce } from "../../../app/utility";

interface tagsInputProps {
  setTag: (tags: string[]) => void;
}

const TagsInput = ({ setTag }: tagsInputProps) => {
  const { data } = useGetAllTagsQuery();
  const [inputValue, setInputValue] = useState("");
  const prevSelectedOptionRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOption, setSelectedOption] = useState<any>([]);
  const [createTag] = useCreateTagMutation();
  const availableTags = data?.map((res) => ({
    value: res._id,
    label: res.tag,
  }));

  console.log(availableTags);
  const handleInputChange = debounce((newValue: string) => {
    setInputValue(newValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, 1000);

  const handleAddTag = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTag = { value: inputValue, label: inputValue }; // Create tag object
      setSelectedOption([...selectedOption, newTag]); // Add the new tag to selectedOption
      createTag({ tag: inputValue }); // Call the createTag mutation
      setInputValue(""); // Clear input value
    }
  };

  const handleBlur = () => {
    if (prevSelectedOptionRef.current !== selectedOption) {

      const newTags = selectedOption.filter(
        (tag: any) =>
          !prevSelectedOptionRef?.current?.find(
            (prevTag: { value: any }) => prevTag.value === tag.value,
          ),
      );
      if (newTags.length > 0) {
        const arr = newTags.map((val: { value: string }) => val.value);
        setTag(arr); // Call setTag with new tags only
      }
      prevSelectedOptionRef.current = selectedOption;
    }
  };
  return (
    <div className="tags-input">
      <Select
        isMulti
        value={selectedOption}
        onChange={(selectedTags) => {
          setSelectedOption(selectedTags);
          //   setTag(selectedTags);
        }}
        options={availableTags?.map((val) => ({
          value: val.value,
          label: val.label,
        }))}
        onInputChange={handleInputChange}
        placeholder="Add tags..."
        onBlur={handleBlur}
      />
      <button onClick={handleAddTag}>➕</button>
      {/* {availableTags?.map((tag) => (
        <span key={tag._id} className="tag">
          {tag.tag}
        </span>
      ))} */}
    </div>
  );
};

export default TagsInput;
