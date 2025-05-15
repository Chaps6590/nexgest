import { Star } from "lucide-react"

export const NothingSelectedView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-110px)] w-full  bg-primary rounded-2xl m-1 p-6 text-white">
      <Star className="w-24 h-24 mb-4" />
      <h2 className="text-2xl font-medium">Select or create an entry</h2>
    </div>
  )
}