"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#eef2ff] p-12  ">
      {/* Top Navigation */}
      <div className="flex flex-col  md:flex-row justify-between items-center mb-16">
        <Link
          href="/home"
          className="text-4xl font-bold uppercase text-[#6259b5]"
        >
          Recypter{" "}
        </Link>

        {/* <nav className="flex flex-wrap justify-center gap-6">
          <Link
            href="/about-us"
            className="text-white  underline hover:text-colorTheme-primary underline-offset-4 hover:underline"
          >
            About us
          </Link>
          <Link
            href="/services"
            className="text-white underline hover:text-colorTheme-primary underline-offset-4 hover:underline"
          >
            Services
          </Link>
          <Link
            href="/use-cases"
            className="text-white underline hover:text-colorTheme-primary underline-offset-4 hover:underline"
          >
            Use Cases
          </Link>
          <Link
            href="/pricing"
            className="text-white underline hover:text-colorTheme-primary underline-offset-4 hover:underline"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-white underline hover:text-colorTheme-primary underline-offset-4 hover:underline"
          >
            Blog
          </Link>
        </nav> */}

        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-[#6259b5] hover:text-colorTheme-primary"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://Instagram.com"
            target="_blank"
            className="text-[#6259b5] hover:text-colorTheme-primary"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>

          <Link
            href="https://Instagram.com"
            target="_blank"
            className="text-[#6259b5] hover:text-colorTheme-primary"
          >
            <FaTiktok className="h-6 w-6" />
            <span className="sr-only">TikTok</span>
          </Link>

          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-[#6259b5] hover:text-colorTheme-primary"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-[#6259b5] hover:text-colorTheme-primary"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>

      

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[#6259b5]">
        <div className="flex flex-col sm:flex-row  items-center justify-center gap-4 text-[#6259b5]">
          <p>© 2025 Recypter. All Rights Reserved.</p>
          {/* <Link
            href="/privacy"
            className="hover:text-colorTheme-primary underline underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
