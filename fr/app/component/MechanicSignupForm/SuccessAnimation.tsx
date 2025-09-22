"use client";
import React from "react";

const SuccessAnimation: React.FC = () => {
  return (
    <div className="success-container">
      <div className="animation-wrapper">
        <svg className="tick-svg" viewBox="0 0 52 52">
          <circle className="tick-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="tick-check" fill="none" d="M14 27l7 7 16-16" />
        </svg>
      </div>
      <div className="success-message">Thank you! , Your data has been recorded succesfully</div>
      <style jsx>{`
        .success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 1rem;
          background: #f0fdf4;
        }
        .animation-wrapper {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }
        .tick-svg {
          width: 100%;
          height: 100%;
        }
        .tick-circle {
          stroke: #4caf50;
          stroke-width: 2;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-linecap: round;
          animation: dash 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .tick-check {
          stroke: #4caf50;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: dash 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .success-message {
          font-size: 1.2rem;
          color: #4caf50;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s forwards 1s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
