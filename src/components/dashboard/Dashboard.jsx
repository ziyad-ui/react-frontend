import React from 'react';
import EnrollmentChart from '../charts/EnrollmentChart.jsx';
import CourseDistributionChart from '../charts/CourseDistributionChart.jsx';
import AttendanceChart from '../charts/AttendanceChart.jsx';
import WeatherWidget from '../weather/WeatherWidget.jsx';
import { getEnrollmentTrends, getCourseDistribution, getAttendance } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const Dashboard = ({ token }) => {
  const [enrollmentData, setEnrollmentData] = React.useState([]);
  const [courseData, setCourseData] = React.useState([]);
  const [attendanceData, setAttendanceData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [enrollment, courses, attendance] = await Promise.all([
          getEnrollmentTrends(token),
          getCourseDistribution(token),
          getAttendance(token),
        ]);
        setEnrollmentData(enrollment);
        setCourseData(courses);
        setAttendanceData(attendance);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Student Insights Overview</h1>
          <p className="dashboard-subtitle">
            Enrollment, course distribution, attendance, and real-time weather in one view.
          </p>
        </div>
        <div className="dashboard-pill">Academic Year {new Date().getFullYear()}</div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>Monthly Enrollment Trends</h2>
          <EnrollmentChart data={enrollmentData} />
        </section>

        <section className="dashboard-card">
          <h2>Course Distribution</h2>
          <CourseDistributionChart data={courseData} />
        </section>

        <section className="dashboard-card full-width">
          <h2>Attendance Over School Days</h2>
          <AttendanceChart data={attendanceData} />
        </section>

        <section className="dashboard-card full-width">
          <h2>Weather Forecast</h2>
          <WeatherWidget />
        </section>
      </div>
    </>
  );
};

export default Dashboard;

