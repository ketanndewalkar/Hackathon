import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImpactBar() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const numbersRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state (no flicker)
      gsap.set(itemsRef.current.filter(Boolean), {
        opacity: 0,
        y: 30,
      });

      // Section animation
      gsap.to(itemsRef.current.filter(Boolean), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Counter animation
      numbersRef.current.forEach((el, index) => {
        const targets = [36, 248, 18]; // exact values from UI

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
            innerText: targets[index],
            duration: 1.5,
            ease: "power2.out",
            snap: { innerText: 1 },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert(); // strict mode safe
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0B3D2E] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">

        {/* Label */}
        <div
          ref={(el) => (itemsRef.current[0] = el)}
          className="text-center text-white/70 text-xs tracking-widest mb-6 uppercase"
        >
          Empowering District Authorities Across
        </div>

        {/* Metrics */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-white">

          <div
            ref={(el) => (itemsRef.current[1] = el)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span
              ref={(el) => (numbersRef.current[0] = el)}
              className="text-lime-400 font-semibold"
            >
              0
            </span>
            <span>High Risk Zones</span>
          </div>

          <div
            ref={(el) => (itemsRef.current[2] = el)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span
              ref={(el) => (numbersRef.current[1] = el)}
              className="text-lime-400 font-semibold"
            >
              0
            </span>
            <span>Villages Monitored</span>
          </div>

          <div
            ref={(el) => (itemsRef.current[3] = el)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span
              ref={(el) => (numbersRef.current[2] = el)}
              className="text-lime-400 font-semibold"
            >
              0
            </span>
            <span>Tankers Deployed</span>
          </div>

        </div>
      </div>
    </section>
  );
}