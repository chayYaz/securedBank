import React from "react";
import Audio from "../Audio/Audio";
import "./RateReport.css"; 

 // Functional component to display bank interest rates and terms
const RateReport = () => {
  return (
    <div className="rate-report-container">
      <Audio src="/interestreport.mp3" />
      <h2 className="rate-report-title">Bank Interest Rates and Terms</h2>
      <p className="rate-report-description">
        Click the link below to download our rates and interests PDF:
      </p>
      <a className="download-link" href="/Interests.pdf" download>
        Download Rates and Interests PDF
      </a>
    </div>
  );
};

export default RateReport;
