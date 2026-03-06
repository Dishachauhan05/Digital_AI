"use client";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data); // Save API response
    } catch (err) {
      console.error(err);
      setResponse({ error: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-white">Upload File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-900 text-white">
          {response.error ? (
            <p><strong>Error:</strong> {response.error}</p>
          ) : (
            <>
              <p><strong>Message:</strong> {response.message}</p>
              <p><strong>Category:</strong> {response.category}</p>
              {response.summary && <p><strong>Summary:</strong> {response.summary}</p>}
              <p><strong>Final Path:</strong> {response.finalPath}</p>
              <p><strong>Duplicate:</strong> {response.isDuplicate ? "Yes" : "No"}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}