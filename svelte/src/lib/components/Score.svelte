<script lang="ts">
  import { score } from '$stores/game';
</script>

<div>
  {$score}
</div>

<style lang="scss">
  div {
    position: fixed;
    left: 0;
    top: 0;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 1.5rem;
    color: #b6bdc2;
    transition: color 0.3s ease-in-out;
    text-align: right;

    &.active {
      color: #000;
    }

    &.success {
      color: darken(#b7eecf, 20%);
    }

    &.failure {
      color: darken(#fdb4bb, 20%);
    }
  }
</style>
