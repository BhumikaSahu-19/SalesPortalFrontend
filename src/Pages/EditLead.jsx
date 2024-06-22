import React, { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLead = () => {
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [city, setCity] = useState("");
  let [date, setDate] = useState("");
  let [state, setState] = useState("");
  let [referredBy, setReferredBy] = useState("");
  let [source, setSource] = useState("");
  let [description, setDescription] = useState("");
  let navigate = useNavigate();
  let leadId = useParams();

  useEffect(()=>{
    axios.get(`https://salesportalserver-1.onrender.com/edit/${leadId.id}`)
    .then((resp)=>{ 
      setFirstName(resp.data.leadFirstName)
      setLastName(resp.data.leadLastName)
      setEmail(resp.data.leadEmail)
      setNumber(resp.data.leadNumber)
      setCity(resp.data.leadCity)
      setState(resp.data.leadState)
      setDate(resp.data.leadDate)
      setReferredBy(resp.data.leadReferredBy)
      setSource(resp.data.leadSource)
      setDescription(resp.data.leadDescription)
    })
    .catch(()=>{console.log(console.log("error"))})
  },[])

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      leadFirstName: firstname,
      leadLastName: lastname,
      leadEmail: email,
      leadNumber: number,
      leadDate: date,
      leadCity: city,
      leadState: state,
      leadReferredBy: referredBy,
      leadSource: source,
      leadDescription: description,
    };

    try {
      await axios.put(`https://salesportalserver-1.onrender.com/submit/${leadId.id}`, formData);
      console.log("Lead updated successfully");
      navigate("/sales-lead");
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      leadFirstName: firstname,
      leadLastName: lastname,
      leadEmail: email,
      leadNumber: number,
      leadDate: date,
      leadCity: city,
      leadState: state,
      leadReferredBy: referredBy,
      leadSource: source,
      leadDescription: description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/submit",
        formData
      );
      console.log("DATA STORED", response.data);
      navigate("/sales-lead");
    } catch (error) {
      console.error("CREATEUSER ERROR", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Lead - Please Enter Details</h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="firstName"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="text"
            name="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Number"
          />
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            placeholder="Registration Date"
          />
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            <option value="Raipur">Raipur</option>
            <option value="Bhilai">Bhilai</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Durg">Durg</option>

          </select>
          <select
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharastra">Maharastra</option>

          </select>

          <select
            name="referredBy"
            value={referredBy}
            onChange={(e) => setReferredBy(e.target.value)}
          >
            <option value="">Select Referred By</option>
            <option value="Emp-1234">Emp-1234</option>
            <option value="Current Client ABC">Current Client ABC</option>
            <option value="Partner Company XYZ">Partner Company XYZ</option>
            <option value="Affiliate Marketing Partner">
              Affiliate Marketing Partner
            </option>
            <option value="Emp-1233">Emp-1233</option>
            <option value="Rahul Gupta">Rahul Gupta</option>
          </select>

          <select
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">Select Source</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Trade Show">Trade Show</option>
            <option value="Company Website">Company Website</option>
            <option value="Email Campaign">Email Campaign</option>
            <option value="Referral Program">Referral Program</option>
          </select>

          <textarea
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Description"
          />
          <button type="submit"  onClick={handleUpdate}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditLead;
