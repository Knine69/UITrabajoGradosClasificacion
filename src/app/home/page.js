"use client";
import FilesUploader from "./uploader/page.js";
import DynamicParagraphs from "./paragraphs/page.js";
import { useState } from "react";
import { constantVariables } from "./constants/constants.js";

export default function HomePage() {
  const [paragraphs, setParagraphs] = useState([
    { text: "Please ask your questions!", emitter: "checker" },
  ]);

  const [selectedOption, setSelectedOption] = useState("quimica");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    try {
      setParagraphs((prevParagraphs) => [
        ...prevParagraphs,
        { text: formValues.search, emitter: "user" },
      ]);
      const response = await fetch(
        `${constantVariables.CHROMA_DOMAIN}${constantVariables.CHROMA_MAKE_QUERY_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collection_name: constantVariables.COLLECTION_NAME,
            category: formValues.category.toLowerCase(),
            user_query: formValues.search,
          }),
        }
      );

      formValues.search = "";

      // Initialize variables for streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let bufferedChunk = ""; // Buffer for partial chunks
      let done = false;

      const newParagraphs = [];

      while (!done) {
        // Read a chunk
        const { value, done: isDone } = await reader.read();
        done = isDone;

        if (value) {
          // Decode the chunk
          bufferedChunk += decoder.decode(value, { stream: true });

          // Split events by the double newline delimiter
          const events = bufferedChunk.split("\n\n");

          // Process all complete events except the last one (it may be incomplete)
          for (let i = 0; i < events.length - 1; i++) {
            const event = events[i];

            if (event.startsWith("data:")) {
              try {
                const jsonData = event.replace("data: ", "").trim();
                const parsedData = JSON.parse(jsonData);

                console.log("Received data:", parsedData);

                // Error during outer layer of event processing
                if (parsedData.state === "ERROR") {
                  newParagraphs.push({
                    text: JSON.parse(parsedData.message),
                    emitter: constantVariables.CHECKER_EMITTER,
                  });
                }

                if (parsedData.state === "SUCCESS") {
                  // Error during request processing
                  if (parsedData.result.STATE === "ERROR") {
                    newParagraphs.push({
                      text: parsedData.result.DESCRIPTION,
                      emitter: constantVariables.CHECKER_EMITTER,
                    });
                  }
                  // Possible response based on LLM output
                  if (parsedData.result.STATE === "SUCCESS") {
                    newParagraphs.push({
                      text: parsedData.result.RESPONSE_DATA.STATE
                        ? JSON.parse(parsedData.result.RESPONSE_DATA.RESPONSE)
                        : parsedData.result.RESPONSE_DATA.DESCRIPTION,
                      emitter: constantVariables.CHECKER_EMITTER,
                    });
                  }

                  if (parsedData.result.STATE === true) {
                    newParagraphs.push({
                      text:
                        typeof parsedData.result.RESPONSE === "string"
                          ? parsedData.result.RESPONSE
                          : JSON.parse(parsedData.result.RESPONSE),
                      emitter: constantVariables.CHECKER_EMITTER,
                    });
                  }
                }
              } catch (error) {
                console.error("Error parsing JSON:", error.message);
              }
            }
          }

          // Keep the last part of the chunk (it may be incomplete)
          bufferedChunk = events[events.length - 1];
        }
      }

      // Handle any leftover buffered data
      if (bufferedChunk.trim() && bufferedChunk.startsWith("data:")) {
        try {
          const jsonData = bufferedChunk.replace("data: ", "").trim();
          const parsedData = JSON.parse(jsonData);
          console.log("Final chunk received data:", parsedData);

          if (parsedData.state === "SUCCESS") {
            newParagraphs.push({
              text: parsedData.result?.RESPONSE,
              emitter: constantVariables.CHECKER_EMITTER,
            });
          }
        } catch (error) {
          console.error("Error parsing final JSON chunk:", error.message);
        }
      }

      console.log("Final paragraphs:", newParagraphs);

      setParagraphs((prevParagraphs) => [...prevParagraphs, ...newParagraphs]);
    } catch (error) {
      console.error("Error during fetch or streaming:", error);
    }
  }

  function handleChangeSelect(e) {
    setSelectedOption(e.currentTarget.value);
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
          <select
            onChange={handleChangeSelect}
            name="category"
            className="text-[#6366f1] rounded-md ml-1"
          >
            <option value="quimica">Quimica</option>
            <option value="control">Control</option>
            <option value="electronica">Electronica</option>
            <option value="robotica">Robotica</option>
            <option value="electrica">Electrica</option>
            <option value="mecanica">Mecanica</option>
          </select>
        </div>
      </form>

      <DynamicParagraphs paragraphs={paragraphs} />
    </div>
  );
}
