import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Image as ImageIcon, X } from "lucide-react";
import SEO from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";


// Startup Mahakumbh 2024 – Showcasing Innovation and Entrepreneurship
import startupImg1 from "@/gallary/Startup Mahakumbh 2024 – Showcasing Innovation and Entrepreneurship/IMG-20240319-WA0000.jpg";
import startupImg2 from "@/gallary/Startup Mahakumbh 2024 – Showcasing Innovation and Entrepreneurship/IMG-20240319-WA0001.jpeg";
import startupImg3 from "@/gallary/Startup Mahakumbh 2024 – Showcasing Innovation and Entrepreneurship/IMG-20240319-WA0002.jpg";

// GIMS Images
import gimsImg1 from "@/gallary/GIMS/IMG-20250222-WA0039.jpg";
import gimsImg2 from "@/gallary/GIMS/IMG-20250222-WA0028.jpg";
import gimsImg3 from "@/gallary/GIMS/IMG-20250222-WA0053.jpg";

// Graphic Era March Event Images
import graphicImg1 from "@/gallary/GraphicEra/IMG-20240227-WA0056.jpg";
import graphicImg2 from "@/gallary/GraphicEra/IMG-20240227-WA0012.jpg";
import graphicImg3 from "@/gallary/GraphicEra/IMG-20240227-WA0034.jpg";

// MIET Images
import mietImg1 from "@/gallary/MIET/IMG-20231118-WA0024.jpg";
import mietImg2 from "@/gallary/MIET/IMG-20231118-WA0076.jpg";
import mietImg3 from "@/gallary/MIET/IMG-20231118-WA0061.jpg";

// GNIOT Images
import ginotImg1 from "@/gallary/gniot/IMG-20240911-WA0024.jpg";
import ginotImg2 from "@/gallary/gniot/IMG-20240910-WA0019.jpg";
import ginotImg3 from "@/gallary/gniot/IMG-20250917-WA0000.jpg";


// Dev Bhoomi Uttarakhand University
import dbImg1 from "@/gallary/Dev Bhoomi Uttarakhand University/IMG-20240502-WA0017.jpg";
import dbImg2 from "@/gallary/Dev Bhoomi Uttarakhand University/IMG-20250927-WA0002.jpg";
import dbImg3 from "@/gallary/Dev Bhoomi Uttarakhand University/IMG-20240502-WA0021.jpg";

// IIMT
import iimtImg1 from "@/gallary/IIMT/IMG-20250321-WA0018.jpg";
import iimtImg2 from "@/gallary/IIMT/IMG-20250404-WA0027.jpg";
import iimtImg3 from "@/gallary/IIMT/IMG-20250321-WA0012.jpg";

// Student Interaction Sessions
import googleImg1 from "@/gallary/Student Interaction Sessions/IMG-20250321-WA0018.jpg";
import googleImg2 from "@/gallary/Student Interaction Sessions/IMG-20250222-WA0004.jpg";
import googleImg3 from "@/gallary/Student Interaction Sessions/IMG-20230406-WA0000.jpg";



const colleges = [
  {
    name: "Startup Mahakumbh 2024 – Showcasing Innovation and Entrepreneurship",
    images: [startupImg1, startupImg2, startupImg3],
  },
  {
    name: "Dev Bhoomi Uttarakhand University",
    images: [dbImg1, dbImg2, dbImg3],
  },
  {
    name: "Graphic Era",
    images: [graphicImg1, graphicImg2, graphicImg3],
  },
  {
    name: "IIMT",
    images: [iimtImg1, iimtImg2, iimtImg3],
  },
  {
    name: "GIMS",
    images: [gimsImg1, gimsImg2, gimsImg3],
  },
  {
    name: "MIET",
    images: [mietImg1, mietImg2, mietImg3],
  },
  {
    name: "GNIOT",
    images: [ginotImg1, ginotImg2, ginotImg3],
  },
  {
    name: "Student Interaction Sessions",
    images: [googleImg1, googleImg2, googleImg3],
  }
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Gallery | Event Memories & Highlights"
        description="Explore our collection of memorable moments from tech fests, workshops, hackathons, and cultural events."
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Gallery Page
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Relive the moments that shaped our journey through innovation, learning, and celebration
            </p>
          </div>

          {/* Gallery Sections */}
          <div className="space-y-20">
            {colleges.map((section, sectionIndex) => (
              <section key={sectionIndex} className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {section.name}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-elegant transition-all duration-500 cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(`${sectionIndex}-${imageIndex}`)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setSelectedImage({ src: image, alt: `${section.name} - Image ${imageIndex + 1}` })}
                    >
                      {/* Image Container */}
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={image}
                          alt={`${section.name} - Image ${imageIndex + 1}`}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            hoveredIndex === `${sectionIndex}-${imageIndex}`
                              ? "scale-105"
                              : "scale-100"
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Overlay on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-500 ${
                          hoveredIndex === `${sectionIndex}-${imageIndex}`
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-sm font-medium text-foreground">
                            Photo {imageIndex + 1} of {section.images.length}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Image Popup Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-sm border-0">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedImage && (
            <div className="flex items-center justify-center w-full h-full p-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
