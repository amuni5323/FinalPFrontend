// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset error and success messages
//     setErrorMessage('');
//     setSuccessMessage('');

//     // Validate password length before sending request
//     if (password.length < 6) {
//       setErrorMessage('Password must be at least 6 characters long.');
//       return; // Stop the function if the password is too short
//     }

//     try {
//       // Send registration request to the backend
//       const response = await fetch('http://localhost:5000/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, name }),
//       });

//       console.log('Registration request sent');

//       const data = await response.json();

//       // If registration is successful
//       if (response.ok) {
//         setSuccessMessage(data.message);
//       } else {
//         setErrorMessage(data.message);
//       }
//     } catch (error) {
//       setErrorMessage('Network error, please try again later.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <div className="card shadow-lg p-4">
//             <h2 className="text-center mb-4">Create an Account</h2>

//             {/* Display success message */}
//             {successMessage && (
//               <div className="alert alert-success" role="alert">
//                 {successMessage}
//               </div>
//             )}

//             {/* Display error message */}
//             {errorMessage && (
//               <div className="alert alert-danger" role="alert">
//                 {errorMessage}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   placeholder="Enter your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
