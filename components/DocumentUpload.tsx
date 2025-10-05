import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DocumentUploadProps {
  onUpload: (text: string) => Promise<void>;
}

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [uploadText, setUploadText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!uploadText.trim()) return;
    
    setIsUploading(true);
    try {
      await onUpload(uploadText);
      setUploadText("");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="mb-8 bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Upload Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Textarea
            value={uploadText}
            onChange={(e) => setUploadText(e.target.value)}
            placeholder="Paste your document content here..."
            rows={4}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleUpload}
            disabled={isUploading || !uploadText.trim()}
            className="bg-[#0248F7] hover:bg-[#0238d1] text-white"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
