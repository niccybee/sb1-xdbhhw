const supportsFileUpload = computed(() => {
  return chatStore.selectedModel.value === "gpt-4-vision-preview";
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      await chatStore.sendMessage(
        "",
        chatStore.selectedProvider.value,
        chatStore.selectedModel.value,
        base64Image,
      );
    };
    reader.readAsDataURL(file);
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const message = userInput.value;
  userInput.value = "";

  await chatStore.sendMessage(
    message,
    chatStore.selectedProvider.value,
    chatStore.selectedModel.value,
  );
};
