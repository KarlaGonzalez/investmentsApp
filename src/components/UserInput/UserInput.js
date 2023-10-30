import { useState } from "react";
import classes from './UserInput.module.css'

const UserInput = (props) => {
    const initialUserInput = {
        'current-savings': 10000, // input id - currentSavings (cammel case is also valid)
        'yearly-contribution': 1200,
        'expected-return': 7,
        'duration': 10,
    };

    // State for every input - Approach State Group
    const [userInput, setUserInput] = useState(initialUserInput);

    const submitHandler = (event) => {
        event.preventDefault(); // Prevents default reload when submitting
        
        props.onCalculate(userInput);
    };

    // Clears values | Resets all input to initial state
    const resetHandler = () => {
        setUserInput(initialUserInput);
    };

    // Approach State Group
    // 1st param identifies event source & 2nd param should then be the value that was entered
    const inputChangeHandler = (input, value) => {
        setUserInput((prevInput) => { // automatically receives all previous values
            return {
              ...prevInput, // copies previous input
               // the "+" converts the string value to a number
              [input]: +value // Overrides the new value for the triggered input | JS syntax to dynamically access a property name, by wrapping the identifier that contains the property name we want to access
            }
        });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    {/* The anonymous f() will be executed only on input changes */}
                    <input onChange={(event) => 
                            inputChangeHandler('current-savings', event.target.value)
                        }
                        value={userInput['current-savings']}
                        type="number"
                        id="current-savings" />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input onChange={(event) => 
                            inputChangeHandler('yearly-contribution', event.target.value)
                        }
                        value={userInput['yearly-contribution']}
                        type="number" 
                        id="yearly-contribution" />
                </p>
            </div>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="expected-return">
                    Expected Interest (%, per year)
                    </label>
                    <input onChange={(event) => 
                            inputChangeHandler('expected-return', event.target.value)
                        }
                        value={userInput['expected-return']}
                        type="number"
                        id="expected-return" />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input onChange={(event) => 
                            inputChangeHandler('duration', event.target.value)
                        }
                        value={userInput.duration}
                        type="number"
                        id="duration" />
                </p>
            </div>
            <p className={classes.actions}>
                <button type="reset" className={classes.buttonAlt} onClick={resetHandler}>
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Calculate
                </button>
            </p>
        </form>
    )
}

export default UserInput;