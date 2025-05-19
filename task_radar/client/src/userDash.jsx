import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios"; // adjust path as needed

const EmployeeDashboard = () => {
  const { projectId: paramProjectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const effectiveProjectId = paramProjectId || localStorage.getItem("projectId");

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, employeesRes] = await Promise.all([
        axios.get(`/api/task/project/${effectiveProjectId}`, { withCredentials: true }),
        axios.get(`/api/task/employee/${effectiveProjectId}`, { withCredentials: true })
      ]);

      setTasks(tasksRes.data.tasks || []);
      setEmployees(employeesRes.data.employees || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `/api/task/status/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchDashboardData(); // Refresh after update
    } catch (err) {
      console.error("Failed to update task status:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    console.log("Effective projectId:", effectiveProjectId);
    if (effectiveProjectId) {
      fetchDashboardData();
    } else {
      console.warn("No projectId available for EmployeeDashboard.");
    }
  }, [effectiveProjectId]);

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h2>Project ID: {effectiveProjectId}</h2>

      <section>
        <h3>Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                <strong>{task.title}</strong> - {task.status}
                <button onClick={() => updateStatus(task._id, "completed")}>Mark Completed</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Employees in Project</h3>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <ul>
            {employees.map(emp => (
              <li key={emp._id}>{emp.name || emp.email}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EmployeeDashboard;
