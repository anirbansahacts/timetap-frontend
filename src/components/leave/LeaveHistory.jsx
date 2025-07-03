// import React, { useState } from 'react';
// import { getLeaveHistory } from '../../services/leaveService';

// const LeaveHistory = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const res = await getLeaveHistory(employeeId);
//       setHistory(res.data);
//     } catch {
//       alert("Error fetching history");
//     }
//   };

//   const getStatusColor = (status) => {
//     if (status === 'APPROVED') return 'text-success';
//     if (status === 'REJECTED') return 'text-danger';
//     return 'text-warning';
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Leave History</h3>
//       <input className="form-control mb-2" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
//       <button className="btn btn-info mb-3" onClick={fetchHistory}>Get History</button>

//       {history.length === 0 ? (
//         <p>No leave history found.</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr>
//           </thead>
//           <tbody>
//             {history.map((item, i) => (
//               <tr key={i}>
//                 <td>{item.leaveType}</td>
//                 <td>{item.leaveStartDate}</td>
//                 <td>{item.leaveEndDate}</td>
//                 <td>{item.reason}</td>
//                 <td className={getStatusColor(item.status)}>{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default LeaveHistory;

// import React, { useState, useEffect } from 'react';
// import { getLeaveHistory } from '../../services/leaveService';

// const LeaveHistory = () => {
//   const [history, setHistory] = useState([]);
//   const token = localStorage.getItem('token');
//   const employeeId = localStorage.getItem('employeeId');

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await getLeaveHistory(employeeId, token);
//         setHistory(res.data);
//       } catch {
//         alert("Error fetching history");
//       }
//     };
//     fetchHistory();
//   }, [employeeId, token]);

//   const getStatusColor = (status) => {
//     if (status === 'APPROVED') return 'text-success';
//     if (status === 'REJECTED') return 'text-danger';
//     return 'text-warning';
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Leave History</h3>
//       {history.length === 0 ? (
//         <p>No leave history found.</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr>
//           </thead>
//           <tbody>
//             {history.map((item, i) => (
//               <tr key={i}>
//                 <td>{item.leaveType}</td>
//                 <td>{item.leaveStartDate}</td>
//                 <td>{item.leaveEndDate}</td>
//                 <td>{item.reason}</td>
//                 <td className={getStatusColor(item.status)}>{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default LeaveHistory;

import React, { useState } from "react";
import { getLeaveHistory } from "../../services/leaveService";
import { Button } from "react-bootstrap";

const LeaveHistory = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getLeaveHistory(employeeId);
      setHistory(res.data);
    } catch {
      alert("Error fetching history");
    }
  };

  const getStatusColor = (status) => {
    if (status === "APPROVED") return "text-success";
    if (status === "REJECTED") return "text-danger";
    return "text-warning";
  };

  return (
    <div className="container mt-4">
      {/* <h3>Leave History</h3> */}
      <input
        className="form-control mb-2"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <Button variant="primary" className="mb-3" onClick={fetchHistory}>
          Get History
      </Button>

      {history.length === 0 ? (
        <p>No leave history found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={i}>
                <td>{item.leaveType}</td>
                <td>{item.leaveStartDate}</td>
                <td>{item.leaveEndDate}</td>
                <td>{item.reason}</td>
                <td className={getStatusColor(item.status)}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveHistory;
