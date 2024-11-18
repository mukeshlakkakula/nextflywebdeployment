// ProjectContent.jsx
import React, { useState } from "react";

const ProjectContent = ({ project, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setLoadError(true);
    setIsLoading(false);
  };

  // Loading placeholder component
  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
      <div className="text-white/50 flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 mb-2" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>{isLoading ? "Loading..." : "Preview not available"}</span>
      </div>
    </div>
  );

  if (project.image) {
    return (
      <div className="relative w-full h-full" style={{ height: "300px" }}>
        {isLoading && <LoadingPlaceholder />}
        <img
          src={project.image.src}
          alt={project.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{
            opacity: isLoading ? 0 : 1,
            height: "300px",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={index <= 2 ? "eager" : "lazy"}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: "300px" }}>
      {isLoading && <LoadingPlaceholder />}
      {loadError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center p-4">
            <p className="font-medium mb-2">Preview not available</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#913bfe] hover:text-[#7b32d7] transition-colors duration-300"
            >
              Visit Website →
            </a>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden w-full h-full relative">
          <iframe
            src={project.link}
            title={project.title}
            className="absolute top-0 left-0"
            style={{
              width: "1920px", // Desktop width
              height: "1080px", // Desktop height
              transform: "scale(0.21)", // Scale to fit container
              transformOrigin: "0 0",
              border: "none",
              pointerEvents: isLoading ? "none" : "auto",
            }}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

// Add these styles to your global CSS or component styles
const styles = `
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-pulse {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 75%
  );
  background-size: 200% 100%;
}

/* For consistent iframe sizing */
.iframe-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
`;

export default ProjectContent;
