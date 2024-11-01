import React from 'react';
import { World } from './components/World';
import { Loader } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin text-white">
          <Loader size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <World />
      <div className="absolute top-4 left-4 text-white bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
        <h1 className="text-xl font-bold mb-2">Solar System Explorer</h1>
        <p className="text-sm">Use mouse to orbit • Scroll to zoom</p>
      </div>
    </div>
  );
}

export default App;