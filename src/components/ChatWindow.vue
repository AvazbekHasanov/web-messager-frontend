<template>
  <div class="w-2/3 flex flex-col bg-white dark:bg-gray-900">
    <div class="user_info">
      <div>
        <img
          src="../../public/svgs/cevron-left.svg"
          alt="none"
          class="back_icon"
        />
      </div>
      <div>
        <img
          src="../../public/img.png"
          style="border-radius: 50%; width: 48px"
          v-if="!chatStore.getChatInfo.photo"
        />
      </div>
      <div class="dark:text-white">
        {{ chatStore.getChatInfo.full_name }}
      </div>
    </div>
    <div class="flex-grow p-4 overflow-auto" ref="messagesContainer">
      <div
        v-if="chatStore.getMessages.length > 0"
        class="flex justify-start mb-4"
        v-for="message in chatStore.getMessages"
        :key="message.id"
        :class="{ 'justify-end': message.is_owner }"
        :data-message-id="message.id"
      >
        <div
          v-if="!message.is_owner"
          class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"
        ></div>
        <div
          class="bg-white dark:bg-gray-800 rounded shadow"
          style="padding: 5px 5px"
        >
          <p
            class="font-bold text-black dark:text-white"
            style="padding: 0 10px"
          >
            {{ message.from }}
          </p>
          <media-container :files="message.files" :is_modal="false" />
          <p
            class="text-black dark:text-white"
            style="padding: 0 10px"
            v-if="message.content"
            v-html="formatTextWithBr(message.content)"
          ></p>
          <div class="w-full flex justify-end mt-1" v-if="message.is_owner">
            <CheckIcon class="check-icon" v-if="!message.is_read" />
            <DoubleCheckIcon class="check-icon" v-else />
          </div>
        </div>
        <div
          v-if="message.is_owner"
          style="padding: 0 10px"
          class="flex-shrink-0 ml-2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"
        ></div>
      </div>

      <div v-else class="free_content">
        No message here yet.. Start chatting
      </div>
    </div>
    <ChatInput @sendMessage="sendMessage"></ChatInput>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted,
  getCurrentInstance,
  watch,
  nextTick,
} from "vue";
import ChatInput from "./ChatInput.vue";
import MediaContainer from "@/components/mediaContainer.vue";
import debounce from "lodash/debounce";
import CheckIcon from "@/components/icons/check-icon.vue";
import DoubleCheckIcon from "./icons/double-check.vue";
import { useCurrentChatStore } from "@/stores/CurrentChat.js";

const props = defineProps({
  selectedChatInfo: { type: Object, required: true },
  chat_selected: { type: Boolean, default: false },
});

const { proxy } = getCurrentInstance();
const messagesContainer = ref(null);
const observer = ref(null);
const maxReadedMessage = ref(null);

const chatStore = useCurrentChatStore();
const messages = chatStore.getMessages;
const chatInfo = chatStore.getChatInfo;


const markAsRead = async (message) => {
  console.log("message markAsRead: " ,message);
  

  const data = {
    message_id: message.id,
    chat_id: chatInfo.chat_id,
  };
  await proxy.$axios.post("/messages/mark-as-read", data);
  maxReadedMessage.value.id = maxReadedMessage.value.id++;
};

const debouncedSendMessageRead = debounce(markAsRead, 5);

function initializeScrollObserver() {
  const options = {
    root: messagesContainer.value,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      const messageId = entry.target.getAttribute("data-message-id");
        const message = messages.find((msg) => msg.id == messageId);
        // console.log("entry.isIntersecting", {ent: entry.isIntersecting, message: message, messageId: messageId});
        
      if (entry.isIntersecting) {
        if (message && !message.is_owner && !message.is_read) {
          maxReadedMessage.value = {...message};
          debouncedSendMessageRead({...message});
        }
      }
    });
  };

  observer.value = new IntersectionObserver(callback, options);

  nextTick(() => {
    const messageElements =
      messagesContainer.value.querySelectorAll("[data-message-id]");
    messageElements.forEach((element) => observer.value.observe(element));
  });
}

const formatTextWithBr = (text, to = "<br>", from = "\n") => {
  return text.replace(from, to);
};

function scrollToBottom() {
  const messages = chatStore.getMessages;
  maxReadedMessage.value = messages.find(
    (message) => !message.is_owner && !message.is_read
  );
  console.log("maxReadedMessage", maxReadedMessage);
  
  if(maxReadedMessage.value && messages.length>0 && maxReadedMessage.value.id == messages[messages.length - 1].id){
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
      markAsRead({...maxReadedMessage.value});
    }
  }
  if (!maxReadedMessage.value) {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  }else {
    console.log("maxReadedMessage", maxReadedMessage);
    
    markAsRead(maxReadedMessage.value);
    nextTick(() => {
      const messageElement = messagesContainer.value.querySelector(
        `[data-message-id='${maxReadedMessage.value.id}']`
      );

      if (messageElement) {
        messageElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        initializeScrollObserver();
      }
    });
  }
}

const sendMessage = async (arg) => {
  const data = {
    message: arg.text,
    chat_id: chatStore.getChatInfo.chat_id,
  };
  const result = await proxy.$axios.post("/message/new/message", data);
  chatStore.addMessage(result.data);
  nextTick(scrollToBottom);
};


watch(
  () => chatStore.getMessages,
  (newMessages) => {
    if (observer.value) observer.value.disconnect();
  },
  { deep: true }
);

watch(
  () => chatStore.getChatInfo,
  (newInfo) => {
    initializeScrollObserver();
    scrollToBottom();
  },
  { deep: true }
);

onMounted(() => {
  initializeScrollObserver();
  scrollToBottom();
});
</script>


<style >
.free_content {
  @apply flex items-center justify-center dark:text-white w-full h-full;
}
.user_info {
  @apply p-4 flex flex-row gap-4 items-center border-b-2;
}

.check-icon path {
  @apply dark:fill-white;
}

.back_icon {
  fill: #000;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .back_icon {
    fill: #fff; /* Change to white (or any color) in dark mode */
  }
}
.back_icon path {
  color: #f1f1f1;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
