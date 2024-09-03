import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./drag-drop.css";

interface Props {
  onFilesSelected: (file: File | null) => void
}

const DragNdrop = ({
  onFilesSelected
}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0]); 
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  useEffect(() => {
    onFilesSelected(file);
  }, [file, onFilesSelected]);

  return (
    <section className="drag-drop">
    <div
      className={`document-uploader ${file ? "upload-box active" : "upload-box"}`}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="upload-info">
        <AiOutlineCloudUpload />
        <div>
          <p>Drag and drop your file here</p>
          <p>Limit 15MB per file. Supported files: .WAV or .MP3</p>
        </div>
      </div>
      <input
        type="file"
        hidden
        id="browse"
        onChange={handleFileChange}
        accept=".wav,.mp3"
      />
      <label htmlFor="browse" className="browse-btn">
        <p className="browse-btn-parrafo">Buscar archivo</p>
      </label>

      {file && (
        <div className="file-list">
          <div className="file-item">
            <div className="file-info">
              <p>{file.name}</p>
            </div>
            <div className="file-actions">
              <MdClear onClick={handleRemoveFile} />
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="success-file">
          <AiOutlineCheckCircle style={{ color: "#6DC24B", marginRight: 1 }} />
          <p>File selected</p>
        </div>
      )}
    </div>
  </section>
  );
};

export default DragNdrop;