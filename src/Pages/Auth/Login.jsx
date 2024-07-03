import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#066b3b" : "#079153",
    color: "white",
    width: "100%",  // Full width for centering
    textAlign: "center",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", data);

      if (response.status === 200) {

        localStorage.setItem("token", response.data);
        console.log(response.data);

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

        const response2 = await axios.get(`http://localhost:8080/users/${username}`);
        console.log(response2.data);

        localStorage.setItem('user', response2.data.fullName);
        localStorage.setItem('userId', response2.data.id);

        navigate("/");
      }
    } catch (error) {

      console.log("Login error:", error);
      alert('Username or Password Incorrect');
    }
  };

  const waveStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: -1
  };

  return (
    <div className="container mt-5" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div className="card p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={handleUsername}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={handlePassword}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      <svg style={waveStyle} viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient1" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#079153" />
            <stop offset="100%" stopColor="#066b3b" />
          </linearGradient>
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#066b3b" />
            <stop offset="100%" stopColor="#045c2a" />
          </linearGradient>
          <linearGradient id="gradient3" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#045c2a" />
            <stop offset="100%" stopColor="#034d20" />
          </linearGradient>
        </defs>
        <path fill="url(#gradient1)" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,234.7C384,245,480,267,576,266.7C672,267,768,245,864,218.7C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <path fill="url(#gradient2)" fillOpacity="0.8" d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,213.3C672,203,768,181,864,186.7C960,192,1056,224,1152,240C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        <path fill="url(#gradient3)" fillOpacity="0.5" d="M0,288L48,277.3C96,267,192,245,288,218.7C384,192,480,160,576,149.3C672,139,768,149,864,181.3C960,213,1056,267,1152,277.3C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default Login;
