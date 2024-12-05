"use client";
import FilesUploader from "./uploader/page.js"
import DynamicParagraphs from "./paragraphs/page.js";
import { useState } from "react";
import { constantVariables } from "./constants/constants.js";

export default function HomePage() {

  const [paragraphs, setParagraphs] = useState([
    { text: 'Please ask your questions!', emitter: 'checker' },
  ]);

  const [selectedOption, setSelectedOption] = useState('quimica')

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries());
    try {

      setParagraphs(prevParagraphs => [...prevParagraphs, {"text": formValues.search, "emitter": "user"}]);
      const response = await fetch(`${constantVariables.CHROMA_DOMAIN}${constantVariables.CHROMA_MAKE_QUERY_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "collection_name": constantVariables.COLLECTION_NAME,
          "category": formValues.category.toLowerCase(),
          "user_query": formValues.search
        })
      });

      formValues.search = ''

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let { done, value } = await reader.read();
      const newParagraphs = []
      while (!done) {
        const chunk = decoder.decode(value, { stream: true });
        const events = chunk.split("\n\n");

        events.forEach(event => {
          if (event.startsWith("data:")) {
            const jsonData = event.replace("data: ", "");
            const parsedData = JSON.parse(jsonData);
            // console.log("Received data:", parsedData);
            newParagraphs.push(
              {
                "text": parsedData.result.STATUS === "SUCCESS" ? parsedData.result.RESPONSE_DATA.DESCRIPTION.RESPONSE : parsedData.result.DESCRIPTION,
                "emitter": constantVariables.CHECKER_EMITTER
              }  
            );
          }
        });
        
        ({ done, value } = await reader.read());
      }

      setParagraphs(prevParagraphs => [...prevParagraphs, ...newParagraphs]);
    } catch (error) {
      console.error('Error during fetch or streaming:', error);

      /* Simulation response

      let response = prompt("Response received from Backend: ")
      if (response.length > 0) {
        setParagraphs(previous => [...previous, { text: response, emitter: constantVariables.CHECKER_EMITTER }])
      }
        */
    }
  }

  function handleChangeSelect(e) {
    setSelectedOption(e.currentTarget.value)
  }


  return (
    <div className="flex flex-col items-center justify-center">
      <FilesUploader selectedCategory={selectedOption} />
      {/* Searchbar component */}
      <form className="w-full flex justify-center" onSubmit={handleFormSubmit}>
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
          <select onChange={handleChangeSelect} name="category" className="text-[#6366f1] rounded-md ml-1">
            <option value="quimica">Quimica</option>
            <option value="control">Control</option>
            <option value="electronica">Electronica</option>
            <option value="robotica">Robotica</option>
            <option value="electrica">Electrica</option>
            <option value="mecanica">Mecanica</option>
          </select>
        </div>
      </form>

      <DynamicParagraphs paragraphs={paragraphs}/>
    </div>
  );
}
