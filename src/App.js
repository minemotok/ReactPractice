import React, { useState } from "react";
import { Box, TextField, Button } from '@mui/material';
import Address from "./Address/Address";
import InputSize from "./InputSize";

function App() {
  const [values, setValues] = useState({
    business: "",
    company: "",
    yourName: "",
    gender: "",
    birthDay: "",
    age: "",
		email: "",
		post: "",
		prefecture: "", 
		address: "",
		inquiry: ""
	});
	const [inputError, setError] = useState({
    company: "",
    yourName: "",
    birthDay: [],
		email: [],
		post: [],
		prefecture: "", 
		address: "",
		partialInput: "",
		notError: false
	});
	const [fetchData, setFetchData] = useState({
		prefecture: "",
		address: ""
	});
	const business = ["法人", "個人"];
	const gender = ["男性", "女性"];
	const notError = "notError";
	
	// 郵便番号からデータを取得する
	const getAddress = () => {
		let url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode="
		url += values.post;
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				const prefecture = "prefecture";
				const address = "address";
				setFetchData({
					...fetchData,
					[prefecture]: res.results[0].address1,
					[address]: res.results[0].address2 + res.results[0].address3
				});
			})
			.catch((err) => {
				console.log(err);
		})
	}


	const handleChange = (event) => {
		setValues({
			...values, [event.target.name]: event.target.value
		});
	}

	const handleError = (event) => {
		const input = event.target.value;
		if (!input) {
			setError({
				...inputError,
				[event.target.name]: "入力必須項目です！",
				[notError]: false
			});
		} else {
			setError({
				...inputError,
				[event.target.name]: "",
				[notError]: true
			});
		}
	}
