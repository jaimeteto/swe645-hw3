// src/App.js
import React, { useEffect, useState } from "react";
import {
  getSurveys,
  createSurvey,
  updateSurvey,
  deleteSurvey,
} from "./api";
import SurveyForm from "./components/SurveyForm";
import SurveyList from "./components/SurveyList";

function App() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "list"
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [error, setError] = useState("");

  const loadSurveys = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSurveys();
      setSurveys(data);
    } catch (err) {
      console.error(err);
      setError("Error loading surveys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Preload list when app mounts
    loadSurveys();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      setError("");
      if (editingSurvey) {
        await updateSurvey(editingSurvey.id, formData);
      } else {
        await createSurvey(formData);
      }
      setEditingSurvey(null);
      setActiveTab("list");
      await loadSurveys();
    } catch (err) {
      console.error(err);
      setError("Error saving survey.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this survey?")) return;
    try {
      setError("");
      await deleteSurvey(id);
      await loadSurveys();
    } catch (err) {
      console.error(err);
      setError("Error deleting survey.");
    }
  };

  const handleEditClick = (survey) => {
    setEditingSurvey(survey);
    setActiveTab("form");
  };

  const handleCancelEdit = () => {
    setEditingSurvey(null);
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h1 className="text-center">Student Survey</h1>
        <p className="text-muted text-center">
          Fill out a survey and view all recorded responses.
        </p>
      </div>

      <div className="mb-3 d-flex justify-content-center">
        <button
          className={`btn me-2 ${
            activeTab === "form" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("form")}
        >
          New / Edit Survey
        </button>

        <button
          className={`btn ${
            activeTab === "list" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          onClick={() => setActiveTab("list")}
        >
          View All Surveys
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          {activeTab === "form" && (
            <SurveyForm
              initialValues={editingSurvey}
              onSubmit={handleCreateOrUpdate}
              onCancelEdit={handleCancelEdit}
            />
          )}

          {activeTab === "list" && (
            <SurveyList
              surveys={surveys}
              loading={loading}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
