import { useState } from "react";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";

function App() {
  //const [results, setResults] = useState(null);
  const [userInput, setUserInput] = useState(null); // Initial investment - 'current-savings'

  // Triggered when form is submitted
  const calculateHandler = (userInput) => {
    setUserInput(userInput);

    //Store the state and pass it to results comp - Approach a)
    //setResults(yearlyData);
  };

  // 'Derived approach' - Guide: 'Approach b) - ‘Derived’ state based on the userInput'
  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];
  
    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1, //current loop itereation + 1
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  };

  return (
    <div>
      <Header />

      <UserInput onCalculate={calculateHandler} />

      {/* Shows table conditionally (only if userInput is NOT null) */}
      {!userInput && <p style={{textAlign: 'center'}}>No investments calculated yet</p>}
      {userInput && <ResultsTable data={yearlyData} initialInvestment={userInput['current-savings']} />}

    </div>
  );
}

export default App;
