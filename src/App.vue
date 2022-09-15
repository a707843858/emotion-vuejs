<template>
  <Button> Emotion - Vue</Button>
  <ButtonB>Emotion - Extends</ButtonB>
  <Sub/>
</template>

<script setup lang="tsx">
import {defineComponent}     from 'vue'
import {styled, createTheme} from './core/index'
import Sub                   from './Sub.vue'

// Theme
createTheme({
  pallet: {
    main: '#d2357d'
  },
  components: {}
})

let Button = styled('button')({
  color: '#FFF',
  fontSize: '20px',
  background: '#747bff'
})

let ButtonB = styled(Button)({
  fontWeight: 'bold'
})

</script>
