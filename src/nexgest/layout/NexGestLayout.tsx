import { ReactNode } from "react";

import { NavBar, SideBar } from "../components";

interface Props {
  children?: ReactNode;
}

const drawerWidth = 240;

export const NexGestLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen max-h-screen">


      {/* Navbar arriba */}
      <NavBar />

        {/* Contenido principal */}
        <main className="flex ">
          {/* Sidebar - columna izquierda */}
          <SideBar drawerWidth={drawerWidth}/>
          {children}
        </main>


    </div>
  );
}
