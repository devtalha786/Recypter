"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DoorOpen, DoorOpenIcon, LogOutIcon, Menu, X } from "lucide-react";
import { ScrollToSection } from "@/utils/HelperFunctions";
import path from "path";
import Image from "next/image";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "@/store/auth/authSlice";
import { toast } from "react-hot-toast";
import { FaDoorOpen } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);
  const navItems = [
    { name: "Home", id: "/home" },
    { name: "Receipts", id: "/receipts" },
    { name: "Emulators", id: "/emulators" },
    { name: "Paper", id: "/papers" },
    { name: "Review", id: "/review" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = async (href) => {
    setIsMenuOpen(false);

    if (pathname === "/about-us") {
      if (!href.startsWith("/")) {
        await router.push("/home");
        setTimeout(() => {
          ScrollToSection(href);
        }, 100);
      } else {
        router.push(href);
      }
    } else {
      if (href.startsWith("/")) {
        router.push(href);
      } else {
        ScrollToSection(href);
      }
    }
  };

  const { user } = useSelector((state) => state.auth);
  console.log("user====>", user);
  return (
    <>
      <nav className="fixed w-full h-20 bg-white z-50">
        <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            <Link
              href="/home"
              className="text-4xl font-bold uppercase text-[#6259b5]"
            >
              Recypter{" "}
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.name == "Review" ? (
                  <Link
                    href="https://discord.gg/cXq93Z7yDA"
                    key={item.name}
                    className={`hover:text-[#6259b5] text-base font-medium transition-colors ${
                      item.id == pathname ? "text-[#6259b5]" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.id)}
                    className={`hover:text-[#6259b5] text-base font-medium transition-colors ${
                      item.id == pathname ? "text-[#6259b5]" : "text-[#a39fc0]"
                    }`}
                  >
                    {item.name}
                  </button>
                )
              )}
              {user && user.email === "itskrish.thusi@gmail.com" && (
                <button
                  onClick={() => handleNavClick("/account")}
                  className={`hover:text-[#3288dd] text-base font-medium transition-colors ${
                    pathname === "/account" ? "text-[#3288dd]" : "text-gray-300"
                  }`}
                >
                  Free Account
                </button>
              )}
              {user && user?.uid ? (
                <div className="flex items-center">
                  <Button
                    onClick={() => dispatch(logout())}
                    className="bg-[#6259b5] hover:bg-red-500 text-white px-6 py-2.5 rounded-md text-base"
                  >
                    Logout
                    <LogOutIcon className="h-6 w-6 text-white ml-2" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[#6259b5] hover:bg-[#6259b5]/80 text-white px-6 py-2.5 rounded-md text-base"
                >
                  Login
                </Button>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                className="p-2 text-[#3288dd]"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-sm py-4 px-4 shadow-lg">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.id}
                    className="text-gray-300 hover:text-[#3288dd] text-base font-medium transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && user.email === "itskrish.thusi@gmail.com" && (
                  <Link
                    href="/account"
                    className="text-gray-300 hover:text-[#3288dd] text-base font-medium transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("/account");
                    }}
                  >
                    Free Account
                  </Link>
                )}
                {user && user?.uid ? (
                  <Button
                    onClick={() => dispatch(logout())}
                    className="bg-[#3288dd] hover:bg-[#3288dd] text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-[#3288dd] hover:bg-[#3288dd] text-white px-4 py-2 rounded-md"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>
  );
};

export default Navbar;
