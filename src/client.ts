import * as path from 'path';
import { ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

// Define the client as a module-level variable
let client: LanguageClient;

///
/// Activate the extension
///
export async function activate(context: ExtensionContext) {
  // Get the server module path
  const serverModule = context.asAbsolutePath(path.join('dist', 'server.js'));

  // Define the server and client options
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] }
    }
  };

  // Define the client options
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'javascript' }]
  };

  // Create the language client with the defined options
  client = new LanguageClient(
    'language-server-boilerplate',
    'Language Server Boilerplate',
    serverOptions,
    clientOptions
  );

  // Start the client which also starts the server
  await client.start();

  // Handle a custom request from the server
  client.onRequest('custom/requestFromServer', () => {
    console.log('Request from server received');
  });

  // Register the language client for automatic disposal when the extension is deactivated
  context.subscriptions.push(client);

  // Send a notification to the server
  await client.sendNotification('custom/notificationFromClient', 'Notification from client');
}

///
/// Deactivate the extension
///
export async function deactivate(): Promise<void> {
  if (client) {
    await client.stop();
    await client.dispose();
  }
}
