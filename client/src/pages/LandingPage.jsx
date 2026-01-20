import { ArrowRight, FileText, Bell, CheckCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import indiaMap from "../assets/india-map.png"
import '../styles/LandingPage.css';

const LandingPage = () => {

  const navigate = useNavigate()

  return (
    <div className="landing-page">

      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">CivicCare</h1>
            <p className="hero-description">
              Empowering citizens to voice their concerns and enabling government 
              officers to take swift action. Together, we build better communities 
              through transparency and accountability.
            </p>
            <button className="cta-button" onClick={() => {navigate("/signup")}}>
              GET STARTED
              <ArrowRight className="arrow-icon" size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="why-section">
          <div className="why-header">
            <h2 className="landing-section-heading">Why Civic Care</h2>
          </div>
          <div className="why-body">
            <div className="why-image">
              <img 
                src={indiaMap} 
                alt="India"
                id='india-map'
              />
            </div>
            <div className="why-content">
              <p className="why-paragraph">
                In a rapidly growing nation, civic issues often go unnoticed or unresolved. 
                CivicCare bridges the gap between citizens and government authorities, 
                creating a transparent platform where every voice matters. From littering 
                to road repairs, from water supply disruptions to infrastructure concerns, 
                we ensure your complaints reach the right hands.
              </p>
              <p className="why-paragraph">
                Our mission is to foster accountability and create responsive governance. 
                With real-time tracking and updates, citizens can monitor the progress of 
                their complaints while government officers can efficiently manage and 
                prioritize issues. Together, we're building cleaner, safer, and more 
                livable communities across India.
              </p>
            </div>
          </div>
      </section>

      <section className="how-section">
        <h2 className="landing-section-heading center">How CivicCare Works</h2>

        <div className="landing-cards-container">
          <div className="card">
            <div className="card-icon">
              <FileText size={24} />
            </div>
            <h3 className="landing-card-title">Sign Up & Report</h3>
            <p className="card-description">
              Create your account and submit detailed complaints about civic issues 
              in your area with photos and location information.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <Bell size={24} />
            </div>
            <h3 className="landing-card-title">Alert Authorities</h3>
            <p className="card-description">
              Your complaint is instantly routed to the relevant government department 
              and assigned to responsible officers.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <Users size={24} />
            </div>
            <h3 className="landing-card-title">Officer Review</h3>
            <p className="card-description">
              Government officers review, acknowledge, and take action on reported 
              issues through their dedicated dashboard.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">
              <CheckCircle size={24} />
            </div>
            <h3 className="landing-card-title">Track Progress</h3>
            <p className="card-description">
              Monitor real-time updates on your complaint status from pending to 
              in-progress to resolved with full transparency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;