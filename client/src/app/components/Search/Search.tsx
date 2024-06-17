import { ChangeEvent } from "react";
import { debounce } from "../../utility";

interface SearchProps {
  getSearchText: (text: string) => void;
}
const Search = ({ getSearchText }: SearchProps) => {
  const handleChnage = debounce(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      getSearchText(e.target.value);
    },
    1000,
  );
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search recipes..."
        className="px-3 py-2"
        onChange={handleChnage}
      />
    </div>
  );
};
export default Search;
