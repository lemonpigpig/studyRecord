<script>
// 影响性能
this.firstCategory.forEach((data) => {
  if (data.code === code) {
    data.currenticon = data.icon === '' ? '/img/category-icon.svg' : data.icon
  }
})
// good solve way
this.$set(this, 'firstCategory', this.firstCategory.map(data => Object.assign({}, data, {
  currenticon: data.icon === '' ? '/img/category-icon.svg' : data.icon
})))

</script>