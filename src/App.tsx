import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import TodoDetail from './pages/TodoDetail';
import NotFound from './pages/NotFound';
import Welcome from './components/welcome';
import Navbar from './components/navbar';
import TaskPlanner from './pages/taskplanner';
import CreateTask from './pages/createTask';
import CreateTaskCategory from './pages/createTaskCategory';
import './index.css';
import TaskDetailPage from './components/taskDetauil';


export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000); // 20 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (showWelcome) {
    return <Welcome />;
  }

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/taskplanner" element={<TaskPlanner />} />
        <Route path="/createTask" element={<CreateTask/>} />
        <Route path="/createTaskCategory" element={<CreateTaskCategory/>} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
      </Routes>
      </>
    
  );
}

// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import TodoDetail from './pages/TodoDetail';
// import NotFound from './pages/NotFound';
// import Welcome from './components/welcome';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [showWelcome, setShowWelcome] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowWelcome(false);
//     }, 20000); // 20 seconds

//     return () => clearTimeout(timer); // cleanup
//   }, []);

//   return showWelcome ? <Welcome /> : <Home />;
// }
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/todos/:id" element={<TodoDetail />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
