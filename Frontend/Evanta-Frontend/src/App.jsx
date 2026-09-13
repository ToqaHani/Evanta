import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-shell">
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
export default App;
