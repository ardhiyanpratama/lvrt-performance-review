// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../src/styles/index.css'
import Login from './pages/Login';
import Review from './pages/Review';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // const { user, loading } = useAuth();
  
  // // Show loading state
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
  //         <p className="mt-4 text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return <Login />;
  // }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
