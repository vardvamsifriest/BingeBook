export function Loading() {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
  
          {/* Spinner */}
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-surface"></div>
  
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"></div>
          </div>
  
          {/* App Name */}
          <h1 className="font-Ubuntu text-3xl font-bold text-text-primary tracking-wide">
            Kinora
          </h1>
  
          {/* Loading */}
          <p className="font-Ubuntu text-text-muted animate-pulse">
            Loading your next watch...
          </p>
  
        </div>
      </div>
    );
  }