import { Text } from "react-native";

type RichTextPart = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

type RichParagraphProps = {
  parts: RichTextPart[];
  style?: object;
};

export function RichParagraph({ parts, style }: RichParagraphProps) {
  return (
    <Text style={style}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={{
            ...(part.bold && { fontWeight: "700" }),
            ...(part.italic && { fontStyle: "italic" }),
          }}
        >
          {part.text}
        </Text>
      ))}
    </Text>
  );
}
