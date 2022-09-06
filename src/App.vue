<template>
  <Button> Emotion - Vue</Button>
  <Sub/>
</template>

<script setup lang="ts">
import {defineComponent}     from 'vue'
import {styled, createTheme} from './core/index'
import Sub                   from './Sub.vue'

let Button = styled('button')({
  color: '#FFF',
  fontSize: '20px',
  background: '#747bff'
})

Button = defineComponent(Button) as  any

// Theme
createTheme({
  pallet: {
    main: '#d2357d'
  },
  components:{

  }
})

</script>
