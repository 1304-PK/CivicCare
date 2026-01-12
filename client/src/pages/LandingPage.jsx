import { useNavigate, NavLink } from "react-router-dom"
import "../styles/LandingPage.css"
import indiaMap from "../assets/india-map.png"

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div id="hero-section">
          <div id="hero-section-details">
            <h1>CivicCare</h1>
            <p>
              A platform where you you can report local issues efficiently and transparently. Submit concerns such as littering, road damage, or water supply problems and track their resolution in real time.
            </p>
            <button id="button"onClick={() => {navigate("/signup")}}>Get Started</button>
          </div>
        </div>

        <div id="second-section">
          <div id="india-map">
            <img src={indiaMap} alt="india map" />
          </div>
          <div id="second-section-details">
            <h1>Why CivicCare</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ducimus unde pariatur voluptates nulla temporibus provident obcaecati eaque, dolor eveniet corrupti asperiores, dolorum eum debitis deleniti quas atque nisi aliquam? Recusandae architecto placeat similique, obcaecati accusantium nisi vitae, voluptatum non optio praesentium corrupti maxime animi dolores labore, accusamus maiores aliquam perspiciatis esse porro! Possimus at iste illo!<br/><br/>Sapiente atque nulla voluptatum quasi quidem ducimus illum incidunt at, laborum ipsum recusandae officia earum voluptatibus itaque ipsam natus laboriosam dignissimos libero eligendi quaerat voluptas magni. Ut cum accusantium amet in obcaecati. Exercitationem ipsum quia consequatur praesentium temporibus recusandae repudiandae expedita corrupti.</p>
          </div>
        </div>

        <div id="third-section">
          <h1>How CivicCare works</h1>
          <div id="cards">
            <div className="card">
              <h2>Dummy</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia adipisci nam doloremque perferendis, incidunt dignissimos aut voluptatem harum enim numquam!</p>
            </div>
            <div className="card">
              <h2>Dummy</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia adipisci nam doloremque perferendis, incidunt dignissimos aut voluptatem harum enim numquam!</p>
            </div>
            <div className="card">
              <h2>Dummy</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia adipisci nam doloremque perferendis, incidunt dignissimos aut voluptatem harum enim numquam!</p>
            </div>
            <div className="card">
              <h2>Dummy</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia adipisci nam doloremque perferendis, incidunt dignissimos aut voluptatem harum enim numquam!</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LandingPage