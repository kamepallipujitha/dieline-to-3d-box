import { useState } from "react";
import Scene from "./components/Scene";
import Upload from "./components/Upload";
import { parseDielineFile } from "./utils/dielineParser";

function App() {
  const [fold, setFold] = useState(0);
  const [dieline, setDieline] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(file) {
    setLoading(true);
    setFold(0);

    try {
      const parsed = await parseDielineFile(file);
      setDieline(parsed);
    } catch (error) {
      alert("Could not parse this file. Please upload a clear PNG/JPG/PDF dieline.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1f2937" }}>
        2D Dieline → 3D Folding Box
      </h1>

      <p style={{ textAlign: "center", color: "#666" }}>
        Upload a PNG/JPG/PDF dieline. The app detects fold-line spacing and
        generates a matching 3D carton.
      </p>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Upload onFileUpload={handleUpload} />

        {loading && <p>Parsing dieline...</p>}

        {dieline && (
          <>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✓ Dieline parsed successfully
              <br />
              Image: {Math.round(dieline.imageWidth)} ×{" "}
              {Math.round(dieline.imageHeight)} px
              <br />
              Box Dimensions: W {dieline.box.width.toFixed(2)} × H{" "}
              {dieline.box.height.toFixed(2)} × D{" "}
              {dieline.box.depth.toFixed(2)}
            </p>

            <label style={{ fontWeight: "bold", fontSize: "18px" }}>
              Fold Progress: {fold}%
            </label>

            <br />

            <input
              type="range"
              min="0"
              max="100"
              value={fold}
              onChange={(e) => setFold(Number(e.target.value))}
              style={{ width: "350px" }}
            />

            <button
              onClick={() => setFold(0)}
              style={{ marginLeft: "15px", padding: "6px 12px" }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      {dieline && (
        <>
          <div
            style={{
              width: "360px",
              margin: "20px auto",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              background: "#fff",
              textAlign: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,.1)",
            }}
          >
            <h3>Uploaded Dieline</h3>

            <img
              src={dieline.imageUrl}
              alt="uploaded dieline"
              width="320"
              style={{ borderRadius: "8px" }}
            />
          </div>

          <Scene fold={fold} dieline={dieline} />
        </>
      )}
    </div>
  );
}

export default App;