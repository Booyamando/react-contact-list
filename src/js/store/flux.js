const getState = ({ getStore, getActions, setStore }) => {
	const baseURL = "https://assets.breatheco.de/apis/fake/contact";
	const agenda_slug = "armando_agenda";

	return {
		store: {
			contact: []
		},
		actions: {
			syncData: () => {
				fetch(`${baseURL}/agenda/${agenda_slug}`)
					.then(response => {
						if (!response.ok) throw new Error(response.statusText);
						return response.json();
					})
					.then(data => setStore({ contact: data }));
			},

			addContact: contact => {
				fetch(`${baseURL}/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (!response.ok) throw new Error(response.statusText);
						return response.json();
					})
					.then(data => getActions().syncData())
					.catch(err => console.error(err));
			},

			deleteContact: contact => {
				fetch(`${baseURL}/${contact}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) throw new Error(response.statusText);
						return response.json();
					})
					.then(data => getActions().syncData())
					.catch(err => console.error(err));
			}
		}
	};
};

export default getState;
