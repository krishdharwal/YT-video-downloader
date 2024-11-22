import React, { useState } from "react";
import axios from "axios";

const YTDownloader = () => {
    const [healthStatus, setHealthStatus] = useState("");
    const [history, setHistory] = useState([]);
    const [link, setLink] = useState("");
    const [downloadResponse, setDownloadResponse] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingHealth, setLoadingHealth] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const backendUrl = "http://localhost:8000/yt";

    // Fetch backend health status
    const fetchHealth = async () => {
        setLoadingHealth(true);
        try {
            const response = await axios.get(`${backendUrl}/health`);
            setHealthStatus(response.data);
        } catch (error) {
            setHealthStatus("Error fetching health status");
            console.error("Error fetching health status:", error);
        } finally {
            setLoadingHealth(false);
        }
    };

    // Fetch download history
    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/history`);
            setHistory(response.data);
            setShowHistory(true);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    // Download link
    const downloadLink = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/download`, { link });
            setDownloadResponse(response.data);
        } catch (error) {
            setDownloadResponse("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Toggle Dark/Light Mode
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Toggle History Visibility
    const toggleHistoryVisibility = () => {
        setShowHistory((prev) => !prev);
    };

    const containerStyle = {
        backgroundColor: isDarkMode ? "#121212" : "#E3F2FD", // Black for dark mode, sky blue for light
        color: isDarkMode ? "#FFFFFF" : "#000000",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
    };

    const cardStyle = {
        backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
        color: isDarkMode ? "#B0BEC5" : "#000000",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    };

    const buttonStyle = {
        padding: "10px 15px",
        backgroundColor: isDarkMode ? "#42A5F5" : "#1E88E5",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const inputStyle = {
        padding: "10px",
        border: "1px solid #B0BEC5",
        borderRadius: "5px",
        marginRight: "10px",
        width: "300px",
    };

    const loaderStyle = {
        textAlign: "center",
        margin: "20px 0",
    };

    return (
        <div style={containerStyle}>
            <header style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
                <h1>YT Downloader</h1>
                <button onClick={toggleTheme} style={buttonStyle}>
                    {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </header>

            {/* Health Status */}
            <div style={cardStyle}>
                <h2>Backend Health</h2>
                <button onClick={fetchHealth} style={buttonStyle}>
                    {loadingHealth ? "Loading..." : "Check Health"}
                </button>
                {loadingHealth ? (
                    <div style={loaderStyle}>Loading...</div>
                ) : (
                    <p style={{ marginTop: "10px" }}>{healthStatus}</p>
                )}
            </div>

            {/* Download History */}
            <div style={cardStyle}>
                <h2>Download History</h2>
                <button onClick={fetchHistory} style={buttonStyle}>
                    Load History
                </button>
                {showHistory && (
                    <button onClick={toggleHistoryVisibility} style={buttonStyle}>
                        {showHistory ? "Minimize History" : "Show History"}
                    </button>
                )}
                {loading && !history.length && <div style={loaderStyle}>Loading...</div>}
                {showHistory && (
                    <ul style={{ marginTop: "10px", listStyle: "none", paddingLeft: "0" }}>
                        {history.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    backgroundColor: isDarkMode ? "#263238" : "#F1F8E9",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                }}
                            >
                                <p>
                                    <strong>Link:</strong> {item.link}
                                </p>
                                <p>
                                    <strong>Downloaded On:</strong> {new Date(item.dateTime).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Download Link */}
            <div style={cardStyle}>
                <h2>Download Video</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        placeholder="Enter video link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={downloadLink} style={buttonStyle}>
                        Download
                    </button>
                </div>
                {loading && <div style={loaderStyle}>Processing...</div>}
                <p style={{ marginTop: "10px", color: isDarkMode ? "#90CAF9" : "#0D47A1" }}>{downloadResponse}</p>
            </div>
        </div>
    );
};

export default YTDownloader;
