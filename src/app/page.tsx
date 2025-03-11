import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            fill
            className="object-cover brightness-50"
            alt="Chao Phraya restaurant hero section"
          ></Image>
        </div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-white">Chao Phraya</h1>
          <p className="text-lg text-white">
            Authentic Thai cuisine in the heart of Helsinki
          </p>
          <Link
            href="/menu"
            className="inline-block px-6 py-3 text-white bg-red-600 rounded-md"
          >
            View Menu
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hot items from our menu
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular dishes loved by locals and visitors alike
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
