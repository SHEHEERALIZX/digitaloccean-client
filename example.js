const DigitalOccean = require("./sample");

const api = "YOUR API KEY";
const client = new DigitalOccean(api);


let invoice_id = "your-invoice-id";



client.balance().then((res)=>{
	console.log(res);
});


client.billing_history().then((res)=>{
	console.log(res);
});


client.getAllInvoices().then((res)=>{
	console.log(res);
});

client.getInvoiceSummary(invoice_id).then((res)=>{
	console.log(res);
});


client.getInvoiceById(invoice_id).then((res) => {
	console.log(res);
});


client.getInvoiceById(invoice_id,"csv").then((res) => {
	console.log(res);
});


client.getInvoiceById(invoice_id,"pdf").then((res) => {
	console.log(res);
});

