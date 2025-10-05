import ChatMessage from "./ChatMessage";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; id: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: "user" as const, content: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          const assistantMessage = { role: "assistant" as const, content: data.text, id: (Date.now() + 1).toString() };
          setMessages(prev => [...prev, assistantMessage]);
        }
      } else {
        console.error('Chat API error:', response.status);
        const assistantMessage = { role: "assistant" as const, content: "Sorry, I encountered an error. Please try again.", id: (Date.now() + 1).toString() };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error completing:", error);
      const assistantMessage = { role: "assistant" as const, content: "Sorry, I encountered an error. Please try again.", id: (Date.now() + 1).toString() };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
    
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Chat with Your Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#E1FF01] text-black px-4 py-2 rounded-lg">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything about your documents..."
            disabled={isLoading}
            className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#0248F7] hover:bg-[#0238d1] text-white"
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
