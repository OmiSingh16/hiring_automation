"use client";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";

const images = [
  "/images/p1.png",
  "/images/p2.png",
  "/images/p3.png",
  "/images/p4.png",
  "/images/p5.jpg",
];

const titles = [
  "Innovation in Tech",
  "Creative Solutions",
  "Seamless UX",
  "Powerful Performance",
  "Trusted by Clients",
];

export default function HeroCarousel() {
  return (
    <Carousel height={400} withIndicators loop>
      {images.map((img, index) => (
        <Carousel.Slide key={img} className="relative">
          <Image
            src={img}
            alt={titles[index]}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
            <h2 className="text-2xl font-semibold text-white backdrop-blur-sm p-4 rounded-md">
              {titles[index]}
            </h2>
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
