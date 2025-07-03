
// import React, { useState } from 'react';
// import { getLeaveBalance } from '../../services/leaveService';
// import { Spinner, Card, Button } from 'react-bootstrap';
 
// const LeaveBalance = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [balance, setBalance] = useState([]);
//   const [loading, setLoading] = useState(false);
 
//   const fetchBalance = async () => {
//     setLoading(true);
//     try {
//       const res = await getLeaveBalance(employeeId);
//       setBalance(res.data); // Expecting an array of leave balances
//     } catch (err) {
//       alert('Could not fetch leave balance');
//       console.error("Fetch error:", err);
//     }
//     setLoading(false);
//   };
 
//   return (
//     <div className="container mt-4">
//       <h3>Leave Balance</h3>
 
//       <input
//         type="text"
//         className="form-control mb-2"
//         placeholder="Enter Employee ID"
//         value={employeeId}
//         onChange={(e) => setEmployeeId(e.target.value)}
//       />
 
//       <Button onClick={fetchBalance} variant="primary" disabled={loading || !employeeId}>
//         {loading ? 'Loading...' : 'Get Balance'}
//       </Button>
 
//       {loading && <Spinner animation="border" className="mt-2" />}
 
//       {balance && balance.length > 0 && (
//         <div className="mt-4">
//           {balance.map((item, index) => (
//             <Card className="mb-3 p-3" key={index}>
//               <h5>Leave Type: {item.leaveType}</h5>
//               <p><strong>Total Leaves:</strong> {item.totalLeaves}</p>
//               <p><strong>Used Leaves:</strong> {item.usedLeaves}</p>
//               <p><strong>Remaining Leaves:</strong> {item.remainingLeaves}</p>
//             </Card>
//           ))}
//         </div>
//       )}
 
//       {!loading && balance.length === 0 && employeeId && (
//         <p className="mt-3 text-muted">No leave balances found.</p>
//       )}
//     </div>
//   );
// };
 
// export default LeaveBalance;



// import React, { useState, useEffect } from 'react';
// import { getLeaveBalance } from '../../services/leaveService';
// import { Spinner, Card } from 'react-bootstrap';

// const LeaveBalance = () => {
//   const [balance, setBalance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem('token');
//   const employeeId = localStorage.getItem('employeeId');

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const res = await getLeaveBalance(employeeId, token);
//         setBalance(res.data);
//       } catch (err) {
//         alert('Could not fetch leave balance');
//       }
//       setLoading(false);
//     };
//     fetchBalance();
//   }, [employeeId, token]);

//   return (
//     <div className="container mt-4">
//       <h3>Leave Balance</h3>

//       {loading && <Spinner animation="border" className="mt-2" />}

//       {balance && balance.length > 0 && (
//         <div className="mt-4">
//           {balance.map((item, index) => (
//             <Card className="mb-3 p-3" key={index}>
//               <h5>Leave Type: {item.leaveType}</h5>
//               <p><strong>Total Leaves:</strong> {item.totalLeaves}</p>
//               <p><strong>Used Leaves:</strong> {item.usedLeaves}</p>
//               <p><strong>Remaining Leaves:</strong> {item.remainingLeaves}</p>
//             </Card>
//           ))}
//         </div>
//       )}

//       {!loading && balance.length === 0 && (
//         <p className="mt-3 text-muted">No leave balances found.</p>
//       )}
//     </div>
//   );
// };

// export default LeaveBalance;


import React, { useState } from 'react';
import { getLeaveBalance } from '../../services/leaveService';
import { Spinner, Card, Button } from 'react-bootstrap';
 
const LeaveBalance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await getLeaveBalance(employeeId);
      setBalance(res.data); // Expecting an array of leave balances
    } catch (err) {
      alert('Could not fetch leave balance');
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };
 
  return (
    <div className="container mt-4">
      {/* <h3>Leave Balance</h3> */}
 
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
 
      <Button onClick={fetchBalance} variant="primary" disabled={loading || !employeeId}>
        {loading ? 'Loading...' : 'Get Balance'}
      </Button>
 
      {loading && <Spinner animation="border" className="mt-2" />}
 
      {balance && balance.length > 0 && (
        <div className="mt-4">
          {balance.map((item, index) => (
            <Card className="mb-3 p-3" key={index}>
              <h5>Leave Type: {item.leaveType}</h5>
              <p><strong>Total Leaves:</strong> {item.totalLeaves}</p>
              <p><strong>Used Leaves:</strong> {item.usedLeaves}</p>
              <p><strong>Remaining Leaves:</strong> {item.remainingLeaves}</p>
            </Card>
          ))}
        </div>
      )}
 
      {!loading && balance.length === 0 && employeeId && (
        <p className="mt-3 text-muted">No leave balances found.</p>
      )}
    </div>
  );
};
 
export default LeaveBalance;