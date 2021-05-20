type Filter = {
  id: string;
  title: string;
  image: string;
  effect: string;
  opts?: number;
};

export const FILTERS: Filter[] = [
  {
    id: "normal",
    title: "Normal",
    effect: "none",
    image: "./effects/normal.jpg",
  },
  {
    id: "invert",
    title: "Invert",
    effect: "invert",
    image: "./effects/invert.jpg",
  },
  {
    id: "GrayScale",
    title: "GrayScale",
    effect: "grayscale",
    image: "./effects/grayscale.jpg",
  },
  {
    id: "sepia",
    title: "Sepia",
    effect: "sepia",
    image: "./effects/sepia.jpg",
  },
  {
    id: "brightness",
    title: "Brightness",
    effect: "brightness",
    image: "./effects/brightness.jpg",
    opts: 10,
  },
  {
    id: "sobel",
    title: "Sobel",
    effect: "sobel",
    image: "./effects/sobel.jpg",
  },
  {
    id: "sharpen",
    title: "Sharpen",
    effect: "sharpen",
    image: "./effects/sharpen.jpg",
  },
  {
    id: "blur",
    title: "Blur",
    effect: "blur",
    image: "./effects/blur.jpg",
    opts: 100,
  },
];
