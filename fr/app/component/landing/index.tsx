'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function HomePage() {
  const counterRefs = useRef<HTMLDivElement[]>([]);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';

    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

    document.head.appendChild(gsapScript);
    document.head.appendChild(scrollTriggerScript);

    const onScriptsLoad = () => {
      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        window.gsap = (window as any).gsap;
        window.ScrollTrigger = (window as any).ScrollTrigger;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      // Animate Elements
  setTimeout(() => {
  const elements = gsap.utils.toArray('.service-card, .rotate-3d, .group');
  if (elements.length > 0) {
    elements.forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }
}, 0);

      // Sparkles
      const createSparkles = () => {
        const container = document.getElementById('sparkleContainer');
        if (!container) return;

        container.innerHTML = '';
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        for (let i = 0; i < 20; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          sparkle.style.left = `${Math.random() * viewportWidth}px`;
          sparkle.style.top = `${Math.random() * viewportHeight}px`;
          sparkle.style.animationDelay = `${Math.random() * 2}s`;
          container.appendChild(sparkle);
        }
      };

      createSparkles();

      // Counter Animation
      counterRefs.current.forEach((counter) => {
        const target = +(counter?.dataset?.target || 0);
        let current = 0;

        gsap.to({}, {
          duration: 2,
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          },
          onUpdate: function () {
            const progress = this.progress();
            const value = Math.floor(progress * target);
            counter.innerText = value.toString();
          },
        });
      });

      // Back to Top
      const handleScroll = () => {
        if (backToTopRef.current) {
          const show = window.pageYOffset > 300;
          backToTopRef.current.style.opacity = show ? '1' : '0';
          backToTopRef.current.style.visibility = show ? 'visible' : 'hidden';
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        window.removeEventListener('scroll', handleScroll);
      };
    };

    // Wait for both scripts to load
    let loadedScripts = 0;
    const handleLoad = () => {
      loadedScripts++;
      if (loadedScripts === 2) onScriptsLoad();
    };

    gsapScript.onload = handleLoad;
    scrollTriggerScript.onload = handleLoad;

    return () => {
      document.head.removeChild(gsapScript);
      document.head.removeChild(scrollTriggerScript);
    };
  }, []);

  return (
    <div
      className="antialiased w-full min-h-screen"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f0fdf4',
        overflowX: 'hidden',
        width: '100vw',
      }}
    >
      <style>{`
        html, body, #__next {
          width: 100vw;
          overflow-x: hidden;
        }
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        .sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: sparkle 2s infinite;
        }
        .gradient-text {
          background: linear-gradient(90deg, #10B981 0%, #059669 50%, #047857 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .road-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: white;
          animation: roadLine 2s linear infinite;
        }
        @keyframes roadLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .rotate-3d {
          transform-style: preserve-3d;
          transition: all 0.5s ease;
        }
        .rotate-3d:hover {
          transform: rotateY(15deg) rotateX(10deg);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      `}</style>

      {/* Sparkle Container */}
      <div id="sparkleContainer" />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 w-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-400 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-green-400 opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">D</div>
              <span className="text-2xl font-bold gradient-text">DoneEZ</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-800 hover:text-emerald-600 transition-colors font-medium">Home</Link>
              <Link href="#services" className="text-gray-800 hover:text-emerald-600 transition-colors font-medium">Services</Link>
              <Link href="#how-it-works" className="text-gray-800 hover:text-emerald-600 transition-colors font-medium">How It Works</Link>
              <Link href="#mechanics" className="text-gray-800 hover:text-emerald-600 transition-colors font-medium">For Mechanics</Link>
              <Link href="#faq" className="text-gray-800 hover:text-emerald-600 transition-colors font-medium">Faq</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in" className="hidden md:block px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">Sign in</Link>
              <button className="md:hidden text-gray-800">
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="pt-24 w-full flex-1 overflow-visible">
        {/* Hero Section */}
        <section className="relative  flex items-center justify-center overflow-hidden car-animation w-full" style={{padding: '4rem'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 z-10 w-full"></div>
          <div className="absolute inset-0 z-20 w-full">
            <div className="road-line" style = {{marginBottom:'4rem'}}></div>
            <div className="road-line" style={{ bottom: 40, animationDelay: '0.5s', marginBottom:'4rem' }}></div>
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 relative z-30">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
              <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight" style={{ lineHeight: '5.5rem' }}>
                  Premium <span className="gradient-text">Auto Care</span>
                  <br />At Your <span className="relative">
                    <span className="gradient-text">Doorstep</span>
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-emerald-400/30 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
                  Experience seamless automotive services with our network of certified professionals.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  < Link href="/RFQ" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Get Instant Quote</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                 
                </div>
                <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-500">
                      <i className="fas fa-check-circle text-2xl"></i>
                    </div>
                    <span className="font-medium">Certified Pros</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-500">
                      <i className="fas fa-bolt text-2xl"></i>
                    </div>
                    <span className="font-medium">Fast Service</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative floating">
                  <div className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-xl animate-bounce" style={{ animationDelay: '0.3s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
                      <i className="fas fa-tools text-2xl"></i>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-xl animate-bounce" style={{ animationDelay: '0.6s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
                      <i className="fas fa-car text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-down">
            <i className="fas fa-chevron-down"></i>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-white w-full">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Leading Brands</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We partner with top automotive brands to bring you the best service experience</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {[
                { src: "https://logo.clearbit.com/bosch.com", alt: "Bosch" },
                { src: "https://logo.clearbit.com/castrol.com", alt: "Castrol" },
                { src: "https://logo.clearbit.com/michelin.com", alt: "Michelin" },
                { src: "https://logo.clearbit.com/valvoline.com", alt: "Valvoline" },
                { src: "https://logo.clearbit.com/bridgestone.com", alt: "Bridgestone" },
                { src: "https://logo.clearbit.com/mobil.com", alt: "Mobil" }
              ].map((brand) => (
                <div className="flex justify-center" key={brand.alt}>
                  <img src={brand.src} alt={brand.alt} className="h-12 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 w-full">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full font-medium mb-4">Our Services</span>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Premium Automotive Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">From routine maintenance to complex repairs, we've got you covered with our comprehensive services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="service-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Maintenance" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 service-icon w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-500 text-2xl shadow-md transition-all duration-500">
                    <i className="fas fa-tools"></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Preventive Maintenance</h3>
                  <p className="text-gray-600 mb-4">Keep your vehicle running smoothly with our comprehensive maintenance packages.</p>
                  <div className="flex justify-between items-center">
                   
                  </div>
                </div>
              </div>
              {/* Service Card 2 */}
              <div className="service-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Repairs" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 service-icon w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-500 text-2xl shadow-md transition-all duration-500">
                    <i className="fas fa-wrench"></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Repairs</h3>
                  <p className="text-gray-600 mb-4">Our certified technicians handle everything from minor fixes to major overhauls.</p>
                  <div className="flex justify-between items-center">
                    
                  </div>
                </div>
              </div>
              {/* Service Card 3 */}
              <div className="service-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Detailing" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 service-icon w-14 h-14 bg-white rounded-full flex items-center justify-center text-emerald-500 text-2xl shadow-md transition-all duration-500">
                    <i className="fas fa-spa"></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Detailing</h3>
                  <p className="text-gray-600 mb-4">Restore your vehicle's showroom shine with our professional detailing services.</p>
                  <div className="flex justify-between items-center">
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/sign-up" className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
                Sign Up Now <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

       

{/* how it works section  */}
 <section className="py-20 bg-white" id="how-it-works">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full font-medium mb-4">
          Process
        </span>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          How DoneEZ Works
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Car service, made easy—in just 3 simple steps
        </p>
      </div>
      <div className="relative">
        <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="relative group">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 relative z-10">
                1
                <div className="absolute -inset-2 rounded-full bg-emerald-200/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-  -800 mb-3">
                Request Service
              </h3>
              <p className="text-gray-600 mb-4">
                Tell us what you  need or describe the issue using our easy online platform.
              </p>
              <div className="flex items-center text-emerald-500 font-medium">
                <i className="fas fa-mobile-alt mr-2" /> Mobile Webapp Available
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex flex-col items-center lg:items-center text-center">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 relative z-10">
                2
                <div className="absolute -inset-2 rounded-full bg-emerald-200/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Get Matched & Book
              </h3>
              <p className="text-gray-600 mb-4">
                Receive instant quotes from certified local mechanics who are ready now. 
Choose your provider and book with a small deposit—it goes toward your 
total cost.
              </p>
              <div className="flex items-center text-emerald-500 font-medium">
                <i className="fas fa-bolt mr-2" /> Instant Quotes
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 relative z-10">
                3
                <div className="absolute -inset-2 rounded-full bg-emerald-200/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Enjoy Service
              </h3>
              <p className="text-gray-600 mb-4">
               Service happens on your schedule. 
Pay the balance in person when the job’s done. 
              </p>
              <div className="flex items-center text-emerald-500 font-medium">
                <i className="fas fa-calendar-check mr-2" /> Flexible Scheduling
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience DoneEZ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who've transformed their
              auto care experience.
            </p>
            <a
              className="inline-block px-8 py-3 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              href="/sign-up">
              Get Started Now <i className="fas fa-arrow-right ml-2" />
            </a>
          </div>
          <div className="hidden md:block relative overflow-hidden">
            <img
              alt="Happy Customer"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/80 to-teal-600/80" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                  />
                  <img
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                  />
                  <img
                    alt="Customer"
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-bold">4.9/5 Rating</p>
                  <p className="text-sm opacity-90">From 1,200+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
          <div className="text-5xl font-bold mb-2 counter" data-target="12500">
            0
          </div>
          <div className="text-emerald-300 font-medium">Happy Customers</div>
        </div>
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
          <div className="text-5xl font-bold mb-2 counter" data-target="850">
            0
          </div>
          <div className="text-emerald-300 font-medium">Certified Pros</div>
        </div>
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
          <div className="text-5xl font-bold mb-2 counter" data-target="45">
            0
          </div>
          <div className="text-emerald-300 font-medium">Service Categories</div>
        </div>
        <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
          <div className="text-5xl font-bold mb-2 counter" data-target="98">
            0
          </div>
          <div className="text-emerald-300 font-medium">% Satisfaction</div>
        </div>
      </div>
    </div>
  </section> */}
  <section className="py-20 bg-gray-50" id="mechanics">
    <div className="container mx-auto px-6">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full font-medium mb-4">
          For Professionals
        </span>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Grow Your Auto Service Business
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our network of trusted professionals and get access to more
          customers
        </p>
      </div>
      <div className="grid  gap-12 items-center">
        <div className='justify-center flex flex-col items-center'>
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column' , gap: '2rem' , margin:'3rem'}}>
            <div className="flex items-start" >
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <i className="fas fa-bolt" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">
                  More Customers
                </h3>
                <p className="text-gray-600">
                  Get connected with customers actively looking for your
                  services in your area.
                </p>
              </div>
            </div>
            <div className="flex  items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <i className="fas fa-chart-line" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Business Growth
                </h3>
                <p className="text-gray-600">
                  Our platform helps you fill your schedule and grow your
                  revenue.
                </p>
              </div>
            </div>
            <div className="flex  items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <i className="fas fa-cog" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Easy Management
                </h3>
                <p className="text-gray-600">
                  Our tools make scheduling, payments, and customer
                  communication simple.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a
              className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              href="/sign-up">
              Join Our Network <i className="fas fa-arrow-right ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* testimonials section */}
  <section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full font-medium mb-4">
        Testimonials
      </span>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        What Our Customers Say
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Don't just take our word for it - hear from our satisfied customers
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <img
              alt="Sarah J."
              className="w-14 h-14 rounded-full"
              src="https://randomuser.me/api/portraits/women/44.jpg"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-800">Sarah J.</h4>
            <div className="flex items-center text-yellow-400">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          "I was amazed by how quickly DoneEZ connected me with a professional
          who fixed my car's AC the same day. The service was excellent and the
          price was fair."
        </p>
        <div className="text-emerald-500">
          <i className="fas fa-quote-right text-3xl opacity-20" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <img
              alt="Michael T."
              className="w-14 h-14 rounded-full"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-800">Michael T.</h4>
            <div className="flex items-center text-yellow-400">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          "As a busy professional, I don't have time to take my car to the shop.
          DoneEZ's mobile mechanic came to my office and did everything while I
          worked. Game changer!"
        </p>
        <div className="text-emerald-500">
          <i className="fas fa-quote-right text-3xl opacity-20" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <img
              alt="Lisa M."
              className="w-14 h-14 rounded-full"
              src="https://randomuser.me/api/portraits/women/68.jpg"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-gray-800">Lisa M.</h4>
            <div className="flex items-center text-yellow-400">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          "The detailing service through DoneEZ made my 5-year-old car look
          brand new again. The attention to detail was incredible and they came
          right to my home."
        </p>
        <div className="text-emerald-500">
          <i className="fas fa-quote-right text-3xl opacity-20" />
        </div>
      </div>
    </div>
  </div>
</section>

{/* cta section */}
   <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Ready to Transform Your Auto Care Experience?
    </h2>
    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
      Join thousands of satisfied customers who trust DoneEZ for their
      automotive needs.
    </p>
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
      <a
        className="px-8 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-gray-100 hover:shadow-xl transition-all transform hover:scale-105"
        href="sign-up">
        Get Started Now <i className="fas fa-arrow-right ml-2" />
      </a>
      {/* <a
        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all transform hover:scale-105"
        href="#">
        <i className="fas fa-phone-alt mr-2" /> (888) 555-1234
      </a> */}
    </div>
  </div>
</section>



{/* Faq section */}

<section className="py-20 bg-white" id="faq">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full font-medium mb-4">
        FAQs
      </span>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Find answers to common questions about our services
      </p>
    </div>
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-400 transition-all">
          <button className="w-full flex justify-between items-center p-6 text-left">
            <h3 className="text-lg font-bold text-gray-800">
              How quickly can I get service?
            </h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:rotate-180">
              <i className="fas fa-chevron-down" />
            </div>
          </button>
          <div className="px-6 pb-6 pt-0 hidden group-hover:block">
            <p className="text-gray-600">
              Most services can be scheduled same-day or next-day depending on
              provider availability in your area. Emergency services may be
              available even faster.
            </p>
          </div>
        </div>
        <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-400 transition-all">
          <button className="w-full flex justify-between items-center p-6 text-left">
            <h3 className="text-lg font-bold text-gray-800">
              Are your mechanics certified?
            </h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:rotate-180">
              <i className="fas fa-chevron-down" />
            </div>
          </button>
          <div className="px-6 pb-6 pt-0 hidden group-hover:block">
            <p className="text-gray-600">
              Yes, all service providers on our platform are thoroughly vetted
              and must maintain current certifications in their specialty areas.
            </p>
          </div>
        </div>
        <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-400 transition-all">
          <button className="w-full flex justify-between items-center p-6 text-left">
            <h3 className="text-lg font-bold text-gray-800">
              What if I'm not satisfied with the service?
            </h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:rotate-180">
              <i className="fas fa-chevron-down" />
            </div>
          </button>
          <div className="px-6 pb-6 pt-0 hidden group-hover:block">
            <p className="text-gray-600">
              We stand behind our services with a 100% satisfaction guarantee.
              If you're not completely happy, we'll work to make it right for you.
            </p>
          </div>
        </div>
        <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-400 transition-all">
          <button className="w-full flex justify-between items-center p-6 text-left">
            <h3 className="text-lg font-bold text-gray-800">
              How does pricing work?
            </h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:rotate-180">
              <i className="fas fa-chevron-down" />
            </div>
          </button>
          <div className="px-6 pb-6 pt-0 hidden group-hover:block">
            <p className="text-gray-600">
              You'll receive upfront pricing before booking. Prices are based on
              the service needed, your vehicle make/model, and your location. You have to pay 10% fee of the quote amound before hand on our platform and rest directly to the Mechanic.
              There are no hidden fees.
            </p>
          </div>
        </div>
         
      </div>
    </div>
  </div>
</section>

{/* footer */}

<footer className="bg-gray-900 text-white pt-16 pb-8">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <Link className="flex items-center space-x-2 mb-6" href="#">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <span className="text-2xl font-bold text-white">DoneEZ</span>
        </Link>
        <p className="text-gray-400 mb-6">
          Transforming the auto care experience with technology and trusted
          professionals.
        </p>
        <div className="flex space-x-4">
          <a
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-emerald-600 hover:text-white transition"
            href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-emerald-600 hover:text-white transition"
            href="#">
            <i className="fab fa-twitter" />
          </a>
          <a
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-emerald-600 hover:text-white transition"
            href="#">
            <i className="fab fa-instagram" />
          </a>
          <a
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-emerald-600 hover:text-white transition"
            href="#">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
        <ul className="space-y-3">
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Home
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#services">
              Services
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#how-it-works">
              How It Works
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#mechanics">
              For Mechanics
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#faq">
              FAQs
            </a>
          </li>
          
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-6">Services</h3>
        <ul className="space-y-3">
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Preventive Maintenance
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Engine Repair
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Brake Services
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Tire Services
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              Detailing
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-emerald-400 transition"
              href="#">
              and a lot more...
            </a>
          </li>
        </ul>
      </div>
      {/* <div>
        <h3 className="text-lg font-bold mb-6">Newsletter</h3>
        <p className="text-gray-400 mb-4">
          Subscribe to our newsletter for the latest updates and offers.
        </p>
        <form className="flex">
          <input
            className="px-4 py-3 rounded-l-lg bg-gray-800 text-white outline-none w-full"
            placeholder="Your email"
            type="email"
          />
          <button
            className="px-4 py-3 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition"
            type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </div> */}
    </div>
    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 mb-4 md:mb-0">
        © 2023 DoneEZ. All rights reserved.
      </p>
      <div className="flex space-x-6">
        < Link className="text-gray-400 hover:text-emerald-400 transition" href="#">
          Privacy Policy
        </Link>
        <Link className="text-gray-400 hover:text-emerald-400 transition" href="#">
          Terms of Service
        </Link>
       
      </div>
    </div>
  </div>
</footer>

      </main>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 invisible hover:bg-emerald-700"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
