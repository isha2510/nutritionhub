
interface CustomListProps {
  listItems?: string[];
  className?: string;
}

const CustomList = ({ listItems, className }: CustomListProps) => {
  return (
    <>
    {/* TODO: create the delete records from listItems based on index */}
      {(listItems && listItems.length !== 0) &&
        <div className={`${className || 'w-full outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:focus:border-primary overflow-y-auto'}`}>
          <ul className="flex flex-col">
            {listItems.map((ing, index) =>
              <li className="flex items-center gap-2.5 border-b border-stroke py-3 last:border-b-0 dark:border-strokedark" key={index}>
                <span className="flex h-6.5 w-full max-w-6.5 items-center justify-center rounded-full bg-primary text-white">
                  {index + 1}
                </span>
                <span> {ing} </span>
              </li>
            )}
          </ul>
        </div>
      }
    </>
  );
};

export default CustomList;
