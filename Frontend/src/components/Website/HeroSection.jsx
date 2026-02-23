import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRefs = useRef([]);
  const descRef = useRef(null);
  const badgeRef = useRef(null);
  const heroImageRef = useRef(null);
  const aiBadgeRef = useRef(null);
  const buttonRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Prevent flash of invisible content
      gsap.set(
        [
          ...titleRefs.current,
          descRef.current,
          ...buttonRefs.current,
          heroImageRef.current,
          aiBadgeRef.current,
        ].filter(Boolean),
        { opacity: 0 },
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(titleRefs.current.filter(Boolean), {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
      });

      tl.to(descRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");

      tl.to(
        buttonRefs.current.filter(Boolean),
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.4 },
        "-=0.2",
      );

      tl.to(
        heroImageRef.current,
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.5",
      );

      tl.to(aiBadgeRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5");

      // Floating image (safe infinite animation)
      gsap.to(heroImageRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });

      // Badge subtle pulse
      gsap.to(badgeRef.current, {
        scale: 1.04,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert(); // 🔥 prevents StrictMode glitch
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#0B3D2E] to-[#0F4F3B] text-white px-6 md:px-12 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Left */}
        <div className="space-y-8">
          <div
            ref={badgeRef}
            className="inline-flex items-center px-4 py-2 bg-green-900/50 text-lime-400 rounded-full text-sm font-medium backdrop-blur-md"
          >
            ⚡ AI Powered Water Governance
          </div>

          <div className="space-y-2 text-5xl md:text-6xl font-bold leading-tight">
            <div ref={(el) => (titleRefs.current[0] = el)}>
              Predicting Drought
            </div>
            <div ref={(el) => (titleRefs.current[1] = el)}>
              Before It Becomes a
            </div>
            <div ref={(el) => (titleRefs.current[2] = el)}>
              Crisis: Smart Water
            </div>
            <div
              ref={(el) => (titleRefs.current[3] = el)}
              className="inline-block bg-lime-400 text-[#0B3D2E] px-6 py-2 rounded-full mt-3"
            >
              Technology
            </div>
          </div>

          <p ref={descRef} className="text-gray-300 text-lg max-w-xl">
            Using rainfall deviation, groundwater trends, and predictive
            modeling to enable district authorities to act proactively instead
            of reactively.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              ref={(el) => (buttonRefs.current[0] = el)}
              className="bg-lime-400 text-[#0B3D2E] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Explore Dashboard
            </Link>

            <button
              ref={(el) => (buttonRefs.current[1] = el)}
              className="
    flex items-center gap-2
    text-sm sm:text-base
    text-gray-200 hover:text-white
    transition duration-300
    whitespace-nowrap
  "
            >
              <span>View Forecast Demo</span>

              <span
                className="
      border border-gray-400
      rounded-full
      px-2 sm:px-3
      py-0.5
      text-sm sm:text-lg
      flex items-center justify-center
    "
              >
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div
            ref={heroImageRef}
            className="bg-[#0A2F24] rounded-2xl shadow-2xl p-6"
          >
            <img
              src="/image.png"
              alt="Drought Intelligence Visual"
              className="rounded-xl"
            />
          </div>

          <div
            ref={aiBadgeRef}
            className="absolute bottom-10 left-6 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="bg-lime-400 p-3 rounded-full"></div>
              <div>
                <p className="text-xs text-gray-300">AI DRIVEN</p>
                <p className="text-sm font-semibold">Decision Making</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Dots */}
      <div className="absolute top-20 right-40 w-2 h-2 bg-lime-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-24 left-20 w-2 h-2 bg-lime-400 rounded-full opacity-30"></div>
    </section>
  );
}