// メールアドレスチェック
	const handleMailError = (event) => {
		const input = event.target.value;
		const name = event.target.name;
		const match = /^\w+([.|-]*\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (!input) {
			inputError[name].push("入力必須項目です！");
			const string = Array.from(new Set(inputError[name]));
			setError({
				...inputError,
				[name]: string,
				[notError]: false
			});
		} else if (!match.test(input)) {
			inputError[name].push("入力された値が不正です");
			const number = Array.from(new Set(inputError[name]));
			setError({
				...inputError,
				[name]: number,
				[notError]: false
			});
		} else {
			inputError[name].splice(0);
			setError({
				...inputError,
				[notError]: true
			});
		}
	}
// 生年月日チェック
	const handleBirthCheck = (event) => {
		const input = event.target.value
		const name = event.target.name;
		const match = /([12]{1}[089]{1}[0-9]{2})+([1-9]{1}|1[0-2]{1})+([1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})/;
		if (!input) {
			inputError[name].push("入力必須項目です！");
			const string = Array.from(new Set(inputError[name]));
			setError({
				...inputError,
				[name]: string,
				[notError]: false
			});
		} else if (!match.test(input)) {
			inputError[name].push("入力された値が不正です");
			const number = Array.from(new Set(inputError[name]));
			setError({
				...inputError,
				[name]: number,
				[notError]: false
			});
		} else {
			inputError[name].splice(0);
			setError({
				...inputError,
				[notError]: true
			});
		}
	}
// 郵便番号チェック
	const handleNumberError = (event) => {
		const input = event.target.value
		const name = event.target.name;
		const match = /^\d{7}$/;
		if (!input) {
			inputError[name].push("入力必須項目です！");
			const string = Array.from(new Set(inputError[name]));
			setError({
				...inputError,
				[name]: string,
				[notError]: false
			});
		} else if (!match.test(input)) {
			inputError[name].push("数値のみ入力可能です");
			const number = Array.from(new Set(inputError[name]))
			setError({
				...inputError,
				[name]: number,
				[notError]: false
			});
		} else {
			inputError[name].splice(0);
			setError({
				...inputError,
				[notError]: true
			});
		}
	}
// 郵便番号・都道府県・住所の部分入力不可
	const notPartialInput = () => {
		const partialInput = "partialInput";
		if (values.post !== "" && values.prefecture !== "" && values.address !== "") {
			setError({
				...inputError,
				[partialInput]: "",
				[notError]: false
			})
		} else {
			setError({
				...inputError,
				[partialInput]: "郵便番号・都道府県・住所は部分入力不可です",
				[notError]: true
			})
		}
}
	const calcAge = () => {
		// 入力された生年月日に/を加える
		const age = "age";
		const birthYear = values.birthDay.slice(0, 4);
		const birthMonth = values.birthDay.slice(4, 6);
		const birthDay = values.birthDay.slice(6);
		let day = new Date();
	  let yourAge = day.getFullYear() - birthYear;
		// 今年の誕生日まだ来ていない場合の処理
		if (day <= new Date(day.getFullYear(), birthMonth, birthDay)) {
			yourAge--;
		}
		setValues({ ...values, [age]: yourAge });
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					'& .MuiTextField-root': {width: '25ch'}
				}}
			/>
			<form onSubmit={handleSubmit} style={{margin: 'auto', width: '60%', textAlign: 'center'}}>
			<h1>お問い合わせ</h1>
			<div>
			{business.map((item) => {
				let random = Math.random();
				return (
					<span key={random}>
						<label htmlFor={item}>
							{item}
						</label>
						<input key={item} id={item} type="radio" name="business" value={item} checked={item === values.business} onChange={handleChange} />
					</span>
				)
			})}
			</div>
			<div>
				<InputSize />
					<TextField variant="outlined" size="small" label='company' id="company" name="company" onChange={handleChange} onBlur={handleError} disabled={values.business === "個人"} />
					{inputError.company &&
						<p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>
							{inputError.company}
						</p>
					}
			</div>
			<div>
				<InputSize />
				<TextField variant="outlined" size="small" label={'Name'} id="Name" name="yourName" onChange={handleChange} onBlur={handleError}/>
					{inputError.yourName && <p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>{inputError.yourName}</p>}
			</div>
			<div>
			{gender.map((item) => {
				let random = Math.random();
				return (
					<span key={random}>
						<label htmlFor={item}>
							{item}
						</label>
						<input id={item} key={random} type="radio" name="gender" value={item} checked={item === values.gender} onChange={handleChange} />
					</span>
				)
			})}
			</div>
			<div>
				<InputSize />
				<TextField variant="outlined" size="small" label={'BirthDay'} id="BirthDay" name="birthDay" onChange={handleChange} onBlur={handleBirthCheck}/>
					{inputError.birthDay &&
						inputError.birthDay.map((item) => {
							const random = Math.random();
							return (
							<p key={random} style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>
							{item}
							</p>
							)	
						})
					}
			</div>
			<div>
				<InputSize />
				<TextField variant="outlined" size="small" label={'Age'} id="Age" onFocus={calcAge} value={values.age ? values.age : ""} onChange={handleChange} readOnly={values.age === ""} />
					{inputError.age && <p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>{inputError.age}</p>}
			</div>
			<div>
				<InputSize />
				<TextField variant="outlined" size="small" label={'MailAddress'} id="MailAddress" name="email" onChange={handleChange} onBlur={handleMailError}/>
					{inputError.email &&
						inputError.email.map((item) => {
							const random = Math.random();
							return (
							<p key={random} style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>
								{item}
							</p>
						)
						})
					}
			</div>
			<Address value={values.prefecture} fetchData={fetchData} getAddress={getAddress} handleNumberError={handleNumberError} inputError={inputError} handleError={handleError} handleChange={handleChange} />
				{inputError.partialInput && <p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>{inputError.partialInput}</p>}
			<div>
				<textarea name="inquiry" cols="30" rows="10" style={{ resize: 'none', marginTop: '10px' }} onChange={handleChange} onClick={notPartialInput} onBlur={handleError}/>
				{inputError.inquiry && <p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>{inputError.inquiry}</p>}
			</div>
			<div>
					<Button type="submit" disabled={!inputError.notError} variant="outlined">送信</Button>
			</div>
			</form>
    </>
  );
}

export default App;