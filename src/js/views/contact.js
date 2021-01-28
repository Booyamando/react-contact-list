import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Card } from "../component/card.js";
import { Modal } from "../component/modal";
import { Context } from "../store/appContext";

export const Contact = () => {
	const { store, actions } = useContext(Context);
	const [modal, setModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);

	const handleDelete = contact => {
		setSelectedContact(contact);
		setModal(true);
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contact.map((contact, index) => (
							<Card onDelete={e => handleDelete(contact)} contact={contact} key={index} />
						))}
					</ul>
				</div>
			</div>
			<Modal show={modal} onClose={setModal} contact={selectedContact} delete={actions.deleteContact} />
		</div>
	);
};
