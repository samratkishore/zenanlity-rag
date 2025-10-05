"use client";
import { useState } from "react";
import DocumentUpload from "@/components/DocumentUpload";
import ChatInterface from "@/components/ChatInterface";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleUpload = async (text: string) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        setUploadStatus("Document uploaded successfully!");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus("Failed to upload document");
        setTimeout(() => setUploadStatus(""), 3000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Error uploading document");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            ZenAnlity RAG App
          </h1>
          
          {/* Status Message */}
          {uploadStatus && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              uploadStatus.includes("successfully") 
                ? "bg-[#E1FF01] text-black" 
                : "bg-red-600 text-white"
            }`}>
              {uploadStatus}
            </div>
          )}
          
          {/* Document Upload Section */}
          <DocumentUpload onUpload={handleUpload} />

          {/* Chat Interface */}
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
