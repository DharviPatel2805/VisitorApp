import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Visitor.css";
import { useNavigate } from "react-router-dom";
import { clearAccessToken, getGlobalToken } from "../components/Global";

const Visitor = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [drinks, setListOfDrinks] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drinkChoice, setDrinkChoice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffMembers();
    fetchDrinks();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/staff-member`
      );
      setStaffMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const fetchDrinks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/list/drink`
      );
      // console.log("drink", response);
      setListOfDrinks(response.data.data);
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const handleAddStaffMember = () => {
    setSelectedStaff([...selectedStaff, ""]);
  };

  const handleStaffChange = (index, value) => {
    const updatedStaff = [...selectedStaff];
    updatedStaff[index] = value;
    setSelectedStaff(updatedStaff);
  };

  const handleRemoveStaffMember = (index) => {
    const updatedStaff = [...selectedStaff];
    updatedStaff.splice(index, 1);
    setSelectedStaff(updatedStaff);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitorData = {
      staff_member_id: selectedStaff,
      visitor_id: localStorage.getItem("visitor"),
      reason,
    };

    const token = getGlobalToken();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/visitor-details`,
        visitorData,
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error logging visitor:", error);
      if (error.response && error.response.status === 401) {
        console.error("Invalid or expired token.");
        clearAccessToken(); 
        navigate('/');
      } 
      // else {
      // }
    }
  };

  const handleDrinkChoice = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    let drinkId = null;
    let State = false;

    if (drinkChoice == "none") {
      drinkId = null;
      State = false;
    } else {
      drinkId = drinkChoice;
      State = true;
    }

    const drinkData = {
      visitor_id: localStorage.getItem("visitor"),
      drink_id: drinkId,
      drinkState: State,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/visitor-drinks`,
        drinkData
      );
      console.log("Drink choice logged:", response.data);
      if (response.data) {
        const staffMemberNames = selectedStaff.map(
          (staffId) => staffMembers.find((staff) => staff._id === staffId)?.Name
        );
        localStorage.removeItem("token");
        localStorage.removeItem("visitor");
        navigate("/thank-you", {
          state: { staffMemberNames: staffMemberNames, drinkChoice },
        });
      }
    } catch (error) {
      console.error("Error logging drink choice:", error);
    }
  };

  return (
    <div className="visitor-container">
      <div
        className="form-container"
        style={{ backgroundColor: "rgb(227, 243, 249)" }}
      >
        <form onSubmit={handleSubmit}>
          {selectedStaff.map((staff, index) => (
            <FormGroup key={index}>
              <Label for={`staffSelect-${index}`}>Select Staff Member</Label>
              <div className="d-flex">
                <Input
                  type="select"
                  name={`select-${index}`}
                  id={`staffSelect-${index}`}
                  value={staff}
                  onChange={(e) => handleStaffChange(index, e.target.value)}
                >
                  <option value="">Select Staff Member</option>
                  {staffMembers.map((staffMember) => (
                    <option key={staffMember._id} value={staffMember._id}>
                      {staffMember.Name}
                    </option>
                  ))}
                </Input>
                <Button
                  color="light"
                  className="ml-2 btn btn-outline-danger"
                  onClick={() => handleRemoveStaffMember(index)}
                >
                  Remove
                </Button>
              </div>
            </FormGroup>
          ))}
          <Button
            className="btn btn-outline-info"
            color="light"
            onClick={handleAddStaffMember}
          >
            + Staff Member
          </Button>

          <FormGroup className="mt-3">
            <Label for="reasonInput">Reason for Visit</Label>
            <Input
              type="textarea"
              name="reason"
              id="reasonInput"
              value={reason}
              style={{ height: "100px" }}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter Reason for Visit"
            />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-md btn-info mt-2">
              Submit
            </Button>
          </div>
        </form>

        {/* drink choice */}
        <Modal isOpen={isModalOpen}>
          <ModalHeader>Drink Choice</ModalHeader>
          <ModalBody>
            <FormGroup tag="fieldset">
              <legend>Would you like to have coffee or tea?</legend>
              {drinks.map((drink) => (
                <FormGroup check key={drink._id}>
                  <Label check>
                    <Input
                      type="radio"
                      name="drinkChoice"
                      value={drink._id} // Assuming drink.Name is 'Coffee' or 'Tea'
                      checked={drinkChoice === drink._id}
                      onChange={(e) => setDrinkChoice(e.target.value)}
                    />
                    {drink.Name}
                  </Label>
                </FormGroup>
              ))}
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="drinkChoice"
                    value="none"
                    checked={drinkChoice === "none"}
                    onChange={(e) => setDrinkChoice(e.target.value)}
                  />
                  None
                </Label>
              </FormGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleDrinkChoice}>
              Submit
            </Button>
            <Button color="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Visitor;
