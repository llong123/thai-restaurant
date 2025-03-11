import Image from "next/image";
import { MapPin } from "lucide-react";

export default function DirectionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Located in the heart of Helsinki, Thai Delight is easily accessible
          from anywhere in the city
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Thai Delight Helsinki</p>
                <p className="text-muted-foreground">Mannerheimintie 123</p>
                <p className="text-muted-foreground">00100 Helsinki</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>11:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>12:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 - 21:00</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <div className="space-y-2">
              <p>Phone: +358 40 123 4567</p>
              <p>Email: info@thaidelight.fi</p>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=800"
            alt="Map location of Thai Delight Helsinki"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* <Separator className="my-12" />

      <div>
        <h2 className="text-3xl font-bold text-center mb-8">How to Get Here</h2>

        <Tabs defaultValue="airport" className="w-full">
          <TabsList className="flex justify-center mb-8 flex-wrap">
            <TabsTrigger value="airport" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              From Airport
            </TabsTrigger>
            <TabsTrigger value="train" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              From Central Station
            </TabsTrigger>
            <TabsTrigger value="bus" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              By Bus
            </TabsTrigger>
            <TabsTrigger value="car" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              By Car
            </TabsTrigger>
          </TabsList>

          <TabsContent value="airport">
            <Card>
              <CardHeader>
                <CardTitle>From Helsinki Airport (HEL)</CardTitle>
                <CardDescription>Approximately 30-40 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">By Train</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Take the I or P train from Helsinki Airport to Helsinki Central Station</li>
                      <li>From Central Station, walk approximately 10 minutes to Mannerheimintie 123</li>
                      <li>Alternatively, take tram 4, 7, or 10 from Central Station to Lasipalatsi stop</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">By Taxi</h3>
                    <p>
                      Taxis are available directly outside the airport terminals. The journey takes approximately 25-30
                      minutes and costs around 40-50€.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="train">
            <Card>
              <CardHeader>
                <CardTitle>From Helsinki Central Station</CardTitle>
                <CardDescription>Approximately 10 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">By Foot</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Exit the station from the main entrance facing Kaivokatu</li>
                      <li>Turn right and walk along Kaivokatu until you reach Mannerheimintie</li>
                      <li>Turn left onto Mannerheimintie and continue for approximately 500 meters</li>
                      <li>Thai Delight will be on your right at Mannerheimintie 123</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">By Tram</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Take tram 4, 7, or 10 from the Central Station</li>
                      <li>Get off at the Lasipalatsi stop</li>
                      <li>Thai Delight is a short 2-minute walk from the stop</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bus">
            <Card>
              <CardHeader>
                <CardTitle>By Bus</CardTitle>
                <CardDescription>Multiple routes available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">From East Helsinki</h3>
                    <p>Take bus 68, 71, or 78 to Kamppi. From Kamppi, it's a 5-minute walk to Thai Delight.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">From West Helsinki</h3>
                    <p>Take bus 14, 18, or 39 to Kamppi. From there, walk east on Simonkatu towards Mannerheimintie.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">From North Helsinki</h3>
                    <p>Take bus 23, 55, or 56 to the city center and get off at the closest stop to Mannerheimintie.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="car">
            <Card>
              <CardHeader>
                <CardTitle>By Car</CardTitle>
                <CardDescription>Parking information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Directions</h3>
                    <p>
                      Enter &apos;Chao Phraya Helsinki&apos; or &apos;Mannerheimintie 123, Helsinki&apos; into your GPS navigation system.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Parking</h3>
                    <p>There are several parking options near the restaurant:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Q-Park Kamppi (Annankatu 24) - 5-minute walk</li>
                      <li>Stockmann Parking (Mannerheimintie 1) - 7-minute walk</li>
                      <li>Street parking is available but limited and subject to fees</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs> */}
      {/* </div> */}
    </div>
  );
}
