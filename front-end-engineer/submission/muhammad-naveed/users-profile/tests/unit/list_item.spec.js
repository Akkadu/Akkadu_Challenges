import {shallowMount} from '@vue/test-utils'
import ListItem from '@/components/ListItem.vue'

describe('ListItem.vue', () => {

    const user = {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "photo": "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/images/users/01.png",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }

    // To test if the component has a methods object
    it('has a methods object', () => {
        expect(typeof ListItem.methods).toBe('object')
    })

    // To test if the component methods object has deleteUse function
    it('methods object has a deleteUser function', () => {
        expect(typeof ListItem.methods.deleteUser).toBe('function')
    })

    // To test if the component methods object has setSelectedUser function
    it('methods object has a setSelectedUser function', () => {
        expect(typeof ListItem.methods.setSelectedUser).toBe('function')
    })

    // To test if the output contains the name of the user
    it('renders props.user when passed', () => {
        const wrapper = shallowMount(ListItem, {
            propsData: {'user': user}
        })
        expect(wrapper.text()).toContain('Leanne Graham')
    })

})
