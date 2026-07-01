function Upload({ onFileUpload }) {
  function handleChange(event) {
    const file = event.target.files[0];

    if (file) {
      onFileUpload(file);
    }
  }

  return (
    <input
      type="file"
      accept=".png,.jpg,.jpeg,.pdf"
      onChange={handleChange}
    />
  );
}

export default Upload;