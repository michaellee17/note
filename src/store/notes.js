import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNotes = defineStore('notes',() => {
	const notes = ref([
    {
      title: 'note 1',
      content: 'content1',
      isOpen: true,
      isEditing: false
    },
    {
      title: 'note 2',
      content: 'content2',
      isOpen: false,
      isEditing: false
    },
    {
      title: 'note 3',
      content: 'content3',
      isOpen: false,
      isEditing: false
    },
  ])

  const setNotes = (newNotes) => {
    notes.value = newNotes
  };

  return { notes, setNotes }

}, {
  persist: true,
},)