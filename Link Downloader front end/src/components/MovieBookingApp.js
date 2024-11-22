import React, { useState } from "react";
import axios from "axios";

const MovieBookingApp = () => {
  const [health, setHealth] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDetails, setMovieDetails] = useState({ name: "", genre: "", duration: "" });
  const [userDetails, setUserDetails] = useState({ userId: "", seats: 0 });
  const [cancelDetails, setCancelDetails] = useState({ movieName: "", bookingId: "" });

  const baseUrl = "http://localhost:8000/yt";

  // Check Health
  const checkHealth = async () => {
    try {
      const response = await axios.get(`${baseUrl}/health`);
      setHealth(response.data);
    } catch (error) {
      setHealth("Backend is not reachable");
    }
  };

  // Save a Movie
  const saveMovie = async () => {
    try {
      await axios.post(`${baseUrl}/save`, movieDetails);
      alert("Movie saved successfully!");
    } catch (error) {
      alert("Failed to save movie");
    }
  };

  // Book a Ticket
  const bookTicket = async () => {
    try {
      await axios.get(`${baseUrl}/book/${movieName}`, { data: userDetails });
      alert("Ticket booked successfully!");
    } catch (error) {
      alert("Failed to book ticket");
    }
  };

  // Cancel a Booking
  const cancelBooking = async () => {
    try {
      await axios.delete(`${baseUrl}/cancel-booked`, { data: cancelDetails });
      alert("Booking canceled successfully!");
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Movie Booking System</h1>

      {/* Health Check */}
      <button onClick={checkHealth}>Check Backend Health</button>
      <p>{health}</p>

      <hr />

      {/* Add Movie */}
      <h2>Add a Movie</h2>
      <input
        type="text"
        placeholder="Movie Name"
        value={movieDetails.name}
        onChange={(e) => setMovieDetails({ ...movieDetails, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Genre"
        value={movieDetails.genre}
        onChange={(e) => setMovieDetails({ ...movieDetails, genre: e.target.value })}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={movieDetails.duration}
        onChange={(e) => setMovieDetails({ ...movieDetails, duration: e.target.value })}
      />
      <button onClick={saveMovie}>Save Movie</button>

      <hr />

      {/* Book a Ticket */}
      <h2>Book a Ticket</h2>
      <input
        type="text"
        placeholder="Movie Name"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userDetails.userId}
        onChange={(e) => setUserDetails({ ...userDetails, userId: e.target.value })}
      />
      <input
        type="number"
        placeholder="Number of Seats"
        value={userDetails.seats}
        onChange={(e) => setUserDetails({ ...userDetails, seats: parseInt(e.target.value) })}
      />
      <button onClick={bookTicket}>Book Ticket</button>

      <hr />

      {/* Cancel a Booking */}
      <h2>Cancel a Booking</h2>
      <input
        type="text"
        placeholder="Movie Name"
        value={cancelDetails.movieName}
        onChange={(e) => setCancelDetails({ ...cancelDetails, movieName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Booking ID"
        value={cancelDetails.bookingId}
        onChange={(e) => setCancelDetails({ ...cancelDetails, bookingId: e.target.value })}
      />
      <button onClick={cancelBooking}>Cancel Booking</button>
    </div>
  );
};

export default MovieBookingApp;
