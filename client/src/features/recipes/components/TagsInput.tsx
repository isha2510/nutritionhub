/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateTagMutation, useGetAllTagsQuery, TagResponse } from "../api/tagsApi";
import ReactSelectCreatable from "react-select/creatable";
import { InputRecipeTag, Tag } from "../types/state";
import { useMemo, useEffect, useState, useCallback } from "react";

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
  const { data: allTags, isSuccess: tagsLoaded } = useGetAllTagsQuery();
  const [createTag] = useCreateTagMutation();
  const [pendingTagLabels, setPendingTagLabels] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<InputRecipeTag[]>([]);

  // Initialize selected options from defaultTags on component mount
  useEffect(() => {
    if (defaultTags?.length) {
      setSelectedOptions(transformTagToOption(defaultTags));
    }
  }, []);

  // Update existing tags whenever all tags are fetched/refetched
  useEffect(() => {
    if (tagsLoaded && allTags) {
      // Create a map of tag label to tag object for quick lookup
      const tagMap = new Map<string, Tag>();
      allTags.forEach(tag => tagMap.set(tag.tag.toLowerCase(), tag));
      
      // Update any selected options with proper IDs if they were pending
      const updatedOptions = selectedOptions.map(option => {
        // If option has a non-ObjectId value, try to find it in fetched tags
        if (option.label && pendingTagLabels.has(option.label.toLowerCase())) {
          const matchedTag = tagMap.get(option.label.toLowerCase());
          if (matchedTag && matchedTag._id) {
            console.log(`Found proper ID for tag "${option.label}": ${matchedTag._id}`);
            // Clear this tag from pending list
            setPendingTagLabels(prev => {
              const updated = new Set(prev);
              updated.delete(option.label.toLowerCase());
              return updated;
            });
            // Return option with proper ID
            return {
              ...option,
              value: matchedTag._id
            };
          }
        }
        return option;
      });
      
      // If options were updated, update state and parent component
      if (JSON.stringify(updatedOptions) !== JSON.stringify(selectedOptions)) {
        setSelectedOptions(updatedOptions);
        
        // Update parent with tags containing proper IDs
        const updatedTags = updatedOptions.map(opt => ({
          _id: opt.value || undefined,
          tag: opt.label
        }));
        setTag(updatedTags);
      }
    }
  }, [allTags, tagsLoaded, pendingTagLabels, selectedOptions, setTag]);

  // Memoize available tag options
  const availableTagOptions = useMemo(() => {
    return allTags ? transformTagToOption(allTags) : [];
  }, [allTags]);

  // Create a new tag on the server
  const handleCreateTag = useCallback((tagLabel: string) => {
    const normalizedLabel = tagLabel.trim();
    if (!normalizedLabel) return;
    
    console.log(`Creating new tag: ${normalizedLabel}`);
    // Track this tag as pending
    setPendingTagLabels(prev => {
      const updated = new Set(prev);
      updated.add(normalizedLabel.toLowerCase());
      return updated;
    });
    
    // Create tag on server
    createTag({ tag: normalizedLabel });
  }, [createTag]);

  // Handle selection changes
  const handleChange = useCallback((newValue: readonly any[], actionMeta: any) => {
    const updatedOptions = [...newValue] as InputRecipeTag[];
    setSelectedOptions(updatedOptions);
    
    // Handle new tag creation
    if (actionMeta.action === 'create-option' && actionMeta.option?.__isNew__) {
      handleCreateTag(actionMeta.option.label);
    }
    
    // Always pass current selection to parent with best available IDs
    const currentTags = updatedOptions.map(opt => ({
      _id: opt.value || undefined,
      tag: opt.label
    }));
    
    setTag(currentTags);
  }, [setTag, handleCreateTag]);

  return (
    <div className="tags-input dark:bg-form-input text-black">
      <ReactSelectCreatable
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        options={availableTagOptions}
        onChange={handleChange}
        isMulti
        value={selectedOptions}
        formatCreateLabel={(input) => `Create "${input}"`}
      />
    </div>
  );
};

export default TagsInput;
