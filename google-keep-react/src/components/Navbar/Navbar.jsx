import "./Navbar.css";

function Navbar({ isDark, toggleDark, isListView, toggleListView }) {
    return (
        <nav>
      <div className="logo-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">menu</span>
          <span className="tooltip-text">Main Menu</span>
        </div>
        <img
          className="gb_Hc gb_Hd"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt=""
          aria-hidden="true"
          style={{ width: "40px", height: "40px" }}
        />
        <span className="logo-text">Keep</span>
      </div>
      <div className="search-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">search</span>
          <span className="tooltip-text">Search</span>
        </div>
        <input
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="settings-area">
        <div className="tooltip search-icon-mobile">
          <span className="material-symbols-outlined hover">search</span>
          <span className="tooltip-text">Search</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">refresh</span>
          <span className="tooltip-text">Refresh</span>
        </div>
        <div className="tooltip" onClick={toggleListView} style={{ cursor: "pointer" }}>
          <span className="material-symbols-outlined hover">{isListView ? "grid_view" : "view_agenda"}</span>
          <span className="tooltip-text">{isListView ? "Grid view" : "List view"}</span>
        </div>
        <div className="tooltip" onClick={toggleDark} style={{ cursor: "pointer" }}>
          <span className="material-symbols-outlined hover">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
          <span className="tooltip-text">{isDark ? "Light mode" : "Dark mode"}</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">settings</span>
          <span className="tooltip-text">Settings</span>
        </div>
      </div>
      <div className="profile-actions-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">apps</span>
          <span className="tooltip-text">Google apps</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">account_circle</span>
          <span className="tooltip-text">Accounts</span>
        </div>
      </div>
    </nav>

    );
}

export default Navbar;