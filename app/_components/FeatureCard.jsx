import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeatureCard({ img, title }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-52">
        <Image src={img} alt={`Card ${title}`} layout="fill" objectFit="cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
          <p className="text-lg font-medium">{title}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="mb-2">
          Explore more about {title} and how we make a difference.
        </p>
        <Button asChild variant="outline">
          <a href="#">Learn More</a>
        </Button>
      </CardContent>
    </Card>
  );
}
