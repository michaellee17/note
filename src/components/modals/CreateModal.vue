<template>
	<VueFinalModal class="custom_vfm"
		content-class="">
		<div class="content">
			<div class="inner">
        <h6 class="title">新增筆記</h6>
				<div class="raw">
					<h6 class="hint">請輸入標題</h6>
					<input v-model="title" class="custom_input" type="text">
				</div>
				<div class="raw">
					<h6 class="hint">請輸入內文</h6>
					<textarea v-model="content" class="textarea"></textarea>
				</div>
			</div>
			<h6 v-show="errorMessage" class="alert">{{ errorMessage }}</h6>
			<button class="know_btn" @click="handleConfirm">送出</button>
		</div>
	</VueFinalModal>
</template>
<script setup>
import { ref } from 'vue'
import { VueFinalModal } from "vue-final-modal"

const errorMessage = ref('')
const title = ref('')
const content = ref('')

//簡單除錯並傳值到上層寫入
const handleConfirm = () => {
	if (!title.value.trim()) {
    errorMessage.value = '請輸入標題'
    return
  }
  if (!content.value.trim()) {
    errorMessage.value = '請輸入內文'
    return
  }
  emit('confirm', { title, content })
}

const emit = defineEmits(["confirm"]);
</script>

<style scoped>
.title{
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
.custom_input{
	width: 100%;
	height: 40px;
}
.textarea{
	width: 100%;
	min-height: 200px;
}
.raw{
	width: 85%;
	margin-bottom: 20px;
}
.hint{
	margin-bottom: 5px;
}
.inner{
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	margin-top: 30px;
}
.custom_vfm{
	display: flex;
	align-items: center;
	justify-content: center;
}
.modal_container{
	display: flex;
	justify-content: end;
}
.content {
	width: 480px;
}

.alert {
	font-size: 18px;
	text-align: center;
	color: red !important;
	margin: 10px;
}

.know_btn {
	width: 100%;
	height: 40px;
	color: #ffffff;
	background-color: #ceb96e;
	border: none;
	outline: none;
	border-radius: 0;
}

.know_btn:hover {
	color: #ceb96e;
	background-color: #ffffff;
	border: 1px solid #ceb96e;
}

.msg {
	color: #038800;
}

.check {
	margin-right: 5px;
	width: 18px;
	height: 18px;
}
</style>
