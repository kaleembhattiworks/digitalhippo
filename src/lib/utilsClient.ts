'use client';

import { ImageLoaderProps } from 'next/image';

export const imageLoaderClient = ({ src, width, quality }: ImageLoaderProps) => {
	return `${src}?w=${width}&q=${quality || 75}`;
};
