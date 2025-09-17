import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";

export default function CopyBox({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex">
      <Input
        type="text"
        value={value}
        readOnly
        autoFocus
        onFocus={(e) => e.target.select()}
        className="rounded-r-none bg-gray-50 font-mono text-sm"
      />
      <Button
        type="button"
        variant="outline"
        className="rounded-l-none border-l-0 px-3"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
