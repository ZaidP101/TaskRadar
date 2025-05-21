import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios"; // adjust path as needed


const EmployeeDashboard = () => {
  const { projectId: paramProjectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseReasons, setPauseReasons] = useState({});

  const [project, setProject] = useState(null);

  const effectiveProjectId = paramProjectId || localStorage.getItem("projectId");

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, employeesRes, projectRes] = await Promise.all([
        axios.get(`/api/task/project/${effectiveProjectId}`, { withCredentials: true }),
        axios.get(`/api/task/employee/${effectiveProjectId}`, { withCredentials: true }),
        axios.get(`/api/project/${effectiveProjectId}`, { withCredentials: true })
      ]);
      console.log(employeesRes.data)
      console.log(tasksRes.data.data)

      setTasks(tasksRes.data.data || []);
      setEmployees(employeesRes.data.data || []);
      setProject(projectRes.data.project || null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }; 

  const updateStatus = async (taskId, newStatus, pauseReason = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/task/status/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add auth headers if needed
      },
      credentials: "include",
      body: JSON.stringify({
        status: newStatus,
        ...(newStatus === "paused" && { pauseReason })
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Update task list or state here if needed
  } catch (error) {
    console.error("Failed to update task status:", error);
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

  const getTasksForEmployee = (employeeId) => {
    return tasks.filter(task => task.assignedTo?._id === employeeId);
  };
  
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <h2>Project: {project?.name || "Unnamed Project"}</h2>


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


      <section>
  <h3>Task Board</h3>
  {tasks.length === 0 ? (
    <p>No tasks found.</p>
  ) : (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Task</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Priority</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Deadline</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time Left</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time Spent</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Pause Reason</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Assigned By</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          const deadline = new Date(task.deadline);
          const now = new Date();
          const timeLeft = deadline > now ? Math.ceil((deadline - now) / (1000 * 60 * 60)) + "h" : "Overdue";
          const timeSpent = (task.totalTimeSpent / 3600).toFixed(1) + "h"; // assuming totalTimeSpent in seconds

          return (
            <tr key={task._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.title}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <select
                  value={task.status}
                  onChange={(e) => {
                    const selectedStatus = e.target.value;

                    if (selectedStatus === "paused") {
                      // Show pause reason selector instead of sending API call
                      setPauseReasons((prev) => ({ ...prev, [task._id]: "" }));
                    } else {
                      updateStatus(task._id, selectedStatus);
                    }
                  }}
                  disabled={task.status === "completed"}
                >
                  {["todo", "in-progress", "paused", "resume", "ready-for-review", "completed"].map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </td>

              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.priority}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{deadline.toLocaleDateString()}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(task.deadline) > new Date()
                    ? Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60)) + "h"
                    : "Overdue"}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {(task.totalTimeSpent / 3600).toFixed(1)}h
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {pauseReasons.hasOwnProperty(task._id) ? (
                  <select
                    value={pauseReasons[task._id]}
                    onChange={(e) => {
                      const reason = e.target.value;
                      setPauseReasons((prev) => ({ ...prev, [task._id]: reason }));

                      if (reason !== "") {
                        // Send update only if a real reason is selected
                        updateStatus(task._id, "paused", reason);
                        
                        // Clear local state
                        setPauseReasons((prev) => {
                          const updated = { ...prev };
                          delete updated[task._id];
                          return updated;
                        });
                      }
                    }}
                  >
                    <option value="">Select reason</option>
                    {["system error", "break", "shift ended", "meeting"].map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                ) : task.status === "paused" ? (
                  <button
                    onClick={() => updateStatus('resume')}
                    disabled={task.status !== 'paused'}
                  >
                    Resume
                  </button>
                ) : (
                  task.pauseReason || "—"
                )}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.assignedBy?.name || "Admin"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button onClick={() => updateStatus(task._id, "completed")}>Mark Completed</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</section>

    </div>
  );
};

export default EmployeeDashboard;
