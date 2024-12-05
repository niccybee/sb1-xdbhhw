<script setup lang="ts">
const ui = useUIStore();
const chat = useChatStore();
</script>
<template>
  <div>
    <h3 class="font-bold">Settings</h3>
    <hr />
    <div class="flex flex-col gap-3">

      <hr />
      <h4 class="font-bold">Visual</h4>
      <label class="flex gap-2 items-center border border-1 border-gray-1 p-2 rounded-md">
        <input type="checkbox" v-model="ui.engagedMessageMode" />
        <p>Engaged Message Mode</p>
      </label>
      <label class="flex gap-2 items-center border border-1 border-gray-1 p-2 rounded-md">
        <input type="checkbox" v-model="ui.hideIntroHeader" />
        <p>Hide Intro Header</p>
      </label>
      <label class="flex gap-2 items-center border border-1 border-gray-1 p-2 rounded-md">
        <input type="checkbox" v-model="ui.hideQuickStartAction" :disabled="chat.messages > 0" />
        <p>Hide Quick Start</p>
      </label>
      <label class="flex gap-2 items-center border border-1 border-gray-1 p-2 rounded-md">
        <input type="checkbox" v-model="ui.hideSidebar" />
        <p>Hide Sidebar</p>
      </label>
      <label class="flex gap-2 items-center border border-1 border-gray-1 p-2 text-sm font-medium text-gray-700">
        <p class="text-gray-700 pb-1">Theme:</p>
        <select v-model="ui.theme" class="input select min-w-32" placeholder="Select Theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  </div>
</template>