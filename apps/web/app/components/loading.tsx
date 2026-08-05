import {Logo} from "../components/logo"

export function Loading() {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
  
         
        <div className="scale-150">
            <Logo variant = "secondary"/>
          </div>
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-surface"></div>
  
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
          </div>
  
          
          
          
          <p className="font-Ubuntu text-accent animate-pulse">
            Loading your next watch...
          </p>
  
        </div>
      </div>
    );
  }