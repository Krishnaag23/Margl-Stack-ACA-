import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import ProjectCard from "@/components/Project/ProjectCard";

export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};
const projects = [
  {
    id: 83,
    title: "Testing Project",
    description: "This is a description of the testing project.",
    skills:
      "Back-end developer, Front-end developer, Full stack developer, UI/UX designer, DevOps engineer",
    tags: ["video", "podcast", "alx"],
    timestamp: "a few seconds ago",
  },
  // Add more projects as needed
];


export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      {/* <Feature /> */}
      <About />
      {/* <FeaturesTab /> */}
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      
      <Contact />

    </main>
  );
}
