import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router"; 
import { httpClient } from "../configs/HttpClient";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {

      setIsLoading(true)
      try {
        const response = await httpClient.get(`/api/v1/users/profile`);
        if (response?.data) {
          setUser(response.data);
        }
      } catch (err) {
        // Safely check for response status
        if (err.response?.status === 404) {
          setError(err.response?.data?.message || "User profile not found.");
        } else {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (

    <>

    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Profile Info</h1>
        <Link 
          to="/new-address" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm font-medium"
        >
          + Add new address
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Avatar Section */}
        <div className="flex flex-col items-center pt-8 pb-4 border-b border-gray-100 bg-gray-50">
          <MdAccountCircle className="text-gray-400" size={120} />
          <button className="mt-4 text-fuchsia-600 hover:text-fuchsia-700 font-bold text-sm tracking-wider">
            ADD PICTURE
          </button>
        </div>

        {/* User Details */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-lg font-medium text-gray-800">
                {user?.firstname || ""} {user?.lastname || ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email ID</p>
              <p className="text-lg font-medium text-gray-800">{user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="text-lg font-medium text-gray-800 capitalize">{user?.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="text-lg font-medium text-gray-800">{user?.phoneNumber || "N/A"}</p>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Addresses Section */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Saved Addresses</h2>
          
          {user?.addresses && user.addresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {user.addresses.map((address) => (
                <div 
                  key={address?.id} 
                  className="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded uppercase font-bold tracking-wide">
                      {address?.type || "Standard"}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium">{address?.addressLine1}</p>
                  {address?.addressLine2 && <p className="text-gray-600">{address.addressLine2}</p>}
                  <p className="text-gray-600 mt-1">
                    {address?.city}, {address?.state} - {address?.pinCode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No addresses saved yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default UserProfile;