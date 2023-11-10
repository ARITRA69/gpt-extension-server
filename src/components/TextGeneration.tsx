"use client";
import React, { useState } from "react";

function TextGeneration() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function fetchData() {
    try {
      if (input) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer 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",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: input }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("API Response:", result);

          if (Array.isArray(result) && result.length > 0) {
            const generatedText = result[0].generated_text;
            if (generatedText !== undefined) {
              const generatedTextWithoutInput = generatedText
                .replace(input, "")
                .trim();
              setOutput(generatedTextWithoutInput);
            } else {
              console.error("Generated text is undefined.");
            }
          } else {
            console.error("API response format is not as expected.");
          }
        } else {
          console.error("Request failed with status: " + response.status);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div>
      <textarea
        placeholder="Enter your input text here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-2 border rounded text-black input-text"
      />
      <div className="mt-4">
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate
        </button>
        <button
          onClick={() => setInput("")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>
      {output && (
        <div className="mt-4 text-black">
          <h2>Generated Text:</h2>
          <p className="p-2 border rounded api-text">{output}</p>
        </div>
      )}
    </div>
  );
}

export default TextGeneration;
