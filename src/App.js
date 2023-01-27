import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
	let list = localStorage.getItem('list');
	if (list) {
		return JSON.parse(list);
	} else {
		return [];
	}
};

function App() {
	const [name, setName] = useState('');
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editID, setEditID] = useState(null);
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			showAlert(true, 'danger', 'please enter value');
		} else if (name && isEditing) {
			const editItemIndex = list.findIndex((item) => item.id === editID);
			list[editItemIndex].title = name;
			setList(list);
			showAlert(true, 'success', 'item is updated');
			setName('');
			setEditID(null);
			setIsEditing(false);
		} else {
			showAlert(true, 'success', 'item added to the list');
			const newItem = { id: new Date().getTime().toString(), title: name };
			setList([...list, newItem]);
			setName('');
		}
	};

	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};

	const clearList = () => {
		setList([]);
		showAlert(true, 'success', 'The list is clear');
	};

	const removeItem = (id) => {
		const newList = list.filter((item) => id !== item.id);
		setList(newList);
		showAlert(true, 'success', 'the item is deleted');
	};

	const editItem = (id) => {
		const specificItem = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setName(specificItem.title);
	};

	return (
		<section className='section-center'>
			<form className='grocery-form' onSubmit={handleSubmit}>
				{alert.show && (
					<Alert list={list} {...alert} removeAlert={showAlert} />
				)}
				<h3>Grocery Bud</h3>
				<div className='form-control'>
					<input
						type='text'
						className='grocery'
						placeholder='type something'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List items={list} removeItem={removeItem} editItem={editItem} />
					<button onClick={clearList} className='clear-btn'>
						clear items
					</button>
				</div>
			)}
		</section>
	);
}

export default App;
