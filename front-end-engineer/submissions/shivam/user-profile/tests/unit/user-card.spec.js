import { mount, shallowMount } from "@vue/test-utils";
import UserCard from "@/components/user-card.vue";


//testing props -> user
describe("user-card.vue", () => {
    it("renders props.user when passed", () => {
        const user =
        {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            photo: "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/images/users/01.png",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        };
        const wrapper = mount(UserCard, {
            propsData: { user }
        });
        expect(wrapper.find("h2").text()).toBe("Leanne Graham")
    });
});