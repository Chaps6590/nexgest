import { Bookmark } from "lucide-react"
import { JSX } from "react"

interface SideBarProps {
  drawerWidth: number
}

interface MenuItem {
  title: string
  description: string
  icon: JSX.Element
}

const menuItems: MenuItem[] = [
  {
    title: "Usuarios",
    description: "Gestión de usuarios y permisos",
    icon: <Bookmark className="w-5 h-5 mt-1" />,
  },
  {
    title: "Tareas",
    description: "Administración de tareas activas",
    icon: <Bookmark className="w-5 h-5 mt-1" />,
  },
  {
    title: "Reportes",
    description: "Estadísticas y visualización",
    icon: <Bookmark className="w-5 h-5 mt-1" />,
  },
]

export const SideBar = (({ drawerWidth }: SideBarProps) => {
  return (
    <nav
      className={`bg-zinc-800 text-white h-screen shadow-md flex flex-col mt-[calc()`}
      style={{ width: drawerWidth }}
    >
      <div className="p-4 border-b border-zinc-700">
        <h1 className="text-lg font-semibold tracking-wide">Chaps</h1>
      </div>

      <ul className="mt-2 flex flex-col gap-1">
        {menuItems.map(({ title, description, icon }) => (
          <li key={title} className="border-b border-zinc-700">
            <button
              className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition flex gap-3 items-start"
            >
              {icon}
              <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-zinc-300">{description}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
})
