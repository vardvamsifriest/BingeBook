import {Logo} from "./components/logo"
import { Button } from "../../../packages/ui/src/button"
export default function Landing()
{
  return (
    <div className = "bg-background h-screen w-full">
      <div className="flex justify-center pb-30">

      <div>
        <Button size="md" variant="primary" text="Get started" />
      </div>
      </div>
    </div>
  )
}