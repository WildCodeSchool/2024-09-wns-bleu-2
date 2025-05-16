import "../styles/footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="footer">
         <div className="links-container">
            <Link to="/">À propos</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Conditions Générales d'Utilisation</Link>
         </div>
         <div className="copyright">
            <p>&#169; 2025 &#8210; Grumpy Cat &#8210; Wild Code School</p>
         </div>
      </footer>
   );
};

export default Footer;