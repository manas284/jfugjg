import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MOCK_TESTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedTests() {
  const featuredTests = MOCK_TESTS.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredTests.map((test) => (
              <CarouselItem key={test.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="relative flex aspect-[3/2] items-end justify-center p-0">
                      <Image
                        src={test.coverImageUrl}
                        alt={test.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint={test.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="relative z-10 p-4 w-full">
                         <h3 className="text-lg font-semibold text-white mb-2">{test.title}</h3>
                         <Link href={`/test/${test.id}`} passHref>
                          <Button size="sm" className="w-full">Start Test</Button>
                         </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
