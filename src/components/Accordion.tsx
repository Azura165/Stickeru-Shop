import React from "react";

export default function Accordion({ text }: { text: string }) {
  // Simple heuristic parser to split text into Title & Content
  const paragraphs = text.split("\n\n").filter((p) => p.trim() !== "");
  const blocks = paragraphs.length > 1 ? paragraphs : text.split("\n").filter(p => p.trim() !== "");

  const items = blocks.map((block) => {
    const lines = block.split("\n").filter(l => l.trim() !== "");
    if (lines.length > 1) {
      return { title: lines[0], content: lines.slice(1).join("\n") };
    } else {
      const words = block.split(" ");
      if (words.length > 5) {
        return { title: words.slice(0, 4).join(" ") + "...", content: block };
      }
      return { title: block, content: block };
    }
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <style dangerouslySetInnerHTML={{ __html: `
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
        details[open] summary .accordion-icon::before {
          content: "−";
        }
        details summary .accordion-icon::before {
          content: "+";
        }
      `}} />
      
      {items.map((item, index) => (
        <details 
          key={index}
          className="group bg-white overflow-hidden transition-all duration-300"
          style={{ 
            border: "3px solid #1e1b4b", 
            boxShadow: "5px 5px 0px 0px #1e1b4b",
            borderRadius: "8px",
          }}
        >
          <summary 
            className="w-full flex justify-between items-center p-4 text-left cursor-pointer outline-none group-open:bg-[#ede9fe]"
            style={{ borderBottom: "3px solid transparent" }}
          >
            <span className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>{item.title}</span>
            <span className="accordion-icon font-bold text-xl" style={{ color: "#6d28d9" }}></span>
          </summary>
          
          <div 
            className="p-4" 
            style={{ borderTop: "3px solid #1e1b4b" }}
          >
            <p className="text-sm" style={{ color: "#1e1b4b", lineHeight: 1.7 }}>
              {item.content}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
