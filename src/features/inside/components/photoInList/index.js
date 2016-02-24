export default function () {
    return {
        bindings: {
            image: '@',
            likes: '@',
            title: '@',
            user_id: '@'
        },
        template: 'src/features/inside/components/photoInList/template.html'
    }
}