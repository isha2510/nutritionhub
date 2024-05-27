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
      {/* <button className="bg-transparent m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 2a8 8 0 016.32 12.9l4.387 4.387a1 1 0 01-1.415 1.415l-4.387-4.387A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
          />
        </svg>
      </button> */}
    </div>
  );
};
export default Search;
