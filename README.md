# emotion + Vue3

@emotion for Vue3 

# Usage

### Basic Example

```vue

<template>
  <Button> Emotion - Vue</Button>
</template>

<script setup lang="ts">
import {styled} from '@emotion/vue'

const Button = styled('button')({
  color: '#FFF',
  fontSize: '20px',
  background: '#747bff'
})
</script>

```

### Theme

```vue
/*** App.vue ***/

<template>
  <Home/>
</template>
<script setup lang="ts">
import Home          from './Home.vue'
import {createTheme} from '@emotion/vue'

createTheme({
  pallet: {
    main: '#d2357d'
  }
})
</script>


/*** Home.vue ***/

<template>
  <Button> Emotion - Vue</Button>
</template>

<script setup lang="ts">
import {useTheme, styled} from '@emotion/vue'

const Button = styled('button')(({pallet}) => ({
  color: '#FFF',
  fontSize: '20px',
  background: pallet?.main
}));

/**
 *  OR
 *
 *  const { pallet } = useTheme()
 *  const Button = styled('button')({
 *  color: '#FFF',
 *  fontSize: '20px',
 *  background: pallet?.main,
 *  });
 **/

</script>
```
