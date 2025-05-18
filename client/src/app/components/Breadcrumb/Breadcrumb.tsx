import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
  prevPath: string | null;
}
const Breadcrumb = ({ pageName, prevPath }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to={`/dashboard`}>
              Dashboard /
            </Link>
          </li>
          {prevPath && (
            <Link className="font-medium" to={`/${prevPath}`}>
              {prevPath.length > 0 ? prevPath.charAt(0).toUpperCase() + prevPath.slice(1) : prevPath} /
            </Link>
          )}
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
