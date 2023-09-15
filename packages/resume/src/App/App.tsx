import { Resume } from './Resume';
import './app.css';

export const App = () => (
  <div className="us-letter">
    <div className="resume-container">
      <Resume />
    </div>

    {/* <button onClick={() => window.print()} className="no-print">
      Print Me
    </button> */}
  </div>
);
