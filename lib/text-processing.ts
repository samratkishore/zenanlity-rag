export function chunkText(text: string, maxChunkSize: number = 1000, overlap: number = 200): string[] {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxChunkSize;
    
    // If this isn't the last chunk, try to break at a sentence boundary
    if (end < text.length) {
      const nextPeriod = text.indexOf('.', end - 100);
      const nextNewline = text.indexOf('\n', end - 100);
      
      if (nextPeriod > end - 100 && nextPeriod < end + 100) {
        end = nextPeriod + 1;
      } else if (nextNewline > end - 100 && nextNewline < end + 100) {
        end = nextNewline + 1;
      }
    }

    chunks.push(text.slice(start, end).trim());
    
    // Move start position with overlap
    start = end - overlap;
    
    // Ensure we don't go backwards
    if (start >= end) {
      start = end;
    }
  }

  return chunks.filter(chunk => chunk.length > 0);
}

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
    .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single newline
    .trim();
}

export function extractTextFromContent(content: string): string {
  // Basic text extraction - can be extended for different file types
  return cleanText(content);
}
