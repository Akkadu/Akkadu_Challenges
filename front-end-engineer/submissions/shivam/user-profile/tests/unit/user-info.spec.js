import { shallowMount } from "@vue/test-utils";
import UserInfo from "@/components/user-info.vue";

// testing props -> infoText
describe("user-info.vue", () => {
    it("renders props.infoText when passed", () => {
        const text = "Romaguera-Crona"

        const wrapper = shallowMount(UserInfo, {
            propsData: { infoText: text }
        });
        expect(wrapper.find("span").text()).toBe("Romaguera-Crona")
    });
});

// testing computed property -> subtextString
describe("user-info.vue", () => {
    it("generates computed property when passed", () => {
        const subText = "Multi-layered client-server neural-net"
        const isInline = true;

        const passedProps = {
            infoSubtext: subText, isSubtextInline: isInline
        }

        expect(UserInfo.computed.subtextString.call(passedProps)).toBe(" - Multi-layered client-server neural-net")
    });
});