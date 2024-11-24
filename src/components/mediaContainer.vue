<script setup>
import {defineProps, defineEmits} from 'vue'
import CircleXmark from "@/components/icons/circle-xmark.vue";

const emit = defineEmits(['deleteItem'])

const props = defineProps({
  files: {type: Array, default: () => []},
  is_modal: {type: Boolean, default: false},
})

const deleteMediaItem = (index)=>{
  emit("deleteItem", index)
}
const checkImageType = (type) => {
  return ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico"].includes(type);
}
</script>

<template>
  <div class="meadia_content" :class="[{'scroll': props.is_modal}, {'one_item': props?.files?.length === 1}]">
    <div v-for="(item, index) in props.files" :key="index" class="media_item">
      <circle-xmark v-if="props.is_modal == true" @click="deleteMediaItem(index)"></circle-xmark>
      <img :src="item.path" alt="Preview" class="image-preview" v-if="checkImageType(item.extension)"/>

      <div class="message-container" v-else>
        <div class="file-icon"></div>
        <div class="file-details">
          <div class="file-name"> {{ item.filename }}</div>
          <div class="file-size"> {{ item.size }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.meadia_content {

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  row-gap: 5px;
}

.one_item{
  grid-template-columns: 1fr;
}

.scroll{
    max-height: 50vh;
  overflow-y: auto;
}

.media_item {
  flex-basis: calc(50% - 5px); /* Adjust for gap */
  position: relative;
  user-select: none;
}

.image-preview {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  object-fit: contain;
}




.message-container {
  display: flex;
  align-items: center;
  max-width: 250px;
  background-color: #e0ffe0;
  border-radius: 15px;
  padding: 10px;
  font-family: Arial, sans-serif;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.message-container::after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 10px 0;
  border-color: transparent #e0ffe0 transparent transparent;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.file-icon {
  width: 30px;
  height: 40px;
  background-color: #007bff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.file-details {
  flex-grow: 1;
}

.file-name {
  font-size: 14px;
  font-weight: bold;
}

.file-size {
  font-size: 12px;
  color: grey;
}
</style>