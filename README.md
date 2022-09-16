# emotion + Vue3

@emotion for Vue3 

# Usage

### Basic Example

```vue

<template>
  <Button> Emotion - Vue</Button>
</template>

<script setup lang="ts">
import {styled} from 'emotion-vuejs'

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
import {createTheme} from 'emotion-vuejs'

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
import {useTheme, styled} from 'emotion-vuejs'

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


### Typescript

```typescript
// vite.config.ts
import vueJsx         from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({})
    ],
})
```

```typescript
//  component.tsx

import {styled}          from 'emotion-vuejs'
import {defineComponent} from 'vue'



export default defineComponent( {
    setup() {

        /* it can only be used inside setup() or functional components.  */
        const A = styled('button')({
            color: 'red'
        })

        return () => (
            <A>emotion - Tsx - vue </A>
        )
    }
})


```
