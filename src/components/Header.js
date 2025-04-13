"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const defaultMenu = [
    { name: "Acerca de", href: "/acerca" },
    { name: "Servicios", href: "/servicios" },
    { name: "Preguntas", href: "/preguntas" },
    { name: "Aplicacion boricue", href: "/auth/login" },
]

const presetStyles = {
    default: {
        bgColor: "bg-uno",
        textColor: "text-texto",
        hoverColor: "text-dos",
        activeColor: "text-divisiones",
        mobileMenuBg: "bg-fondo/95",
        desktopMenuBg: "bg-fondo",
        accentColor: "bg-uno",
    },
    light: {
        bgColor: "bg-white",
        textColor: "text-gray-800",
        hoverColor: "text-blue-500",
        activeColor: "text-blue-700",
        mobileMenuBg: "bg-white/95",
        desktopMenuBg: "bg-gray-100",
        accentColor: "bg-blue-500",
    },
    dark: {
        bgColor: "bg-gray-900",
        textColor: "text-gray-100",
        hoverColor: "text-blue-400",
        activeColor: "text-blue-300",
        mobileMenuBg: "bg-gray-800/95",
        desktopMenuBg: "bg-gray-800",
        accentColor: "bg-blue-400",
    },
    colorful: {
        bgColor: "bg-purple-700",
        textColor: "text-white",
        hoverColor: "text-yellow-300",
        activeColor: "text-yellow-200",
        mobileMenuBg: "bg-purple-600/95",
        desktopMenuBg: "bg-purple-600",
        accentColor: "bg-yellow-400",
    },
}

const Header = ({
    menuItems = defaultMenu,
    logo = "/LogoBoricueCircular.png",
    logoWidth = 90,
    logoHeight = 90,
    logoAlt = "Logo",
    brandName = "",
    stylePreset = "default",
    className = "",
}) => {
    const styles = presetStyles[stylePreset] || presetStyles.default

    const [isOpen, setIsOpen] = useState(false)
    const [activeItem, setActiveItem] = useState("")
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)

        const path = window.location.pathname
        const currentItem = menuItems.find(
            (item) => path === item.href || path.startsWith(`${item.href}/`)
        )
        if (currentItem) setActiveItem(currentItem.name)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [menuItems])

    const { bgColor, textColor, hoverColor, activeColor, mobileMenuBg, desktopMenuBg, accentColor } = styles

    return (
        <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ${bgColor} ${textColor} ${scrolled ? "shadow-md py-1" : "py-2"
                } ${className}`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={logo}
                            width={logoWidth}
                            height={logoHeight}
                            alt={logoAlt}
                            className="object-contain"
                        />
                    </div>
                    {brandName && (
                        <span className={`text-2xl font-bold transition-colors duration-300 group-hover:${hoverColor}`}>
                            {brandName}
                        </span>
                    )}
                </Link>

                <nav className={`hidden md:flex ${desktopMenuBg} p-2 rounded-lg items-center justify-center space-x-8`}>
                    {menuItems.map((item) => {
                        const isActive = activeItem === item.name
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative px-3 py-2 font-medium text-lg transition-all duration-300 hover:${hoverColor} ${isActive ? activeColor : textColor
                                    }`}
                                onClick={() => setActiveItem(item.name)}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="activeIndicator"
                                        className={`absolute inset-0 rounded-md ${accentColor} opacity-20`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <span
                                    className={`absolute bottom-0 left-0 w-0 h-0.5 ${accentColor} transition-all duration-300 ease-in-out hover:w-full`}
                                />
                            </Link>
                        )
                    })}
                </nav>

                <button
                    className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${isOpen ? "bg-opacity-20" : ""
                        } focus:outline-none transition-colors duration-300`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isOpen ? <X size={24} className={hoverColor} /> : <Menu size={24} className={textColor} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden ${mobileMenuBg} backdrop-blur-sm border-b border-Divisiones shadow-lg overflow-hidden`}
                    >
                        <motion.div
                            className="container mx-auto px-4 py-3"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                                },
                            }}
                        >
                            {menuItems.map((item, index) => {
                                const isActive = activeItem === item.name
                                return (
                                    <motion.div
                                        key={item.name}
                                        variants={{
                                            open: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: 0.3, ease: "easeOut" },
                                            },
                                            closed: {
                                                opacity: 0,
                                                y: -20,
                                                transition: { duration: 0.3, ease: "easeIn" },
                                            },
                                        }}
                                        className="mb-1"
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center py-3 px-4 text-lg font-medium rounded-lg transition duration-300 
                      ${isActive ? activeColor : textColor} 
                      hover:${hoverColor} hover:bg-Divisiones/10`}
                                            onClick={() => {
                                                setActiveItem(item.name)
                                                setIsOpen(false)
                                            }}
                                        >
                                            <motion.span
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: index * 0.1 + 0.2 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                            {isActive && (
                                                <motion.span
                                                    layoutId="mobileActiveIndicator"
                                                    className={`ml-2 w-1.5 h-1.5 rounded-full ${accentColor}`}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
