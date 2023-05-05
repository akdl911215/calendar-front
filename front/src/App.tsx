import './App.css';
import { CalendarMain } from './webapp/calendar/component/calendar.main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarMain />} />;
        </Routes>
      </Router>
    </>
  );
};

export default App;
