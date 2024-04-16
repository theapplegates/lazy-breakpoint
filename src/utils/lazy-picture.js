module.exports = (url, alt = "Missing alt text") => {
  return `<picture class="lazy lazy-initial">
    <source srcset="/images/small/${url}" media="(min-width: 240px)">
    <source srcset="/images/xsmall/${url}" media="(max-width: 239px)">
    <img src="/images/xsmall/${url}" alt="${alt}" />
  </picture>`;
};