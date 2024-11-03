<template>

  <div class="relative">
    <div
    >
      <div class="flex items-end gap-1.5 md:gap-2">
        <div class="relative">
          <div class="flex flex-col">
            <!--              <input multiple="" type="file" tabindex="-1" class="hidden"-->
            <!--                                              style="display: none;">-->
            <button type="button" id="radix-:rf:" aria-haspopup="menu" aria-expanded="false" data-state="closed"
                    class="text-token-text-primary border border-transparent inline-flex items-center justify-center gap-1 rounded-lg text-sm dark:transparent dark:bg-transparent leading-none outline-none cursor-pointer hover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary radix-state-active:text-token-text-secondary radix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent m-0 h-0 w-0 border-none bg-transparent p-0"></button>
            <label
                class="flex cursor-pointer  items-center justify-center h-8 w-8 rounded-full text-token-text-primary dark:text-white focus-visible:outline-black dark:focus-visible:outline-white mb-1 ml-1.5"
                data-state="closed" for="upload_image">
                <span><svg width="24" height="24" viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd" clip-rule="evenodd"
                    d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                    fill="currentColor"></path></svg></span></label>
            <input ref="fileInput" type="file" @change="handleFileChange" id="upload_image" class="hidden"/>
          </div>
        </div>
        <div class="flex min-w-0 flex-1 flex-col">
            <textarea
                type="text"
                @input="writtenMessage"
                placeholder="Type a message..."
                ref="textarea"
                class="resize-none w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white "
                style="max-height: 25vh"
                v-model="messageData.text"
            ></textarea>
        </div>
        <button @click="sendMessage" data-testid="send-button"
                class="button h-8 w-8">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
               class="icon-2xl">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                  fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="messageData.files.length>0" class="modal-overlay">
      <div class="modal">
        <media-container :files="messageData.files" :is_modal="true" @deleteItem="deleteItem"/>
        <div class="modal-content">
          <div class="flex min-w-0 flex-1 flex-col">
            <textarea
                type="text"
                @input="writtenMessage"
                placeholder="Type a message..."
                ref="textarea"
                class="resize-none w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white "
                style="max-height: 25vh"
                v-model="messageData.text"
            ></textarea>
          </div>
          <div class="modal-actions pt-1">
            <label for="upload_image" class="button w-20 pt-0.5 pb-0.5"> Add </label>
            <button @click="clearMessageData" class="button w-20">Cancel</button>
            <button class="button w-20" @click="sendMessage">Send</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
import {ref, nextTick, reactive, defineEmits, getCurrentInstance} from "vue";
import MediaContainer from "@/components/mediaContainer.vue";

const emit = defineEmits(["sendMessage"]);

const {proxy} = getCurrentInstance()

const messageText = ref(null);
const textarea = ref(null);
const messageData = reactive({
  text: null,
  files: []
});


const writtenMessage = () => {
  console.log("messageText", messageText.value);
  autoResize();
};

const deleteItem = (index)=>{
  messageData.files.splice(index,1);
}

const sendMessage = () => {
  emit('sendMessage', {...messageData})
  clearMessageData()
}
const autoResize = () => {
  nextTick(() => {
    if (textarea.value) {
      textarea.value.style.height = 'auto'; // Reset height
      console.log("textarea.value.scrollHeight", textarea.value.scrollHeight, typeof textarea.value.scrollHeight)
      textarea.value.style.height = (textarea.value.scrollHeight + 3) + 'px'; // Set new height
    }
  });
};

const fileInput = ref(null)
const files = ref()

function handleFileChange() {
  files.value = fileInput.value?.files;
  uploadToServer()
}

const clearMessageData = () => {
  messageData.text = null;
  messageData.files = [];
}
const checkImageType = (type) => {
  return ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico"].includes(type);
}

async function uploadToServer() {
  const file = files.value[0]
  let xhr = new XMLHttpRequest();
  let formdata = new FormData();
  formdata.append("file", file);
  xhr.upload.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      let percentage = (event.loaded / event.total) * 100;
      console.log('percentage', percentage)
    }
  });

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      let result = JSON.parse(xhr.responseText);
      messageData.files.push(result);
      console.log(messageData)
    } else {
      console.log("Request failed with status: " + xhr.status);
    }
  });

  xhr.addEventListener("error", (error) => {
    console.log("Error occurred during the request:", error);
  });
  xhr.open("POST", "http://localhost:3000/api/upload");
  xhr.send(formdata);
}
</script>


<style>

.message_content {
  @apply w-[50px]
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 45vw;
  @apply dark:bg-gray-900
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.button {
  @apply mb-1 me-1 flex cursor-pointer  items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white  disabled:bg-[#D7D7D7]
}
</style>



