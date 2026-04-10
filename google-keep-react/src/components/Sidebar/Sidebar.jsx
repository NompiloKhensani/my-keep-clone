import { useState, useEffect } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseOver = () => {
    setIsExpanded(true);
  };

  const handleMouseOut = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "sidebar-hover" : ""}`}
      style={{ width: isExpanded ? "250px" : "80px" }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={`sidebar-item active-item ${isExpanded ? "sidebar-active-item" : ""}`}>
        <span className="material-symbols-outlined hover active">
          lightbulb_2
        </span>
        <span className="sidebar-text">Notes</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover">notifications</span>
        <span className="sidebar-text">Reminders</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover">edit</span>
        <span className="sidebar-text">Edit Labels</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover">archive</span>
        <span className="sidebar-text">Archive</span>
      </div>
      <div className="sidebar-item">
        <span className="material-symbols-outlined hover">delete</span>
        <span className="sidebar-text">Trash</span>
      </div>
    </div>
  );
}

export default Sidebar;