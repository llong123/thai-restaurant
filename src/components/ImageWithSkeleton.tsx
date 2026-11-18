"use client";

import { Box, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState, type ComponentProps } from "react";

type ImageProps = Omit<ComponentProps<typeof Image>, "src" | "alt">;
type ContainerProps = ComponentProps<typeof Box>;

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  containerProps?: ContainerProps;
  imageProps?: ImageProps;
}

export function ImageWithSkeleton({
  src,
  alt,
  containerProps,
  imageProps,
}: ImageWithSkeletonProps) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const status = failedSource === src ? "error" : loadedSource === src ? "loaded" : "loading";

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoadedSource(src);
  }, [src]);

  return (
    <Box position="relative" width="100%" overflow="hidden" {...containerProps}>
      {status === "loading" && (
        <Skeleton position="absolute" inset={0} width="100%" height="100%" />
      )}

      {status === "error" ? (
        <Box
          position="absolute"
          inset={0}
          display="grid"
          placeItems="center"
          bg="blackAlpha.100"
          role="img"
          aria-label={alt}
        >
          <Text fontSize="3xl" aria-hidden="true">🍽️</Text>
        </Box>
      ) : (
        <Image
          {...imageProps}
          ref={imageRef}
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          opacity={status === "loaded" ? 1 : 0}
          transition="opacity 180ms ease-out"
          onLoad={() => setLoadedSource(src)}
          onError={() => setFailedSource(src)}
        />
      )}
    </Box>
  );
}
