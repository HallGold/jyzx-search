<!--  -->
<template>
<v-container fluid>
  <v-row>
    <v-list-item three-line>
    <v-list-item-content class="button bz-buttonAnimat counterclockwise horizontal">
      <v-list-item-title class="primary--text headline text-truncate" v-text="policy.title"></v-list-item-title>
      <v-list-item-subtitle>
        <v-chip class="ma-2" v-if="!$_.isNil(policy.sentCode) && !$_.isEmpty(policy.sentCode)" color="primary" text-color="white">
          {{policy.sentCode || ""}}
        </v-chip>
        <v-chip class="ma-2" v-if="!$_.isNil(policy.tags) && !$_.isEmpty(policy.tags)" color="orange" text-color="white">
          {{policy.tags}}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
  </v-row>
  <v-row>
    <blockquote class="blockquote" v-html="policy.content">
    </blockquote>
  </v-row>
</v-container>
</template>

<script>
export default {
  props: {
    policy: Object
  },
  components: {

  },
  data () {
    return {}
  },
  methods: {},
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
