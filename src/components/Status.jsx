function Status({ image }) {
  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      {image ? (
        <p>
          ✅ Dieline uploaded. Sample straight-tuck carton layout loaded and converted into 3D panels.
        </p>
      ) : (
        <p>Upload the sample dieline PNG/PDF to start.</p>
      )}
    </div>
  );
}

export default Status;