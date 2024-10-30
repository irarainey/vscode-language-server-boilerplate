import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  TextDocumentSyncKind,
  InitializeResult
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Create the connection
const connection = createConnection(ProposedFeatures.all);

// Create a document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Initialize the server
connection.onInitialize(async () => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: {
        openClose: true,
        change: TextDocumentSyncKind.Incremental
      },
      workspace: {
        workspaceFolders: {
          supported: true,
          changeNotifications: true
        }
      }
    }
  };

  return result;
});

// Connection is ready
connection.onInitialized(async () => {
  await connection.sendRequest('custom/requestFromServer');
});

// Handle document changes (also fires on open)
documents.onDidChangeContent(async (change) => {
  await debouncedChange(change.document);
});

// Debounce the document change event for 1000ms
const debouncedChange = debounce(onDidChangeContent, 1000);

// Handles the token entered notification from the client
connection.onNotification('custom/notificationFromClient', async (message: string) => {
  console.log(message);
});

///
/// Handle the document change event
///
async function onDidChangeContent(document: TextDocument): Promise<void> {
  console.log(`Change detected in: ${document.uri}`);
}

///
/// Debounce function to prevent multiple calls to a function within a certain time frame
///
function debounce<T extends (...args: any[]) => Promise<any> | void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args); // Await the async function if necessary
          resolve(result); // Resolve the result when successful
        } catch (error) {
          reject(error); // Reject the promise if the function throws an error
        }
      }, delay);
    });
  };
}

// Listen for document changes
documents.listen(connection);

// Server listen
connection.listen();
