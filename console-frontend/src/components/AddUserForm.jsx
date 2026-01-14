import { useState } from "react";
import { API_ENDPOINTS } from '../utils/api';

const AddUserForm = ({ onAdd, isOpen, onClose, platform = "cf" }) => {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/${platform}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(`✅ ${handle} added!`);
        setHandle("");
        onAdd();
        setTimeout(() => {
          setMsg("");
          onClose();
        }, 1000);
      } else {
        setMsg(`❌ ${data.error}`);
      }
    } catch (err) {
      setMsg(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformTitle = () => {
    if (platform === "cf") return "Codeforces Handle";
    if (platform === "lc") return "LeetCode Handle";
    return "Handle";
  };

  const getPlatformColor = () => {
    if (platform === "cf") return "purple";
    if (platform === "lc") return "blue";
    return "gray";
  };

  const getPlaceholder = () => {
    if (platform === "cf") return "e.g. tourist";
    if (platform === "lc") return "e.g. leetcode_username";
    return "Enter handle";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 text-2xl font-bold hover:text-red-400 transition-colors"
        >
          ×
        </button>
        <h2 className={`text-2xl font-bold mb-6 text-${getPlatformColor()}-400`}>
          Add {getPlatformTitle()}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-${getPlatformColor()}-500 focus:border-transparent transition-all`}
              placeholder={getPlaceholder()}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-${getPlatformColor()}-500 to-${getPlatformColor() === 'purple' ? 'purple' : getPlatformColor() === 'blue' ? 'blue' : 'green'}-600 text-white py-3 rounded-lg font-semibold hover:from-${getPlatformColor()}-400 hover:to-${getPlatformColor() === 'purple' ? 'purple' : getPlatformColor() === 'blue' ? 'blue' : 'green'}-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding...
              </span>
            ) : (
              "Add Handle"
            )}
          </button>
        </form>
        {msg && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            msg.includes('✅') 
              ? 'bg-green-900 text-green-300 border border-green-700' 
              : 'bg-red-900 text-red-300 border border-red-700'
          }`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserForm;
