<template>
	<VueFinalModal class="custom_vfm"
		content-class="">
		<div class="content">
			<div class="inner">
				<img v-if="isAlert" class="check" src="../../assets/modal/error_icon.svg" alt="" />
				<img v-if="!isAlert" class="check" src="../../assets/modal/check_mark_icon.svg" alt="" />
				<p :class="{ msg: true, alert: isAlert }">
					{{ props.content }}
				</p>
			</div>
			<button class="know_btn" @click="emit('confirm')">回頁面</button>
		</div>
	</VueFinalModal>
</template>
<script setup>
import { VueFinalModal } from "vue-final-modal"

const props = defineProps({
	content: String,
	isAlert: Boolean,
});
const emit = defineEmits(["confirm"]);
</script>

<style scoped>
.inner{
	display:flex;
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
	width: 320px;
}

.alert {
	color: #920000 !important;
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
