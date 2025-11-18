// src/components/SurveyForm.js
import React, { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  telephone: "",
  email: "",
  dateOfSurvey: "",
  likedMost: [], // array of strings
  interestSource: "",
  likelihood: "",
};

const likedOptions = [
  "Students",
  "Location",
  "Campus",
  "Atmosphere",
  "Dorm Rooms",
  "Sports",
];

const interestOptions = ["Friends", "Television", "Internet", "Other"];
const likelihoodOptions = ["Very Likely", "Likely", "Unlikely"];

function SurveyForm({ initialValues, onSubmit, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialValues) {
      setForm({
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        streetAddress: initialValues.streetAddress || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        zip: initialValues.zip || "",
        telephone: initialValues.telephone || "",
        email: initialValues.email || "",
        dateOfSurvey: initialValues.dateOfSurvey
          ? initialValues.dateOfSurvey.substring(0, 10)
          : "",
        likedMost: initialValues.likedMost || [],
        interestSource: initialValues.interestSource || "",
        likelihood: initialValues.likelihood || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLikedChange = (option) => {
    setForm((prev) => {
      const exists = prev.likedMost.includes(option);
      return {
        ...prev,
        likedMost: exists
          ? prev.likedMost.filter((x) => x !== option)
          : [...prev.likedMost, option],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isEditing = !!initialValues;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3">{isEditing ? "Edit Survey" : "New Survey"}</h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">First Name*</label>
          <input
            className="form-control"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Last Name*</label>
          <input
            className="form-control"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Street Address*</label>
        <input
          className="form-control"
          name="streetAddress"
          value={form.streetAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">City*</label>
          <input
            className="form-control"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">State*</label>
          <input
            className="form-control"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Zip*</label>
          <input
            className="form-control"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Telephone*</label>
          <input
            className="form-control"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email*</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Date of Survey*</label>
        <input
          type="date"
          className="form-control"
          name="dateOfSurvey"
          value={form.dateOfSurvey}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          What did you like most about the campus?*
        </label>
        <div>
          {likedOptions.map((option) => (
            <div className="form-check form-check-inline" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.likedMost.includes(option)}
                onChange={() => handleLikedChange(option)}
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          How did you become interested in the university?*
        </label>
        <div>
          {interestOptions.map((option) => (
            <div className="form-check form-check-inline" key={option}>
              <input
                className="form-check-input"
                type="radio"
                name="interestSource"
                value={option}
                checked={form.interestSource === option}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          How likely are you to recommend this school to others?*
        </label>
        <div>
          {likelihoodOptions.map((option) => (
            <div className="form-check form-check-inline" key={option}>
              <input
                className="form-check-input"
                type="radio"
                name="likelihood"
                value={option}
                checked={form.likelihood === option}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <button className="btn btn-success me-2" type="submit">
          {isEditing ? "Update Survey" : "Submit Survey"}
        </button>
        {isEditing && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default SurveyForm;
