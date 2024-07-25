import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import './Visitor.css'; 

const Visitor = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drinkChoice, setDrinkChoice] = useState(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get("/api/staff-member");
        setStaffMembers(response.data);
      } catch (error) {
        console.error("Error fetching staff members:", error);
      }
    };

    fetchStaffMembers();
  }, []);

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

    try {
      const response = await axios.post("/api/visitor-details", visitorData);
      console.log("Visitor logged:", response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error logging visitor:", error);
    }
  };

  const handleDrinkChoice = async (choice) => {
    setDrinkChoice(choice);
    setIsModalOpen(false);
    let drinkId = null;

    if(drinkChoice == "coffee"){
      drinkId = "66a222a44ba591f1f06bf96b";
    }else if(drinkChoice == "tea"){
      drinkId = "66a222984ba591f1f06bf969";
    }

    const drinkData = {
      visitor_id: localStorage.getItem("visitor"), 
      drink_id: drinkId, 
      drinkState: choice === 'yes',
    };

    try {
      const response = await axios.post("/api/drink", drinkData);
      console.log("Drink choice logged:", response.data);
    } catch (error) {
      console.error("Error logging drink choice:", error);
    }
  };

  return (
    <div className="visitor-container">
      <div className="form-container">
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
                      {staffMember.name}
                    </option>
                  ))}
                </Input>
                <Button
                  color="danger"
                  className="ml-2"
                  onClick={() => handleRemoveStaffMember(index)}
                >
                  Remove
                </Button>
              </div>
            </FormGroup>
          ))}
          <Button color="primary" onClick={handleAddStaffMember}>
            Add Staff Member
          </Button>

          <FormGroup className="mt-3">
            <Label for="reasonInput">Reason for Visit</Label>
            <Input
              type="textarea"
              name="reason"
              id="reasonInput"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter Reason for Visit"
            />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-info">
              Submit
            </Button>
          </div>
        </form>

        <Modal isOpen={isModalOpen}>
          <ModalHeader>Drink Choice</ModalHeader>
          <ModalBody>
            <FormGroup tag="fieldset">
              <legend>Would you like coffee or tea?</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="drinkChoice"
                    value="coffee"
                    checked={drinkChoice === 'coffee'}
                    onChange={(e) => setDrinkChoice(e.target.value)}
                  />
                  Coffee
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="drinkChoice"
                    value="tea"
                    checked={drinkChoice === 'tea'}
                    onChange={(e) => setDrinkChoice(e.target.value)}
                  />
                  Tea
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="drinkChoice"
                    value="none"
                    checked={drinkChoice === 'none'}
                    onChange={(e) => setDrinkChoice(e.target.value)}
                  />
                  None
                </Label>
              </FormGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleDrinkChoice}>Submit</Button>
            <Button color="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Visitor;
