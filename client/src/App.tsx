import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen">
        <h1 className="text-4xl">{count}</h1>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCount((prev) => prev - 1)}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
