// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let contextActiveSBItem: vscode.StatusBarItem;
let contextActive: boolean;

let applyKeyContext = (val: boolean) => {
	contextActive = val;
	contextActiveSBItem.text = (contextActive) ? "IPA Enabled" : "IPA Disabled";
	vscode.commands.executeCommand('setContext', 'typing-ipa.keysEnabled', val);
}

let toggleKeyContext = () => {
	applyKeyContext(!contextActive);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "typing-ipa" is now active!');
	contextActiveSBItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
	contextActiveSBItem.command = 'typing-ipa.toggleKeys';
	contextActiveSBItem.text = (contextActive) ? "IPA Enabled" : "IPA Disabled";
	context.subscriptions.push(contextActiveSBItem);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('typing-ipa.toggleKeys', () => {
		// The code you place here will be executed every time your command is executed
		toggleKeyContext();
		contextActiveSBItem.show();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	applyKeyContext(false);
}
