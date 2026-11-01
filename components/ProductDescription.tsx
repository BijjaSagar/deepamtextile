import React from "react";
import { cn } from "@/lib/utils";

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  if (/^(https?|mailto|tel):/i.test(trimmed)) return true;
  return false;
}

/**
 * Tokenize and render inline text formatting:
 * - **bold** or __bold__ or <strong>/<b>
 * - *italic* or _italic_ or <em>/<i>
 * - `code`
 * - [text](url) or <a href="url">text</a>
 * - <br /> line breaks
 */
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Normalize inline HTML tags to uniform markdown tokens
  let s = text;
  s = s.replace(/<\s*(?:strong|b)\s*>([\s\S]*?)<\s*\/\s*(?:strong|b)\s*>/gi, "**$1**");
  s = s.replace(/<\s*(?:em|i)\s*>([\s\S]*?)<\s*\/\s*(?:em|i)\s*>/gi, "*$1*");
  s = s.replace(/<\s*a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\s*\/\s*a\s*>/gi, "[$2]($1)");

  // Regex captures bold, italic, code, markdown link, and <br/>
  const tokenRegex = /(\*\*.*?\*\*|__.*?__|(?<!\*)\*(?!\*).*?(?<!\*)\*(?!\*)|(?<!_)_(?!_).*?(?<!_)_(?!_)|`.*?`|\[.*?\]\(.*?\)|<\s*br\s*\/?>)/g;
  const parts = s.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    if (
      (part.startsWith("**") && part.endsWith("**") && part.length >= 4) ||
      (part.startsWith("__") && part.endsWith("__") && part.length >= 4)
    ) {
      return (
        <strong key={index} className="font-semibold text-taupe">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    if (
      (part.startsWith("*") && part.endsWith("*") && part.length >= 2) ||
      (part.startsWith("_") && part.endsWith("_") && part.length >= 2)
    ) {
      return (
        <em key={index} className="italic">
          {renderInline(part.slice(1, -1))}
        </em>
      );
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="rounded bg-oat px-1.5 py-0.5 font-mono text-xs text-taupe"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const linkText = match[1];
        const href = match[2];
        if (isSafeUrl(href)) {
          const isExternal = href.startsWith("http");
          return (
            <a
              key={index}
              href={href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sage-deep underline hover:text-taupe transition-colors"
            >
              {linkText}
            </a>
          );
        }
        return <span key={index}>{linkText}</span>;
      }
    }

    if (/^<\s*br\s*\/?>$/i.test(part)) {
      return <br key={index} />;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Parses markdown or HTML into structured block tokens:
 * - Enforces single H1 on the page: Any # or <h1> is converted to <h2>!
 * - Converts ###..###### to <h3>
 * - Converts bullet points to <ul> and numbered lists to <ol>
 * - Converts paragraphs into <p>
 */
export function parseDescriptionBlocks(raw: string): Block[] {
  if (!raw || !raw.trim()) return [];

  // Normalize line endings
  let text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  // Strip dangerous tags and attributes completely
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  text = text.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  text = text.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // If HTML block tags are used, normalize them
  // Crucial: H1 is mapped to H2 to ensure only one H1 per page
  text = text.replace(/<\s*h1[^>]*>([\s\S]*?)<\s*\/\s*h1\s*>/gi, "\n\n## $1\n\n");
  text = text.replace(/<\s*h2[^>]*>([\s\S]*?)<\s*\/\s*h2\s*>/gi, "\n\n## $1\n\n");
  text = text.replace(/<\s*h3[^>]*>([\s\S]*?)<\s*\/\s*h3\s*>/gi, "\n\n### $1\n\n");
  text = text.replace(/<\s*h[4-6][^>]*>([\s\S]*?)<\s*\/\s*h[4-6]\s*>/gi, "\n\n### $1\n\n");
  text = text.replace(/<\s*p[^>]*>([\s\S]*?)<\s*\/\s*p\s*>/gi, "\n\n$1\n\n");

  text = text.replace(/<\s*ol[^>]*>([\s\S]*?)<\s*\/\s*ol\s*>/gi, (_, inner) => {
    const items = inner.match(/<\s*li[^>]*>([\s\S]*?)<\s*\/\s*li\s*>/gi) || [];
    let idx = 1;
    const formatted = items
      .map((it: string) => `${idx++}. ` + it.replace(/<\/?li[^>]*>/gi, "").trim())
      .join("\n");
    return "\n\n" + formatted + "\n\n";
  });

  text = text.replace(/<\s*ul[^>]*>([\s\S]*?)<\s*\/\s*ul\s*>/gi, (_, inner) => {
    const items = inner.match(/<\s*li[^>]*>([\s\S]*?)<\s*\/\s*li\s*>/gi) || [];
    const formatted = items
      .map((it: string) => "- " + it.replace(/<\/?li[^>]*>/gi, "").trim())
      .join("\n");
    return "\n\n" + formatted + "\n\n";
  });

  const lines = text.split("\n");
  const blocks: Block[] = [];
  let currentParagraph: string[] = [];
  let currentUl: string[] = [];
  let currentOl: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const pText = currentParagraph.join(" ").trim();
      if (pText) {
        blocks.push({ type: "p", text: pText });
      }
      currentParagraph = [];
    }
  }

  function flushUl() {
    if (currentUl.length > 0) {
      blocks.push({ type: "ul", items: [...currentUl] });
      currentUl = [];
    }
  }

  function flushOl() {
    if (currentOl.length > 0) {
      blocks.push({ type: "ol", items: [...currentOl] });
      currentOl = [];
    }
  }

  function flushAllLists() {
    flushUl();
    flushOl();
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushAllLists();
      continue;
    }

    // Heading 1 or 2 -> always renders as H2 (protecting single H1 per page)
    const h2Match = line.match(/^#{1,2}\s+(.+)$/);
    if (h2Match) {
      flushParagraph();
      flushAllLists();
      blocks.push({ type: "h2", text: h2Match[1].trim() });
      continue;
    }

    // Heading 3 or deeper -> always renders as H3
    const h3Match = line.match(/^#{3,6}\s+(.+)$/);
    if (h3Match) {
      flushParagraph();
      flushAllLists();
      blocks.push({ type: "h3", text: h3Match[1].trim() });
      continue;
    }

    // Unordered list item
    const ulMatch = line.match(/^[-*•]\s+(.+)$/);
    if (ulMatch) {
      flushParagraph();
      flushOl();
      currentUl.push(ulMatch[1].trim());
      continue;
    }

    // Ordered list item
    const olMatch = line.match(/^\d+[\.)]\s+(.+)$/);
    if (olMatch) {
      flushParagraph();
      flushUl();
      currentOl.push(olMatch[1].trim());
      continue;
    }

    // Regular paragraph text
    if (currentUl.length > 0 || currentOl.length > 0) {
      flushAllLists();
    }
    currentParagraph.push(line);
  }

  flushParagraph();
  flushAllLists();

  return blocks;
}

type ProductDescriptionProps = {
  content?: string | null;
  className?: string;
};

/**
 * Structured product description renderer:
 * - Renders paragraphs with proper spacing (<p>)
 * - Renders section headings as H2 (<h2>) and subsections as H3 (<h3>)
 * - Renders bullet points (<ul>/<li>) and numbered lists (<ol>/<li>)
 * - Enforces single H1 on the page (all top-level headings map to H2)
 * - Responsive typography for desktop and mobile
 */
export function ProductDescription({
  content,
  className,
}: ProductDescriptionProps) {
  if (!content || !content.trim()) return null;

  const blocks = parseDescriptionBlocks(content);

  return (
    <div
      className={cn(
        "product-description prose-description text-muted",
        className,
      )}
    >
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-8 mb-4 font-display text-2xl font-normal tracking-tight text-taupe md:text-3xl first:mt-0"
            >
              {renderInline(block.text)}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="mt-6 mb-3 font-display text-xl font-normal tracking-tight text-taupe md:text-2xl first:mt-0"
            >
              {renderInline(block.text)}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul
              key={index}
              className="my-5 space-y-2.5 list-disc list-outside pl-5 font-body text-base leading-relaxed text-muted md:text-lg"
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol
              key={index}
              className="my-5 space-y-2.5 list-decimal list-outside pl-5 font-body text-base leading-relaxed text-muted md:text-lg"
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="pl-1">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p
            key={index}
            className="mb-6 font-body text-base leading-relaxed text-muted md:text-lg last:mb-0"
          >
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

