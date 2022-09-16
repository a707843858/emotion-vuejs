import {styled}          from '@/core'
import {defineComponent} from 'vue'


//export default defineComponent( {
//    setup() {
//
//        const A = styled('button')({
//            color: 'red'
//        })
//
//        return () => (
//            <A>emotion - Tsx - vue </A>
//        )
//    }
//})


export default function () {

    const A = styled('button')({
        color: 'red'
    })

    return (
        <A>emotion - Tsx - vue </A>
    )
}
