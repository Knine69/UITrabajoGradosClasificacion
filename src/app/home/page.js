import FilesUploader from "./uploader/page.js"
import DynamicParagraphs from "./paragraphs/page.js";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FilesUploader />
      {/* Searchbar component */}
      <form className="w-full flex justify-center">
        <div className="flex w-3/6">
          <label className="relative block text-[#6366f1] w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 w-full bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-blue-700 focus:ring-blue-700 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
      </form>

      <DynamicParagraphs />
    </div>
  );
}
