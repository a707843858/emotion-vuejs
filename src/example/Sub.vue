<template>
  <Button>Emotion - Vue</Button>
</template>

<script setup lang="ts">
import {styled, useTheme} from '@/core'

const theme = useTheme()

const Button = styled('button')(({pallet}) => ({
  color: '#FFF',
  fontSize: '20px',
  background: pallet?.main
}))

</script>
