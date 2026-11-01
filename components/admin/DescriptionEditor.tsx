"use client";

import { useState, useRef } from "react";
import { ProductDescription } from "@/components/ProductDescription";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Eye,
  PenLine,
  Pilcrow,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
};

export function DescriptionEditor({
  value,
  onChange,
  label = "Description",
  className,
}: DescriptionEditorProps) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function wrapSelection(before: string, after: string = "", defaultText = "text") {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const textToWrap = selected || defaultText;

    const updated =
      value.slice(0, start) + before + textToWrap + after + value.slice(end);
    onChange(updated);

    // Reposition cursor and refocus
    setTimeout(() => {
      textarea.focus();
      const newCursorStart = start + before.length;
      const newCursorEnd = newCursorStart + textToWrap.length;
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
    }, 0);
  }

  function insertHeading(prefix: "## " | "### ") {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const text = selected || (prefix === "## " ? "Section Heading" : "Subsection Heading");

    const linePrefix = start === 0 || value[start - 1] === "\n" ? "" : "\n\n";
    const lineSuffix = "\n\n";

    const updated =
      value.slice(0, start) + linePrefix + prefix + text + lineSuffix + value.slice(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + linePrefix.length + prefix.length;
      textarea.setSelectionRange(newStart, newStart + text.length);
    }, 0);
  }

  function insertList(isOrdered = false) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);

    let listText = "";
    if (selected) {
      const lines = selected.split("\n");
      listText = lines
        .map((l, i) => (isOrdered ? `${i + 1}. ${l.trim()}` : `- ${l.trim()}`))
        .join("\n");
    } else {
      listText = isOrdered
        ? "1. First specification\n2. Second specification\n3. Third specification"
        : "- High-durability terry construction\n- Commercial laundry wash certified\n- Ultra-absorbent combed cotton";
    }

    const linePrefix = start === 0 || value[start - 1] === "\n" ? "" : "\n\n";
    const lineSuffix = "\n\n";

    const updated =
      value.slice(0, start) + linePrefix + listText + lineSuffix + value.slice(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + linePrefix.length;
      textarea.setSelectionRange(newStart, newStart + listText.length);
    }, 0);
  }

  function insertParagraphBreak() {
    wrapSelection("\n\n", "", "");
  }

  return (
    <div className={cn("mt-4 space-y-2", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="font-body text-sm font-medium text-taupe">{label}</label>

        {/* View Mode Tabs */}
        <div className="flex items-center rounded-md border border-hairline bg-oat/60 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 font-body font-medium transition-colors",
              tab === "write"
                ? "bg-white text-taupe shadow-xs"
                : "text-muted hover:text-taupe",
            )}
          >
            <PenLine className="h-3.5 w-3.5" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 font-body font-medium transition-colors",
              tab === "preview"
                ? "bg-white text-taupe shadow-xs"
                : "text-muted hover:text-taupe",
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Live Preview
          </button>
        </div>
      </div>

      {tab === "write" ? (
        <div className="overflow-hidden rounded-md border border-hairline bg-white shadow-xs focus-within:border-sage-deep focus-within:ring-1 focus-within:ring-sage-deep">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border-b border-hairline bg-oat/40 px-2.5 py-1.5 text-xs">
            <button
              type="button"
              onClick={() => insertHeading("## ")}
              title="Insert H2 Heading (##)"
              className="flex items-center gap-1 rounded px-2 py-1 font-body font-medium text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <Heading2 className="h-4 w-4" />
              <span>H2</span>
            </button>

            <button
              type="button"
              onClick={() => insertHeading("### ")}
              title="Insert H3 Heading (###)"
              className="flex items-center gap-1 rounded px-2 py-1 font-body font-medium text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <Heading3 className="h-4 w-4" />
              <span>H3</span>
            </button>

            <div className="mx-1 h-4 w-px bg-hairline" />

            <button
              type="button"
              onClick={() => wrapSelection("**", "**", "bold text")}
              title="Bold (**text**)"
              className="rounded p-1.5 text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <Bold className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => wrapSelection("*", "*", "italic text")}
              title="Italic (*text*)"
              className="rounded p-1.5 text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <Italic className="h-4 w-4" />
            </button>

            <div className="mx-1 h-4 w-px bg-hairline" />

            <button
              type="button"
              onClick={() => insertList(false)}
              title="Bullet Points (- Item)"
              className="flex items-center gap-1 rounded px-2 py-1 font-body font-medium text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <List className="h-4 w-4" />
              <span>Bullets</span>
            </button>

            <button
              type="button"
              onClick={() => insertList(true)}
              title="Numbered List (1. Item)"
              className="flex items-center gap-1 rounded px-2 py-1 font-body font-medium text-taupe hover:bg-white hover:text-sage-deep transition-colors"
            >
              <ListOrdered className="h-4 w-4" />
              <span>Numbered</span>
            </button>

            <button
              type="button"
              onClick={insertParagraphBreak}
              title="New Paragraph (double enter)"
              className="flex items-center gap-1 rounded px-2 py-1 font-body text-xs text-muted hover:bg-white hover:text-taupe transition-colors"
            >
              <Pilcrow className="h-3.5 w-3.5" />
              <span>Paragraph</span>
            </button>
          </div>

          <textarea
            ref={textareaRef}
            rows={10}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your product description here. Separate paragraphs with a blank line. Use ## for H2 headings, ### for H3 headings, and - for bullet points."
            className="w-full resize-y bg-transparent px-3 py-2.5 font-body text-sm text-taupe leading-relaxed placeholder:text-muted/60 focus:outline-none"
          />

          <div className="border-t border-hairline bg-oat/20 px-3 py-1.5 text-[11px] text-muted flex items-center justify-between">
            <span>
              Supports Markdown &amp; HTML: <code>## Heading 2</code>, <code>### Heading 3</code>, <code>- Bullets</code>, blank line for paragraphs.
            </span>
            <span className="font-mono text-[10px]">
              {value.length} chars
            </span>
          </div>
        </div>
      ) : (
        <div className="min-h-[220px] rounded-md border border-hairline bg-white p-6 shadow-xs">
          <div className="mb-3 border-b border-hairline pb-2 flex items-center justify-between">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-sage-deep">
              Live Preview (Exact Buyer Display)
            </span>
            <span className="font-body text-xs text-muted">
              Only H1 on page is product title; headings below render as H2/H3
            </span>
          </div>
          {value.trim() ? (
            <ProductDescription content={value} />
          ) : (
            <p className="font-body text-sm italic text-muted">
              No description text entered yet. Switch back to Write mode to add content.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

