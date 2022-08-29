<template>
  <Button> Emotion - Vue</Button>
  <Sub/>
</template>

<script setup lang="ts">
import {styled, createTheme} from './core/index'
import Sub                   from './Sub.vue'

const Button = styled('button')({
  color: '#FFF',
  fontSize: '20px',
  background: '#747bff'
})

// Theme
createTheme({
  pallet: {
    main: '#d2357d'
  },
  components:{

  }
})

</script>
