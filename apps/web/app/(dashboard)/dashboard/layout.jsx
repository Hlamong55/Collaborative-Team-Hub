import Sidebar from "../../../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">
      
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}