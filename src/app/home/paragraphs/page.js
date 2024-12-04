"use client";

export default function DynamicParagraphs({ paragraphs = [] }) {
  return (
    <div className="h-96 overflow-y-scroll scrollbar-hide">
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          className={`flex mb-5 w-full ${
            paragraph.emitter === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-l font-medium focus:border-blue-900 focus:ring-blue-900 w-auto overflow-scroll overscroll-auto p-3 rounded text-white ${
              paragraph.emitter === "user" ? "bg-[#1e1b4b]" : "bg-[#4a044e]"
            }`}
          >
            {paragraph.text}
          </div>
        </div>
      ))}
    </div>
  );
}
