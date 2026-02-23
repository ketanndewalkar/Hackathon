import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const ctaRef = useRef(null);
  const navRefs = useRef([]);

  const navItems = ["Platform", "Solutions", "Case Studies", "Resources"];

  // 🔥 FIXED INTRO ANIMATION (No Flicker)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
      });

      tl.from(
        navRefs.current.filter(Boolean),
        {
          y: -15,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.3",
      );

      tl.from(
        ctaRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3",
      );
    }, navbarRef);

    return () => ctx.revert(); // prevents strict mode double-run glitch
  }, []);

  // 🔥 FIXED SCROLL SHRINK (No Layout Repaint)
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;

      if (window.scrollY > 30) {
        gsap.to(navbarRef.current, {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(11,61,46,0.85)",
          duration: 0.3,
          overwrite: "auto",
        });
      } else {
        gsap.to(navbarRef.current, {
          backdropFilter: "blur(0px)",
          backgroundColor: "#0B3D2E",
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 MAGNETIC CTA (Safe)
  const handleMagnet = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(ctaRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const resetMagnet = () => {
    gsap.to(ctaRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 w-full bg-[#0B3D2E] px-6 md:px-30 py-2 flex items-center justify-between z-50"
    >
      {/* Logo */}
      <div ref={logoRef} className="flex items-center">
        <img
          src="./logo.png"
          alt="Logo"
          className="
      h-12 
      sm:h-9 
      md:h-15 
      w-auto 
      object-contain
    "
        />
        <h1 className="text-white font-bold">
            JalSaksham
        </h1>
      </div>

      {/* Desktop Nav */}
      {/* <div className="hidden md:flex items-center gap-10">
        {navItems.map((item, index) => (
          <div
            key={item}
            ref={(el) => (navRefs.current[index] = el)}
            className="relative group cursor-pointer"
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { y: -2, duration: 0.2 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { y: 0, duration: 0.2 })
            }
          >
            <span className="text-gray-200 text-sm font-medium group-hover:text-white transition duration-300">
              {item}
            </span>
            <span className="absolute left-0 -bottom-2 h-[2px] bg-lime-400 w-0 group-hover:w-full transition-all duration-300"></span>
          </div>
        ))}
      </div> */}

      {/* CTA */}
      <div
        ref={ctaRef}
        className="hidden md:block"
        onMouseMove={handleMagnet}
        onMouseLeave={resetMagnet}
      >
        <Link
          to="/dashboard"
          className="bg-lime-400 text-[#0B3D2E] text-sm font-semibold px-6 py-2.5 rounded-full"
        >
          Explore Dashboard
        </Link>
      </div>

      {/* Mobile Button */}
      <div className="md:hidden text-white">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B3D2E] flex flex-col items-center gap-6 py-6 md:hidden">
          {navItems.map((item) => (
            <span
              key={item}
              className="text-gray-200 text-sm font-medium hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}
