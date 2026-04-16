"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
  images?: string[];
  width?: number;
  height?: number;
}

const ImageSequence: React.FC<ImageSequenceProps> = ({
  images = Array.from(
    { length: 300 },
    (_, i) => `/sequence/frame-${String(i + 1).padStart(3, "0")}.jpg`,
  ),
  width = 1920,
  height = 1080,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !images.length) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const imgObjects: HTMLImageElement[] = [];
    let loadedImages = 0;

    const airbnb = {
      frame: 0,
    };

    // Preload images
    images.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          render();
        }
      };
      imgObjects[i] = img;
    });

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = imgObjects[airbnb.frame];
      if (img) {
        // Draw image keeping aspect ratio (cover)
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = -(drawHeight - canvas.height) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawHeight = canvas.height;
          offsetX = -(drawWidth - canvas.width) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200%",
        pin: true,
        scrub: 2.5,
      },
    });

    tl.to(
      airbnb,
      {
        frame: images.length - 1,
        snap: "frame",
        ease: "none",
        duration: images.length - 1,
        onUpdate: render,
      },
      0,
    );

    // "Descend with confidence" animation (frame 6 to 29)
    // index 5 to 28
    tl.fromTo(
      textRef1.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 8,
        ease: "power2.out",
      },
      5,
    );

    tl.to(
      textRef1.current,
      {
        y: -100,
        opacity: 0,
        duration: 8,
        ease: "power2.in",
      },
      20,
    );

    // "Precision beneath the surface" animation (frame 30 to 55)
    // index 29 to 54
    tl.fromTo(
      textRef2.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 8,
        ease: "power2.out",
      },
      29,
    );

    tl.to(
      textRef2.current,
      {
        y: 100,
        opacity: 0,
        duration: 8,
        ease: "power2.in",
      },
      46,
    );

    // "Go deeper. Wear legend." animation (frame 241 to 299)
    // index 240 to 298
    tl.fromTo(
      textRef3.current,
      {
        y: "100%",
        opacity: 1,
      },
      {
        y: "-100%",
        opacity: 1,
        duration: 58, // duration from 240 to 298
        ease: "none",
      },
      240,
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
      {/* First Text: Right Side */}
      <div
        ref={textRef1}
        className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-0"
      >
        <div className="w-1/3 flex justify-center">
          <h2 className="text-4xl md:text-7xl text-white font-bodoni italic tracking-tight text-center px-4">
            Descend with confidence
          </h2>
        </div>
      </div>
      {/* Second Text: Left Side */}
      <div
        ref={textRef2}
        className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-0"
      >
        <div className="w-1/3 flex justify-center">
          <h2 className="text-4xl md:text-7xl text-white font-bodoni italic tracking-tight text-center px-4">
            Precision beneath the surface
          </h2>
        </div>
      </div>
      {/* Third Text: Left Side */}
      <div
        ref={textRef3}
        className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-0"
      >
        <div className="w-1/3 flex justify-center">
          <h2 className="text-5xl md:text-6xl text-white font-bodoni italic tracking-wide text-center px-4 leading-tight">
            Go deeper.
            <br />
            <span className="text-3xl md:text-3xl font-garamond uppercase tracking-[0.3em] text-zinc-400 not-italic mt-4 block">
              Wear legend.
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ImageSequence;
