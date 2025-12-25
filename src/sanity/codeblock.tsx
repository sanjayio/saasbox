"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value: {
    code: string;
    language: string;
  };
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        showLineNumbers={true}
        showInlineLineNumbers={true}
        language={language}
        style={tomorrowNightBright}
        customStyle={{
          padding: "1em",
          marginBottom: "2em",
        }}
      >
        {code}
      </SyntaxHighlighter>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleCopy}
      >
        <Copy className="size-4" />
      </Button>
    </div>
  );
};

export default CodeBlock;
