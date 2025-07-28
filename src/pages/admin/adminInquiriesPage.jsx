import { useState, useEffect } from "react";
import { inquiriesAPI } from "../../utils/api";
import { FaEnvelope, FaCheck, FaTrash, FaReply, FaClock } from "react-icons/fa";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, resolved, pending
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await inquiriesAPI.getAll();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await inquiriesAPI.update(id, { isResolved: true });
      fetchInquiries(); // Refresh the list
    } catch (error) {
      console.error("Error resolving inquiry:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await inquiriesAPI.delete(id);
        fetchInquiries(); // Refresh the list
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const handleSendResponse = async (id) => {
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    try {
      await inquiriesAPI.update(id, { 
        response: response,
        isResolved: true 
      });
      setResponse("");
      setSelectedInquiry(null);
      fetchInquiries(); // Refresh the list
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === "resolved") return inquiry.isResolved;
    if (filter === "pending") return !inquiry.isResolved;
    return true; // all
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Inquiries Management</h1>
          <p className="text-white/80">Manage customer inquiries and responses</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setFilter("resolved")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "resolved"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Resolved ({inquiries.filter(i => i.isResolved).length})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "pending"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Pending ({inquiries.filter(i => !i.isResolved).length})
              </button>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No inquiries found</h3>
            <p className="text-white/60">
              {filter === "all" 
                ? "No inquiries have been submitted yet." 
                : `No ${filter} inquiries found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInquiries.map((inquiry, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${
                  !inquiry.isResolved ? "border-l-4 border-red-400" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Inquiry Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-[#efac38] rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Inquiry #{inquiry.id}</h3>
                        <p className="text-white/60 text-sm">{inquiry.email}</p>
                        <p className="text-white/60 text-sm">
                          {new Date(inquiry.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-white/60 text-sm">Email:</span>
                        <p className="text-white font-semibold">{inquiry.email}</p>
                      </div>
                      <div>
                        <span className="text-white/60 text-sm">Phone:</span>
                        <p className="text-white font-semibold">{inquiry.phone}</p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <span className="text-white/60 text-sm">Message:</span>
                      <p className="text-white/80 leading-relaxed mt-1">{inquiry.message}</p>
                    </div>

                    {/* Response */}
                    {inquiry.response && (
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <span className="text-white/60 text-sm">Response:</span>
                        <p className="text-white/80 leading-relaxed mt-1">{inquiry.response}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-6">
                    {!inquiry.isResolved && (
                      <>
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title="Reply to Inquiry"
                        >
                          <FaReply className="text-white text-sm" />
                        </button>
                        <button
                          onClick={() => handleResolve(inquiry.id)}
                          className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                          title="Mark as Resolved"
                        >
                          <FaCheck className="text-white text-sm" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Delete Inquiry"
                    >
                      <FaTrash className="text-white text-sm" />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      inquiry.isResolved
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {inquiry.isResolved ? "Resolved" : "Pending Response"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Response Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-2xl mx-4">
              <h3 className="text-2xl font-bold text-white mb-4">
                Reply to Inquiry #{selectedInquiry.id}
              </h3>
              
              <div className="mb-4">
                <p className="text-white/80 mb-2">Customer Message:</p>
                <p className="text-white bg-white/5 rounded-lg p-3">{selectedInquiry.message}</p>
              </div>

              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">Your Response:</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows="6"
                  className="w-full bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 py-3 outline-none focus:border-[#efac38] transition-colors resize-none"
                  placeholder="Enter your response to the customer..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleSendResponse(selectedInquiry.id)}
                  className="flex-1 bg-[#efac38] text-white py-3 rounded-lg font-semibold hover:bg-[#efac38]/80 transition-colors"
                >
                  Send Response
                </button>
                <button
                  onClick={() => {
                    setSelectedInquiry(null);
                    setResponse("");
                  }}
                  className="flex-1 bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 