export default function (context) {
    context.store.dispatch('initAuth', context.req); //context.req on client side should be null
}