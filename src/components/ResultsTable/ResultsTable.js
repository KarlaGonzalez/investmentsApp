import classes from './ResultsTable.module.css'

/* JS built-in constructor, which in the end, which gives you a formatter utility object
    that provides a method to format numbers as currency, for example. */
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const ResultsTable = (props) => {
    return (
        <table className={classes.result}>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                 {/* Maps {} data per year & returns the updated table rows. */}
                {props.data.map((yearData) => (
                    <tr key={yearData.year}>
                        <td>{yearData.year}</td> 
                        <td>{formatter.format(yearData.savingsEndOfYear)}</td>
                        <td>{formatter.format(yearData.yearlyInterest)}</td>
                        <td>
                            {/* Total interests gain */}
                            {formatter.format(
                                yearData.savingsEndOfYear - 
                                props.initialInvestment - 
                                yearData.yearlyContribution * yearData.year
                            )}
                        </td>
                        <td>
                            {/* Total investments capital */}
                            {formatter.format(
                                props.initialInvestment + 
                                yearData.yearlyContribution * 
                                yearData.year
                            )}
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}

export default ResultsTable;