import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import { useAuthStore } from "@/store/auth"

const navLinks = [
    { name: "Servicios", href: "#servicios" },
    { name: "Salir", href: "#contacto" },
  ]


export const NavBar = () => {
    const [open, setOpen] = React.useState(false)

    const logout = useAuthStore((state) => (state.logout))

  return (
    <header className="w-full border-b shadow-sm bg-black ">
      <div className="h-14 mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-600">NEX GEST</h1>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (

            link.name == "Salir" ? (
              <button
              key={link.name}
              onClick={() => {
                logout();
                setOpen(false);                
              }}
              className="text-amber-50 hover:text-blue-800 transition w-full text-left"
            >
              {link.name}
            </button>
            ):(
            <a
              key={link.name}
              href={link.href}
              className="text-amber-50 hover:text-blue-800 transition"
            >
              {link.name}
            </a>
            )


          ))}
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          open ? "max-h-40" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col items-start gap-2 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-black transition w-full"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
