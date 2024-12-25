import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import adminX from "../store/kk.png";
import { contextX } from "../store/Xcontext";

const Dashboard = () => {
  const [fetch, setFetch] = useState(false);
  const [NumAppoint, SetNumAppoint] = useState(null);
  const [NumDocX, SetNumDocX] = useState(null);
 

  const [ButtonAppoinmet, SetButtonAppoinmet] = useState("Upcoming");
  const [appointments, setAppointments] = useState([]);
  const [RegDoc, SetRegDoc] = useState(null);
  const [AppointmentDuration, setAppointmentDuration] = useState("Today");
  function handleDurationChnage(e) {
    console.log(e.target.value);
    setAppointmentDuration(e.target.value);
  }
  async function fun() {
    try {
      const response = await axios.post(
        "https://healthmaster-4r73.onrender.com/api/v1/appointment/doctor-appointment",
        { AppointmentDuration, ButtonAppoinmet },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const appointmentList = response.data.appoinments;
      SetNumAppoint(response.data.NumAppoint);
      SetNumDocX(response.data.NoDoc);
      // setAppointmentList(appointmentList);
      // setUpcomingAppoinments(appointmentList);
      console.log(response.data);
      setAppointments(appointmentList);

      setFetch(true);

      // setFetch(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fun();
    console.log("dsd", ButtonAppoinmet);
  }, [AppointmentDuration, ButtonAppoinmet]);

  const handleSetActiveAppointment = (appointmentId) => {
    setActiveAppointmentId(appointmentId);
  };
  function handleUpcomingClick(e) {
    SetButtonAppoinmet("Upcoming");
    setAppointmentDuration("Today");
    const buttons = Array.from(document.getElementsByClassName("butt"));
    buttons.forEach((button) => {
      button.classList.remove("activeUpcomeing");
    });

    e.target.classList.add("activeUpcomeing");
  }

  function handleHistoryClick(e) {
    SetButtonAppoinmet("History");
    console.log("history");
    setAppointmentDuration("Today");

    const buttons = Array.from(document.getElementsByClassName("butt"));
    buttons.forEach((button) => {
      button.classList.remove("activeUpcomeing");
    });

    e.target.classList.add("activeUpcomeing");
  }

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        "https://healthmaster-4r73.onrender.com/api/v1/appointment/update",
        { status, appointmentId },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  return (
    <>
      {" "}
      {fetch ? (
        <section className="dashboard page">
          <div className="banner">
            <div className="firstBox">
              <img src={adminX} alt="docImg" />
              <div className="content">
                <div>
                  <p>Hello ,</p>
                  <h5>{admin && `${admin.firstName} ${admin.lastName}`} </h5>
                </div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                  Assumenda repellendus necessitatibus itaque.
                </p>
              </div>
            </div>
            <div className="secondBox">
              <p>Total Appointments</p>
              <h3>{NumAppoint.length}</h3>
            </div>
            <div className="thirdBox">
              <p>Registered Doctors</p>
              <h3>{NumDocX}</h3>
            </div>
          </div>
          <div className="banner banner2X">
            <h5>Appointments</h5>
            <div className="upcome-completed-option">
              <div className="itemX-1">
                <button
                  onClick={handleUpcomingClick}
                  className="butt activeUpcomeing upcoming-butZ"
                >
                  Upcoming
                </button>{" "}
                <button
                  className="butt history-but"
                  onClick={handleHistoryClick}
                >
                  History
                </button>
              </div>
              <div className="itemX-2">
                <select
                  name="duration"
                  id=""
                  onChange={handleDurationChnage}
                  value={AppointmentDuration}
                >
                  <option value="Today">Today</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                  <option value="All-Time">All Time</option>
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 && fetch
                  ? appointments.map((appointment) => (
                      <tr key={appointment._id} className="com-ZZ">
                        <td>{`${appointment.patientId.firstName} ${appointment.patientId.lastName}`}</td>
                        <td className="com-WW">{`${
                          appointment.appointmentDate.time
                        } , ${formatDate(
                          appointment.appointmentDate.date
                        )}`}</td>
                        <td>{`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}</td>
                        <td>{appointment.doctorId.department}</td>
                        <td>{appointment.status}</td>
                      </tr>
                    ))
                  : "No Appointments Found!"}
              </tbody>
            </table>

            {}
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Dashboard;
