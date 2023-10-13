// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const scriptPath = path.resolve(
    __dirname,
    "../src/python_scripts/replace_str.py",
  );

  // get os lunux/unix or windows
  const os = process.platform;
  // if windows use "py" else use "python3"
  const python = os == "win32" ? "py" : "python3";

  // get
  let python_replace_str = vscode.commands.registerCommand(
    "python-replace.replace",
    () => {
      // get user input with 2 params
      // first one is match string
      // second one is replace string
      let match_str = "";
      let replace_fun = "";

      // get openned file path
      const file_path = vscode.window.activeTextEditor?.document.fileName;

      vscode.window.showInputBox({ prompt: "match string" }).then((value) => {
        match_str = value || "";
        vscode.window.showInputBox({ 
          prompt: `f(x: str, y: Match, k: int) -> Any = ?` 
        }).then(
          (value) => {
            replace_fun = value || "x";
            
            // encode match_str and replace_fun in base64
            match_str = Buffer.from(match_str).toString("base64");
            replace_fun = Buffer.from(replace_fun).toString("base64");
            
            // execute python script
            exec(
              String.raw`${python} "${scriptPath}" "${file_path}" "${match_str}" "${replace_fun}"`,
              (error, stdout, stderr) => {
                if (error) {
                  vscode.window.showInformationMessage(
                    `error: ${error.message}`,
                  );
                } else if (stderr) {
                  vscode.window.showInformationMessage(`stderr: ${stderr}`);
                } else {
                  vscode.window.showInformationMessage(stdout);
                }
              },
            );
          },
        );
      });
    },
  );

  context.subscriptions.push(python_replace_str);
}

// This method is called when your extension is deactivated
export function deactivate() {}
