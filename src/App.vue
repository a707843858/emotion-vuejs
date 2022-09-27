<template>
  <Button> Emotion - Vue</Button>
  <ButtonB a="c">Emotion - Extends</ButtonB>
  <Sub/>
  <Tsx/>
</template>

<script setup lang="tsx">
import {styled, createTheme} from './core/index'
import Sub                   from '@/example/Sub.vue'
import Tsx                   from '@/example/tsxComponent'


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
