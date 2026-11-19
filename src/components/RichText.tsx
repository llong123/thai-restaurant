import { Box, Text, type BoxProps } from "@chakra-ui/react";
import { Fragment, type ReactNode } from "react";
import { AccentDivider } from "@/components/AccentDivider";

type Block = { type: "paragraph" | "unordered" | "ordered"; lines: string[] };

function isUnorderedListItem(line: string): boolean {
  return /^\s*[-+*]\s+/.test(line);
}

function isOrderedListItem(line: string): boolean {
  return /^\s*\d+[.)]\s+/.test(line);
}

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const listType = isUnorderedListItem(line)
      ? "unordered"
      : isOrderedListItem(line)
        ? "ordered"
        : undefined;

    if (listType) {
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const matches =
          listType === "unordered"
            ? isUnorderedListItem(current)
            : isOrderedListItem(current);
        if (!matches) break;
        items.push(
          current.replace(
            listType === "unordered" ? /^[-+*]\s+/ : /^\d+[.)]\s+/,
            "",
          ),
        );
        index += 1;
      }
      blocks.push({ type: listType, lines: items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        isUnorderedListItem(current) ||
        isOrderedListItem(current)
      ) {
        break;
      }
      paragraph.push(current);
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: [paragraph.join(" ")] });
  }

  return blocks;
}

function renderInline(source: string): ReactNode[] {
  const pattern = /(\*\*.+?\*\*|__.+?__|\*[^*\n]+\*|_[^_\n]+_)/g;
  return source.split(pattern).filter(Boolean).map((part, index) => {
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderParagraph(text: string, key: number, showTipDivider: boolean): ReactNode {
  // The workbook currently marks tips with an opening asterisk only ("*Tip:").
  const tip = text.match(/^\*(Tip:)\s*\*?\s*(.*)$/i);
  if (tip) {
    return (
      <Fragment key={key}>
        {showTipDivider && (
          <AccentDivider my={3} />
        )}
        <Text as="p" mb={3} lineHeight="tall">
          <em>{tip[1]}</em> {renderInline(tip[2])}
        </Text>
      </Fragment>
    );
  }
  return (
    <Text as="p" key={key} mb={3} lineHeight="tall">
      {renderInline(text)}
    </Text>
  );
}

export function RichText({
  text,
  showTipDivider = false,
  ...boxProps
}: { text?: string; showTipDivider?: boolean } & Omit<BoxProps, "children">) {
  if (!text?.trim()) return null;

  return (
    <Box {...boxProps}>
      {parseBlocks(text).map((block, index) => {
        if (block.type === "paragraph") {
          return renderParagraph(block.lines[0], index, showTipDivider);
        }

        const isOrdered = block.type === "ordered";
        return (
          <Box
            as={isOrdered ? "ol" : "ul"}
            key={index}
            pl={6}
            mb={3}
            listStyleType={isOrdered ? "decimal" : "disc"}
          >
            {block.lines.map((line, lineIndex) => (
              <Box as="li" key={lineIndex} mb={1} lineHeight="tall">
                {renderInline(line)}
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
