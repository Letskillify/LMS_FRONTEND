import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaBook, FaChevronRight } from "react-icons/fa";
import "./css/ncert.css";

const Chapters = ({ subjectData, setView }) => {
  const chapters = subjectData?.chapters;
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleViewClick = (chapter) => {
    if (!chapter?.downloadLink) {
      console.error("No download link available");
      return;
    }
    window.open(chapter.downloadLink, "_blank", "noopener,noreferrer");
  };

  const handleDownloadClick = (chapter) => {
    if (!chapter?.downloadLink) {
      console.error("No download link available");
      return;
    }

    window.open(
      `/api/download/link?url=${encodeURIComponent(
        chapter.downloadLink
      )}&name=${subjectData.bookName}:${chapter.title}`,
      "_blank"
    );
  };

  const handleDownloadAllInZipClick = async () => {
    if (!chapters || chapters.length === 0) {
      console.error("No chapters available to download");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const response = await fetch("/api/download/multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          downloadLinks: chapters.map((chapter) => ({
            url: chapter.downloadLink,
            name: `${subjectData.bookName}-${chapter.title}`,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to download files");

      const contentLength = response.headers.get("Content-Length");
      if (!contentLength) throw new Error("Unable to determine file size");

      const reader = response.body.getReader();
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks, { type: "application/zip" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${subjectData.bookName}-All_Chapters.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAllInPdfClick = async () => {
    if (!chapters || chapters.length === 0) {
      console.error("No chapters available to download");
      return;
    }

    setLoading(true);
    setProgress(0);

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];

      try {
        const response = await fetch(
          `/api/download/link?url=${encodeURIComponent(
            chapter.downloadLink
          )}&name=${encodeURIComponent(
            subjectData.bookName
          )}-${encodeURIComponent(chapter.title)}`
        );

        if (!response.ok)
          throw new Error(`Failed to download ${chapter.title}`);

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${subjectData.bookName}-${chapter.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setProgress(((i + 1) / chapters.length) * 100);
      } catch (error) {
        console.error("Download failed for:", chapter.title, error);
      }
    }

    setLoading(false);
  };

  return (
    <div className="container my-4 pb-5">
      {loading && (
        <div className="backdrop">
          <div className="loader"></div>
          <p>Downloading {Math.round(progress)}%</p>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold">{subjectData?.bookName}</h2>
          <h4 className="text-muted">{subjectData?.bookTitle}</h4>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <Button variant="primary" onClick={() => setView("subjects")}>
            Back to Subjects
          </Button>
          <Button
            variant="success"
            onClick={() => handleDownloadAllInZipClick()}
          >
            Download All in Zip
          </Button>
          <Button
            style={{ backgroundColor: "red", border: "none" }}
            onClick={() => handleDownloadAllInPdfClick()}
          >
            Download All in Pdf
          </Button>
        </div>
      </div>

      <div className="card p-3 shadow-sm">
        {chapters?.map((chapter, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border-bottom py-3"
          >
            <div>
              <h5
                onClick={() => handleViewClick(chapter)}
                className="fw-bold text-primary chapter-name"
              >
                {chapter?.title}
              </h5>
              <div className="d-flex align-items-center text-muted">
                <FaBook className="me-2" />
                <span
                  className="cursor-pointer"
                  onClick={() => handleViewClick(chapter)}
                >
                  View Chapter
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span
                onClick={() => handleDownloadClick(chapter)}
                className="d-flex align-items-center justify-center w-100 h-100 gap-2 cursor-pointer badge bg-success"
              >
                Downlod
                <i class="fa fa-download" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
