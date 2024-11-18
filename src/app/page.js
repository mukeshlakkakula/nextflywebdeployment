"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Creative from "@/components/Creative";
import LeadPopup from "@/components/LeadPopup";
import About from "@/components/About";
import OurServices from "@/components/OurServices";

import Features from "@/components/Features";
import HowWork from "@/components/HowWork";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
// import PricingDropDown from "../Components/PricingDropDown";

import { Element } from "react-scroll";
import Head from "next/head";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>
          FlyYourTech (FYT) | Leading Tech Solutions & Digital Innovation
          Partner
        </title>
        <meta
          name="description"
          content="Welcome to FlyYourTech (Fly Your Tech) - Your premier technology partner in India. Specializing in web development, mobile apps, blockchain, and AI/ML solutions. Transform your business with FYT's innovative tech solutions and expert team."
        />
        <meta
          name="keywords"
          content="FlyYourTech, Fly Your Tech, FYT, fly your tech, flyyourtech, fyt tech, fly-your-tech, FYTech, F.Y.T, fly tech, web development company, mobile app development, blockchain solutions, AI ML development, software company MP, IT services India, technology consulting, digital transformation, custom software development, React development, Node.js experts, startup technology partner, enterprise solutions, UI UX design, cloud computing, IT consulting MP, website development, app developers India, tech innovation partner"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:site_name"
          content="FlyYourTech | Fly Your Tech | FYT"
        />
        <meta
          property="og:title"
          content="FlyYourTech (FYT) | Innovation-Driven Technology Solutions"
        />
        <meta
          property="og:description"
          content="Transform your business with FlyYourTech's cutting-edge solutions. 200+ successful projects, 100+ satisfied clients. Web development, mobile apps, blockchain & AI solutions from India's rising tech innovator."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flyyourtech.com" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="FlyYourTech | Fly Your Tech (FYT) | Tech Excellence"
        />
        <meta
          name="twitter:description"
          content="Partner with FlyYourTech for innovative tech solutions. Expert web development, mobile apps, blockchain & AI services. Transform your digital presence with MP's leading tech team."
        />

        {/* Additional Meta Tags */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="author" content="FlyYourTech" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Madhya Pradesh" />
        <meta name="geo.position" content="22.9734;78.6569" />
        <meta name="ICBM" content="22.9734, 78.6569" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://flyyourtech.com" />

        {/* Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FlyYourTech",
            "alternateName": ["Fly Your Tech", "FYT", "fly your tech", "flyyourtech", "FYTech", "F.Y.T", "fly-your-tech", "fly tech"],
            "url": "https://flyyourtech.com",
            "description": "Premier technology solutions provider specializing in web development, mobile apps, blockchain, and AI/ML solutions",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://flyyourtech.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FlyYourTech",
              "logo": {
                "@type": "ImageObject",
                "url": "https://flyyourtech.com/static/media/IMG_20240817_131018-removebg.7ac4faee31ec504e2fde.png"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61564327175573",
                "https://www.instagram.com/flyyourtech/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "IN"
              },
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+917470391011",
                "contactType": "customer service",
                "areaServed": ["IN", "Worldwide"],
                "availableLanguage": ["en", "hi"],
                "contactOption": "TollFree"
              }]
            },
            "offers": {
              "@type": "AggregateOffer",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Web Development",
                  "description": "Custom web applications using React, Node.js, and modern technologies"
                },
                {
                  "@type": "Offer",
                  "name": "Mobile App Development",
                  "description": "Native and cross-platform mobile applications"
                },
                {
                  "@type": "Offer",
                  "name": "Blockchain Development",
                  "description": "Custom blockchain solutions and smart contracts"
                },
                {
                  "@type": "Offer",
                  "name": "AI/ML Solutions",
                  "description": "Artificial Intelligence and Machine Learning implementation"
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "100",
              "bestRating": "5",
              "worstRating": "1"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://flyyourtech.com",
              "name": "FlyYourTech - Technology Solutions & Digital Innovation",
              "description": "Leading technology solutions provider offering web development, mobile apps, blockchain, and AI/ML solutions"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "22.9734",
                "longitude": "78.6569"
              }
            }
          }
        `,
          }}
        />
      </Head>

      <section className="relative overflow-hidden bg-[#050c36]">
        <img
          src="https://techy-xi.vercel.app/assets/img/shape/line-1.svg"
          className="h-[550px] object-contain top-1 left-1  absolute z-30"
          alt=""
        />

        <div className="fixed mx-auto flex items-center justify-center w-full p-3 lg:p-0 lg:w-full z-50 bg-[#050c36]">
          <Navbar />
        </div>
        <Element name="home" className="section">
          <LeadPopup />
          <Main />
          <Creative />
        </Element>

        <Element name="about" className="section">
          <About />
        </Element>

        <Element name="OurServices" className="section">
          <OurServices />
        </Element>

        {/* <Element name="OurPackages" className="section">
          <PricingDropDown />
        </Element> */}

        <Element name="Feature" className="section">
          <div className="mt-10">
            <Features />
            <HowWork />
            <Testimonials />
          </div>
        </Element>

        <Element name="contact" className="section">
          <ContactUs />
          <Footer />
        </Element>
      </section>
    </>
  );
}

export default Home;
