import { useEffect, useState } from 'react';
import { getAllUsers, toggleUserActive } from '../../api/admin';
import { UserX, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const ROLE_STYLES = {
  CUSTOMER: 'bg-blue-100 text-blue-700',
  VENDOR:   'bg-purple-100 text-purple-700',
  COURIER:  'bg-yellow-100 text-yellow-700',
  ADMIN:    'bg-red-100 text-red-700',
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (userId) => {
    setToggling(userId);
    try {
      const res = await toggleUserActive(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? res.data : u)));
      toast.success(`User ${res.data.active ? 'activated' : 'suspended'}`);
    } catch {
      toast.error('Failed to update user');
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">All Users 👥</h1>
            <p className="text-sm text-gray-400 mt-1">{users.length} registered users</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {['CUSTOMER', 'VENDOR', 'COURIER', 'ADMIN'].map((role) => (
            <div key={role} className="bg-white rounded-2xl shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-[#1A1A2E]">
                {users.filter((u) => u.role === role).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">{role}S</p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span className="col-span-4">Name / Email</span>
            <span className="col-span-2">Role</span>
            <span className="col-span-3">Phone</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-1"></span>
          </div>

          {users.map((user) => (
            <div key={user.id}
              className="grid grid-cols-12 px-5 py-4 border-b border-gray-50 items-center hover:bg-gray-50 transition">
              <div className="col-span-4">
                <p className="font-semibold text-[#1A1A2E] text-sm">{user.fullName}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <div className="col-span-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ROLE_STYLES[user.role]}`}>
                  {user.role}
                </span>
              </div>
              <div className="col-span-3 text-sm text-gray-500">
                {user.phoneNumber || '—'}
              </div>
              <div className="col-span-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {user.active ? 'Active' : 'Suspended'}
                </span>
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => handleToggle(user.id)}
                  disabled={toggling === user.id}
                  title={user.active ? 'Suspend user' : 'Activate user'}
                  className={`p-2 rounded-lg transition ${
                    user.active
                      ? 'text-red-400 hover:bg-red-50'
                      : 'text-green-500 hover:bg-green-50'
                  }`}>
                  {user.active ? <UserX size={16} /> : <UserCheck size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}