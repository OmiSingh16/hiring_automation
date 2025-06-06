import FeatureCard from "./FeatureCard";

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

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {images.map((img, i) => (
        <FeatureCard key={i} img={img} title={titles[i]} />
      ))}
    </div>
  );
}
