# GPT Writing Assistant Chrome Extension

The **GPT Writing Assistant** is a Chrome extension that leverages OpenAI's ChatGPT API to rewrite selected text in editable fields (like `<input>`, `<textarea>`, and contenteditable elements). This assistant is particularly helpful if you want to refine, rephrase, or enhance your writing on-the-fly while working in web-based editors, form fields, or CMS backends.

## Features

- **Context-Aware Rewriting**: Select text inside any editable field and transform it using a custom system prompt.
- **Custom System Prompts**: Define multiple system prompts in the extension’s settings and select the active one. For example, have one prompt for making text more concise, another for making it more formal, etc.
- **Configurable Model and Key**: Easily set your OpenAI API key and the model you want to use (e.g., `gpt-3.5-turbo`, `gpt-4`).
- **Seamless Integration**: Access the rewriting feature via a right-click context menu whenever you highlight text in an editable field.

## Prerequisites

- A Google Chrome browser (or any Chromium-based browser supporting Manifest V3).
- An [OpenAI API Key](https://platform.openai.com/) with sufficient quota.
- A model supported by the ChatGPT API endpoint (e.g. `gpt-3.5-turbo`).

## Installation

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/your-username/gpt-writing-assistant-extension.git
   ```

2. **Open Chrome Extensions Page**:
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** in the top-right corner.

3. **Load Unpacked Extension**:
   - Click **Load unpacked**.
   - Select the directory you just cloned or unzipped.

The extension will now be available in your browser’s toolbar.

## Configuration

1. **Open the Extension’s Popup**:
   - Click on the extension’s icon in the toolbar.
   
2. **Enter Your OpenAI API Key**:
   - Paste your API key (e.g., `sk-...`) into the `OpenAI API Key` field.
   
3. **Select Model**:
   - Enter the model you’d like to use (e.g., `gpt-3.5-turbo`).

4. **Define System Prompts**:
   - Enter one or more system prompts in the textarea (one per line).
   - For example:
     ```
     You are a helpful writing assistant. Rewrite the input text to be concise.
     You are a grammar expert. Improve the input text for grammatical correctness.
     ```
   
5. **Choose Active Prompt**:
   - Select the active prompt from the dropdown menu. This prompt will be sent to the model when rewriting text.

6. **Save Settings**:
   - Click **Save Settings** to store your configuration.

## Usage

1. **Go to a Webpage with Editable Fields**:
   - For instance, open a text editor, a form field, or any `<input>`, `<textarea>`, or contenteditable element.

2. **Select Text**:
   - Highlight the portion of text you’d like to rewrite.

3. **Right-Click**:
   - A context menu option will appear: **"Rewrite Selected Text with GPT"**.

4. **Rewrite the Text**:
   - Clicking this option sends the selected text, along with the active system prompt, to the OpenAI API.
   - The response will replace the highlighted text directly in the field.

5. **Check the Result**:
   - Your selected text is now replaced by the improved or rephrased version returned by GPT.

## Troubleshooting

- **Context Menu Missing**:  
  Make sure you’ve selected text within an editable element. The menu item only appears if there is a selection and the element is editable.
  
- **No API Key Set**:  
  If you haven’t set your OpenAI API key, you’ll receive a prompt. Go to the extension’s popup to add it.
  
- **API Errors**:  
  Open the **Service Worker** console or **Inspect Popup**/**Content Script** consoles via `chrome://extensions/` and check for logs or errors.  
  Add `console.log()` or `console.error()` statements as needed for deeper debugging.

- **No Changes in Text**:  
  Confirm you’ve saved your settings in the popup. Make sure the API key is valid and you have sufficient quota. The prompt might also need adjusting for more noticeable changes.

## Contributing

Feel free to open issues or submit pull requests. If you have suggestions for new features or improvements, we’d love to hear them.

## License

This project is licensed under the [MIT License](LICENSE).
