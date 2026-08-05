import { useState } from "react";

function AddChildModal() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/household/children", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) console.log("Successfully added!");
        else {
          console.log(data.message);
        }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    
    
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">
          Add a child
        </h1>

        <input
          type="text"
          placeholder="Child name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-semibold"
        >
          Add Child
        </button>
      </div>
    </div>
  );
}
export default AddChildModal;
