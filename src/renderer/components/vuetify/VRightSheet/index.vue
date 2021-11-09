<!--  -->

<script>
import {
  VDialog
} from 'vuetify/lib'

export default VDialog.extend({
  name: 'v-right-sheet',

  props: {
    inset: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition'
    }
  },

  computed: {
    classes () {
      return {
        ...VDialog.options.computed.classes.call(this),
        'v-right-sheet': true
      }
    }
  }
})
</script>

<style scoped>
.v-bottom-sheet.v-dialog {
  height: 100%;
  position: fixed;
  overflow-y: auto;
  top: 0;
  border-radius: 0;
  margin: 0;
  /* overflow: visible; */
}
</style>
