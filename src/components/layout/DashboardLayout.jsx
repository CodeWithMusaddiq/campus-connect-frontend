import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <main className="relative max-w-7xl mx-auto px-4 md:px-8 py-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;