import { useState } from "react"


function App() {

	const [calc, setCalc] = useState("");
	const [result, setResult] =useState("");

	const ops = ['/', '*', '+', '-', '.', '='];

	const deleteFunc = () => {
		setCalc(calc.slice(0,-1)); //remove last input and set it back to calc
		setResult(calc.slice(0,-1))
	}

	const calculate = () => {
		setCalc(eval(calc));
		setResult('');
	}

	const updateCalc = (value) => {
		// if clicked value is operator and there is nothing in input i.e calc OR the clicked value is operator and the last digit in input (calc) is also an operator, dont updateCalc 
		if(ops.includes(value) && calc==='' || 
		ops.includes(value) && ops.includes(calc.slice(-1)) ){
			return
		}
		if(value==='.' && calc.includes('.')) //prevent adding more than 1 decimals
			return;
		setCalc(calc+value)

		if(!ops.includes(value)){
			setResult(eval(calc+value));
		}
	}

	const createDigits = () => {
		const digits=[]

		for(let i=1;i<10;i++){
			digits.push(
				<button key={i}  onClick={()=>updateCalc(i.toString())}>{i}</button>
			)
		}
		return digits
	}



	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : "" }&nbsp;
					{calc || "0"}
				</div>

				<div className="operators">
					<button onClick={()=>
					{
						setCalc('');
						setResult('');
					}}>AC</button>
					<button onClick={()=>updateCalc('/')}>/</button>
					<button onClick={()=>updateCalc('*')}>*</button>
					<button onClick={()=>updateCalc('+')}>+</button>
					<button onClick={()=>updateCalc('-')}>-</button>

					<button onClick={deleteFunc}>DEL</button>
				</div>

				<div className="digits">
					{createDigits()}
					<button onClick={()=>updateCalc('0')}>0</button>
					<button onClick={()=>updateCalc('.')}>.</button>

					<button onClick={calculate}>=</button>
				</div>
			</div>
		</div>
	);
}

export default App;
