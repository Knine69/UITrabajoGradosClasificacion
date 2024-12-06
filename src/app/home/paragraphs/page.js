"use client";

export default function DynamicParagraphs({ paragraphs = [] }) {
  return (
    <div className="flex flex-col mb-0.5 mt-5 dark:bg-slate-600 shadow-2xl w-5/6 rounded-md p-8">
      <div className=" h-96 overflow-y-scroll no-scrollbar">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className={`flex mb-5 w-full ${
              paragraph.emitter === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`text-l font-medium focus:border-blue-900 focus:ring-blue-900 w-auto overflow-y-scroll no-scrollbar p-3 rounded text-white ${
                paragraph.emitter === "user" ? "bg-[#1e1b4b]" : "bg-[#4a044e]"
              }`}
            >
              {paragraph.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
