<script setup>
//官方
import { ref,watch } from 'vue'
//第三方
import { useModal } from 'vue-final-modal'
//自製元件
import AlertModal from '@/components/modals/AlertModal.vue'
import CreateModal from '@/components/modals/CreateModal.vue'
import { useNotes } from '@/store/notes.js'

//pinia取notes值
const Notes = useNotes()
const notes = ref(Notes.notes)

//監聽notes值寫入pinia
watch(notes, (newNotes) => {
  Notes.setNotes(newNotes)
})

//打開note
const openList = (index) => {
  notes.value.forEach(item => {
    item.isOpen = false
    item.isEditing = false
  })
  notes.value[index].isOpen = true
}

//收回note
const closeList = (index) => {
  notes.value.forEach(item => {
    item.isEditing = false
  })
  notes.value[index].isOpen = false
}

//刪除note
const deleteNote = (index) => {
  notes.value.splice(index,1)
  alert.open()
}

//編輯note
const editNote = (index) => {
  openList(index)
  edit.open()
}

const alert = useModal({
    component: AlertModal,
    attrs: {
      isAlert: false,
      content: "刪除成功!",
      onConfirm() {
          alert.close()
      },
    },
})

const edit = useModal({
    component: AlertModal,
    attrs: {
      isAlert: false,
      content: "編輯成功!",
      onConfirm() {
        edit.close()
      },
    },
})

const success = useModal({
    component: AlertModal,
    attrs: {
      isAlert: false,
      content: "新增成功!",
      onConfirm() {
        success.close()
      },
    },
})

const drag = useModal({
    component: AlertModal,
    attrs: {
      isAlert: false,
      content: "拖拉成功!",
      onConfirm() {
        drag.close()
      },
    },
})
//編輯成功操作及提示
const create = useModal({
    component: CreateModal,
    attrs: {
      isAlert: false,
      onConfirm(data) {
        const title = data.title.value
        const content = data.content.value
        //所有notes狀態reset
        notes.value.forEach(item => {
          item.isOpen = false
          item.isEditing = false
        })
        //最新新增的設為開啟
        notes.value.push(
          {
            title: title,
            content: content,
            isOpen: true,
            isEditing: false
          }
        )
        create.close()
        success.open()
      },
    },
})
//阻止預設行為
const allowDrop = (e) => {
  e.preventDefault()
}
//拖拉結束
const dragStart = (e,index) => {
  let tar = e.target;
  e.dataTransfer.setData('Text', index);
}
//拖拉結束
const drop = (e,index) => {
  allowDrop(e);
  let arr = notes.value.concat([]),
  dragIndex = e.dataTransfer.getData('Text')
  let temp = arr.splice(dragIndex, 1)
  arr.splice(index, 0, temp[0])
  notes.value = arr

  for (let i = 0; i < notes.value.length; i++) {
    notes.value[i].sort = i+1;
  }   
}

//拖拉結束提示
const dragEnd = () => {
  drag.open()
}

</script>

<template>
<div class="container">
  <div class="topic">
    <h6>筆記列</h6>
  </div>
  <div class="create_container">
    <button @click="create.open()">新增</button>
  </div>
  <div class="notes" v-for="(item,index) in notes" draggable="true" :key="item.title"
    @dragstart="dragStart($event, index)" @dragover="allowDrop" 
    @drop="drop($event, index)" @dragend="dragEnd"
    >
    <div class="note">
      <div class="title">
        <h3>{{ item.title }}</h3>
        <img v-show="!item.isOpen" src="../assets/open.png" alt="" @click="openList(index)">
        <img v-show="item.isOpen" src="../assets/close.png" alt="" @click="closeList(index)">
      </div>
      <div v-show="item.isOpen" class="content">
        <div class="text_section">
          <p v-show="item.isOpen && item.isEditing === false">{{ item.content }}</p>
          <textarea v-show="item.isOpen && item.isEditing" v-model="item.content"></textarea>
        </div>
        <div class="button_section">
          <button class="primary" v-show="item.isOpen && !item.isEditing" @click="item.isEditing = true">編輯</button>
          <button class="warning" v-show="item.isOpen && !item.isEditing" @click="deleteNote(index)">刪除</button>
          <button class="primary" v-show="item.isOpen && item.isEditing" @click="editNote(index)">送出</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.topic h6{
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
.create_container{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.create_container button{
  background-color: brown;
  color:#ffffff
}
.text_section{
  padding: 20px 0;
}
.button_section{
  padding-bottom: 10px;
}
.content{
  min-height: 100px;
  background-color: #eeeeee;
}
.primary{
  background-color: blue;
  color:#ffffff;
}
.warning{
  margin-left: 10px;
  background-color: red;
  color:#ffffff;
}
.content textarea{
  width:90%;
  height: 50px;
}
.title{
  position: relative;
  display: flex;
  justify-content: space-around;
}
.title img{
  position: absolute;
  width: 30px;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.note h3{
  background-color: #920000;
  height: 50px;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding: 0 10px;
  width: 1280px;
  text-align: left;
}
</style>
