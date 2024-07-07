/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateTagMutation, useGetAllTagsQuery } from "../api/tagsApi";
import ReactSelectCreatable from "react-select/creatable";
import { InputRecipeTag, Tag } from "../types/state";
import { useMemo } from "react";

interface tagsInputProps {
  setTag: (tags: Tag[]) => void;
  defaultTags?: Tag[];
}

const transformTagToOption = (tags: Tag[]): InputRecipeTag[] => {
  return tags.map((tag) => ({
    value: tag._id,
    label: tag.tag,
  }));
};

const TagsInput = ({ setTag, defaultTags = [] }: tagsInputProps) => {
  const { data } = useGetAllTagsQuery();
  const [createTag] = useCreateTagMutation();

  // Memoize options to avoid re-rendering on every render
  const availableTags = useMemo(() => {
    if (!data) return [];
    return transformTagToOption(data);
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputChange = (newValue: readonly any[], _actionMeta: any) => {
    newTag(newValue);
    const tags = newValue.map((t) => ({ _id: t.value, tag: t.label }));
    setTag(tags);
  };

  const newTag = (val: readonly InputRecipeTag[]) => {
    for (const tag of val) {
      if (tag?.__isNew__) {
        createTag({ tag: tag?.label });
      }
    }
  };

  return (
    <div className="tags-input dark:bg-form-input text-black">
      <ReactSelectCreatable
        className="my-react-select-container"
        classNamePrefix={"my-react-select"}
        options={availableTags}
        onChange={handleInputChange}
        isMulti
        value={transformTagToOption(defaultTags)}
      />
    </div>
  );
};

export default TagsInput;
