import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/SalesLeadPage.css";

const SalesLeadPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
      fetchLeads(storedUser._id);
    }
  }, [reload]);

  const fetchLeads = async (userId) => {
    try {
      const response = await axios.get(`https://salesportalserver-1.onrender.com/leads/${userId}`);
      setLeads(response.data);
    } catch (error) {
      console.log("ERROR fetching leads", error);
    }
  };

  const deleteLead = (id) => {
    axios
      .delete(`http://localhost:3333/deleteleads/${id}`)
      .then(() => {
        console.log("Lead deleted");
        setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
      })
      .catch((error) => {
        console.error("DELETE ERROR", error);
      });
  };

  const editLead = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLeads = leads.filter((lead) =>
    `${lead.leadFirstName} ${lead.leadLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sales-lead-page">
      <header className="header">
        <h1>Sales Lead Management</h1>
        <div className="profile-container">
          <div className="profile" onClick={handleDropdownClick}>
            <span className="profile-name">{user.leadFirstName}</span>
            <span className={`dropdown-icon ${dropdownOpen ? "open" : ""}`}>
              ▼
            </span>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
    
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search leads by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      

      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>City</th>
            <th>Date</th>
            <th>State</th>
            <th>Referred By</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td data-label="Name">
                {lead.leadFirstName} {lead.leadLastName}
              </td>
              <td data-label="Email">{lead.leadEmail}</td>
              <td data-label="Number">{lead.leadNumber}</td>
              <td data-label="City">{lead.leadCity}</td>
              <td data-label="Date">{lead.leadDate}</td>
              <td data-label="State">{lead.leadState}</td>
              <td data-label="Referred By">{lead.leadReferredBy}</td>
              <td data-label="Source">{lead.leadSource}</td>
              <td data-label="Actions">
                <button onClick={() => editLead(lead._id)}>Edit</button>
                <button onClick={() => deleteLead(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-lead-form" style={{ textDecoration: 'none' }}>
        <button className="add-lead-button">Add Lead</button>
      </Link>
    </div>
  );
};

export default SalesLeadPage;
