import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';

import { HorizontalGrid, VerticalGrid, Button } from '../styledComponents/projectStyled';

const expectedEU = 80;
const expectedLU = 2;
const apiUrl = 'http://localhost:3001';

const ProjectInformation = () => {
	const [data, setData] = useState({ name: '', eu: 970, lu: 34 });
	const [projectDesc, setProjectDesc] = useState('');
	const [balance, setBalance] = useState({ EU: null, LU: null, PDU: null, level: 0 });
	const [error, setError] = useState('');
	const [extraSalary, setExtraSalary] = useState([]);
	const [paidHoliday, setPaidHoliday] = useState([]);

	useEffect(() => {
		getPaidHoliday();
		getExtraSalary();
		getBalance();
	}, []);

	const handleEditorChange = value => setProjectDesc(value);

	const handleChange = event => {
		const { name, value } = event.target;

		setData({ ...data, name: value });
	};

	const validate = () => {
		const { name } = data;

		if (!name) {
			setError('Please fill required name field');
			return false;
		}
		
		if (!projectDesc) {
			setError('Please fill required project field');
			return false;
		}

		return true;
	};

	const publishDashboard = () => {
		const { name } = data;

		if (validate()) {
			axios.post(`${apiUrl}/addProject`, { name, project: projectDesc })
			.then(res => {
				if (res.data) {
					setData({ ...data, name: '' });
					setProjectDesc('');
					setError('');
				}
			})
			.catch(error => {
				console.log(error);
			})
		}
	};

	const getExtraSalary = () => {
		axios.get(`${apiUrl}/getExtraSalary`)
		.then(res => {
			if (res.data) setExtraSalary(res.data);
		})
		.catch(error => {
			console.log(error);
		})
	};

	const getPaidHoliday = () => {
		axios.get(`${apiUrl}/getPaidHoliday`)
		.then(res => {
			if (res.data) setPaidHoliday(res.data);
		})
		.catch(error => {
			console.log(error);
		})
	};

	const getBalance = () => {
		const { eu, lu } = data;

		let EU = eu;
		let LU = lu;
		let PDU = 0;

		while(EU >= expectedEU && LU >= expectedLU) {
			LU = LU-expectedLU;
			EU = EU-expectedEU;
			PDU++;
		}

		setBalance({ ...balance, EU, LU, PDU });
	};

	const getNextUnit = () => {
		if (paidHoliday.length > 0) {
			const item = paidHoliday.find((data) => data.level === `L${balance.level+1}`);

			return { eu: item.eu, lu: item.lu };
	  }
	};

	return (
		<div>
			<HorizontalGrid className='row'>
				<div className='col-md-3'>
					<div className='d-flex border border-dark my-4 justify-content-center align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>					
						<h2 className='h6 py-3 text-center mb-0'>TALENT DATA</h2>
					</div>
					<div className='border border-dark'>
						<VerticalGrid>
							<label style={{backgroundColor: '#ffe2d8'}} className='px-2 py-2 text-center border-bottom border-dark'>Name:</label>
							<div className='px-2 py-3'><input type="text" className='form-control border-0' name="name" value={data.name} onChange={handleChange} /></div>
							<label style={{backgroundColor: '#ffe2d8'}} className='px-2 py-2 text-center border-bottom border-top border-dark'>Project:</label>
							<JoditEditor value={projectDesc} onChange={(text) => handleEditorChange(text)} />
						</VerticalGrid>
					</div>
				</div>
				<div className='col-md-5'>
					<div className='d-flex border border-dark my-4 justify-content-between align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>
						<span></span>
						<h2 className='h6 py-3 text-center mb-0'>BALANCE</h2>
						<span className='border-start border-dark py-3 px-2'>22-12-2022</span>
					</div>
					<div className='border border-dark d-flex justify-content-between align-items-center'>
						<div className='col-md-5 border-end border-dark' style={{backgroundColor: '#c6e2ae'}}>
							<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>Expercience Units (EU)</h6>
							<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>970</div>
						</div>
						<div className='col-md-3 border-end border-dark' style={{backgroundColor: '#b6c9f0'}}>
							<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>Level</h6>
							<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>{`L${balance.level}`}</div>
						</div>
						<div className='col-md-4' style={{backgroundColor: '#dff3d7'}}>
							<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>Learning Units (LU)</h6>
							<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>34</div>
						</div>
					</div>
					<div className='d-flex border border-dark my-4 justify-content-center align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>					
						<h2 className='h6 py-3 text-center mb-0'>PROFESSIONAL DEVELOPMENT UNITS</h2>						
					</div>
					<div className='row justify-content-between align-items-center'>
						<div className='col-md-3'>
							<div className='h-100 border border-dark' style={{backgroundColor: '#c4e0ac'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>EU</h6>
								<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>{balance?.EU}</div>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='h-100 border border-dark' style={{backgroundColor: '#a2d758'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>PDU</h6>
								<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>{balance?.PDU}</div>
							</div>
						</div>
						<div className='col-md-3'>
							<div className='h-100 border border-dark' style={{backgroundColor: '#e6fade'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-3 text-uppercase fst-italic'>LU</h6>
								<div className='fw-bold d-flex justify-content-center align-items-center' style={{height: '80px'}}>{balance?.LU}</div>
							</div>
						</div>
					</div>
					<div className='d-flex border border-dark my-4 justify-content-center align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>					
						<h2 className='h6 py-3 text-center mb-0'>TO GO</h2>
					</div>
					<div className='row justify-content-between align-items-center'>
						<div className='col-md-2'>
							<div className='border border-dark mb-3' style={{backgroundColor: '#c4e0ac'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-1 text-uppercase fst-italic'>EU</h6>
								<h6 style={{fontSize: '14px'}} className='mb-0 py-1'>{balance.EU ? expectedEU-balance.EU : ''}</h6>
							</div>
							<div className='border border-dark mb-3' style={{backgroundColor: '#c4e0ac'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 py-1'>{getNextUnit()?.eu-data?.eu}</h6>
							</div>
						</div>
						<div className='col-md-8'>
							<div>&nbsp;</div>
							<div className='border border-dark mb-3' style={{backgroundColor: '#a2d758'}}>
								<div className='row'>
									<div className='col-md-8'>
									<h6 style={{fontSize: '14px'}} className='mb-0 py-1 text-uppercase fst-italic'>Next PDU</h6>
									</div>
									<div className='col-md-4'>
									<h6 style={{fontSize: '14px'}} className='mb-0 border-start border-dark py-1 text-uppercase fst-italic'>{balance.PDU ? balance.PDU+1 : ''}</h6>
									</div>
								</div>
							</div>
							<div className='border border-dark mb-3' style={{backgroundColor: '#b4c7ee'}}>
							<div className='row'>
									<div className='col-md-8'>
									<h6 style={{fontSize: '14px'}} className='mb-0 py-1 text-uppercase fst-italic'>Next LEVEL</h6>
									</div>
									<div className='col-md-4'>
									<h6 style={{fontSize: '14px'}} className='mb-0 border-start border-dark py-1 text-uppercase fst-italic'>{`L${balance.level+1}`}</h6>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-2'>
							<div className='border border-dark mb-3' style={{backgroundColor: '#e6fade'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 border-bottom border-dark py-1 text-uppercase fst-italic'>LU</h6>
								<h6 style={{fontSize: '14px'}} className='mb-0 py-1'>{balance.LU ? expectedLU-balance.LU : ''}</h6>
							</div>
							<div className='border border-dark mb-3' style={{backgroundColor: '#e6fade'}}>
								<h6 style={{fontSize: '14px'}} className='mb-0 py-1'>{getNextUnit()?.lu-data?.lu}</h6>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-4'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='table-responsive'>
								<table className="table table-bordered" style={{fontSize: '12px'}}>
									<tbody className='border border-dark'>
										<tr>
											<th style={{backgroundColor: '#b4c7ee'}} scope="row">LUS</th>
											<td style={{backgroundColor: '#b4c7ee'}}>2</td>
											<td rowspan="2" style={{backgroundColor: '#a2d758'}}>PDU</td>
										</tr>
										<tr>
											<th style={{backgroundColor: '#b4c7ee'}} scope="row">EUs</th>
											<td style={{backgroundColor: '#b4c7ee'}}>80</td>																											
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className='d-flex border border-dark my-4 justify-content-center align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>					
						<h2 className='h6 py-3 text-center mb-0'>EXTRA SALARY</h2>
					</div>
					<div className='table-responsive'>
						<table className="table table-bordered" style={{fontSize: '12px'}}>
							<thead className='border border-dark'>
								<tr>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">PDUs</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">Level</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">Extra Hourly Rate</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">EUs</th>
									<th	style={{backgroundColor: '#fff2ce'}} scope="col">LUs</th>									
								</tr>
							</thead>
							<tbody className='border border-dark'>
								{extraSalary.map((data, index) => (
									<tr key={index}>
										<th style={{backgroundColor: '#a2d758'}} scope="row">{data.pdu}</th>
										<td style={{backgroundColor: '#b4c7ee'}}>{data.level}</td>
										<td style={{backgroundColor: '#ffe9df'}}>{data.extra_hourly_rate}</td>
										<td style={{backgroundColor: '#c4e0ac'}}>{data.eu}</td>
										<td style={{backgroundColor: '#e6fade'}}>{data.lu}</td>									
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='d-flex border border-dark mb-4 mt-2 justify-content-center align-items-center' style={{backgroundColor: '#f7b07d', minHeight: '58px'}}>					
						<h2 className='h6 py-3 text-center mb-0'>PAID HOLIDAY</h2>
					</div>
					<div className='table-responsive'>
						<table className="table table-bordered" style={{fontSize: '12px'}}>
							<thead className='border border-dark'>
								<tr>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">PDUs</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">Level</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">Paid Holiday Hours</th>
									<th style={{backgroundColor: '#fff2ce'}} scope="col">EUs</th>
									<th	style={{backgroundColor: '#fff2ce'}} scope="col">LUs</th>									
								</tr>
							</thead>
							<tbody className='border border-dark'>
								{paidHoliday.map((data, index) => (
									<tr key={index}>
										<th style={{backgroundColor: '#a2d758'}} scope="row">{data.pdu}</th>
										<td style={{backgroundColor: '#b4c7ee'}}>{data.level}</td>
										<td style={{backgroundColor: '#ffe9df'}}>{data.paid_holiday_hours}</td>
										<td style={{backgroundColor: '#c4e0ac'}}>{data.eu}</td>
										<td style={{backgroundColor: '#e6fade'}}>{data.lu}</td>									
									</tr>
								))}						
							</tbody>
						</table>
					</div>
				</div>
			</HorizontalGrid>
			<div className='d-flex flex-column align-items-center justify-content-center my-4'>
				<Button className='btn btn-primary' onClick={publishDashboard}>Publish</Button>
				{error && <span className='text-danger mt-2'>{error}</span>}
			</div>
		</div>
  );
};

export default ProjectInformation;
