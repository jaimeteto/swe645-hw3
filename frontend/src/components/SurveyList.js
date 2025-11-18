// src/components/SurveyList.js
import React from "react";

function SurveyList({ surveys, loading, onDelete, onEdit }) {
  if (loading) {
    return <p>Loading surveys...</p>;
  }

  if (!surveys || surveys.length === 0) {
    return <p className="mb-0">No surveys recorded yet.</p>;
  }

  return (
    <div>
      <h2 className="mb-3">All Surveys</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Date of Survey</th>
              <th>Email</th>
              <th>Liked Most</th>
              <th>Interest Source</th>
              <th>Likelihood</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((s) => (
              <tr key={s.id}>
                <td>
                  {s.firstName} {s.lastName}
                </td>
                <td>{s.dateOfSurvey?.substring(0, 10)}</td>
                <td>{s.email}</td>
                <td>
                  {Array.isArray(s.likedMost)
                    ? s.likedMost.join(", ")
                    : s.likedMost}
                </td>
                <td>{s.interestSource}</td>
                <td>{s.likelihood}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SurveyList;
