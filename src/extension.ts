import * as vscode from 'vscode';
import fetch from "node-fetch";

const SalimAPIUrl: string = "https://watasalim.vercel.app/api/quotes"
const LinkToHeaven: string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

let QuoteArray: string[] = []

export async function activate(context: vscode.ExtensionContext) {

	// * Fetching Quotes from API
	fetch(SalimAPIUrl, {
		method: "GET",
		headers: { "Content-type": "application/json;charset=UTF-8" }
	}).then(response => response.json())
		.then(json => {
			for (let quote of json.quotes) {
				let toAdd: string = quote.body
				if (QuoteArray.includes(toAdd))
					console.log(`[IMPORT WARNING] Duplicate Quote : ${toAdd}`)
				else
					QuoteArray.push(toAdd)
			}
			console.log("[EXTENSION'S QUOTE READY] Successfully pulled quote data from narze's repository")
		})
		.catch(err => console.log(err))

	let disposable: vscode.Disposable = vscode.commands.registerCommand('salim-quote-delivery.getSalimQuote', () => {
		// * Random Quote Index
		let randIndex: number = Math.floor(Math.random() * QuoteArray.length)

		// * Show it
		vscode.window.showInformationMessage(`${QuoteArray[randIndex]}`);

		// * You have 3% Chance to be sent to Heaven
		if (Math.floor(Math.random() * 100) < 3) {
			vscode.env.openExternal(vscode.Uri.parse(LinkToHeaven))
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
