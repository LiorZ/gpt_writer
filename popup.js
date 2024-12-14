document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('apiKey');
  const modelInput = document.getElementById('model');
  const systemPromptsTextarea = document.getElementById('systemPrompts');
  const activePromptSelect = document.getElementById('activePrompt');
  const saveBtn = document.getElementById('saveBtn');

  // Load settings from storage
  chrome.storage.sync.get(['openaiApiKey', 'model', 'systemPrompts', 'activePromptIndex'], 
    ({ openaiApiKey, model, systemPrompts, activePromptIndex }) => {
      if (openaiApiKey) apiKeyInput.value = openaiApiKey;
      if (model) modelInput.value = model;
      if (systemPrompts) systemPromptsTextarea.value = systemPrompts.join('\n');
      if (systemPrompts && systemPrompts.length > 0) {
        activePromptSelect.innerHTML = '';
        systemPrompts.forEach((p, i) => {
          const opt = document.createElement('option');
          opt.value = i;
          opt.textContent = p.substring(0, 50) + (p.length > 50 ? '...' : '');
          activePromptSelect.appendChild(opt);
        });
        if (typeof activePromptIndex === 'number') {
          activePromptSelect.value = activePromptIndex;
        }
      }
    }
  );

  saveBtn.addEventListener('click', () => {
    const systemPrompts = systemPromptsTextarea.value.split('\n').map(s => s.trim()).filter(Boolean);
    const activePromptIndex = parseInt(activePromptSelect.value, 10) || 0;
    chrome.storage.sync.set({
      openaiApiKey: apiKeyInput.value.trim(),
      model: modelInput.value.trim() || "gpt-3.5-turbo",
      systemPrompts,
      activePromptIndex
    }, () => {
      // Update prompt dropdown
      activePromptSelect.innerHTML = '';
      systemPrompts.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = p.substring(0, 50) + (p.length > 50 ? '...' : '');
        activePromptSelect.appendChild(opt);
      });
      activePromptSelect.value = activePromptIndex;
      alert('Settings saved.');
    });
  });

  // Update the activePromptIndex when changed
  activePromptSelect.addEventListener('change', () => {
    chrome.storage.sync.set({
      activePromptIndex: parseInt(activePromptSelect.value, 10)
    });
  });
});

