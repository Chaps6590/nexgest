import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export const NoteView = () => {
    return (
      <div className="flex flex-col w-full gap-4  rounded-2xl m-1 p-6 text-black">
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-light">Nota</h1>
          <Button className="flex items-center gap-2 px-4 py-2">
            <Save className="w-6 h-6" />
            Guardar
          </Button>
        </div>
  
        {/* Campos de texto */}
        <div className="flex flex-col gap-4">
          
          <textarea
            placeholder="¿Titulo?"
            className="text-base"
          />
          <textarea
            placeholder="¿Qué hay de nuevo?"
            className="text-base m-1"
            rows={5}             
          />          


        </div>

      </div>
    )
  }
