import { Card, Image } from "@chakra-ui/react";

export default function Dish({ name }: { name: string }) {
  return (
    <Card.Root
      size="sm"
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      variant={"elevated"}
    >
      <Image
        src="https://polyglotpetra.com/wp-content/uploads/2024/02/Lao-Papaya-Salad-768x1024.jpg"
        alt="Thai Food"
        maxH={64}
        aspectRatio={16 / 9}
      />
      <Card.Body gap={1}>
        <Card.Title>{name}</Card.Title>
        <Card.Description>
          A spicy salad made from shredded unripe papaya.
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
