import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FormatInputMixin extends Vue {
  onlyNumber(event: KeyboardEvent): void {
    const keyCode = event.keyCode ? event.keyCode : event.which
    //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    console.log(keyCode)

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault()
    }
  }
}
