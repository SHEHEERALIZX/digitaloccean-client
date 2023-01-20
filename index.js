const axios = require("axios");
const fs = require("fs");
let config = {
	headers: {
		Authorization:
			"Bearer dop_v1_9e5e336d9aebbaa4dda07d41dbe39e26fccfbab71fc6aeeba0e278fd16847567",
	},
};

async function balance() {
	try {
		const response = await axios.get(
			"https://api.digitalocean.com/v2/customers/my/balance",
			config
		);
		return response.data;
	} catch (error) {
		console.log(error);
		console.log(error.response);
		return error.response;
	}
}

async function billing_history() {
	try {
		const response = await axios.get(
			"https://api.digitalocean.com/v2/customers/my/billing_history",
			config
		);
		return response.data;
	} catch (error) {
		console.log(error);
		console.log(error.response);
		return error.response;
	}
}

async function getAllInvoices() {
	try {
		const response = await axios.get(
			"https://api.digitalocean.com/v2/customers/my/invoices",
			config
		);
		return response.data;
	} catch (error) {
		console.log(error);
		console.log(error.response);
		return error.response;
	}
}

async function getInvoiceById(invoice_id, filetype) {
	if (filetype === "csv" || filetype === "CSV") {
		try {
			const response = await axios.get(
				`https://api.digitalocean.com/v2/customers/my/invoices/${invoice_id}/csv`,
				config
			);
			fs.writeFile(`${invoice_id}.csv`, response.data, (err) => {
				if (err) throw err;
				console.log("Invoice Saved in FileSystem");
			});
			return response.data;
		} catch (error) {
			return error;
		}
	} else if (filetype === "pdf" || filetype === "PDF") {
		try {
			config.responseType = "stream";
			const response = await axios.get(
				`https://api.digitalocean.com/v2/customers/my/invoices/${invoice_id}/pdf`,
				config
			);
			const filename = response.headers["content-disposition"]
				.split(";")[1]
				.split("=")[1]
				.slice(1, -1);
			response.data.pipe(fs.createWriteStream(filename));
		} catch (error) {
			return error;
		}
	} else {
		try {
			const response = await axios.get(
				`https://api.digitalocean.com/v2/customers/my/invoices/${invoice_id}`,
				config
			);
			return response.data;
		} catch (error) {
			return error;
		}
	}
}

async function getInvoiceSummary(invoice_id) {
	try {
		const response = await axios.get(
			`https://api.digitalocean.com/v2/customers/my/invoices/${invoice_id}/summary`,
			config
		);
		return response.data;
	} catch (error) {
		console.log(error);
		console.log(error.response);
		return error.response;
	}
}

const myfunctions = {
	balance,
	billing_history,
	getAllInvoices,
	getInvoiceById,
	getInvoiceSummary,
};

module.exports = myfunctions;
