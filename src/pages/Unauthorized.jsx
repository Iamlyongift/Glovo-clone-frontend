import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-[#FF6B35]">403</h1>
      <p className="text-xl font-semibold text-[#1A1A2E] mt-4">Access Denied</p>
      <p className="text-gray-500 mt-2">You don't have permission to view this page.</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-[#FF6B35] hover:bg-[#E8541A] text-white px-6 py-3 rounded-xl font-medium transition">
        Go Back
      </button>
    </div>
  );
}