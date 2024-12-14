chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rewriteText",
    title: "Rewrite Selected Text with GPT",
    // Appear only when there's a selection in an editable context
    contexts: ["selection", "editable"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "rewriteText") {
    // Ask content script for the selected text in the editable field
    chrome.tabs.sendMessage(tab.id, { action: "getSelectedText" }, async (response) => {
      if (response && response.selectedText) {
        const selectedText = response.selectedText;

        // Get settings
        const { openaiApiKey, model, systemPrompts, activePromptIndex } = await chrome.storage.sync.get(
          ['openaiApiKey', 'model', 'systemPrompts', 'activePromptIndex']
        );

        if (!openaiApiKey) {
          alert("OpenAI API key is not set. Please open the extension popup and configure it.");
          return;
        }

        const prompt = (systemPrompts && systemPrompts.length > 0) 
          ? systemPrompts[activePromptIndex || 0] 
          : "You are a helpful assistant. Please rewrite the given text.";

        // Call OpenAI API
        const rewritten = await callOpenAI(openaiApiKey, model || "gpt-3.5-turbo", prompt, selectedText);
        if (rewritten) {
          // Send back the rewritten text to replace in the field
          chrome.tabs.sendMessage(tab.id, { action: "replaceSelectedText", replacement: rewritten });
        }
      }
    });
  }
});

async function callOpenAI(apiKey, model, systemPrompt, userText) {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  };

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userText }
  ];

  const body = JSON.stringify({
    model: model,
    messages: messages,
    max_tokens: 500,
    temperature: 0.7
  });

  try {
    const response = await fetch(url, { method: "POST", headers, body });
    if (!response.ok) {
      console.error("OpenAI API request failed:", response.status, await response.text());
      return null;
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim();
  } catch (err) {
    console.error("OpenAI request error:", err);
    return null;
  }
}

