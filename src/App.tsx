import { Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './pages/Categories';
import Overview from './pages/Overview';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Statistics from './pages/Statistics';
import WizardStepOne from './components/WizardStepOne';
import WizardStepThree from './components/WizardStepThree';
import WizardStepTwo from './components/WizardStepTwo';
import CoinTrackerContextProvider from './context/CoinTrackerContext';
import Wizard from './pages/Wizard';


function App() {

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  return (
    
      <CoinTrackerContextProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/overview" element={<Overview />} />
          <Route path="/wizard" element={<Wizard />} > 
            <Route path=":wizardone" element={<WizardStepOne />} />
            <Route path=":wizardtwo" element={<WizardStepTwo />} />
            <Route path=":wizardthree" element={<WizardStepThree />} />
          </Route>
        <Route path="/categories" element={<Categories />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      </CoinTrackerContextProvider>
  );
}

export default App;
